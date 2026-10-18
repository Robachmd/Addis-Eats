"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { loginUser } from "../../../actions";
import Link from "next/link";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginUser, null);

  const searchParams = useSearchParams();
  const requestedNext = searchParams.get("next") || "/menu";

  const safeNext =
    requestedNext.startsWith("/") && !requestedNext.startsWith("//") && !requestedNext.includes("\\")
      ? requestedNext
      : "/menu";

  const inputClass = "w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-amber-800";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf7f2] px-4">
      <form action={formAction} className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-amber-950">Welcome Back</h1>

        <input type="hidden" name="next" value={safeNext} />

        <div>
          <label htmlFor="email">Email</label>
          <input className={inputClass} id="email" name="email" type="email" autoComplete="email" required />

          {state?.fieldErrors?.email && <p className="text-sm text-red-500">{state.fieldErrors.email[0]}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            className={inputClass}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />

          {state?.fieldErrors?.password && <p className="text-sm text-red-500">{state.fieldErrors.password[0]}</p>}
        </div>

        {state?.message && (
          <p role="alert" className="text-sm text-red-500">
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-amber-900 py-3 font-semibold text-white disabled:opacity-50"
        >
          {pending ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm">
          Dont have an account?{" "}
          <Link href="/register" className="text-amber-900 underline">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}
