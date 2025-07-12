export async function updateRoom({ id, name, location, capacity }: {
  id: number;
  name: string;
  location: string;
  capacity: number;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rooms`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name, location, capacity }),
  });

  if (!res.ok) {
    throw new Error('ไม่สามารถอัปเดตข้อมูลห้องได้');
  }

  return res.json();
}
