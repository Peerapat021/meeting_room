import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2/promise";
import { Booking } from "@/lib/types/booking";

export async function GET() {
  try {
    const [rows] = await db.query<Booking[] & RowDataPacket[]>(`    SELECT 
      b.id, b.title, b.start_time, b.end_time, b.status,
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
