'use client';

import { useState, useEffect, useRef } from 'react';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaCopy, FaEnvelope, FaTimes, FaShare } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface ShareModalProps {
  url: string;
  title: string;
  show: boolean;
  onClose: () => void;
}

const ShareModal = ({ url, title, show, onClose }: ShareModalProps) => {
  const shareText = `${title} - দেখুন এই লিংকে:`;
  const [isShareSupported, setIsShareSupported] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof navigator.share === 'function') {
      setIsShareSupported(true);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [show, onClose]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('লিংক কপি হয়েছে!', {
        style: {
          borderRadius: '8px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (err) {
      toast.error('লিংক কপি করতে সমস্যা হয়েছে!', {
        style: {
          borderRadius: '8px',
          background: '#333',
          color: '#fff',
        },
      });
      console.error(err);
    }
  };

  const openShareLink = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleNativeShare = async () => {
    if (isShareSupported) {
      try {
        await navigator.share({ 
          title: `${title} - Jugantor`, 
          text: shareText,
          url: url 
        });
        onClose();
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-gray-900/70 flex justify-center items-center z-50 p-4"
        >
          <motion.div
            ref={modalRef}
            initial={{ y: 10, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ 
              type: 'spring', 
              damping: 20, 
              stiffness: 400,
              bounce: 0.15
            }}
            className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200"
          >
            {/* Modal Header */}
            <div className="bg-white p-5 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">শেয়ার করুন</h2>
                <motion.button 
                  onClick={onClose} 
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTimes className="text-xl" />
                </motion.button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 bg-gray-50">
              {isShareSupported && (
                <motion.button
                  onClick={handleNativeShare}
                  className="w-full bg-gray-800 text-white py-3 px-4 mb-4 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 font-medium"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaShare className="text-lg" />
                  ডিভাইসের মাধ্যমে শেয়ার করুন
                </motion.button>
              )}

              <div className="grid grid-cols-2 gap-3">
                {/* Facebook */}
                <motion.button
                  onClick={() => openShareLink(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)}
                  className="bg-white hover:bg-gray-100 text-gray-800 py-3 px-4 rounded-lg transition-colors flex items-center gap-3 border border-gray-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="bg-blue-600 text-white p-2 rounded-full">
                    <FaFacebookF className="text-lg" />
                  </div>
                  <span className="font-medium">ফেসবুক</span>
                </motion.button>

                {/* Twitter */}
                <motion.button
                  onClick={() => openShareLink(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`)}
                  className="bg-white hover:bg-gray-100 text-gray-800 py-3 px-4 rounded-lg transition-colors flex items-center gap-3 border border-gray-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="bg-sky-500 text-white p-2 rounded-full">
                    <FaTwitter className="text-lg" />
                  </div>
                  <span className="font-medium">টুইটার</span>
                </motion.button>

                {/* WhatsApp */}
                <motion.button
                  onClick={() => openShareLink(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + url)}`)}
                  className="bg-white hover:bg-gray-100 text-gray-800 py-3 px-4 rounded-lg transition-colors flex items-center gap-3 border border-gray-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="bg-green-600 text-white p-2 rounded-full">
                    <FaWhatsapp className="text-lg" />
                  </div>
                  <span className="font-medium">হোয়াটসঅ্যাপ</span>
                </motion.button>

                {/* Copy Link */}
                <motion.button
                  onClick={copyToClipboard}
                  className="bg-white hover:bg-gray-100 text-gray-800 py-3 px-4 rounded-lg transition-colors flex items-center gap-3 border border-gray-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="bg-gray-600 text-white p-2 rounded-full">
                    <FaCopy className="text-lg" />
                  </div>
                  <span className="font-medium">লিংক কপি</span>
                </motion.button>

                {/* Email */}
                <motion.button
                  onClick={() => openShareLink(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + '\n\n' + url)}`)}
                  className="bg-white hover:bg-gray-100 text-gray-800 py-3 px-4 rounded-lg transition-colors flex items-center gap-3 border border-gray-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="bg-red-600 text-white p-2 rounded-full">
                    <FaEnvelope className="text-lg" />
                  </div>
                  <span className="font-medium">ইমেইল</span>
                </motion.button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-white px-5 py-3 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Jugantor-এর খবর শেয়ার করে ছড়িয়ে দিন
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;