import { Getroom, Getbooking } from '@/lib/services/get';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // ✅ ป้องกันคนที่ไม่ได้ login หรือไม่ใช่ admin
  if (!session || session.user?.role !== 'admin') {
    redirect('/'); // หรือ redirect('/login')
  }

  const rooms = await Getroom();
  const bookings = await Getbooking();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {/* 
      <p className="mb-4">
        👋 สวัสดีคุณ <strong>{session.user.name}</strong>
      </p> 
      */}

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">📋 ห้องประชุมทั้งหมด</h2>
        <ul className="list-disc list-inside space-y-2">
          {(rooms as any[]).map((room) => (
            <li key={room.id} className="text-gray-700">
              {room.name} - {room.location} ({room.capacity} คน)
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">📅 รายการจองล่าสุด</h2>
        <ul className="space-y-4">
          {(bookings as any[]).map((b) => (
            <li key={b.id} className="bg-white p-4 rounded shadow-sm border border-gray-200">
              <p className="font-medium">{b.title} โดย {b.user_name} ห้อง {b.room_name}</p>
              <p className="text-sm text-gray-600">
                เวลา: {new Date(b.start_time).toLocaleString()} - {new Date(b.end_time).toLocaleString()}
              </p>
              <p className="text-sm font-semibold mt-1">สถานะ: <span className="capitalize">{b.status}</span></p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
