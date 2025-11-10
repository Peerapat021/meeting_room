import { Getroom } from '@/lib/services/rooms/get';
import { GetbookingLimit } from "@/lib/services/bookings/get";
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'admin') {
    redirect('/');
  }

  const rooms = await Getroom();
  const bookings = await GetbookingLimit(3);

  return (
    <main className="">
      {/* <h1 className=" text-4xl font-extrabold mb-8 text-gray-800">Admin Dashboard</h1> */}

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">📅 รายการจองล่าสุด</h2>
        <div className="flex flex-cols-1 sm:flex-cols-2 md:flex-cols-3 lg:flex-cols-4 gap-6">
          {(bookings as any[]).map((b) => (
            <div
              key={b.id}
              className="bg-white p-5 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <p className="font-bold text-lg text-gray-800">{b.title}</p>
              <p className="text-gray-600 mt-1"><span className="font-medium">{b.user_name}</span></p>
              <p className="text-gray-600 mt-1"><span className="font-medium">{b.room_name}</span></p>
              <p className="text-sm text-gray-500 mt-2">
                เวลา: {new Date(b.start_time).toLocaleString()} - {new Date(b.end_time).toLocaleString()}
              </p>
              <p className="mt-3 text-sm font-semibold">
                สถานะ: <span className={`capitalize ${b.status === 'approved' ? 'text-green-600' : b.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>{b.status}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">📋 ห้องประชุมทั้งหมด</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(rooms as any[]).map((room) => (
            <div
              key={room.id}
              className="p-5 bg-white  shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="font-bold text-lg text-gray-800 mb-1">{room.name}</div>
              <div className="text-gray-600">อาคาร: {room.location}</div>
              <div className="text-gray-600 mt-1">ความจุ: <span className="font-medium">{room.capacity} คน</span></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
