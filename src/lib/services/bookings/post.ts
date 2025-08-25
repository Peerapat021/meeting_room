// lib/services/bookings/post.ts

export async function createBooking(data: {
    title: string;
    start_time: string;
    end_time: string;
    room_id: number;
    status: string;
}) {
    const res = await fetch(`/api/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error("ไม่สามารถสร้าง booking ได้");
    }

    return res.json();
}
