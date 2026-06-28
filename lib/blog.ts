import fs from 'fs';
import path from 'path';
import { z } from 'zod';

const root = process.cwd();
const blogsFile = path.join(root, 'content', 'blogs.json');

export const BlogSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  author: z.string(),
  readTime: z.string(),
  imageUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  isDummy: z.boolean().optional().default(false),
});

export type BlogFrontmatter = z.infer<typeof BlogSchema>;

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}

function getRawBlogs(): any[] {
  if (!fs.existsSync(blogsFile)) {
    return [];
  }
  const fileContents = fs.readFileSync(blogsFile, 'utf8');
  return JSON.parse(fileContents);
}

export function getBlogSlugs(): string[] {
  const blogs = getRawBlogs();
  return blogs.map(b => b.slug);
}

// Force next.js dev server to reload fs changes again
export function getBlogBySlug(slug: string): BlogPost | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const blogs = getRawBlogs();
  const blog = blogs.find(b => b.slug === realSlug);
  
  if (!blog) {
    return null;
  }

  try {
    const frontmatter = BlogSchema.parse(blog);
    console.log(`[DEBUG getBlogBySlug] slug: ${realSlug}, imageUrl: ${frontmatter.imageUrl}`);
    return {
      slug: realSlug,
      frontmatter,
      content: blog.content,
    };
  } catch (error) {
    console.error(`Invalid frontmatter for blog ${realSlug}:`, error);
    return null;
  }
}

export function getAllBlogs(): BlogPost[] {
  const slugs = getBlogSlugs();
  const blogs = slugs
    .map((slug) => getBlogBySlug(slug))
    .filter((blog): blog is BlogPost => blog !== null)
    .filter((blog) => process.env.NODE_ENV === 'development' || !blog.frontmatter.isDummy)
    .sort((blog1, blog2) => {
      return new Date(blog2.frontmatter.date).getTime() - new Date(blog1.frontmatter.date).getTime();
    });
  
  return blogs;
}
