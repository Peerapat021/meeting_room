//src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import {db} from "@/lib/db"  // path ตามที่ตั้งไฟล์จริง

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {}
        if (!email || !password) return null

        // Query DB หา user ที่ตรงกับ email
        const [rows] = await db.query(
          "SELECT * FROM users WHERE email = ? LIMIT 1",
          [email]
        );

        const users = rows as any[]; // cast type for convenience
        if (users.length === 0) return null;

        const user = users[0];

        // ตรวจสอบ password ตรงกัน (ในตัวอย่างนี้ยังไม่ได้เข้ารหัสนะ)
        if (user.password !== password) return null;

        // ถ้าตรง ให้ return ข้อมูล user ที่ต้องการเก็บใน session
        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token?.role && session.user) {
        session.user.role = token.role as string
      }
      return session
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
