//src/app/api/rooms/[id]/route.ts
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2/promise";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// ตัวอย่าง mock session / auth
async function getUser(req: NextRequest) {
  // แทนที่ด้วยระบบ auth จริง
  return { role: "admin" };
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUser(req);
  if (!user || user.role !== "admin") return new Response("Unauthorized", { status: 403 });

  const { id } = await params;
  if (!id || isNaN(Number(id))) return new Response("Invalid id", { status: 400 });

  try {
    const { name, location, capacity } = await req.json();
    if (![name, location, capacity].every(Boolean)) return new Response("Missing fields", { status: 400 });

    const [result] = await db.query<ResultSetHeader>(
      "UPDATE rooms SET name = ?, location = ?, capacity = ? WHERE id = ?",
      [name, location, capacity, id]
    );

    if (result.affectedRows === 0) return new Response("Room not found", { status: 404 });

    return new Response(JSON.stringify({ message: "Room updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Update error:", error);
    return new Response("Error updating room", { status: 500 });
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
    let query = "DELETE FROM rooms WHERE id = ?";
    let values: any[] = [id];

    if (session.user.role !== "admin") {
      // ถ้าเป็น user → ลบได้เฉพาะ booking ของตัวเอง
      query += " AND user_id = ?";
      values.push(session.user.id);
    }

    const [result] = await db.query<ResultSetHeader>(query, values);

    if (result.affectedRows === 0) {
      return new Response("Room not found or no permission", { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Room deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Delete error:", error);
    return new Response("Error deleting Room", { status: 500 });
  }
}

