import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogs } from '@/lib/blog';

export default async function BlogPage() {
  const blogs = getAllBlogs();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Framing Border */}
      <div className="pointer-events-none absolute inset-x-0 top-16 h-px w-full bg-border z-10" />
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-24 px-6 w-full max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-denton font-medium mb-6">Our Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the latest insights, news, and updates from our team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {blogs.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug} className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
              {blog.frontmatter.imageUrl && (
                <div className="relative w-full h-48 overflow-hidden bg-muted">
                  <Image 
                    src={blog.frontmatter.imageUrl} 
                    alt={blog.frontmatter.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized={blog.frontmatter.imageUrl.startsWith('/api')}
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-2">
                  <span>{new Date(blog.frontmatter.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>•</span>
                  <span>{blog.frontmatter.readTime}</span>
                </div>
                {blog.frontmatter.tags && blog.frontmatter.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {blog.frontmatter.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground text-[10px] uppercase tracking-wider rounded-md font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {blog.frontmatter.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                  {blog.frontmatter.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <span className="text-sm font-medium">{blog.frontmatter.author}</span>
                  <span className="text-sm font-medium text-primary group-hover:underline">Read Article &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
          {blogs.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-12">
              No blogs found.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
