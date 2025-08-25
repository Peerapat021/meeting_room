// src/lib/next-auth.d.ts
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: number
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
    }
  }

  interface User {
    id: number
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number
    role: string
  }
}