import { createError } from "@/config/error-messages";
import { auth } from "@/lib/auth/lucia";
import { LuciaError } from "lucia";
import * as context from "next/headers";
import { type NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const { name, username, password } = data;

  if (typeof name !== "string" || name.trim().indexOf(" ") === -1) {
    return createError("INVALID_NAME", 400);
  }

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31
  ) {
    return createError("INVALID_USERNAME", 400);
  }

  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return createError("INVALID_PASSWORD", 400);
  }

  try {
    const user = await auth.createUser({
      key: {
        providerId: "username", // auth method
        providerUserId: username.toLowerCase(), // unique id when using "username" auth method
        password, // hashed by Lucia
      },
      attributes: {
        name,
        username,
      },
    });

    const session = await auth.createSession({
      userId: user.userId,
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
      error.message === "AUTH_DUPLICATE_KEY_ID"
    ) {
      return createError("USERNAME_ALREADY_EXISTS", 400);
    }

    return createError("UNKNOWN_ERROR", 500);
  }
};
