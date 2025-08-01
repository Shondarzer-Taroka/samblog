// /* eslint-disable react-hooks/exhaustive-deps */

// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */




// components/epapers/ArticleEditor.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
// import {  useEffect, useRef, useState } from 'react';
import { FaTrash, FaImage, FaTimes } from 'react-icons/fa';
import { categories } from '@/types/epaper';
// import QuillEditor from '@/QuillEditor/QuillEditor';
import 'quill/dist/quill.snow.css'; // Import snow theme
import dynamic from 'next/dynamic';



const QuillEditor = dynamic(() => import('@/QuillEditor/QuillEditor'), {
  ssr: false,
  loading: ()=> <div>loading</div>
});



interface ArticleEditorProps {
  article: any;
  index: number;
  onUpdate: (field: string, value: any) => void;
  onRemove: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadStatuses: Array<{
    id: string;
    progress: number;
    message: string;
    isError: boolean;
  }>;
  onRemoveUploadStatus: (id: string) => void;
  onDragEnter: (e: React.DragEvent, index: number) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  isDragging: boolean;
}

export default function ArticleEditor({
  article,
  index,
  onUpdate,
  onRemove,
  onImageUpload,
  uploadStatuses,
  onRemoveUploadStatus,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  isDragging
}: ArticleEditorProps) {
  const contentImageInputRef = useRef<HTMLInputElement>(null);
  const contentImageDropRef = useRef<HTMLDivElement>(null);
  // const [content, setContent] = useState('');
  // const [Existcontent, setExistContent] = useState('');
  // console.log(content);
  const [editorContent, setEditorContent] = useState('');
  // Ensure numeric values are properly handled
  const safeBbox = {
    x: article.bbox?.x || 0,
    y: article.bbox?.y || 0,
    width: article.bbox?.width || 100,
    height: article.bbox?.height || 100
  };

  const handleNumericChange = (field: string, value: string) => {
    const numValue = value === '' ? 0 : parseInt(value, 10);
    if (!isNaN(numValue)) {
      onUpdate(field, numValue);
    }
  };

  const handleBboxChange = (field: string, value: string) => {
    const numValue = value === '' ? 0 : parseInt(value, 10);
    if (!isNaN(numValue)) {
      onUpdate('bbox', { [field]: numValue });
    }
  };



  // const handleContentChange = useCallback((newContent: string) => {
  //   setEditorContent(newContent);
  //   console.log('Content updated:', newContent); // Debugging
  // }, []);



  useEffect(() => {
    // console.log(article.title,'uy');
 
    if (editorContent.length>0) {
        onUpdate('content', editorContent)
    }

  
  }, [editorContent])

  console.log(editorContent,'articleEditor');

  function hisd() {
    console.log('hisd');
    
  }

  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-800">
          Article #{index + 1}
        </h3>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition"
          title="Remove article"
        >
          <FaTrash />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title*
          </label>
          <input
            type="text"
            placeholder="Headline of the article"
            value={article.title || ''}
            onChange={(e) => onUpdate('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content Image
          </label>
          <div
            ref={contentImageDropRef}
            onDragEnter={(e) => onDragEnter(e, index)}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, index)}
            className={`flex items-center space-x-4 ${isDragging ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
          >
            {article.contentImage ? (
              <img
                src={article.contentImage}
                alt="Article content"
                className="h-32 w-32 object-cover rounded-lg"
              />
            ) : (
              <div className="h-32 w-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <FaImage className="text-gray-400 text-2xl" />
              </div>
            )}
            <div className="flex-1">
              <input
                type="file"
                ref={contentImageInputRef}
                onChange={onImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => contentImageInputRef.current?.click()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition text-left"
              >
                {article.contentImage ? 'Change Image' : 'Upload Image'}
              </button>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG, or GIF (Max 5MB). Drag & drop or click to upload.
              </p>
            </div>
          </div>

          {/* Upload status for content image */}
          {uploadStatuses.map(status => (
            <div
              key={status.id}
              className={`mt-2 p-2 rounded text-sm ${status.isError ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}
            >
              <div className="flex justify-between items-center">
                <span>{status.message}</span>
                <button
                  onClick={() => onRemoveUploadStatus(status.id)}
                  className="ml-2 text-xs"
                >
                  <FaTimes />
                </button>
              </div>
              {!status.isError && (
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{ width: `${status.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category*
          </label>
          <select
            value={article.category || ''}
            onChange={(e) => onUpdate('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Page Number*
          </label>
          <input
            type="number"
            min="1"
            placeholder="1"
            value={article.pageNumber || 1}
            onChange={(e) => handleNumericChange('pageNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content*
        </label>
        <textarea
          placeholder="Write the article content here..."
          value={article.content || ''}
          onChange={(e) => onUpdate('content', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          rows={4}
        />
      </div> */}


      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Editor</h2>
        <div onChange={hisd}>
          <QuillEditor
            onContentChange={setEditorContent}
            initialContent={article.content}
            
          />
        </div>

      </div>




      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'X Position', key: 'x' },
          { label: 'Y Position', key: 'y' },
          { label: 'Width', key: 'width' },
          { label: 'Height', key: 'height' }
        ].map((dim) => (
          <div key={dim.key}>
            <label className="block text-xs text-gray-500 mb-1">{dim.label}</label>
            <input
              type="number"
              value={safeBbox[dim.key as keyof typeof safeBbox]}
              onChange={(e) => handleBboxChange(dim.key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center">
        <input
          id={`leading-${index}`}
          type="checkbox"
          checked={article.isLeading || false}
          onChange={(e) => onUpdate('isLeading', e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor={`leading-${index}`} className="ml-2 text-sm font-medium text-gray-700">
          Mark as Leading Article
        </label>
      </div>
    </div>
  );
}