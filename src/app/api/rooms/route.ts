import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2/promise";
import { NextRequest } from "next/server";
import { Room } from "@/lib/types/room";

export async function GET() {
  try {
    const [rows] = await db.query<Room[] & RowDataPacket[]>('SELECT * FROM rooms');
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Error querying database', { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    const { id, name, location, capacity } = await req.json();

    if (!id || !name || !location || !capacity) {
      return new Response("Missing required fields", { status: 400 });
    }

    const [result] = await db.query<Room[] & RowDataPacket[]>(
      `UPDATE rooms SET name = ?, location = ?, capacity = ? WHERE id = ?`,
      [name, location, capacity, id]
    );

    return new Response(JSON.stringify({ message: "Room updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Update error:", error);
    return new Response("Error updating room", { status: 500 });
  }
}