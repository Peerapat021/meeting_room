export type Booking = {
    id: number;
    title: string;
    room_name: string | Date;
    user_name: string | Date;
    start_time: string;
    end_time: string;
    status: string;
}