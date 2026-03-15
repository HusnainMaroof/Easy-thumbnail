"use client";

import { ActionResponse, logoutAction } from "@/src/actions/auth.actions";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useActionState, useEffect } from "react";

export const LogoutButton = () => {
  const initialState: ActionResponse = {
    success: false,
    error: false,
    message: null,
    data: null,
  };
  const [state, dispatcher, IsPending] = useActionState<ActionResponse>(
    logoutAction,
    initialState,
  );

  useEffect(() => {
    if (state.success && state.message === "logout successfully") {
      redirect("/");
    }

    // console.log(state);
  }, [state]);
  return (
    <form action={dispatcher}>
      <button
        type="submit"
        className=" text-black bg-zinc-200  p-4 text-sm font-black uppercase tracking-widest border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer w-full flex items-center gap-3  hover:bg-[#FF6B6B] hover:text-white transition-colors  group mt-1"
      >
        <span className="p-1.5 border-2 border-black bg-[#FF6B6B] text-white group-hover:bg-white group-hover:text-black!  rounded-md">
          <LogOut size={16}  className=""/>
        </span>
        Logout
      </button>
    </form>
  );
};




