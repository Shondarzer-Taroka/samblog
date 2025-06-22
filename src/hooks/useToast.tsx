import { ToastType } from '@/share/Toast';
import { useState, useCallback } from 'react';


export interface ToastState {
  type: ToastType;
  message: string;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((type: ToastType, message: string, duration = 3000) => {
    setToast({ type, message });

    setTimeout(() => {
      setToast(null);
    }, duration);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return { toast, showToast, hideToast };
};
