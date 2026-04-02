import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const PROFILE_KEY = "main";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("immigration_progress")
    .select("*")
    .eq("profile_key", PROFILE_KEY)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ record: data ?? null });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const payload = {
    profile_key: PROFILE_KEY,
    income_30k_sorted: body.income_30k_sorted ?? false,
    saving_1000_plus_per_month: body.saving_1000_plus_per_month ?? false,
    accommodation_sorted: body.accommodation_sorted ?? false,
    driving_passed: body.driving_passed ?? false,
    next_action_step: body.next_action_step ?? "",
    progress_notes: body.progress_notes ?? "",
    documents_checklist: body.documents_checklist ?? "",
    evidence_checklist: body.evidence_checklist ?? "",
    current_blockers: body.current_blockers ?? "",
    important_deadlines: body.important_deadlines ?? "",
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabaseAdmin
    .from("immigration_progress")
    .upsert(payload, {
      onConflict: "profile_key",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ record: data });
}
