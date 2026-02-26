import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { productName } = await req.json()

    if (!productName) {
      return NextResponse.json({ error: "productName is required" }, { status: 400 })
    }

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are an e-commerce expert. Generate the following information for this product: "${productName}".

Respond ONLY with a valid JSON object, no markdown, no backticks, no explanation:
{
  "description_short": "short description of 1-2 sentences",
  "description_long": "long description of 3-4 detailed sentences",
  "seo_title": "optimized SEO title",
  "seo_description": "SEO description of 150-160 characters",
  "seo_keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}`,
        },
      ],
    })

    const content = message.content[0]

    if (content.type !== "text") {
      return NextResponse.json({ error: "Unexpected response type" }, { status: 500 })
    }

    const clean = content.text.replace(/```json|```/g, "").trim()
    const data = JSON.parse(clean)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Generate error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}