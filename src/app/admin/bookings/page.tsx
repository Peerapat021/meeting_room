import React from 'react'
import { Getbooking } from "@/lib/services/bookings/get";
import BookingTable from "@/app/admin/bookings/BookingTable";

export default async function AdminBookings() {
  const bookings = await Getbooking();
  return <section className="">
    <h2 className="text-xl font-bold mb-4">📋 Bookings</h2>
    <BookingTable bookings={bookings} />
  </section>
}
