import { NextResponse } from "next/server";

export const errors = {
  USERNAME_ALREADY_EXISTS: "שם משתמש זה תפוס, יש לבחור אחר.",
  INVALID_NAME: "שם מלא לא תקין.",
  INVALID_USERNAME: "שם משתמש לא תקין, עליו להכיל לפחות 3 תווים.",
  INVALID_PASSWORD: "סיסמה לא תקינה, עליה להכיל לפחות 6 תווים.",
  INCORRECT_CREDENTIALS: "שם משתמש או סיסמה שגויים.",
  UNKNOWN_ERROR: "אירעה שגיאה לא ידועה.",
} as const;

export type ErrorType = keyof typeof errors;
export type MessageType = (typeof errors)[ErrorType];

export function createError(error: ErrorType, status: number) {
  return NextResponse.json({ error, message: errors[error] }, { status });
}
