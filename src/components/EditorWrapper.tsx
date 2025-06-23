'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded"></div>,
});

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link', 'image'
];

export default function EditorWrapper({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-80 bg-gray-100 animate-pulse rounded"></div>;
  }

  return (
    <div className="h-96 mb-8">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="h-80 bg-white"
      />
    </div>
  );
}