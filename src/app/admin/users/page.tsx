// app/admin/users/page.tsx

import { Getuser } from "@/lib/services/users/get";
import UserTable from "@/app/admin/users/UserTable"; 

export default async function AdminUsers() {
  const users = await Getuser();

  return (
    <section className="">
      <h2 className="text-xl font-bold mb-4">📋 Users</h2>
      <UserTable users={users} />
    </section>
  );
}
