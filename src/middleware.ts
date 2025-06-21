import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const protectedRoutes = ['/dashboard', '/coach']
  const publicRoutes = ['/', '/login', '/register', '/test-layout', '/test-mobile']
  
  const { pathname } = request.nextUrl
  
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  if (isProtectedRoute) {
    // Usa la stessa chiave del nostro localStorage
    const token = request.cookies.get('qcoach_auth_tokens')?.value
    
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
