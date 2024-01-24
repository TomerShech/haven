import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { mongoose } from "@lucia-auth/adapter-mongoose";
import { cache } from "react";
import * as context from "next/headers";
import connectDB from "../connectDB";
import { User, Key, Session } from "@/lib/models";

export const auth = lucia({
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  adapter: mongoose({
    User,
    Key,
    Session,
  }),
  getUserAttributes: (data) => {
    return {
      name: data.name,
      username: data.username,
      created_at: data.created_at,
    };
  },
});

export type Auth = typeof auth;

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});

connectDB();
