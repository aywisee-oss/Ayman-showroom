import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://ayman-showroom.vercel.app';
  return [
    { url: base, changeFrequency: 'monthly', priority: 1 },
    { url: base + '/portfolio', changeFrequency: 'monthly', priority: 0.8 },
  ];
}
