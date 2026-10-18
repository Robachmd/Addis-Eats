"use client";

import { logoutUser } from "../actions";

export default function LogoutButton() {
  return (
    <form action={logoutUser}>
      <button
        type="submit"
        className="hover:text-mahogany-red"
      >
        Logout
      </button>
    </form>
  );
}