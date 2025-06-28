/* eslint-disable @typescript-eslint/no-unused-vars */
// import { NextResponse } from 'next/server'
// import { cookies } from 'next/headers'
// import jwt from 'jsonwebtoken'

// export async function GET() {
//   const cookieStore = await cookies()
//   const refreshToken = cookieStore.get('refreshToken')?.value

//   console.log(refreshToken,'ch');
  

//   if (!refreshToken) {
//     return NextResponse.json({ user: null }, { status: 401 })
//   }

//   try {
//     const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
//     return NextResponse.json({ user: decoded })
//   } catch (error) {
//     return NextResponse.json({ user: null }, { status: 401 })
//   }
// }










import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function GET() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refreshToken')?.value

  if (!refreshToken) {
    return NextResponse.json(
      { user: null, message: 'No refresh token found' },
      { status: 401 }
    )
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
    return NextResponse.json({ 
      user: decoded,
      message: 'Authentication successful'
    })
  } catch (error) {
    return NextResponse.json(
      { user: null, message: 'Invalid token' },
      { status: 401 }
    )
  }
}