// lib/services/rooms/delete.ts

export async function deleteRoom({ id}: {
  id: number;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rooms/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) throw new Error('ไม่สามารถลบข้อมูลห้องได้');

  return res.json();
}
