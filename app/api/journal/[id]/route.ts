import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const PROFILE_KEY = "main";

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { error } = await supabaseAdmin
    .from("journal_entries")
    .delete()
    .eq("id", id)
    .eq("profile_key", PROFILE_KEY);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
