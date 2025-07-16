'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      // ถ้า login แล้ว redirect ตาม role
      const role = session?.user?.role
      if (role === 'admin') {
        router.replace('/admin')
      } else {
        router.replace('/')
      }
    }
  }, [status, session, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (res?.ok) {
      // signIn เรียบร้อยแล้ว session จะอัปเดตโดยอัตโนมัติจาก useSession hook และ useEffect จะจัดการ redirect
    } else {
      alert('Login failed')
    }
  }

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <form onSubmit={handleSubmit} className='bg-red-500 shadow-lg border-none rounded-lg p-4 flex flex-col gap-3 max-w-sm mx-auto'>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        required
        className="p-2 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="p-2 rounded"
      />
      <button type="submit" className="bg-white text-red-500 font-semibold py-2 rounded hover:bg-red-600 hover:text-white transition">
        Login
      </button>
    </form>
  )
}
