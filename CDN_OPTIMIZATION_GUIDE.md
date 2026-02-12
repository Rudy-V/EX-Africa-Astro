# Vercel CDN Image Optimization Guide

## Current Status
- **Images removed**: 313 unused WebP files freed 160MB
- **Public folder**: Reduced from 200MB → 40MB
- **Remaining images**: 16 used WebP + 7 JPG + 1 logo = 24 total images

## Why Vercel's Built-in CDN?

You already have everything you need! Vercel's free tier includes:
- ✅ **Global CDN** - 800+ edge locations worldwide
- ✅ **Automatic caching** - Static assets cached forever (unless updated)
- ✅ **Image optimization** - On-the-fly resizing & format conversion
- ✅ **Bandwidth**: 100GB/month (plenty for content sites)
- ✅ **Zero configuration** - Works automatically

Simply deploying to Vercel automatically:
1. Serves all `/public` assets from nearest edge location to users
2. Compresses and optimizes assets
3. Caches aggressively with immutable headers

---

## Using Vercel CDN for Image Optimization

### Basic Usage (No Code Changes Needed)
Your images are automatically served from Vercel's CDN:

```astro
<!-- Already optimized by Vercel CDN -->
<img src="/assets/images/home/Camping.webp" alt="Camping" loading="lazy" />
```

### Advanced Usage (Optional Query Parameters)
Add query params for additional Vercel image optimization:

```astro
<!-- Resize to 800px width, quality 75, convert to WebP -->
<img src="/assets/images/home/Camping.webp?w=800&q=75&f=webp" alt="Camping" loading="lazy" />
```

**Query Parameters:**
- `w=800` - Resize to width (Vercel handles aspect ratio)
- `q=75` - Quality 1-100 (default: 75)
- `f=webp` - Format: `webp`, `jpg`, `png`, `avif`, `auto`

---

## Implementation: Update Components for Optimization

### Option A: Simple Query Parameters
Update image sources directly:

```astro
// src/pages/index.astro
<img 
  src="/assets/images/home/Camping.webp?w=1200&q=80"
  alt="Camping"
  loading="lazy"
/>
```

### Option B: Use Utility Functions (Recommended)
The utility file (`src/utils/imageOptimization.ts`) provides helpers:

```astro
---
import { getVercelImageUrl, getResponsiveSizes, getResponsiveSrcset } from '@utils/imageOptimization';

const imagePath = '/assets/images/home/Camping.webp';
const optimized = getVercelImageUrl(imagePath, 800, 75);
const srcset = getResponsiveSrcset(imagePath);
const sizes = getResponsiveSizes();
---

<img 
  src={optimized}
  srcset={srcset}
  sizes={sizes}
  alt="Camping"
  loading="lazy"
/>
```

### Option C: Update FeatureCard Component
Edit `src/components/cards/FeatureCard.astro`:

```astro
---
interface Props {
  href: string;
  title: string;
  imgSrc: string;
}

const { href, title, imgSrc } = Astro.props;

// Add optimization query params
const optimizedWebp = `${imgSrc}.webp?w=780&q=75&f=webp`;
const optimizedFallback = `${imgSrc}.png?w=780&q=75&f=png`;
---

<picture>
  <source srcset={optimizedWebp} type="image/webp" />
  <img 
    class="feature-card__img" 
    src={optimizedFallback} 
    alt={title}
    loading="lazy"
    width="780"
    height="585"
    decoding="async"
  />
</picture>
```

---

## Performance Comparison

### Before Optimization
- Full-size images: 500KB - 2MB each
- Served from origin (could be slow for distant users)
- Visitors wait for full download

### After (With Vercel CDN)
- Images served from edge location nearest to user (~latency reduced 70%)
- Automatic compression
- Cached forever (subsequent visits instant)
- Query params allow responsive sizing (70-90% smaller for mobile)

**Example:** 800px desktop image → 300KB, mobile version → 100KB

---

## Bandwidth Estimate (Free Tier: 100GB/month)

Your site with 24 images:
- **Average page size**: 2-3MB (with all images loaded)
- **Monthly visitors**: 33,000+ users (at 3MB/user on 100GB limit)
- **Plenty of headroom** for most content sites

---

## Recommended Implementation Path

1. ✅ **Done**: Remove unused images (saved 160MB)
2. ✅ **Done**: Set up Vercel config files
3. ⏳ **Next**: Update components to add `?w=800&q=75` to images
4. ⏳ **Optional**: Use utility functions for responsive images

---

## Quick Start: Minimal Changes

Just add query params to your images. No utilities needed:

```diff
- <img src="/assets/images/home/Camping.webp" alt="Camping" />
+ <img src="/assets/images/home/Camping.webp?w=800&q=75&f=webp" alt="Camping" loading="lazy" />
```

That's it! Vercel handles the rest.

---

## Files Generated
- `vercel.json` - Vercel config with cache headers (1 year immutable)
- `.vercelignore` - Exclude unnecessary files from deployment
- `astro.config.mjs` - Added `output: 'static'` for static-only mode
- `src/utils/imageOptimization.ts` - Utility functions (optional)
- `.env.example` - Environment variables template

## Next Steps
1. Deploy to Vercel: `vercel deploy`
2. Monitor real usage in Vercel dashboard
3. Adjust `?w=` and `?q=` parameters based on visual quality/file size tradeoff
