// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const pathname = req.nextUrl.pathname

  const isLoggedIn = !!token
  const isAdmin = token?.role === 'admin'
  const isUser = token?.role === 'user'

  // ✅ ถ้ายังไม่ได้ login → ห้ามเข้าหน้า /, /admin, /(main)
  if (!isLoggedIn && (
      pathname === '/' ||
      pathname === '/about' ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/(main)')
  )) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // ✅ ถ้า login แล้ว เข้าหน้า login → redirect ออกไปหน้า / ตาม role
  if (isLoggedIn && pathname === '/login') {
    const redirectTo = isAdmin ? '/admin' : '/'
    return NextResponse.redirect(new URL(redirectTo, req.url))
  }

  // ✅ Admin เท่านั้นที่เข้า /admin ได้
  if (pathname.startsWith('/admin') && !isAdmin) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // ✅ User เท่านั้นที่เข้า /(main) ได้ (ถ้าใช้ folder structure แบบ App Router)
  if (pathname.startsWith('/(main)') && !isUser) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/admin/:path*', '/(main)/:path*'],
}
