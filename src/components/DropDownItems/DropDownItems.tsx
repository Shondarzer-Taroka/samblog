
import Link from 'next/link';
import React from 'react';

// type Cate = {
//   categories: string[][] | undefined
// }

const DropDownItems = ({ categories }: { categories: string[][] | undefined }) => {
  console.log(categories);

  return (
    <>
      {categories && categories.length > 0 && <div className=" md:max-h-screen  flex items-center justify-center">
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 p-6 justify-between text-black text-lg font-normal">
          {categories?.map((column, colIndex) => (
            <div key={colIndex} className="space-y-2">
              {column.map((item, index) => (
                <p key={index}> <Link href={`/news/${item}`}> {item}</Link> </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      }
    </>
  );
};

export default DropDownItems;
