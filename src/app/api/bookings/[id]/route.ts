//src/app/api/bookings/[id]/route.ts
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2/promise";

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
    const { status, } = await req.json();
    if (![status].every(Boolean)) return new Response("Missing fields", { status: 400 });

    const [result] = await db.query<ResultSetHeader>(
      "UPDATE bookings SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) return new Response("Booking not found", { status: 404 });

    return new Response(JSON.stringify({ message: "Booking updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Update error:", error);
    return new Response("Error updating booking", { status: 500 });
  }
}

export async function DELETE(  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUser(req);
  if (!user || user.role !== "admin") return new Response("Unauthorized", { status: 403 });

  const {id} = await params;
  if (!id || isNaN(Number(id))) return new Response("Invalid id", { status: 400 });

  try {
    const [result] = await db.query<ResultSetHeader>(
      "DELETE FROM bookings WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) return new Response("Booking not found", { status: 404 });

    return new Response(JSON.stringify({ message: "Booking deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Delete error:", error);
    return new Response("Error deleting booking", { status: 500 });
  }
}
