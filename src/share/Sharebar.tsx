// import React from 'react';
// import {
//   FaFacebookF,
//   FaFacebookMessenger,
//   FaXTwitter,
//   FaWhatsapp,
//   FaPrint,
//   FaCopy,
// } from 'react-icons/fa6'; // Fa6 for Font Awesome 6 icons

// const icons = [
//   { title: 'Facebook', component: FaFacebookF },
//   { title: 'Messenger', component: FaFacebookMessenger },
//   { title: 'X (Twitter)', component: FaXTwitter },
//   { title: 'WhatsApp', component: FaWhatsapp },
//   { title: 'Print', component: FaPrint },
//   { title: 'Copy', component: FaCopy },
// ];

// const IconButton = ({ Icon, title }:{Icon:React.ComponentType<{className:string}>,title:string}) => (
//   <div
//     className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
//     title={title}
//   >
//     <Icon className="text-gray-700 text-xl" />
//   </div>
// );

// const ShareBar = () => (
//   <div className="flex space-x-4">
//     {icons.map((item, index) => (
//       <IconButton key={index} Icon={item.component} title={item.title} />
//     ))}
//   </div>
// );

// export default ShareBar;















'use client'
import React from 'react';
import {
  FaFacebookF,
  FaFacebookMessenger,
  FaXTwitter,
  FaWhatsapp,
  FaPrint,
  FaCopy,
} from 'react-icons/fa6';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ShareIcon = {
  title: string;
  component: React.ComponentType<{ className: string }>;
  action: (url: string, title: string) => void;
  color?: string;
};

const ShareBar = ({ url = window.location.href, title = document.title }: { url?: string; title?: string }) => {
  // Set default values if not provided
  const currentUrl = url || window.location.href;
  const currentTitle = title || document.title;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    toast.success('Link copied to clipboard!', {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const shareIcons: ShareIcon[] = [
    {
      title: 'Facebook',
      component: FaFacebookF,
      action: (url, title) => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      },
      color: '#1877F2',
    },
    {
      title: 'Messenger',
      component: FaFacebookMessenger,
      action: (url) => {
        const shareUrl = `fb-messenger://share/?link=${encodeURIComponent(url)}`;
        // Fallback for desktop browsers
        if (!navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
          window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(window.location.href)}`, '_blank', 'noopener,noreferrer');
        } else {
          window.open(shareUrl, '_blank', 'noopener,noreferrer');
        }
      },
      color: '#0084FF',
    },
    {
      title: 'X (Twitter)',
      component: FaXTwitter,
      action: (url, title) => {
        const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      },
      color: '#000000',
    },
    {
      title: 'WhatsApp',
      component: FaWhatsapp,
      action: (url, title) => {
        const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      },
      color: '#25D366',
    },
    {
      title: 'Print',
      component: FaPrint,
      action: () => handlePrint(),
      color: '#6B7280',
    },
    {
      title: 'Copy',
      component: FaCopy,
      action: () => handleCopy(),
      color: '#6B7280',
    },
  ];

  const IconButton = ({ icon }: { icon: ShareIcon }) => (
    <button
      className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
      title={icon.title}
      onClick={(e) => {
        e.preventDefault();
        icon.action(currentUrl, currentTitle);
      }}
      style={{ color: icon.color }}
      aria-label={`Share via ${icon.title}`}
    >
      <icon.component className="text-xl" />
    </button>
  );

  return (
    <div className="flex flex-wrap gap-3">
      {shareIcons.map((icon, index) => (
        <IconButton key={index} icon={icon} />
      ))}
    </div>
  );
};

export default ShareBar;