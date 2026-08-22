import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mz.md';
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          ru: `${baseUrl}/`,
          ro: `${baseUrl}/?lang=ro`,
          'x-default': `${baseUrl}/`,
        },
      },
    },
    {
      url: `${baseUrl}/#catalog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#bases`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#service`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#quote-section`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
