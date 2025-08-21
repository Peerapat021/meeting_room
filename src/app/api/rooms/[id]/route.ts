//src/app/api/rooms/[id]/route.ts
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2/promise";

// ตัวอย่าง mock session / auth
async function getUser(req: NextRequest) {
  // แทนที่ด้วยระบบ auth จริง
  return { role: "admin" };
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUser(req);
  if (!user || user.role !== "admin") return new Response("Unauthorized", { status: 403 });

  const id = params.id;
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUser(req);
  if (!user || user.role !== "admin") return new Response("Unauthorized", { status: 403 });

  const id = params.id;
  if (!id || isNaN(Number(id))) return new Response("Invalid id", { status: 400 });

  try {
    const [result] = await db.query<ResultSetHeader>(
      "DELETE FROM rooms WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) return new Response("Room not found", { status: 404 });

    return new Response(JSON.stringify({ message: "Room deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Delete error:", error);
    return new Response("Error deleting room", { status: 500 });
  }
}
