'use client';

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

export default function SignOutButton() {
  return (
    <button
      onClick={() => {
        if (confirm("คุณต้องการออกจากระบบหรือไม่?")) {
          signOut({ callbackUrl: '/login' });
        }
      }}
      className="flex items-center text-left w-full p-2 text-blue-600 rounded-lg 
                 hover:bg-red-100 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-700 transition"
      type="button"
    >
      <FiLogOut className="mr-2" />
      <span className="flex-1 ms-3 whitespace-nowrap">ออกจากระบบ</span>
    </button>
  );
}
