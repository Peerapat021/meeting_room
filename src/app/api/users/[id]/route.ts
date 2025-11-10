//src/app/api/rooms/[id]/route.ts
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2/promise";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const user = await getServerSession(authOptions);
    if (!user || user.user.role !== "admin") return new Response("Unauthorized", { status: 403 });

    const { id } = await params;
    if (!id || isNaN(Number(id))) return new Response("Invalid id", { status: 400 });

    try {
        const { name, email, password } = await req.json();
        if (![name, email, password].every(Boolean)) return new Response("Missing fields", { status: 400 });

        const [result] = await db.query<ResultSetHeader>(
            "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
            [name, email, password, id]
        );

        if (result.affectedRows === 0) return new Response("User not found", { status: 404 });

        return new Response(JSON.stringify({ message: "User updated successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Update error:", error);
        return new Response("Error updating user", { status: 500 });
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
      let query = "DELETE FROM users WHERE id = ?";
      let values: any[] = [id];
  
      const [result] = await db.query<ResultSetHeader>(query, values);
  
      if (result.affectedRows === 0) {
        return new Response("User not found or no permission", { status: 404 });
      }
  
      return new Response(JSON.stringify({ message: "User deleted successfully" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Delete error:", error);
      return new Response("Error deleting user", { status: 500 });
    }
  }
  