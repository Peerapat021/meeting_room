// app/admin/page.tsx
import { Getroom } from "@/lib/services/get";
import RoomTable from "@/app/admin/rooms/RoomTable"; 

export default async function AdminRooms() {
  const rooms = await Getroom();

  return (
    <section className="mt-8 mx-12">
      <h2 className="text-xl font-bold mb-4">📋 Rooms</h2>
      <RoomTable rooms={rooms} />
    </section>
  );
}
