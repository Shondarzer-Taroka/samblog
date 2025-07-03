// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import Quill from 'quill';
// import 'quill/dist/quill.snow.css';

// interface QuillEditorProps {
//   onContentChange: (content: string) => void;
// }

// export default function QuillEditor({ onContentChange }: QuillEditorProps) {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const [quillInstance, setQuillInstance] = useState<Quill | null>(null);

//   useEffect(() => {
//     if (editorRef.current && !quillInstance) {
//       const quill = new Quill(editorRef.current, {
//         theme: 'snow',
//         placeholder: 'Write your news content...',
//         modules: {
//           toolbar: [
//             [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
//             ['bold', 'italic', 'underline', 'strike'],
//             [{ color: [] }, { background: [] }],
//             [{ script: 'sub' }, { script: 'super' }],
//             [{ header: '1' }, { header: '2' }],
//             [{ list: 'ordered' }, { list: 'bullet' }],
//             [{ indent: '-1' }, { indent: '+1' }],
//             [{ align: [] }],
//             ['blockquote', 'code-block'],
//             ['link', 'image', 'video'],
//             ['formula'],
//             ['clean'],
//           ],
//         },
//       });

//       setQuillInstance(quill);

//       quill.on('text-change', () => {
//         onContentChange(quill.root.innerHTML);
//       });
//     }
//   }, [quillInstance, onContentChange]);

//   return <div ref={editorRef} className="bg-white border rounded" style={{ height: '16rem' }} />;
// }


























// // QuillEditor.tsx

// 'use client';

// import { useEffect, useRef, useCallback } from 'react';
// import dynamic from 'next/dynamic';
// import 'quill/dist/quill.snow.css';

// interface QuillEditorProps {
//   initialContent?: string;
//   onContentChange: (content: string) => void;
// }

// // Use dynamic import to prevent SSR issues
// const QuillEditor = dynamic(
//   async () => {
//     const { default: Quill } = await import('quill');
//     return ({ initialContent, onContentChange }: QuillEditorProps) => {
//       const editorRef = useRef<HTMLDivElement>(null);
//       const quillRef = useRef<Quill | null>(null);
//       const onContentChangeRef = useRef(onContentChange);

//       // Update the ref when onContentChange changes
//       useEffect(() => {
//         onContentChangeRef.current = onContentChange;
//       }, [onContentChange]);

//       useEffect(() => {
//         if (!editorRef.current || quillRef.current) return;

//         const quill = new Quill(editorRef.current, {
//           theme: 'snow',
//           placeholder: 'Write your news content...',
//           modules: {
//             toolbar: [
//               [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
//               ['bold', 'italic', 'underline', 'strike'],
//               [{ color: [] }, { background: [] }],
//               [{ script: 'sub' }, { script: 'super' }],
//               [{ header: '1' }, { header: '2' }],
//               [{ list: 'ordered' }, { list: 'bullet' }],
//               [{ indent: '-1' }, { indent: '+1' }],
//               [{ align: [] }],
//               ['blockquote', 'code-block'],
//               ['link', 'image', 'video'],
//               ['formula'],
//               ['clean'],
//             ],
//           },
//         });

//         if (initialContent) {
//           quill.clipboard.dangerouslyPasteHTML(initialContent);
//         }

//         const handler = () => {
//           onContentChangeRef.current(quill.root.innerHTML);
//         };

//         quill.on('text-change', handler);
//         quillRef.current = quill;

//         return () => {
//           quill.off('text-change', handler);
//         };
//       }, [initialContent]);

//       return (
//         <div 
//           ref={editorRef} 
//           className="bg-white border rounded" 
//           style={{ height: '16rem' }} 
//         />
//       );
//     };
//   },
//   {
//     ssr: false,
//     loading: () => (
//       <div className="bg-white border rounded" style={{ height: '16rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         Loading editor...
//       </div>
//     )
//   }
// );

// export default QuillEditor;



























// QuillEditor.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';

// -------- Types --------
import type QuillType from 'quill';          // <- টাইপ‑অনলি
interface QuillEditorProps {
  initialContent?: string;
  onContentChange: (content: string) => void;
}

/* 
 * dynamic import ➜ SSR বন্ধ
 * ভেতরে Named Component বানিয়ে return করছি
 */
const QuillEditor = dynamic<QuillEditorProps>(
  async () => {
    const { default: Quill } = await import('quill'); // রানটাইম ভ্যালু

    const Editor: React.FC<QuillEditorProps> = ({
      initialContent,
      onContentChange,
    }) => {
      const containerRef = useRef<HTMLDivElement>(null);
      const quillRef     = useRef<QuillType | null>(null);
      const cbRef        = useRef(onContentChange);

      /* onContentChange আপডেট হলে রেফ্রেশ */
      useEffect(() => {
        cbRef.current = onContentChange;
      }, [onContentChange]);

      /* Quill init */
      useEffect(() => {
        if (!containerRef.current || quillRef.current) return;

        const quill = new Quill(containerRef.current, {
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

        /* initial value */
        if (initialContent) {
          quill.clipboard.dangerouslyPasteHTML(initialContent);
        }

        /* change handler */
        const handler = () => cbRef.current(quill.root.innerHTML);
        quill.on('text-change', handler);

        quillRef.current = quill;

        /* cleanup— শুধু কল, কিছু রিটার্ন নয় */
        return () => {
          quill.off('text-change', handler);
        };
      }, [initialContent]);

      return (
        <div
          ref={containerRef}
          className="bg-white border rounded"
          style={{ height: '16rem' }}
        />
      );
    };

    // eslint/display-name সন্তুষ্ট রাখতে
    Editor.displayName = 'QuillEditor';
    return Editor;
  },
  {
    ssr: false,
    loading: () => (
      <div
        className="bg-white border rounded flex items-center justify-center"
        style={{ height: '16rem' }}
      >
        Loading editor...
      </div>
    ),
  }
);

export default QuillEditor;
