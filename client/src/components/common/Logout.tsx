"use client";

import { ActionResponse, logoutAction } from "@/src/actions/auth.actions";
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

    console.log(state);
  }, [state]);
  return (
    <form action={dispatcher}>
      <button
        type="submit"
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
      >
        Logout
      </button>
    </form>
  );
};
