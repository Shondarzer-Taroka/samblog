import React from 'react';
import {
  FaFacebookF,
  FaFacebookMessenger,
  FaXTwitter,
  FaWhatsapp,
  FaPrint,
  FaCopy,
} from 'react-icons/fa6'; // Fa6 for Font Awesome 6 icons

const icons = [
  { title: 'Facebook', component: FaFacebookF },
  { title: 'Messenger', component: FaFacebookMessenger },
  { title: 'X (Twitter)', component: FaXTwitter },
  { title: 'WhatsApp', component: FaWhatsapp },
  { title: 'Print', component: FaPrint },
  { title: 'Copy', component: FaCopy },
];

const IconButton = ({ Icon, title }:{Icon:React.ComponentType<{className:string}>,title:string}) => (
  <div
    className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
    title={title}
  >
    <Icon className="text-gray-700 text-xl" />
  </div>
);

const ShareBar = () => (
  <div className="flex space-x-4">
    {icons.map((item, index) => (
      <IconButton key={index} Icon={item.component} title={item.title} />
    ))}
  </div>
);

export default ShareBar;