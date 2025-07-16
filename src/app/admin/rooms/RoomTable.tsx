"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import { updateRoom } from "@/lib/services/put";
import { useState } from "react";
import "@/app/globals.css"

export default function RoomTable({ rooms }: { rooms: any[] }) {
  const [roomData, setRoomData] = useState(rooms);
  const [editingRoom, setEditingRoom] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
  });

  const openEditModal = (room: any) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      location: room.location,
      capacity: room.capacity.toString(),
    });
  };

  const closeModal = () => {
    setEditingRoom(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await updateRoom({
        id: editingRoom.id,
        name: formData.name,
        location: formData.location,
        capacity: parseInt(formData.capacity),
      });

      setRoomData((prev) =>
        prev.map((r) =>
          r.id === editingRoom.id ? { ...r, ...formData, capacity: parseInt(formData.capacity) } : r
        )
      );
      closeModal();
    } catch (err) {
      alert("ไม่สามารถอัปเดตข้อมูลห้องได้");
    }
  };

  return (
    <div>


      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                room name
              </th>
              <th scope="col" className="px-6 py-3">
                location
              </th>
              <th scope="col" className="px-6 py-3">
                capacity
              </th>
              <th scope="col" className="px-6 py-3">
                mn
              </th>
            </tr>
          </thead>
          <tbody>
            {roomData.map((rooms) => (
              <tr key={rooms.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4">
                  {rooms.name}
                </td>
                <td className="px-6 py-4">
                  {rooms.location}
                </td>
                <td className="px-6 py-4">
                  {rooms.capacity}
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => openEditModal(rooms)}> <FaEdit /></button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

      {/* ✨ Modal แก้ไขข้อมูล */}
      {editingRoom && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">แก้ไขข้อมูลห้อง</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">ชื่อห้อง</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">ที่ตั้ง</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">ความจุ</label>
                <input
                  type="number"
                  className="w-full border rounded p-2"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={closeModal}
                >
                  ยกเลิก
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
