//src/app/api/rooms/route.ts
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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

export async function POST(req: NextRequest) {
  try {
    // ดึง session ของ user ที่ login
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { name, location, capacity } = await req.json();

    if (!name || !location || capacity) {
      return new Response("Missing fields", { status: 400 });
    }

    
  } catch (err) {
    console.error(err);
    return new Response("Error creating roome", { status: 500 });
  }
}