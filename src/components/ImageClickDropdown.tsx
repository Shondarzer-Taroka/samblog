/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import Modal from 'react-modal';

export default function ImageOCRModal({ imageUrl }: { imageUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Modal.setAppElement('#__next');
  }, []);

  const handleImageClick = async () => {
    setIsOpen(true);
    setIsLoading(true);
    
    try {
      await Tesseract.recognize(
        imageUrl,
        'eng',
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              setProgress(Math.round(m.progress * 100));
            }
          }
        }
      ).then(({ data: { text } }) => {
        setText(text);
      });
    } catch (error) {
      console.error('OCR Error:', error);
      setText('Failed to extract text');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <img 
        src={imageUrl} 
        onClick={handleImageClick}
        className="cursor-pointer hover:opacity-90"
        alt="Click to extract text"
      />

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="p-4 max-w-2xl max-h-[80vh] overflow-auto">
          <h2 className="text-xl font-bold mb-4">Extracted Text</h2>
          
          {isLoading ? (
            <div>
              <p>Processing: {progress}%</p>
              <progress value={progress} max="100" className="w-full" />
            </div>
          ) : (
            <div className="bg-gray-100 p-3 rounded whitespace-pre-wrap">
              {text || 'No text found'}
            </div>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Close
          </button>
        </div>
      </Modal>

      <style jsx global>{`
        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          border-radius: 8px;
          outline: none;
          max-width: 90vw;
        }
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          z-index: 1000;
        }
      `}</style>
    </div>
  );
}