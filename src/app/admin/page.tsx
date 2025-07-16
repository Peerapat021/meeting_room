// src/app/admin/page.tsx

import { Getroom, Getbooking } from '@/lib/services/get';
import { getServerSession } from "next-auth";

export default async function AdminPage() {
  const rooms = await Getroom();
  const bookings = await Getbooking();


  return (
    <main style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>📋 ห้องประชุมทั้งหมด</h2>
        <ul>
          {(rooms as any[]).map((room) => (
            <li key={room.id}>
              {room.name} - {room.location} ({room.capacity} คน)
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>📅 รายการจองล่าสุด</h2>
        <ul>
          {(bookings as any[]).map((b) => (
            <li key={b.id}>
              {b.title} โดย {b.user_name} ห้อง {b.room_name}<br />
              เวลา: {new Date(b.start_time).toLocaleString()} - {new Date(b.end_time).toLocaleString()}
              <br />
              สถานะ: {b.status}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
