// src/app/api/bookings/[id]/route.ts
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2/promise";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  if (!id || isNaN(Number(id))) {
    return new Response("Invalid id", { status: 400 });
  }

  try {
    const { status } = await req.json();
    if (!status) return new Response("Missing fields", { status: 400 });

    // ตรวจสอบสิทธิ์
    let query = "UPDATE bookings SET status = ? WHERE id = ?";
    let values: any[] = [status, id];

    if (session.user.role !== "admin") {
      // ถ้าเป็น user → อนุญาตเฉพาะ booking ของตัวเอง
      query += " AND user_id = ?";
      values.push(session.user.id);
    }

    const [result] = await db.query<ResultSetHeader>(query, values);

    if (result.affectedRows === 0) {
      return new Response("Booking not found or no permission", { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Booking updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Update error:", error);
    return new Response("Error updating booking", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  if (!id || isNaN(Number(id))) {
    return new Response("Invalid id", { status: 400 });
  }

  try {
    // ตรวจสอบสิทธิ์
    let query = "DELETE FROM bookings WHERE id = ?";
    let values: any[] = [id];

    if (session.user.role !== "admin") {
      // ถ้าเป็น user → ลบได้เฉพาะ booking ของตัวเอง
      query += " AND user_id = ?";
      values.push(session.user.id);
    }

    const [result] = await db.query<ResultSetHeader>(query, values);

    if (result.affectedRows === 0) {
      return new Response("Booking not found or no permission", { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Booking deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Delete error:", error);
    return new Response("Error deleting booking", { status: 500 });
  }
}
