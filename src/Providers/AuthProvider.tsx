/* eslint-disable @typescript-eslint/no-explicit-any */


// 'use client';

// import { useEffect, useState } from 'react';

// export const useAuthProvider = () => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/logInUser`, {
//           method: 'GET',
//           credentials: 'include',
//         });

//         if (!res.ok) {
//           throw new Error('Failed to fetch user');
//         }

//         const data = await res.json();
//         setUser(data?.user || null);
//       } catch (err) {
//         console.error('Error fetching user:', err);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const logout = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/logout`, {
//         method: 'POST',
//         credentials: 'include',
//       });

//       if (!res.ok) {
//         throw new Error('Logout failed');
//       }

//       setUser(null);
//       console.log('Logged out successfully');
//     } catch (err) {
//       console.error('Error during logout:', err);
//     }
//   };

//   return { user, loading, logout };
// };












'use client';

import { useEffect, useState } from 'react';

export const useAuthProvider = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/logInUser`, {
        credentials: 'include',
      });
      const data = await res.json();
      setUser(data?.user || null);
    } catch (err) {
      console.error('Error fetching user:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  return { user, loading, logout };
};
