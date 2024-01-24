/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./src/lib/auth/lucia").Auth;
  type DatabaseUserAttributes = {
    name: string;
    username: string;
    created_at?: Date;
  };
  type DatabaseSessionAttributes = {};
}
