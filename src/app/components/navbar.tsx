'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Nav() {
  const { data: session } = useSession();

  return (
    <nav style={{ padding: '1rem', background: '#eee', display: 'flex', alignItems: 'center' }}>
      <Link href="/" style={{ marginRight: '1rem' }}>หน้าแรก</Link>
      <Link href="/about" style={{ marginRight: 'auto' }}>เกี่ยวกับเรา</Link>

      {session?.user ? (
        <>
          <span style={{ marginRight: '1rem' }}>👋 {session.user.name}</span>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#f87171', // สีแดงอ่อน
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
          >
            ออกจากระบบ
          </button>
        </>
      ) : (
        <Link href="/login" style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', borderRadius: '0.25rem', textDecoration: 'none' }}>
          เข้าสู่ระบบ
        </Link>
      )}
    </nav>
  );
}
