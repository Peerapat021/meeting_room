
// lib/services/bookings/get.ts

export async function Getbooking() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลห้องได้');
  return res.json();
}

export async function GetbookingLimit(limit: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings?limit=${limit}`,
    { cache: 'no-store' }
  );

  if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลการจองได้');
  return res.json();
}

