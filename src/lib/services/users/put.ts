// lib/services/users/put.ts

export async function updateuser({ id, name, email, password }: {
    id: number;
    name: string;
    email: string;
    password: string;
  }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }), // id ไม่ต้องส่งใน body
    });
  
    if (!res.ok) throw new Error('ไม่สามารถอัปเดตข้อมูลผู้ใช้ได้'); 
  
    return res.json();
  }
  