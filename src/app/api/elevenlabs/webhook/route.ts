import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import crypto from "crypto";

/**
 * ElevenLabs post-call webhook receiver.
 * POST /api/elevenlabs/webhook
 *
 * Receives transcript data after a ConvAI voice session ends,
 * and stores it in Supabase.
 */

const WEBHOOK_SECRET = process.env.ELEVENLABS_WEBHOOK_SECRET || "";

function verifySignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature || !secret) return false;

  // ElevenLabs sends signature in format: t=<timestamp>,v0=<hash>
  const parts = signature.split(",");
  const timestampPart = parts.find((p) => p.startsWith("t="));
  const hashPart = parts.find((p) => p.startsWith("v0="));

  if (!timestampPart || !hashPart) return false;

  const timestamp = timestampPart.slice(2);
  const expectedHash = hashPart.slice(3);

  // Verify the HMAC
  const signedPayload = `${timestamp}.${payload}`;
  const computedHash = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(computedHash),
    Buffer.from(expectedHash)
  );
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("elevenlabs-signature");

  // Verify webhook signature if secret is configured
  if (WEBHOOK_SECRET) {
    const isValid = verifySignature(rawBody, signature, WEBHOOK_SECRET);
    if (!isValid) {
      console.error("[Webhook] Invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  try {
    const event = JSON.parse(rawBody);
    console.log("[Webhook] Received event:", event.type);

    // Handle post-call transcription events
    if (event.type === "post_call_transcription") {
      const data = event.data;
      const conversationId = data.conversation_id;
      const agentId = data.agent_id;
      const status = data.status;
      const transcript = data.transcript || [];
      const analysis = data.analysis || {};
      const metadata = data.metadata || {};

      // Build a clean transcript array
      const messages = transcript.map(
        (msg: { role: string; message: string; time_in_call_secs?: number }) => ({
          role: msg.role === "agent" ? "assistant" : "user",
          content: msg.message,
          timestamp: msg.time_in_call_secs || null,
        })
      );

      // Store in Supabase
      const supabase = createServerSupabaseClient();

      const { error } = await supabase.from("voice_conversations").insert({
        elevenlabs_conversation_id: conversationId,
        agent_id: agentId,
        status,
        transcript: messages,
        transcript_summary: analysis.transcript_summary || null,
        call_successful: analysis.call_successful || null,
        call_duration_secs: metadata.call_duration_secs || null,
        cost: metadata.cost || null,
        raw_event: data,
      });

      if (error) {
        console.error("[Webhook] Supabase insert error:", error.message);
        // Still return 200 so ElevenLabs doesn't retry
      } else {
        console.log(
          "[Webhook] Saved transcript for conversation:",
          conversationId
        );
      }
    }

    // Must return 200 for ElevenLabs to consider it successful
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[Webhook] Parse error:", err);
    return NextResponse.json({ received: true }); // Still 200 to prevent retries
  }
}
