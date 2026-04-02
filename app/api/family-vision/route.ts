import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const PROFILE_KEY = "main";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("family_vision")
    .select("*")
    .eq("profile_key", PROFILE_KEY)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ record: data ?? null });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const payload = {
    profile_key: PROFILE_KEY,
    husband_identity: body.husband_identity ?? "",
    home_vision: body.home_vision ?? "",
    family_values: body.family_values ?? "",
    barakah_in_home: body.barakah_in_home ?? "",
    future_children_hopes: body.future_children_hopes ?? "",
    financial_stability_vision: body.financial_stability_vision ?? "",
    short_term_goals: body.short_term_goals ?? "",
    long_term_dream: body.long_term_dream ?? "",
    mission_statement: body.mission_statement ?? "",
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabaseAdmin
    .from("family_vision")
    .upsert(payload, {
      onConflict: "profile_key",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ record: data });
}
