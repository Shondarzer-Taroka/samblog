// 'use client';

// import { Editor } from '@tiptap/react';
// import {
//   Bold, Italic, Strikethrough, Code, Underline,
//   ListOrdered, Quote, Undo2, Redo2,
//   AlignLeft, AlignCenter, AlignRight, AlignJustify,
//   Superscript, Subscript, Image as ImageIcon
// } from 'lucide-react';
// import React from 'react';
// import { GiBullets } from 'react-icons/gi';

// interface Props {
//   editor: Editor;
//   markdownMode: boolean;
//   toggleMarkdown: () => void;
// }

// const TiptapToolbar = ({ editor, markdownMode, toggleMarkdown }: Props) => {
//   if (!editor) return null;

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = () => {
//       const src = reader.result as string;
//       editor.chain().focus().setImage({ src }).run();
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="flex flex-wrap items-center gap-2 border-b border-gray-700 pb-2 mb-2">
//       {/* Undo / Redo */}
//       <button onClick={() => editor.chain().focus().undo().run()}><Undo2 size={18} /></button>
//       <button onClick={() => editor.chain().focus().redo().run()}><Redo2 size={18} /></button>

//       {/* Headings */}
//       <select
//         value={
//           editor.isActive('heading', { level: 1 }) ? 'h1' :
//           editor.isActive('heading', { level: 2 }) ? 'h2' :
//           editor.isActive('heading', { level: 3 }) ? 'h3' : 'paragraph'
//         }
//         onChange={(e) => {
//           const value = e.target.value;
//           if (value === 'paragraph') {
//             editor.chain().focus().setParagraph().run();
//           } else {
//             const level = parseInt(value.slice(1));
//             editor.chain().focus().toggleHeading({ level }).run();
//           }
//         }}
//         className="bg-gray-800 text-white px-2 py-1 rounded"
//       >
//         <option value="h1">H1</option>
//         <option value="h2">H2</option>
//         <option value="h3">H3</option>
//         <option value="paragraph">P</option>
//       </select>

//       {/* Font size */}
//       <select
//         onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
//         className="bg-gray-800 text-white px-2 py-1 rounded"
//       >
//         <option value="">Font Size</option>
//         <option value="12px">12px</option>
//         <option value="14px">14px</option>
//         <option value="16px">16px</option>
//         <option value="20px">20px</option>
//         <option value="24px">24px</option>
//         <option value="32px">32px</option>
//       </select>

//       {/* List / Quote */}
//       <button onClick={() => editor.chain().focus().toggleBulletList().run()}><GiBullets size={18} /></button>
//       <button onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={18} /></button>
//       <button onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={18} /></button>

//       {/* Text styles */}
//       <button onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={18} /></button>
//       <button onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={18} /></button>
//       <button onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={18} /></button>
//       <button onClick={() => editor.chain().focus().toggleCode().run()}><Code size={18} /></button>
//       <button onClick={() => (editor.chain() as any).focus().toggleUnderline().run()}><Underline size={18} /></button>

//       {/* Super / Sub */}
//       <button onClick={() => editor.chain().focus().toggleSuperscript().run()}><Superscript size={18} /></button>
//       <button onClick={() => editor.chain().focus().toggleSubscript().run()}><Subscript size={18} /></button>

//       {/* Align */}
//       <button onClick={() => editor.chain().focus().setTextAlign('left').run()}><AlignLeft size={18} /></button>
//       <button onClick={() => editor.chain().focus().setTextAlign('center').run()}><AlignCenter size={18} /></button>
//       <button onClick={() => editor.chain().focus().setTextAlign('right').run()}><AlignRight size={18} /></button>
//       <button onClick={() => editor.chain().focus().setTextAlign('justify').run()}><AlignJustify size={18} /></button>

//       {/* Image Upload */}
//       <label className="cursor-pointer">
//         <ImageIcon size={18} />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="hidden"
//         />
//       </label>

//       {/* Markdown Mode */}
//       <button
//         onClick={toggleMarkdown}
//         className="ml-auto px-2 py-1 rounded border border-gray-600 text-sm"
//       >
//         {markdownMode ? 'HTML Mode' : 'Markdown Mode'}
//       </button>
//     </div>
//   );
// };

// export default TiptapToolbar;
import React from 'react';

const TiptapToolbar = () => {
  return (
    <div>
      d
    </div>
  );
};

export default TiptapToolbar;