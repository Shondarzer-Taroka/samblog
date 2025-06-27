'use client';

import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface QuillEditorProps {
  onContentChange: (content: string) => void;
}

export default function QuillEditor({ onContentChange }: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [quillInstance, setQuillInstance] = useState<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your news content...',
        modules: {
          toolbar: [
            [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ header: '1' }, { header: '2' }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ align: [] }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video'],
            ['formula'],
            ['clean'],
          ],
        },
      });

      setQuillInstance(quill);

      quill.on('text-change', () => {
        onContentChange(quill.root.innerHTML);
      });
    }
  }, [quillInstance, onContentChange]);

  return <div ref={editorRef} className="bg-white border rounded" style={{ height: '16rem' }} />;
}
