import { createAuthClient } from "better-auth/react";

export const authClient =
  createAuthClient({
    baseURL:
      "https://drivefleet-server-zqxb.onrender.com",
      // "http://localhost:5000",
  });