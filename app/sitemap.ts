import { MetadataRoute } from 'next'
import { getAllBlogs } from '@/lib/blog';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.redstring.co.in';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/jobs-map`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/playbooks`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/playground`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/tools/runway-to-roi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/tools/hiring-playbook-generator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Blog posts
  const blogs = getAllBlogs();
  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Playbooks
  const playbooksPath = path.join(process.cwd(), 'content', 'playbooks.json');
  let playbookPages: MetadataRoute.Sitemap = [];
  if (fs.existsSync(playbooksPath)) {
    const playbooks = JSON.parse(fs.readFileSync(playbooksPath, 'utf8')) as Array<{ id: string }>;
    playbookPages = playbooks.map((pb) => ({
      url: `${baseUrl}/playbook/${pb.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  }

  return [...staticPages, ...blogPages, ...playbookPages];
}