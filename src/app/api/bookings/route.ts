// src/app/api/bookings/route.ts
import { db } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { Booking } from "@/lib/types/booking";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const [rows] = await db.query<Booking[] & RowDataPacket[]>(`
      SELECT 
        b.id, b.title, b.start_time, b.end_time, b.status, b.created_at,
        r.name AS room_name,
        u.name AS user_name
      FROM bookings b
      JOIN rooms r ON b.room_id = r.id
      JOIN users u ON b.user_id = u.id
      ORDER BY b.start_time DESC
    `);
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Error querying database', { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    // ดึง session ของ user ที่ล็อกอิน
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { title, start_time, end_time, room_id, status } = await req.json();

    if (!title || !start_time || !end_time || !room_id || !status) {
      return new Response("Missing Fields", { status: 400 });
    }

    // ใช้ user.id จาก session 
    const userId = session.user.id;

    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO bookings (title, start_time, end_time, room_id, user_id, status) VALUES (?, ?, ?, ?, ?, ?)",
      [title, start_time, end_time, room_id, userId, status]
    );

    return new Response(
      JSON.stringify({ message: "Booking created", id: result.insertId }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response("Error creating booking", { status: 500 });
  }
}
