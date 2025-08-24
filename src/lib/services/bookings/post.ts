// lib/services/booking.ts
export async function createBooking(data: {
    title: string;
    start_time: string;
    end_time: string;
    room_id: number;
    user_id: number;
    status: string;
}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("ไม่สามารถสร้าง booking ได้");
    }

    return res.json();
}
