"use client";

import { useActionState } from "react";
import { registerUser } from "../../../actions";
import Link from "next/link";

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerUser, null);

  const inputClass = "w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-amber-800";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf7f2] px-4">
      <form action={formAction} className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-amber-950">Create Account</h1>

        <div>
          <label htmlFor="name">Full Name</label>
          <input className={inputClass} id="name" name="name" required />
          {state?.fieldErrors?.name && <p className="text-sm text-red-500">{state.fieldErrors.name[0]}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input className={inputClass} id="email" name="email" type="email" required />
          {state?.fieldErrors?.email && <p className="text-sm text-red-500">{state.fieldErrors.email[0]}</p>}
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <input className={inputClass} id="phone" name="phone" type="tel" required />
          {state?.fieldErrors?.phone && <p className="text-sm text-red-500">{state.fieldErrors.phone[0]}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input className={inputClass} id="password" name="password" type="password" required />
          {state?.fieldErrors?.password && <p className="text-sm text-red-500">{state.fieldErrors.password[0]}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input className={inputClass} id="confirmPassword" name="confirmPassword" type="password" required />
          {state?.fieldErrors?.confirmPassword && (
            <p className="text-sm text-red-500">{state.fieldErrors.confirmPassword[0]}</p>
          )}
        </div>

        <button
          disabled={pending}
          className="w-full rounded-lg bg-amber-900 py-3 font-semibold text-white disabled:opacity-50"
        >
          {pending ? "Creating Account..." : "Register"}
        </button>

        {state?.message && <p className="text-sm text-green-700">{state.message}</p>}

        <p className="text-center text-sm">
          Already registered?{" "}
          <Link href="/login" className="text-amber-900 underline">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
