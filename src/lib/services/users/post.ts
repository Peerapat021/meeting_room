// lib/services/users/post.ts

export async function createuser(data: {
    name: string;
    email: string;
    password: string;   
}) {
    const res = await fetch(`/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error("ไม่สามารถสร้าง user ได้");
    }

    return res.json();
}
