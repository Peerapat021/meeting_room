import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function Home() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }


  return <>
    <h1>👋 สวัสดีคุณ {(session.user as any).name}</h1>
    <h1>ยินดีต้อนรับสู่เว็บไซต์ของฉัน!</h1>
  </>;
}
