
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';
import { useAuthProvider } from '@/Providers/AuthProvider';

type SocketContextType = {
    socket: typeof Socket | null;
    isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<typeof Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const { user } = useAuthProvider();

    useEffect(() => {



        const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:7700', {
            reconnectionAttempts: 5,
            reconnectionDelay: 5000,
        });

        socketInstance.on('connect', () => {
            setIsConnected(true);
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