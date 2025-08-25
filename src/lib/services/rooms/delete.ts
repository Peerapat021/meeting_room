// lib/services/bookings/delete.ts

export async function deleteRoom({ id }: {
    id: number;
}) {
    const res = await fetch(`/api/rooms/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) throw new Error('ไม่สามารถลบข้อมูลการจองได้');

    return res.json();
}