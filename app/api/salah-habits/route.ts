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
    .from("daily_salah_habits")
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
    fajr: body.fajr ?? false,
    dhuhr: body.dhuhr ?? false,
    asr: body.asr ?? false,
    maghrib: body.maghrib ?? false,
    isha: body.isha ?? false,
    quran: body.quran ?? false,
    dhikr: body.dhikr ?? false,
    tahajjud_prep: body.tahajjud_prep ?? false,
    lower_gaze_no_private_scrolling:
      body.lower_gaze_no_private_scrolling ?? false,
    focused_work_block: body.focused_work_block ?? false,
    daily_dua: body.daily_dua ?? false,
    returned_quickly_after_slip: body.returned_quickly_after_slip ?? false,
    sleep_on_time: body.sleep_on_time ?? false,
  };

  const { data, error } = await supabaseAdmin
    .from("daily_salah_habits")
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
