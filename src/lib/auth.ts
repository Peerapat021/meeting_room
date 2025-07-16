//src/lib/auth.ts

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// ฟังก์ชันที่ใช้ดึงข้อมูล user จาก session
export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user ?? null
}
