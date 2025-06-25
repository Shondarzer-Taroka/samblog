/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import { useRef } from 'react';
// import { Editor } from '@tinymce/tinymce-react';

// interface TinyMCEWrapperProps {
//   value: string;
//   onChange: (content: string) => void;
// }

// export default function TinyMCEWrapper({ value, onChange }: TinyMCEWrapperProps) {
//   const editorRef = useRef<any>(null);
//   const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'your-api-key';

//   return (
//     <div className="h-[500px] mb-8">
//       <Editor
//         apiKey={apiKey}
//         onInit={(evt, editor) => (editorRef.current = editor)}
//         initialValue={value}
//         value={value}
//         onEditorChange={onChange}
//         init={{
//           height: 500,
//           menubar: true,
//           plugins: [
//             'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
//             'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
//             'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
//           ],
//           toolbar: 'undo redo | blocks | ' +
//             'bold italic forecolor | alignleft aligncenter ' +
//             'alignright alignjustify | bullist numlist outdent indent | ' +
//             'removeformat | help | image | link',
//           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
//           images_upload_handler: async (blobInfo, progress) => {
//             // Implement your image upload logic here
//             return new Promise((resolve, reject) => {
//               // Example: Upload to Cloudinary or your backend
//               // const formData = new FormData();
//               // formData.append('file', blobInfo.blob(), blobInfo.filename());
//               // fetch('/api/upload', { method: 'POST', body: formData })
//               //   .then((res) => res.json())
//               //   .then((data) => resolve(data.url))
//               //   .catch(() => reject('Upload failed'));
//               resolve('data:' + blobInfo.blob().type + ';base64,' + blobInfo.base64());
//             });
//           }
//         }}
//       />
//     </div>
//   );
// }




















// 'use client';

// import { useRef } from 'react';
// import { Editor } from '@tinymce/tinymce-react';

// interface TinyMCEWrapperProps {
//   value: string;
//   onChange: (content: string) => void;
// }

// export default function TinyMCEWrapper({ value, onChange }: TinyMCEWrapperProps) {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const editorRef = useRef<any>(null);
//   const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'your-api-key';

//   return (
//     <div className="h-[500px] mb-8">
//       <Editor
//         apiKey={apiKey}
//         onInit={(evt, editor) => (editorRef.current = editor)}
//         value={value}
//         onEditorChange={onChange}
//         init={{
//           height: 500,
//           menubar: true,
//           plugins: [
//             'advlist',
//             'autolink',
//             'lists',
//             'link',
//             'image',
//             'charmap',
//             'preview',
//             'anchor',
//             'searchreplace',
//             'visualblocks',
//             'code',
//             'fullscreen',
//             'insertdatetime',
//             'media',
//             'table',
//             'code',
//             'help',
//             'wordcount',
//           ],
//           toolbar:
//             'undo redo | blocks | ' +
//             'bold italic forecolor | alignleft aligncenter ' +
//             'alignright alignjustify | bullist numlist outdent indent | ' +
//             'removeformat | image | link | help',
//           content_style: `
//             body {
//               font-family: Helvetica, Arial, sans-serif;
//               font-size: 14px;
//               direction: ltr !important;
//               unicode-bidi: plaintext !important;
//             }
//           `,
//           images_upload_handler: async (blobInfo: { base64: () => any; blob: () => { (): any; new(): any; type: any; }; }, progress: any) => {
//             // Replace this with your real image upload logic
//             return new Promise((resolve, reject) => {
//               const base64 = blobInfo.base64();
//               resolve(`data:${blobInfo.blob().type};base64,${base64}`);
//             });
//           },
//         }}
//       />
//     </div>
//   );
// }













'use client';

import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyMCEWrapperProps {
  value: string;
  onChange: (content: string) => void;
  disabled?: boolean; // ✅ Add this line
}

export default function TinyMCEWrapper({ value, onChange }: TinyMCEWrapperProps) {

  const editorRef = useRef<any>(null);
  const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'your-api-key';

  return (
    <div className="h-[500px] mb-8">
      <Editor
        apiKey={apiKey}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        onEditorChange={onChange}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | image | link | help',
          content_style: `
            body {
              font-family: Helvetica, Arial, sans-serif;
              font-size: 14px;
              direction: ltr !important;
              unicode-bidi: plaintext !important;
            }
          `,
          images_upload_handler: async (blobInfo: { base64: () => any; blob: () => { (): any; new(): any; type: any; }; }, progress: any) => {
            // Replace this with your real image upload logic
            return new Promise((resolve, reject) => {
              const base64 = blobInfo.base64();
              resolve(`data:${blobInfo.blob().type};base64,${base64}`);
            });
          },
        }}
      />
    </div>
  );
}
