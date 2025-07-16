//src/lib/next-auth.d.ts

import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      role?: string // เพิ่ม role ที่นี่
    }
  }

  interface User {
    role?: string
  }
}
