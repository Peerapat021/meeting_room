export async function updateBooking({id, status, }: {
  id: number;
  status: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }), // id ไม่ต้องส่งใน body
  });

  if (!res.ok) throw new Error('ไม่สามารถอนุมัติการจองได้');

  return res.json();
}
