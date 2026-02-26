import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()

    if (!text) {
      return NextResponse.json({ error: "text is required" }, { status: 400 })
    }

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are an e-commerce copywriter. Rewrite the following product text to make it more professional, clear and engaging for customers. Keep the same language as the input text.

Respond ONLY with the rewritten text, no explanation, no quotes:

"${text}"`,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== "text") {
      return NextResponse.json({ error: "Unexpected response type" }, { status: 500 })
    }

    return NextResponse.json({ text: content.text.trim() })
  } catch (error) {
    console.error("Rewrite error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}