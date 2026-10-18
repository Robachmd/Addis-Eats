import { cookies } from "next/headers";

export async function setSession() {
  const cookieStore = await cookies();

  cookieStore.set("session", "practice-session", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  return { id: token };
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
