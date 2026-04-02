import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const PROFILE_KEY = "main";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("journal_entries")
    .select("*")
    .eq("profile_key", PROFILE_KEY)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ entries: data ?? [] });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const payload = {
    profile_key: PROFILE_KEY,
    date_key: body.date_key,
    main: body.main ?? "",
    feeling: body.feeling ?? "",
    off_track: body.off_track ?? "",
    grateful: body.grateful ?? "",
    need_allah: body.need_allah ?? "",
  };

  const { data, error } = await supabaseAdmin
    .from("journal_entries")
    .insert(payload)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ entry: data });
}
