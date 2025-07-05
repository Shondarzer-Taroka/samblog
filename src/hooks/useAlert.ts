import { useState } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';
type AlertOptions = {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export const useAlert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>('info');
  const [alertOptions, setAlertOptions] = useState<AlertOptions>({
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
  });

  const showAlert = (type: AlertType, options: AlertOptions) => {
    setAlertType(type);
    setAlertOptions({
      ...options,
      confirmText: options.confirmText || 'Confirm',
      cancelText: options.cancelText || 'Cancel',
    });
    setIsOpen(true);
  };

  const confirm = (options: AlertOptions) => {
    return new Promise<boolean>((resolve) => {
      showAlert('info', {
        ...options,
        onConfirm: () => {
          setIsOpen(false);
          options.onConfirm?.();
          resolve(true);
        },
        onCancel: () => {
          setIsOpen(false);
          options.onCancel?.();
          resolve(false);
        },
      });
    });
  };

  const AlertDialog = () => {
    if (!isOpen) return null;

    const getColorClasses = () => {
      switch (alertType) {
        case 'success': return 'bg-green-100 border-green-500 text-green-700';
        case 'error': return 'bg-red-100 border-red-500 text-red-700';
        case 'warning': return 'bg-yellow-100 border-yellow-500 text-yellow-700';
        default: return 'bg-blue-100 border-blue-500 text-blue-700';
      }
    };

    const getIcon = () => {
      switch (alertType) {
        case 'success': return '✅';
        case 'error': return '❌';
        case 'warning': return '⚠️';
        default: return 'ℹ️';
      }
    };

    return (
        <section>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`${getColorClasses()} border-l-4 p-4 rounded-lg shadow-lg max-w-md w-full`}>
          <div className="flex items-start">
            <span className="text-xl mr-3">{getIcon()}</span>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{alertOptions.title}</h3>
              <p className="mt-1">{alertOptions.message}</p>
              
              <div className="mt-4 flex justify-end space-x-3">
                {alertOptions.onCancel && (
                  <button
                    onClick={alertOptions.onCancel}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition"
                  >
                    {alertOptions.cancelText}
                  </button>
                )}
                <button
                  onClick={alertOptions.onConfirm}
                  className={`px-4 py-2 rounded-md transition ${
                    alertType === 'success' ? 'bg-green-500 hover:bg-green-600 text-white' :
                    alertType === 'error' ? 'bg-red-500 hover:bg-red-600 text-white' :
                    alertType === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' :
                    'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {alertOptions.confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    );
  };

  return {
    showAlert,
    confirm,
    AlertDialog,
  };
};