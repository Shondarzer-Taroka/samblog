// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';
// import { useAuthProvider } from '@/Providers/AuthProvider';

// type SocketContextType = {
//   socket: Socket | null;
//   isConnected: boolean;
// };

// const SocketContext = createContext<SocketContextType>({
//   socket: null,
//   isConnected: false,
// });

// export const useSocket = () => useContext(SocketContext);

// export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const { user } = useAuthProvider();

//   useEffect(() => {
//     if (!user?.token) return;

//    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:7700', {
//   withCredentials: true, // Important
//   reconnectionAttempts: 5,
//   reconnectionDelay: 5000,
// });


//     socketInstance.on('connect', () => {
//       setIsConnected(true);
//       console.log('Socket connected');
//     });

//     socketInstance.on('disconnect', () => {
//       setIsConnected(false);
//       console.log('Socket disconnected');
//     });

//     socketInstance.on('connect_error', (err) => {
//       console.error('Socket connection error:', err);
//     });

//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, [user?.token]);

//   return (
//     <SocketContext.Provider value={{ socket, isConnected }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };










// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';
// import { useAuthProvider } from '@/Providers/AuthProvider';

// type SocketContextType = {
//     socket: Socket | null;
//     isConnected: boolean;
// };

// const SocketContext = createContext<SocketContextType>({
//     socket: null,
//     isConnected: false,
// });

// export const useSocket = () => useContext(SocketContext);

// export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
//     const [socket, setSocket] = useState<Socket | null>(null);
//     const [isConnected, setIsConnected] = useState(false);
//     const { user } = useAuthProvider();

//     useEffect(() => {



//         const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:7700', {
//             withCredentials: true, // Important
//             reconnectionAttempts: 5,
//             reconnectionDelay: 5000,
//         });

//         socketInstance.on('connect', () => {
//             setIsConnected(true);
//         });

//         socketInstance.on('disconnect', () => {
//             setIsConnected(false);
//         });

//         setSocket(socketInstance);

//         return () => {
//             socketInstance.disconnect();
//         };
//     }, [user?.token]);

//     return (
//         <SocketContext.Provider value={{ socket, isConnected }}>
//             {children}
//         </SocketContext.Provider>
//     );
// };












'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthProvider } from '@/Providers/AuthProvider';

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuthProvider();

  useEffect(() => {
    if (!user?.token) return;

    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:7700', {
      auth: {
        token: user.token,
      },
      withCredentials: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 5000,
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
      socketInstance.emit('join_user_room', user.id);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [user?.token]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};