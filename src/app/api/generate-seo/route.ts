import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { productName, description } = await req.json()

    if (!productName) {
      return NextResponse.json({ error: "productName is required" }, { status: 400 })
    }

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are an SEO expert. Generate SEO parameters for this product: "${productName}".
${description ? `Product description: "${description}"` : ""}

Respond ONLY with a valid JSON object, no markdown, no backticks:
{
  "seo_title": "optimized SEO title under 60 characters",
  "seo_description": "SEO meta description between 150-160 characters",
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
    console.error("Generate SEO error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}