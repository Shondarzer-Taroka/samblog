import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

export type ToastType = 'success' | 'error' | 'failed';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
}

const bgMap = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  failed: 'bg-yellow-500',
};

const iconMap = {
  success: <FaCheckCircle className="text-xl" />,
  error: <FaTimesCircle className="text-xl" />,
  failed: <FaExclamationTriangle className="text-xl" />,
};

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  return (
    <div className={`fixed top-6 right-6 px-4 py-3 rounded shadow-md flex items-center gap-3 text-white z-50 ${bgMap[type]} animate-fade`}>
      {iconMap[type]}
      <span>{message}</span>
      <button onClick={onClose} className="ml-auto text-lg font-bold">×</button>
    </div>
  );
};

export default Toast;
