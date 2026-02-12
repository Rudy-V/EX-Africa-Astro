/**
 * Image optimization utilities for Vercel deployment
 * Provides helpers for responsive image sizing and CDN integration
 */

/**
 * Get Vercel-optimized image URL with responsive sizing
 * @param path - Local image path (e.g., '/assets/images/home/photo.webp')
 * @param width - Desired width in pixels (default: 800)
 * @param quality - JPEG quality 0-100 (default: 75)
 * @returns Optimized image URL with query parameters
 */
export const getVercelImageUrl = (
  path: string,
  width: number = 800,
  quality: number = 75
): string => {
  const params = new URLSearchParams({
    w: width.toString(),
    q: quality.toString(),
    f: 'webp', // Force WebP format for smaller file size
  });

  return `${path}?${params.toString()}`;
};

/**
 * Get responsive image URLs for different screen sizes
 * @param path - Local image path
 * @returns Object with different sizes for responsive images
 */
export const getResponsiveImageUrls = (path: string) => {
  return {
    mobile: getVercelImageUrl(path, 480, 75),   // Mobile (480px)
    tablet: getVercelImageUrl(path, 768, 75),   // Tablet (768px)
    desktop: getVercelImageUrl(path, 1200, 80), // Desktop (1200px)
    thumbnail: getVercelImageUrl(path, 300, 70), // Thumbnail (300px)
  };
};

/**
 * Create responsive srcset attribute for picture elements
 * @param basePath - Base image path
 * @returns srcset string for different device pixel ratios
 */
export const getResponsiveSrcset = (basePath: string): string => {
  const sizes = [
    { url: getVercelImageUrl(basePath, 300, 75), dpr: '300w' },
    { url: getVercelImageUrl(basePath, 600, 75), dpr: '600w' },
    { url: getVercelImageUrl(basePath, 800, 75), dpr: '800w' },
    { url: getVercelImageUrl(basePath, 1200, 80), dpr: '1200w' },
  ];

  return sizes.map(({ url, dpr }) => `${url} ${dpr}`).join(', ');
};

/**
 * Get optimized sizes attribute for responsive images
 * @returns sizes string for media queries
 */
export const getResponsiveSizes = (): string => {
  return '(max-width: 480px) 100vw, (max-width: 768px) 85vw, (max-width: 1200px) 70vw, 800px';
};
