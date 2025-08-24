"use client";

import React, { useState } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";
import { updateBooking } from "@/lib/services/bookings/put";
import { deleteBooking } from "@/lib/services/bookings/delete";
import { createBooking } from "@/lib/services/bookings/post";

export default function Booking_rooms({ bookings }: { bookings: any[] }) {
  const [bookingData, setBookingData] = useState(bookings);
  const [cratingBooking, setcreatingBooking] = useState<any | null>(null);
  const [editBooking, seteditBooking] = useState<any | null>(null);
  const [deletingBooking, setdeletingBooking] = useState<any | null>(null);
  const [formData, setFormdata] = useState({
    title: "",
    start_time: "",
    end_time: "",
    room_id: "",
    status: ""
  });

  // เปิดฟอร์มเพิ่ม
  const openCreateModal = (booking: any) => {
    setcreatingBooking(booking);
    setFormdata({
      title: booking.title,
      start_time: booking.start_time,
      end_time: booking.end_time,
      room_id: booking.room_id,
      status: booking.status
    });
  };

  const closeCreateModal = () => {
    setcreatingBooking(null);
  }

  const handleCreate = async (e: any) => {
    e.preventDefault();
    try {
      await updateBooking({
        id: cratingBooking.id,
        status: formData.status
      });


      setBookingData((prev) =>
        prev.map((b) =>
          b.id === cratingBooking.id ? { ...b, status: formData.status } : b
        )
      );

      closeModal();
    } catch (err) {
      alert('Can not CreateData');
    }
  };

  // เปิดฟอร์มแก้ไข
  const openEditModal = (booking: any) => {
    seteditBooking(booking);
    setFormdata({
      title: booking.title,
      start_time: booking.start_time,
      end_time: booking.end_time,
      room_id: booking.room_id,
      status: booking.status
    });
  };

  const closeModal = () => {
    seteditBooking(null);
  }

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      await updateBooking({
        id: editBooking.id,
        status: formData.status
      });


      setBookingData((prev) =>
        prev.map((b) =>
          b.id === editBooking.id ? { ...b, status: formData.status } : b
        )
      );

      closeModal();
    } catch (err) {
      alert('Can not editData');
    }
  };

  // เปิดฟอร์มลบ
  const openDeleteModal = (booking: any) => {
    setdeletingBooking(booking)
  };

  const closeDeleteModal = () => {
    setdeletingBooking(null);
  };

  const confirmDelete = async () => {
    if (!deletingBooking) return;

    try {
      await deleteBooking({ id: deletingBooking.id });
      setBookingData((prev) => prev.filter((booking) => booking.id !== deletingBooking.id));
      closeDeleteModal();
    } catch (err) {
      alert(" Can not delete record");
    }
  }

  return (
    <div>
      <div className=" relative overflow-x-auto max-w-full">
        <table className="min-w-[900px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope='col' className=' px-6 py-3'>รหัสการจอง</th>
              <th scope='col' className=' px-6 py-3'>รหัสผู้จอง</th>
              <th scope='col' className=' px-6 py-3'>รหัสห้อง</th>
              <th scope='col' className=' px-6 py-3'>ชื่อเรื่อง</th>
              <th scope='col' className=' px-6 py-3'>วันที่เริ่ม</th>
              <th scope='col' className=' px-6 py-3'>วันที่สิ้นสุด</th>
              <th scope='col' className=' px-6 py-3'>สถานะ</th>
              <th scope='col' className=' px-6 py-3'>วันที่ทำการจอง</th>
              <th scope='col' className=' px-6 py-3'>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {bookingData.map((booking) =>
              <tr
                key={booking.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4">{booking.id}</td>
                <td className="px-6 py-4">{booking.user_name}</td>
                <td className="px-6 py-4">{booking.room_name}</td>
                <td className="px-6 py-4">{booking.title}</td>
                <td className="px-6 py-4">
                  {new Date(booking.start_time).toISOString().slice(0, 19).replace('T', ' ')}
                </td>
                <td className="px-6 py-4">
                  {new Date(booking.end_time).toISOString().slice(0, 19).replace('T', ' ')}
                </td>
                <td className="px-6 py-4"><span className={`capitalize ${booking.status === 'approved' ? 'text-green-600' : booking.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>{booking.status}</span></td>

                <td className="px-6 py-4">
                  {new Date(booking.created_at).toISOString().slice(0, 19).replace('T', ' ')}
                </td>
                <td className="px-6 py-4 flex gap-4 items-center justify-center">
                  <button onClick={() => openEditModal(booking)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => openDeleteModal(booking)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal แก้ไขข้อมูล */}
      {editBooking && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">แก้ไขข้อมูลห้อง</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">สถานะการจอง</label>
                <select
                  className="w-full border rounded p-2"
                  value={formData.status}
                  onChange={(e) => setFormdata({ ...formData, status: e.target.value })}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={closeModal}
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Modal ลบข้อมูล */}
      {deletingBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-sm shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-red-600">ยืนยันการลบ</h2>
            <p className="mb-6">
              คุณต้องการลบห้อง{" "}
              <span className="font-semibold">{deletingBooking.name}</span> หรือไม่?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                ยกเลิก
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                ยืนยันลบ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
