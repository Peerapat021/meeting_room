"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaUser, FaHome, FaDoorOpen, FaBook } from "react-icons/fa";
import SignOutButton from "./SignOutButton";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: <FaHome /> },
  { name: "Rooms", href: "/admin/rooms", icon: <FaDoorOpen /> },
  { name: "Bookings", href: "/admin/bookings", icon: <FaBook /> },
  { name: "Users", href: "/admin/users", icon: <FaUser /> },
];

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ปุ่ม Toggle สำหรับมือถือ - Fixed ไว้ที่มุมซ้ายบน */}
      <button
        className="fixed top-4 left-4 z-50 sm:hidden p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars size={20} />
      </button>

      {/* Overlay สำหรับปิด Sidebar เมื่อคลิกข้างนอก */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <div className="flex flex-col h-full px-4 py-6">
          {/* Logo / Title */}
          <div className="mb-8 mt-12 sm:mt-0 ">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Admin Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ระบบจัดการห้อง
            </p>
          </div>

          {/* Menu */}
          <ul className="space-y-2 font-medium flex-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-semibold"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <hr className="my-4 border-gray-300 dark:border-gray-700" />

          {/* User Info */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
            <FaUser className="text-gray-600 dark:text-gray-300" />
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Admin
              </p>
            </div>
          </div>

          {/* Sign Out */}
          <div className="mt-4">
            <SignOutButton />
          </div>
        </div>
      </aside>
    </>
  );
}