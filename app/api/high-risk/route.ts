import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const PROFILE_KEY = "main";

export async function GET(req: NextRequest) {
  const dateKey = req.nextUrl.searchParams.get("date_key");

  if (!dateKey) {
    return NextResponse.json(
      { error: "Missing date_key" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("daily_high_risk")
    .select("*")
    .eq("profile_key", PROFILE_KEY)
    .eq("date_key", dateKey)
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
    date_key: body.date_key,
    urge_level: body.urge_level ?? null,
    loneliness: body.loneliness ?? false,
    late_night_scrolling: body.late_night_scrolling ?? false,
    boredom: body.boredom ?? false,
    stress: body.stress ?? false,
    tiredness: body.tiredness ?? false,
    isolation: body.isolation ?? false,
    emergency_mode: body.emergency_mode ?? false,
    pulled_toward_weakness: body.pulled_toward_weakness ?? "",
    pattern_notes: body.pattern_notes ?? "",
  };

  const { data, error } = await supabaseAdmin
    .from("daily_high_risk")
    .upsert(payload, {
      onConflict: "profile_key,date_key",
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
