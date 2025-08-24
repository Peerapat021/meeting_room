import { db } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { Booking } from "@/lib/types/booking";
import { NextRequest } from "next/server";

async function getUser(req: NextRequest) {
  // แทนที่ด้วยระบบ auth จริง
  return { role: "admin" };
}

export async function GET() {
  try {
    const [rows] = await db.query<Booking[] & RowDataPacket[]>(`    SELECT 
      b.id, b.title, b.start_time, b.end_time, b.status, b.created_at,
      r.name AS room_name,
      u.name AS user_name
    FROM bookings b
    JOIN rooms r ON b.room_id = r.id
    JOIN users u ON b.user_id = u.id
    ORDER BY b.start_time DESC`);
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Error querying database', { status: 500 });
  }
}


export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser(req);
  if (!user || user.role !== "admin") return new Response("Unauthorized", { status: 403 });

  const { id } = await params;
  if (!id || isNaN(Number(id))) return new Response("Invalid id", { status: 400 });
  try {
    const { title, start_time, end_time, room_id, user_id, status } = await req.json();

    if (!title || !start_time || !end_time || !room_id || !user_id || !status) {
      return new Response("Missing Fields", { status: 400 });
    }

    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO bookings (title, start_time, end_time, room_id, user_id, status) VALUES (?, ?, ?, ?, ?, ?)",
      [title, start_time, end_time, room_id, user_id, status]
    )

    return new Response(JSON.stringify({ message: "Booking created", id: result.insertId }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response("Error creating booking", { status: 500 });
  }
}

