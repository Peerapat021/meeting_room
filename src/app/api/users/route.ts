//src/app/api/rooms/route.ts
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/lib/types/user";

export async function GET() {
    try {
        const [rows] = await db.query<User[] & RowDataPacket[]>("SELECT * FROM users");
        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Get users error:", error);
        return new Response("ไม่สามารถโหลดข้อมูลผู้ใช้ได้", { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        // ดึง session ของผู้ที่เรียก API
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return new Response("Unauthorized", { status: 401 });
        }

        // ตรวจว่า role เป็น admin หรือไม่
        if (session.user.role !== "admin") {
            return new Response("Forbidden", { status: 403 });
        }

        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return new Response("Missing Fields", { status: 400 });
        }

        const defaultRole = 'user';

        const [result] = await db.query<ResultSetHeader>(
            "INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?)",
            [name, email, password, defaultRole, new Date().toISOString()]
        );

        return new Response(
            JSON.stringify({ message: "Users created", id: result.insertId }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error(err);
        return new Response("Error creating Users", { status: 500 });
    }
}