import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const PROFILE_KEY = "main";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("app_settings")
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
    profile_name: body.profile_name ?? "",
    core_goals: body.core_goals ?? "",
    quran_goal: body.quran_goal ?? "",
    wife_goal: body.wife_goal ?? "",
    trigger_defaults: body.trigger_defaults ?? "",
    app_preferences: body.app_preferences ?? "",
    onboarding_answers: body.onboarding_answers ?? "",
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabaseAdmin
    .from("app_settings")
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
