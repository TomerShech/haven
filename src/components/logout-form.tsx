"use client";

import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const router = useRouter();

  return (
    <form
      action="/api/logout"
      method="post"
      onSubmit={async (event) => {
        event.preventDefault();
        const response = await fetch("/api/logout", {
          method: "POST",
          redirect: "manual",
        });

        if (response.status === 0) {
          return router.refresh();
        }
      }}
    >
      <button type="submit">התנתקות</button>
    </form>
  );
}
