import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import type { ExtractedConsultationData } from "@/lib/types";

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const { consultationId } = await req.json();
    if (!consultationId) {
      return NextResponse.json({ error: "consultationId required" }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    const { data: consultation, error } = await supabase
      .from("consultations")
      .select("*")
      .eq("id", consultationId)
      .single();

    if (error || !consultation) {
      return NextResponse.json({ error: "Consultation not found" }, { status: 404 });
    }

    const extractedData = consultation.extracted_data as ExtractedConsultationData;

    const { text } = await generateText({
      model: anthropic("claude-sonnet-4-20250514"),
      system: buildProposalSystemPrompt(),
      prompt: `Generate a tailored growth proposal based on this discovery consultation data:\n\n${JSON.stringify(extractedData, null, 2)}`,
    });

    const proposalContent = {
      raw: text,
      companyName: extractedData.company.name,
      industry: extractedData.company.industry,
      generatedAt: new Date().toISOString(),
      primaryPain: extractedData.primaryPainBranch,
      qualificationScore: extractedData.qualification.qualificationScore,
    };

    const { data: proposal, error: insertError } = await supabase
      .from("proposals")
      .insert({ consultation_id: consultationId, content: proposalContent, status: "generated" })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    await supabase
      .from("consultations")
      .update({ status: "completed", updated_at: new Date().toISOString() })
      .eq("id", consultationId);

    return NextResponse.json({ proposal });
  } catch (err) {
    console.error("Proposal generation error:", err);
    return NextResponse.json({ error: "Failed to generate proposal" }, { status: 500 });
  }
}

function buildProposalSystemPrompt(): string {
  return `You are a senior business development strategist at Outpace, a consultative growth partner based in Ireland.

Generate a tailored growth proposal based on the discovery consultation data provided.

## PROPOSAL STRUCTURE

### 1. Executive Summary
2-3 sentences summarising the company, their core challenge, and the opportunity.

### 2. Current Situation Analysis
What we've learned: company overview, key pain points, current gaps, metrics mentioned.

### 3. Recommended Strategy
Specific services tailored to their needs:
- Consultative Business Analysis
- Outbound Lead Generation (email sequences + AI calling)
- Digital Presence (website, SEO, Google Ads, LinkedIn Ads, retargeting)
- Systems & Operations (CRM, automation, data consolidation)
- Content & Video (LinkedIn thought leadership, brand storytelling, video)
Only recommend what's relevant to their stated pain points.

### 4. Implementation Roadmap
3-phase, 6-month plan with specific milestones.

### 5. Expected Outcomes
Realistic projections at Month 3 and Month 6.

### 6. Investment Options
Option A: Monthly Retainer (full-service). Option B: Hybrid (lower base + performance bonuses).
Don't include specific prices.

### 7. Why Outpace
Consultative approach, AI-powered tools, Cube Printing case study reference, Irish team.

Format as clean Markdown. Be specific — reference their actual company, pain points, and metrics. 1,500-2,000 words.`;
}
