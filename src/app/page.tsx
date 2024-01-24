import LogoutForm from "@/components/logout-form";
import { auth } from "@/lib/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();

  if (!session) {
    redirect("/entry");
  }

  return (
    <>
      <h1>פרופיל</h1>
      <p>איידי: {session.user.userId}</p>
      <p>שם משתמש: {session.user.username}</p>
      <LogoutForm />
    </>
  );
}
