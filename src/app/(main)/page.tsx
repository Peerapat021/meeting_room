import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function HomePage() {
  const session = await getServerSession(authOptions)


  return (
    <div>
      ยินดีต้อนรับครับ
    </div>
  )
}
