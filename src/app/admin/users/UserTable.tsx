"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import { updateuser } from "@/lib/services/users/put";
import { deleteuser } from "@/lib/services/users/delete";
import { createuser } from "@/lib/services/users/post";
import { Getuser } from "@/lib/services/users/get";
import { useState, useEffect } from "react";
import "@/app/globals.css";

export default function RoomTable({ users }: { users: any[] }) {
  const [userData, setUserData] = useState(users); // state หลักสำหรับ render ตาราง
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [deletingUser, setDeletingUser] = useState<any | null>(null);
  const [creatingUser, setCreatingUser] = useState(false);

  // สำหรับฟอร์มสร้าง room
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    password: "", 
  });

  // สำหรับฟอร์มแก้ไข
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "", 
  });

  // -----------------
  // Fetch Rooms
  // -----------------
  const fetchUsers = async () => {
    try {
      const data = await Getuser();
      setUserData(data);
    } catch (err) {
      console.error("ไม่สามารถโหลดห้องได้", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // -----------------
  // Modal Control
  // -----------------
  const openCreateModal = () => setCreatingUser(true);
  const closeCreateModal = () => setCreatingUser(false);

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  };

  const closeModal = () => setEditingUser(null);

  const openDeleteModal = (user: any) => setDeletingUser(user);
  const closeDeleteModal = () => setDeletingUser(null);

  // -----------------
  // Create Room
  // -----------------
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createuser({
        ...newUserData,
        
      });
      await fetchUsers(); // โหลดข้อมูลล่าสุดหลังสร้าง
      closeCreateModal();
      setNewUserData({ name: "", email: "", password: "" });
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
    if (!editingUser) return;

    try {
      await updateuser({
        id: editingUser.id,
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      await fetchUsers(); // โหลดข้อมูลล่าสุดหลังแก้ไข
      closeModal();
    } catch (err) {
      console.error("Error updating room:", err);
      alert("ไม่สามารถอัปเดตข้อมูลห้องได้");
    }
  };

  // -----------------
  // Delete Room
  // -----------------
  const confirmDelete = async ( ) => {
    if (!deletingUser) return;

    try {
      await deleteuser({ id: deletingUser.id });
      await fetchUsers(); // โหลดข้อมูลล่าสุดหลังลบ
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
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Password</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map(user => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.password}</td>
                <td className="px-6 py-4 flex gap-4 justify-center">
                  <button onClick={() => openEditModal(user)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => openDeleteModal(user)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Create */}
      {creatingUser && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">สร้าง Room ใหม่</h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <input
                type="text"
                placeholder="ชื่อผู้ใช้"
                value={newUserData.name}
                onChange={e =>
                  setNewUserData({ ...newUserData, name: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
              <input
                type="text"
                placeholder="อีเมล"
                value={newUserData.email}
                onChange={e =>
                  setNewUserData({ ...newUserData, email: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
              <input
                type="number"
                placeholder="รหัสผ่าน"
                value={newUserData.password}
                onChange={e =>
                  setNewUserData({ ...newUserData, password: e.target.value })
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
      {editingUser && (
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
                placeholder="อีเมล"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
              <input
                type="number"
                placeholder="รหัสผ่าน"
                value={formData.password}
                onChange={e =>
                  setFormData({ ...formData, password: e.target.value })
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
      {deletingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-sm shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-red-600">
              ยืนยันการลบ
            </h2>
            <p className="mb-6">
              คุณต้องการลบผู้ใช้{"   "}
              <span className="font-semibold">{deletingUser.name}</span> หรือไม่?
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
