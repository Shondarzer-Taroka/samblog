'use client';

import React, { useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import TextStyle from '@tiptap/extension-text-style';


import TiptapToolbar from './TiptapToolbar';
import './editor.css';
import { FontSize } from '@/extensions/FontSize';

interface Props {
  content: string;
  onChange: (html: string) => void;
}

const TiptapEditor = ({ content, onChange }: Props) => {
  const [markdownMode, setMarkdownMode] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Image,
      Underline,
      Superscript,
      Subscript,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CharacterCount.configure({ limit: 1000 }),
      Placeholder.configure({ placeholder: 'আপনার সংবাদ লিখুন...' }),
      TextStyle,
      FontSize,
    ],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && markdownMode) {
      onChange(editor.getHTML());
    }
  }, [markdownMode]);

  if (!editor) return null;

  return (
    <div className="border rounded p-3 bg-black text-white">
      <TiptapToolbar
        editor={editor}
        markdownMode={markdownMode}
        toggleMarkdown={() => setMarkdownMode(!markdownMode)}
      />
      <EditorContent editor={editor} className="min-h-[200px] mt-2" />
      <div className="text-right text-sm text-gray-400 mt-1">
        {editor.storage.characterCount.characters()} letters,{' '}
        {editor.storage.characterCount.words()} words
      </div>
    </div>
  );
};

export default TiptapEditor;
