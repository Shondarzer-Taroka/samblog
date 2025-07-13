



import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl
  const protectedPaths = ['/news/dashboard']
  const isProtected = protectedPaths.some(path => pathname.startsWith(path))

  // Debug logging - check what's happening in Vercel logs
  console.log(`Middleware triggered for ${pathname}`)
  console.log('Cookies:', request.cookies.getAll())

  if (!isProtected) return NextResponse.next()

  const refreshToken = request.cookies.get('refreshToken')?.value

  if (!refreshToken) {
    console.log('No refreshToken found, redirecting to login')
    const loginUrl = new URL('/login', origin)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  try {
    const verifyUrl = new URL('/api/verify-token', origin)
    const verifyResponse = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: refreshToken }),
    })

    if (!verifyResponse.ok) throw new Error('Verification failed')
    
    const { valid } = await verifyResponse.json()
    if (!valid) throw new Error('Invalid token')

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    const loginUrl = new URL('/login', origin)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: ['/news/dashboard/:path*'],
}