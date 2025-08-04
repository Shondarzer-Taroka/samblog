/* eslint-disable @typescript-eslint/no-unused-vars */
// // lib/auth.ts
// import jwt from 'jsonwebtoken';
// import { cookies } from 'next/headers';

// export async function getUserFromCookie() {
//   const cookieStore = await cookies(); // ✅ Await here
//   const token = cookieStore.get('refreshToken')?.value;
//   console.log(token,'tok in auth.ts');

//   if (!token) return null;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     return decoded as { id: string; name: string; email: string; role:string};
//   } catch (error) {
//     const err = error as Error
//     console.log(err);

//     return null;
//   }
// }













import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get('refreshToken')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as { id: string; name: string; email: string; role: string };
  } catch (error) {
    return null;
  }
}
