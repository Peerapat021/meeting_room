// lib/services/users/delete.ts

export async function deleteuser({ id }: {
    id: number;
}) {
    const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) throw new Error('ไม่สามารถลบข้อมูลการจองได้');

    return res.json();
}