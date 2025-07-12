// src/app/admin/layout.tsx
import { ReactNode } from 'react';

export const metadata = {
  title: 'แอดมิน - ระบบจองห้อง',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '200px', background: '#eee', padding: '1rem' }}>
        <h2>เมนูแอดมิน</h2>
        <ul>
          <li><a href="/admin">แดชบอร์ด</a></li>
          <li><a href="/admin/rooms">จัดการห้อง</a></li>
          <li><a href="/admin/bookings">การจอง</a></li>
        </ul>
      </aside>
      <main style={{ flex: 1, padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
}
