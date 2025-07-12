// app/Nav.tsx
'use client'; // ใช้สำหรับ Client Component

import Link from 'next/link';

export default function Nav() {
  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link href="/" style={{ marginRight: '1rem' }}>หน้าแรก</Link>
      <Link href="/about">เกี่ยวกับเรา</Link>
    </nav>
  );
}
