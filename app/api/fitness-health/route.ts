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
    .from("daily_fitness_health")
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
    diet_followed_properly: body.diet_followed_properly ?? false,
    water_intake_on_track: body.water_intake_on_track ?? false,
    sleep_target_respected: body.sleep_target_respected ?? false,
    recovery_rest_handled_properly:
      body.recovery_rest_handled_properly ?? false,
    workout_a: body.workout_a ?? false,
    workout_b: body.workout_b ?? false,
    workout_c: body.workout_c ?? false,
    training_plan: body.training_plan ?? "",
    diet_planner: body.diet_planner ?? "",
    progress_log: body.progress_log ?? "",
    weekly_review: body.weekly_review ?? "",
    current_goals: body.current_goals ?? "",
  };

  const { data, error } = await supabaseAdmin
    .from("daily_fitness_health")
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
