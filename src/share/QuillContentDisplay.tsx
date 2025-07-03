'use client';

interface QuillContentDisplayProps {
  content: string;
}

export function QuillContentDisplay({ content }: QuillContentDisplayProps) {
  return (
    <div 
      className="ql-editor" // This class applies Quill's default styling
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}