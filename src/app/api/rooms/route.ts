//src/app/api/rooms/route.ts
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Room } from "@/lib/types/room";

// ตัวอย่าง mock session / auth
async function getUser(req: NextRequest) {
  // แทนที่ด้วยระบบ auth จริง
  return { role: "admin" };
}

export async function GET() {
  try {
    const [rows] = await db.query<Room[] & RowDataPacket[]>("SELECT * FROM rooms");
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Get rooms error:", error);
    return new Response("ไม่สามารถโหลดข้อมูลห้องได้", { status: 500 });
  }
}

