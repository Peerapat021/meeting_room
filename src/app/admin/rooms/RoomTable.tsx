"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import { updateRoom } from "@/lib/services/rooms/put";
import { deleteRoom } from "@/lib/services/rooms/delete";
import { createRoom } from "@/lib/services/rooms/post";
import { Getroom } from "@/lib/services/rooms/get";
import { useState, useEffect } from "react";
import "@/app/globals.css";

export default function RoomTable({ rooms }: { rooms: any[] }) {
  const [roomData, setRoomData] = useState(rooms); // state หลักสำหรับ render ตาราง
  const [editingRoom, setEditingRoom] = useState<any | null>(null);
  const [deletingRoom, setDeletingRoom] = useState<any | null>(null);
  const [creatingRoom, setCreatingRoom] = useState(false);

  // สำหรับฟอร์มสร้าง room
  const [newRoomData, setNewRoomData] = useState({
    name: "",
    location: "",
    capacity: "", // string เพื่อป้องกัน NaN
  });

  // สำหรับฟอร์มแก้ไข
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "", // string เช่นกัน
  });

  // -----------------
  // Fetch Rooms
  // -----------------
  const fetchRooms = async () => {
    try {
      const data = await Getroom();
      setRoomData(data);
    } catch (err) {
      console.error("ไม่สามารถโหลดห้องได้", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // -----------------
  // Modal Control
  // -----------------
  const openCreateModal = () => setCreatingRoom(true);
  const closeCreateModal = () => setCreatingRoom(false);

  const openEditModal = (room: any) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      location: room.location,
      capacity: room.capacity.toString(),
    });
  };

  const closeModal = () => setEditingRoom(null);

  const openDeleteModal = (room: any) => setDeletingRoom(room);
  const closeDeleteModal = () => setDeletingRoom(null);

  // -----------------
  // Create Room
  // -----------------
  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRoom({
        ...newRoomData,
        capacity: Number(newRoomData.capacity),
      });
      await fetchRooms(); // โหลดข้อมูลล่าสุดหลังสร้าง
      closeCreateModal();
      setNewRoomData({ name: "", location: "", capacity: "" });
    } catch (err) {
      console.error("Error creating room:", err);
      alert("ไม่สามารถสร้าง room ได้");
    }
  };

  // -----------------
  // Update Room
  // -----------------
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoom) return;

    try {
      await updateRoom({
        id: editingRoom.id,
        name: formData.name,
        location: formData.location,
        capacity: Number(formData.capacity),
      });
      await fetchRooms(); // โหลดข้อมูลล่าสุดหลังแก้ไข
      closeModal();
    } catch (err) {
      console.error("Error updating room:", err);
      alert("ไม่สามารถอัปเดตข้อมูลห้องได้");
    }
  };

  // -----------------
  // Delete Room
  // -----------------
  const confirmDelete = async () => {
    if (!deletingRoom) return;

    try {
      await deleteRoom({ id: deletingRoom.id });
      await fetchRooms(); // โหลดข้อมูลล่าสุดหลังลบ
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting room:", err);
      alert("ไม่สามารถลบห้องได้");
    }
  };

  // -----------------
  // Render
  // -----------------
  return (
    <div>
      <div className="relative overflow-x-auto">
        <div className="text-end">
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-green-500 text-white rounded mb-4"
          >
            เพิ่ม Room
          </button>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Room Name</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Capacity</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roomData.map(room => (
              <tr
                key={room.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <td className="px-6 py-4">{room.name}</td>
                <td className="px-6 py-4">{room.location}</td>
                <td className="px-6 py-4">{room.capacity}</td>
                <td className="px-6 py-4 flex gap-4 justify-center">
                  <button onClick={() => openEditModal(room)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => openDeleteModal(room)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Create */}
      {creatingRoom && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">สร้าง Room ใหม่</h2>
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <input
                type="text"
                placeholder="ชื่อห้อง"
                value={newRoomData.name}
                onChange={e =>
                  setNewRoomData({ ...newRoomData, name: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
              <input
                type="text"
                placeholder="ตำแหน่งที่ตั้ง"
                value={newRoomData.location}
                onChange={e =>
                  setNewRoomData({ ...newRoomData, location: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
              <input
                type="number"
                placeholder="ความจุ"
                value={newRoomData.capacity}
                onChange={e =>
                  setNewRoomData({ ...newRoomData, capacity: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={closeCreateModal}
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

      {/* Modal Edit */}
      {editingRoom && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">แก้ไข Room</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                placeholder="ชื่อห้อง"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
              <input
                type="text"
                placeholder="ตำแหน่งที่ตั้ง"
                value={formData.location}
                onChange={e =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
              <input
                type="number"
                placeholder="ความจุ"
                value={formData.capacity}
                onChange={e =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
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

      {/* Modal Delete */}
      {deletingRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-sm shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-red-600">
              ยืนยันการลบ
            </h2>
            <p className="mb-6">
              คุณต้องการลบห้อง{" "}
              <span className="font-semibold">{deletingRoom.name}</span> หรือไม่?
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
  );
}
