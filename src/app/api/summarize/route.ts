import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { text, type } = await req.json();

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { error: "Invalid request: 'text' is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GOOGLE_GENERATIVE_AI_API_KEY server env" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
    });

    let prompt;
    switch (type) {
      case "funny":
        prompt = `Rewrite the following text in a funny and humorous tone. Correct any grammatical errors. You do not write nothing like "Here's your answer" not a single extra word only the rewrited text. Text:\n\n${text}`;
        break;
      case "casual":
        prompt = `Rewrite the following text in a casual and friendly tone. Correct any grammatical errors. You do not write nothing like "Here's your answer" not a single extra word only the rewrited text. Text:\n\n${text}`;
        break;
      case "professional":
      default:
        prompt = `Rewrite the following text in a professional tone. Correct any grammatical errors. You do not write nothing like "Here's your answer" not a single extra word only the rewrited text. Text:\n\n${text}`;
        break;
    }

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 120,
        temperature: 0.2,
      },
    });
    const output = result.response.text();

    return NextResponse.json({ summary: output });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to summarize";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
