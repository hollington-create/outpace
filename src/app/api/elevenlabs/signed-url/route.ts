import { NextRequest, NextResponse } from "next/server";
import { buildDiscoverySystemPrompt } from "@/lib/discovery-prompt";
import { PAGE_CONFIGS } from "@/lib/discovery-configs";
import { createEmptyExtractedData } from "@/lib/consultation-defaults";
import type { ExtractedConsultationData } from "@/lib/types";

/**
 * Generate a signed URL for the ElevenLabs ConvAI Discovery agent.
 * POST /api/elevenlabs/signed-url
 *
 * Returns a signed URL + the system prompt to use as an override.
 * Keeps ELEVENLABS_API_KEY server-side (never exposed to browser).
 */

const API_BASE = "https://api.elevenlabs.io";

export async function POST(req: NextRequest) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.ELEVENLABS_DISCOVERY_AGENT_ID;

  if (!apiKey || !agentId) {
    return NextResponse.json(
      { error: "Voice agent not configured" },
      { status: 503 }
    );
  }

  try {
    // Parse request body for slug and current consultation data
    const body = await req.json().catch(() => ({}));
    const slug = body.slug || null;
    const currentData: ExtractedConsultationData =
      body.currentData || createEmptyExtractedData();

    // Build the discovery system prompt (same one used by text chat)
    const pageConfig = slug ? PAGE_CONFIGS[slug] : undefined;
    const systemPrompt = buildDiscoverySystemPrompt(currentData, pageConfig);

    // Build first message — personalized if we have page config
    let firstMessage: string;
    if (pageConfig?.customQuestionFramework) {
      // Custom page (e.g. RAYN) — the agent already knows the company
      firstMessage = pageConfig.firstMessage ||
        `Hi there! I'm your growth consultant from Outpace. We've done some homework on your business already, so this won't be a cold start — I've got a good sense of what you do. I'd love to dig into the specifics with you and find the biggest growth opportunities. Should only take about 10 minutes. So tell me — how's business been going lately?`;
    } else {
      firstMessage =
        "Hi there! I'm your growth consultant from Outpace. I'd love to learn about your business and explore how we might help you grow. This'll take about 10 minutes. Let's get started — tell me a bit about what your company does?";
    }

    // Get signed URL from ElevenLabs
    const response = await fetch(
      `${API_BASE}/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
      {
        headers: { "xi-api-key": apiKey },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "[Signed URL] ElevenLabs API error:",
        response.status,
        errorText
      );
      return NextResponse.json(
        { error: "Failed to generate voice session" },
        { status: 502 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      signedUrl: data.signed_url,
      systemPrompt,
      firstMessage,
    });
  } catch (err) {
    console.error("[Signed URL] Error:", err);
    return NextResponse.json(
      { error: "Internal error generating voice session" },
      { status: 500 }
    );
  }
}
