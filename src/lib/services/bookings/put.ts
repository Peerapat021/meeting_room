// lib/services/bookings/put.ts

export async function updateBooking({id, status}: {
  id: number;
  status: string;
}) {
  const res = await fetch(`/api/bookings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error('ไม่สามารถอนุมัติการจองได้');

  return res.json();
}