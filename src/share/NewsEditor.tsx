'use client';

import QuillEditor from '@/QuillEditor/QuillEditor';
import { useState } from 'react';
import { QuillContentDisplay } from './QuillContentDisplay';



export default function NewsEditor() {
  const [editorContent, setEditorContent] = useState('');

  // Example of your HTML content
  const exampleContent = '\u003Cp\u003E\u003Cspan style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\"\u003Eথেমেছে ইসরাইল-ইরান-যুক্তরাষ্ট্রের প্রাণঘাতী সংঘাত। ১২ দিনের এ যুদ্ধ শেষ হওয়ার পর বৃহস্পতিবার প্রথমবারের মতো মিডিয়ার সামনে আসেন ইরানের সর্বোচ্চ নেতা আয়াতুল্লাহ আলি খামেনি। আর এর ঠিক কয়েক ঘণ্টা পর দেশটির সর্বোচ্চ নেতার প্রতি আনুগত্য পুনর্ব্যক্ত করে ইরানের বিজয় উদযাপনের ঘোষণা দিয়েছেন হিজবুল্লাহ নেতা নাইম কাসেম।\u003C/span\u003E\u003C/p\u003E\u003Cp class=\"ql-align-center\"\u003E\u003Cbr\u003E\u003C/p\u003E\u003Cp\u003E\u003Cspan style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\"\u003Eইরানে ইসরাইল এবং মার্কিন যুক্তরাষ্ট্র বিমান হামলা শুরু করার সময় থেকেই তেহরানকে সমর্থন জানিয়ে আসছে ফিলিস্তিনের স্বাধীনতাকামী সশস্ত্র সংগঠন হিজবুল্লাহ। এবার সেটা আবারও পুনর্ব্যক্ত করল সংগঠনটি।\u003C/span\u003E\u003C/p\u003E\u003Cp\u003E\u003Cspan style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\"\u003Eএক ভিডিও বার্তায় কাসেম বলেন, ‘আমরা নিশ্চিত করছি এবং গর্বিত যে আমরা ইরানের সঙ্গে আছি। আমরা ইমাম খামেনির তত্ত্বাবধানে আছি।’\u003C/span\u003E\u003C/p\u003E\u003Cp\u003E\u003Cspan style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\"\u003Eকাসেম আরও বলেন, ‘ইরানের নেতৃত্ব ও শাসনব্যবস্থার চারপাশে অভূতপূর্ব জনমত এবং আগ্রাসনের বিরুদ্ধে দেশকে রক্ষা করার জন্য ইমাম খামেনির চারপাশে সমাবেশ করা হচ্ছে।’\u003C/span\u003E\u003C/p\u003E\u003Cp\u003E\u003Cem style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\"\u003E\u003Cu\u003Eতিনি আরও বলেন, খামেনি একজন সাহসী, জ্ঞানী এবং অনুপ্রেরণাদায়ক নেতা। যিনি সবক প্রতিবন্ধকতা কাটিয়ে মাঠে দাঁড়িয়ে থেকে লড়াই করেন। তিনি কেবল স্রষ্টার ভয়ে ভীত এবং বিজয়ের প্রতি আত্মবিশ্বাসী।’\u003C/u\u003E\u003C/em\u003E\u003C/p\u003E\u003Cp\u003E\u003Cbr\u003E\u003C/p\u003E';

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">News Editor</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Editor</h2>
        <QuillEditor 
          onContentChange={setEditorContent} 
          initialContent={exampleContent}
        />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Preview</h2>
        <QuillContentDisplay content={editorContent || exampleContent} />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">HTML Output</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {editorContent || exampleContent}
        </pre>
      </div>
    </div>
  );
}