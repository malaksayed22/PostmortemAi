import { SYSTEM_PROMPT } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function POST(request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not set. Add it to your .env.local file." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { userMessage, model = "gpt-4o" } = body;
  if (!userMessage) {
    return NextResponse.json({ error: "Missing userMessage field." }, { status: 400 });
  }

  try {
    const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        max_tokens: 2500,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
      }),
    });

    if (!openAiRes.ok) {
      const err = await openAiRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: err?.error?.message || `OpenAI API error: ${openAiRes.status}` },
        { status: openAiRes.status }
      );
    }

    const data = await openAiRes.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      return NextResponse.json(
        { error: "Unexpected response format from OpenAI API." },
        { status: 500 }
      );
    }

    return NextResponse.json({ text });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Failed to reach OpenAI API." },
      { status: 500 }
    );
  }
}
