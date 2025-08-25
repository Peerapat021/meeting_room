// lib/services/bookings/post.ts

export async function createRoom(data: {
    name: string;
    location: string;
    capacity: number;
}) {
    const res = await fetch(`/api/rooms`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error("ไม่สามารถสร้าง room ได้");
    }

    return res.json();
}
