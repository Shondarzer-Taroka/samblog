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













import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export type AdOrientation = 'vertical' | 'horizontal';

interface AdvertisementProps {
  src: string;
  href?: string;
  alt?: string;
  orientation?: AdOrientation;
  width?: number;
  height?: number;
  className?: string;
  /** Show a "Sponsored" label */
  showLabel?: boolean;
  /** Show a subtle pulse animation to attract attention */
  animate?: boolean;
  /** Border radius (px) */
  borderRadius?: number;
  /** Show a hover effect */
  hoverEffect?: boolean;
}

export default function Advertisement({
  src,
  href = '#',
  alt = 'Advertisement',
  orientation = 'vertical',
  width,
  height,
  className = '',
  showLabel = true,
  animate = false,
  borderRadius = 12,
  hoverEffect = true,
}: AdvertisementProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  // Default sizes based on orientation
  const defaultSize =
    orientation === 'vertical'
      ? { w: 300, h: 600 } // 300×600 - "half-page"
      : { w: 728, h: 90 }; // 728×90 - leaderboard

  const w = width ?? defaultSize.w;
  const h = height ?? defaultSize.h;

  // Animation for attention
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  const AdImage = (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        priority
        className={`transition-all duration-300 ${hoverEffect ? 'hover:scale-[1.02]' : ''}`}
        style={{
          borderRadius: `${borderRadius}px`,
        }}
      />
      {showLabel && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          Sponsored
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden ${className} ${animate ? (isVisible ? 'animate-pulse' : '') : ''}`}
      style={{
        width: `${w}px`,
        height: `${h}px`,
        borderRadius: `${borderRadius}px`,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      {href ? (
        <Link 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer nofollow"
          className="block w-full h-full"
          aria-label={alt}
        >
          {AdImage}
        </Link>
      ) : (
        AdImage
      )}
      
      {/* Subtle shimmer effect on load */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}