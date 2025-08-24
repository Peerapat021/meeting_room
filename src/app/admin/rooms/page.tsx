// app/admin/page.tsx
import { Getroom } from "@/lib/services/rooms/get";
import RoomTable from "@/app/admin/rooms/RoomTable"; 

export default async function AdminRooms() {
  const rooms = await Getroom();

  return (
    <section className="">
      <h2 className="text-xl font-bold mb-4">📋 Rooms</h2>
      <RoomTable rooms={rooms} />
    </section>
  );
}
