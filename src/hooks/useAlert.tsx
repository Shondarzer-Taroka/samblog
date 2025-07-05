import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const useAlert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>('info');
  const [alertOptions, setAlertOptions] = useState<AlertOptions>({
    title: '',
    message: '',
    confirmText: 'ঠিক আছে',
    cancelText: 'বাতিল',
  });

  const showAlert = (type: AlertType, options: AlertOptions) => {
    setAlertType(type);
    setAlertOptions({
      title: options.title,
      message: options.message,
      confirmText: options.confirmText || 'ঠিক আছে',
      cancelText: options.cancelText || 'বাতিল',
      onConfirm: options.onConfirm || (() => setIsOpen(false)),
      onCancel: options.onCancel || (() => setIsOpen(false)),
    });
    setIsOpen(true);
  };

  const confirm = (options: Omit<AlertOptions, 'onConfirm' | 'onCancel'>) => {
    return new Promise<boolean>((resolve) => {
      showAlert('info', {
        ...options,
        onConfirm: () => {
          setIsOpen(false);
          resolve(true);
        },
        onCancel: () => {
          setIsOpen(false);
          resolve(false);
        },
      });
    });
  };

  const AlertDialog = () => {
    const getColorClasses = () => {
      switch (alertType) {
        case 'success': return 'bg-green-50 border-green-400 text-green-800';
        case 'error': return 'bg-red-50 border-red-400 text-red-800';
        case 'warning': return 'bg-amber-50 border-amber-400 text-amber-800';
        default: return 'bg-blue-50 border-blue-400 text-blue-800';
      }
    };

    const getButtonClasses = () => {
      switch (alertType) {
        case 'success': return 'bg-green-600 hover:bg-green-700 focus:ring-green-500';
        case 'error': return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
        case 'warning': return 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500';
        default: return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
      }
    };

    const getIcon = () => {
      switch (alertType) {
        case 'success': return (
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
        case 'error': return (
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
        case 'warning': return (
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
        default: return (
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      }
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            >
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${getColorClasses()} border-l-4`}
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {getIcon()}
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {alertOptions.title}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {alertOptions.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={alertOptions.onConfirm}
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white ${getButtonClasses()} focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
                  >
                    {alertOptions.confirmText}
                  </button>
                  {alertOptions.onCancel && (
                    <button
                      type="button"
                      onClick={alertOptions.onCancel}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {alertOptions.cancelText}
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  };

  return {
    showAlert,
    confirm,
    AlertDialog,
  };
};