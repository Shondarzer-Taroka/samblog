// import { NextResponse } from 'next/server'
// import jwt from 'jsonwebtoken'
// import { cookies } from 'next/headers'

// export async function POST(request: Request) {
//   try {
//     // Get token from either body or cookies
//     const { token } = await request.json()
//     const cookieStore = await cookies()
//     const refreshToken = token || cookieStore.get('refreshToken')?.value

//     if (!refreshToken) {
//       return NextResponse.json(
//         { valid: false, message: 'No token provided' },
//         { status: 401 }
//       )
//     }

//     // Verify token
//     const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
    
//     return NextResponse.json({
//       valid: true,
//       user: decoded
//     })
//   } catch (error) {
//     console.log(error);
    
//     return NextResponse.json(
//       { valid: false, message: 'Invalid token' },
//       { status: 401 }
//     )
//   }
// }















// // //  api 

// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import { cookies } from 'next/headers';

// export async function POST(request: Request) {
//   try {
//     // body may contain a token (optional)
//     const { token } = await request.json();

//     // ⬇️ cookies() is **NOT** a Promise – no await needed
//     const cookieStore = cookies();
//     const refreshToken =
//       token || (await cookieStore).get('refreshToken')?.value;

//     if (!refreshToken) {
//       return NextResponse.json(
//         { valid: false, message: 'No token provided' },
//         { status: 401 },
//       );
//     }

//     // Verify refresh token
//     const decoded = jwt.verify(
//       refreshToken,
//       process.env.REFRESH_TOKEN_SECRET as string,
//     );

//     return NextResponse.json({
//       valid: true,
//       user: decoded,
//     });
//   } catch (error) {
//     console.error('Token verification error:', error);
//     return NextResponse.json(
//       { valid: false, message: 'Invalid token' },
//       { status: 401 },
//     );
//   }
// }

















// // this is verify-token/route.ts

import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const token = body.token
     console.log(token,'token in frontend');
     
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string

    // If no token provided, return error
    if (!token) {
      return NextResponse.json(
        { valid: false, message: 'No token provided' },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET)
    return NextResponse.json({
      valid: true,
      user: decoded
    })
  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { valid: false, message: 'Invalid token' },
      { status: 401 }
    )
  }
}
