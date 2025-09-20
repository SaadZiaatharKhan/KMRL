// app/components/Others.tsx
import React from "react";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Dashboard from "@/components/others/dashboard";

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
        <p className="text-5xl text-blue-400 p-2 ml-3.5 mt-4 font-bold">
          Welcome
        </p>
        <p className="text-xl ml-4 mt-2">Not signed in</p>
      </>
    );
  }

  // fetch profile row (first_name, last_name)
  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("first_name, last_name, designation, department")
    .eq("id", user.id)
    .single();

  const displayName =
    profile && (profile.first_name || profile.last_name)
      ? `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim()
      : user.email ?? user.id;

  const displayProfession = profile?.designation ?? "No designation";
  const displayDepartment = profile?.department ?? "No department";

  return (
    <>
      <div className="m-2 p-2 rounded-xl bg-[#c3facb]">
        <p className="text-5xl text-blue-400 p-2 ml-3.5 font-bold">
          Welcome
        </p>
        <p className="text-2xl ml-8 text-gray-350 font-medium">{displayName}</p>
        <p className="text-lg ml-8 text-gray-400 font-medium">
          {displayProfession}, {displayDepartment.slice(0, 3)}. Department
        </p>
      </div>

      <div className="flex justify-center items-center">
        <Dashboard />
      </div>

      <div className="fixed flex justify-evenly bottom-0 left-[33.335%] m-2 p-2 rounded-xl bg-[#c3facb] w-4/12">
          <button className="p-1 m-1 ">
            <Image src="/images/icons/dashboard.webp" width={35} height={35} alt="Dashboard" />
          </button>
          <button className="p-1 m-1 ">
            <Image src="/images/icons/paper.webp" width={35} height={35} alt="Hub" />
          </button>
          <button className="p-1 m-1 ">
            <Image src="/images/icons/rating.webp" width={35} height={35} alt="Senior Insights" />
          </button>
          <button className="p-1 m-1 ">
            <Image src="/images/icons/robotics.webp" width={35} height={35} alt="Chatbot" />
          </button>
      </div>
    </>
  );
}
