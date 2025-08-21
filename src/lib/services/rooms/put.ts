export async function updateRoom({ id, name, location, capacity }: {
  id: number;
  name: string;
  location: string;
  capacity: number;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rooms/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, location, capacity }), // id ไม่ต้องส่งใน body
  });

  if (!res.ok) throw new Error('ไม่สามารถอัปเดตข้อมูลห้องได้');

  return res.json();
}
