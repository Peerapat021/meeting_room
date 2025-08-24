import { getCurrentUser } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import "../globals.css";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Sidebar from "./Sidebar";

export const metadata = {
  title: "แอดมิน - ระบบจองห้อง",
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  const user = await getCurrentUser();

  // ป้องกันคนที่ไม่ได้ login หรือไม่ใช่ admin
  if (!session || session.user?.role !== "admin") {
    redirect("/");
  }
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar user={session.user} />

      {/* Main Content */}
      <main className="flex-1 sm:ml-64 p-5 pt-[4rem] md:p-8">
        <div className="">{children}</div>
      </main>
    </div>
  );
}
