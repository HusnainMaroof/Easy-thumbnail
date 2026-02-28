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
        className=" cursor-pointer w-full flex items-center gap-3 p-3 font-black text-xs uppercase hover:bg-[#FF6B6B] hover:text-white transition-colors rounded-lg group mt-1"
      >
        <span className="p-1.5 border-2 border-black bg-white group-hover:bg-white text-black rounded-md">
          <LogOut size={16} />
        </span>
        Logout
      </button>
    </form>
  );
};
