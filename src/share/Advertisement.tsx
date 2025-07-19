/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
// import Link from 'next/link';

// export type AdOrientation = 'vertical' | 'horizontal';

// interface AdvertisementProps {
//   /** Path or URL to the creative (png / jpg / webp / gif) */
//   src: string;
//   /** Where to send the user when the banner is clicked */
//   href?: string;
//   /** Short description for a11y / SEO */
//   alt?: string;
//   /** Orientation decides default size.  ↪︎ 300×600 (vertical) or 728×90 (horizontal)  */
//   orientation?: AdOrientation;
//   /** Explicit width (px).  Overrides the default picked from `orientation`  */
//   width?: number;
//   /** Explicit height (px). Overrides the default picked from `orientation` */
//   height?: number;
//   /** Extra utility classes for custom layout tweaks */
//   className?: string;
// }

// export default function Advertisement({
//   src,
//   href = '#',
//   alt = 'Advertisement',
//   orientation = 'vertical',
//   width,
//   height,
//   className = '',
// }: AdvertisementProps) {
//   // sensible fall‑back sizes
//   const defaultSize =
//     orientation === 'vertical'
//       ? { w: 300, h: 600 } /* 300×600 ‑‑ “half‑page” */
//       : { w: 728, h: 90 };  /* 728×90  ‑‑ leaderboard */

//   const w = width ?? defaultSize.w;
//   const h = height ?? defaultSize.h;

//   const AdImage = (
//     <Image
//       src={src}
//       alt={alt}
//       width={w}
//       height={h}
//       priority
//       className="w-full h-auto object-cover"
//     />
//   );

//   return (
//     <div
//       className={`bg-white shadow-md overflow-hidden ${className}`}
//       style={{ width: w }}
//     >
//       {href ? (
//         <Link href={href} target="_blank" rel="noopener noreferrer">
//           {AdImage}
//         </Link>
//       ) : (
//         AdImage
//       )}
//     </div>
//   );
// }








import Link from 'next/link';

export type AdOrientation = 'vertical' | 'horizontal';

interface AdvertisementProps {
  /** Path or URL to the creative (png / jpg / webp / gif) */
  src: string;
  /** Where to send the user when the banner is clicked */
  href?: string;
  /** Short description for a11y / SEO */
  alt?: string;
  /** Orientation decides default size.  ↪︎ 300×600 (vertical) or 728×90 (horizontal)  */
  orientation?: AdOrientation;
  /** Explicit width (px).  Overrides the default picked from `orientation`  */
  width?: number;
  /** Explicit height (px). Overrides the default picked from `orientation` */
  height?: number;
  /** Extra utility classes for custom layout tweaks */
  className?: string;
}

export default function Advertisement({
  src,
  href = '#',
  alt = 'Advertisement',
  orientation = 'vertical',
  width,
  height,
  className = '',
}: AdvertisementProps) {
  // sensible fall‑back sizes
  const defaultSize =
    orientation === 'vertical'
      ? { w: 300, h: 600 } /* 300×600 ‑‑ “half‑page” */
      : { w: 728, h: 90 };  /* 728×90  ‑‑ leaderboard */

  const w = width ?? defaultSize.w;
  const h = height ?? defaultSize.h;

  const AdImage = (
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      className="w-full h-auto object-cover"
    />
  );

  return (
    <div
      className={`bg-white shadow-md overflow-hidden ${className} w-[${w}px]`}
      // style={{ width: w }}
    >
      {href ? (
        <Link href={href} target="_blank" rel="noopener noreferrer">
          {AdImage}
        </Link>
      ) : (
        AdImage
      )}
    </div>
  );
}
