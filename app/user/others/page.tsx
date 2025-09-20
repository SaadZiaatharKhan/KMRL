// app/components/Others.tsx
import React from "react";
import { createClient } from "@/utils/supabase/server";

export default async function Others() {
  const supabase = await createClient();

  // get authenticated user
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr) {
    // optional: log or handle error
  }

  if (!user) {
    return (
      <>
        <p className="text-5xl text-blue-400 p-2 ml-3.5 mt-4 font-bold">Welcome</p>
        <p className="text-xl ml-4 mt-2">Not signed in</p>
      </>
    );
  }

  // fetch profile row (first_name, last_name)
  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("id", user.id)
    .single();

  const displayName =
    profile && (profile.first_name || profile.last_name)
      ? `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim()
      : user.email ?? user.id;

  return (
    <>
      <p className="text-5xl text-blue-400 p-2 ml-3.5 mt-4 font-bold">Welcome</p>
      <p className="text-2xl ml-8 mt-2 text-gray-500 font-medium">{displayName}</p>
    </>
  );
}
