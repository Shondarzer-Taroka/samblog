// lib/auth.ts
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function getUserFromCookie() {
  const cookieStore = await cookies(); // ✅ Await here
  const token = cookieStore.get('refreshToken')?.value;
  console.log(token);

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as { id: string; name: string; email: string };
  } catch (error) {
    const err = error as Error
    console.log(err);

    return null;
  }
}
