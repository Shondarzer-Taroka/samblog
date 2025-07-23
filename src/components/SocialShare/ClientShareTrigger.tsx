// components/ClientShareTrigger.tsx
'use client';
import { useState } from 'react';
import ShareModal from './ShareModal';
import { FaShareAlt } from 'react-icons/fa';

const ClientShareTrigger = ({ url, title }: { url: string; title: string }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="text-gray-400 hover:text-red-600 transition-colors"
      >
        <FaShareAlt />
      </button>
      <ShareModal
        show={show}
        onClose={() => setShow(false)}
        url={url}
        title={title}
      />
    </>
  );
};

export default ClientShareTrigger;
