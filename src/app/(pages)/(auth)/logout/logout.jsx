"use client";

import { logoutUser } from "../actions";

export default function LogoutButton() {
  return (
    <form action={logoutUser}>
      <button type="submit" className="rounded-lg bg-amber-900 px-4 py-2 text-white hover:bg-amber-800">
        Logout
      </button>
    </form>
  );
}
