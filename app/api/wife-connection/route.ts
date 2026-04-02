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
    .from("daily_wife_connection")
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
    daily_call: body.daily_call ?? false,
    make_dua_for_wife: body.make_dua_for_wife ?? false,
    support_her_emotionally: body.support_her_emotionally ?? false,
    be_loving_and_reassuring: body.be_loving_and_reassuring ?? false,
    ask_how_she_is_really_doing: body.ask_how_she_is_really_doing ?? false,
    appreciation_note: body.appreciation_note ?? "",
    support_note: body.support_note ?? "",
    relationship_notes: body.relationship_notes ?? "",
    future_planning: body.future_planning ?? "",
  };

  const { data, error } = await supabaseAdmin
    .from("daily_wife_connection")
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
