
// lib/services/users/get.ts
export async function Getuser() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลผู้ใช้ได้');
    return res.json();
  }
  
  
  