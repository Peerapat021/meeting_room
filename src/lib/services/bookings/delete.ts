export async function deleteBooking({ id }: {
    id: number;
}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) throw new Error('ไม่สามารถลบข้อมูลการจองได้');

    return res.json();
}