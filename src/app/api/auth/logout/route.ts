import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' })
  
  response.cookies.delete('refreshToken')
  response.cookies.delete('accessToken')

  return response
}