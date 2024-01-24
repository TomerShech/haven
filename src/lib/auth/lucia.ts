import { readFileSync } from "node:fs";
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { betterSqlite3 } from "@lucia-auth/adapter-sqlite";
import sqlite from "better-sqlite3";
import { cache } from "react";
import * as context from "next/headers";

const db = sqlite("db.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS user (
    id VARCHAR(15) PRIMARY KEY,
    username VARCHAR(31) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS user_key (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(15) NOT NULL,
    hashed_password VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(id)
  );

  CREATE TABLE IF NOT EXISTS user_session (
    id VARCHAR(127) PRIMARY KEY,
    user_id VARCHAR(15) NOT NULL,
    active_expires BIGINT NOT NULL,
    idle_expires BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
  );
`);

export const auth = lucia({
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: new Date().getMonth() > new Date().getMonth() - 1,
  },
  adapter: betterSqlite3(db, {
    user: "user",
    key: "user_key",
    session: "user_session",
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
