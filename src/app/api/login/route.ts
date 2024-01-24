import { auth } from "@/lib/auth/lucia";
import * as context from "next/headers";
import { LuciaError } from "lucia";
import type { NextRequest } from "next/server";
import { createError } from "@/config/error-messages";

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const { username, password } = data;

  if (
    typeof username !== "string" ||
    username.length < 1 ||
    username.length > 31
  ) {
    return createError("INVALID_USERNAME", 400);
  }
  if (
    typeof password !== "string" ||
    password.length < 1 ||
    password.length > 255
  ) {
    return createError("INVALID_PASSWORD", 400);
  }
  try {
    // find user by key
    // and validate password
    const key = await auth.useKey("username", username.toLowerCase(), password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/", // redirect to profile page
      },
    });
  } catch (error) {
    if (
      error instanceof LuciaError &&
      (error.message === "AUTH_INVALID_KEY_ID" ||
        error.message === "AUTH_INVALID_PASSWORD")
    ) {
      return createError("INCORRECT_CREDENTIALS", 400);
    }

    return createError("UNKNOWN_ERROR", 500);
  }
};
