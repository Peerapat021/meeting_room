
export async function Getroom() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rooms`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลห้องได้');
  return res.json();
}


export async function Getbooking() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลห้องได้');
  return res.json();
}
