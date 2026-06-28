import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getBlogBySlug, getBlogSlugs, getAllBlogs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { FinalCTA } from '@/components/FinalCTA';
import { BookDemoButton } from '@/components/ui/book-demo-button';
import Image from 'next/image';
import Link from 'next/link';
import { FloatingTOC } from '@/components/FloatingTOC';
import { DotFlow } from "@/components/ui/dot-flow";
import { ctaItems } from "@/components/HeroSection";
import { Check } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return {};
  return {
    title: `${blog.frontmatter.title} | Redstring`,
    description: blog.frontmatter.excerpt,
    openGraph: {
      title: blog.frontmatter.title,
      description: blog.frontmatter.excerpt,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: blog.frontmatter.date,
      authors: [blog.frontmatter.author],
      images: blog.frontmatter.imageUrl ? [{ url: blog.frontmatter.imageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.frontmatter.title,
      description: blog.frontmatter.excerpt,
      images: blog.frontmatter.imageUrl ? [blog.frontmatter.imageUrl] : [],
    },
  };
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

function extractHeadings(content: string) {
  const headings = [];
  const regex = /^(##|###)\s+(.*)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length; // 2 or 3
    const text = match[2];
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    headings.push({ level, text, id });
  }
  return headings;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const headings = extractHeadings(blog.content);

  const allBlogs = getAllBlogs();
  const recommendedBlogs = allBlogs.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <Navbar />
      {/* Force hot reload */}
      <main className="flex-1 w-full max-w-6xl mx-auto py-32 px-6 relative">
        <div className="mb-12 w-full mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-denton font-medium mb-6">{blog.frontmatter.title}</h1>
          <div className="flex items-center justify-center space-x-4 text-muted-foreground mb-6">
            <span>{new Date(blog.frontmatter.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span>{blog.frontmatter.readTime}</span>
            <span>•</span>
            <span>By {blog.frontmatter.author}</span>
          </div>
          
          {blog.frontmatter.tags && blog.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {blog.frontmatter.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs uppercase tracking-wider rounded-md font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {blog.frontmatter.imageUrl && (
            <div className="relative w-full h-[300px] md:h-[500px] mt-8 rounded-3xl overflow-hidden shadow-sm border border-border">
              <Image 
                src={blog.frontmatter.imageUrl} 
                alt={blog.frontmatter.title} 
                fill 
                className="object-cover"
                priority
                unoptimized={blog.frontmatter.imageUrl.startsWith('/api')}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          {/* Center Content */}
          <div className="lg:col-span-8 w-full max-w-none">
            <article id="blog-content" className="prose prose-lg dark:prose-invert prose-img:rounded-xl prose-a:text-primary w-full max-w-none">
              <MarkdownRenderer content={blog.content} />
            </article>
          </div>

          {/* Right Sticky CTA */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-32 p-8 bg-card rounded-[2rem] border border-border flex flex-col items-start shadow-sm">
              <h3 className="font-semibold text-2xl mb-4 font-denton leading-tight">
                Want to hire <br/> <span className="text-primary">10x faster?</span>
              </h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed mb-8" style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}>
                Eliminate the manual effort in hiring by removing sheets, email tools and organise the data. Interesting?
              </p>
              
              <div className="flex flex-col items-center gap-4 w-full mb-8">
                <DotFlow items={ctaItems} href="https://loopx.redstring.co.in" />
                <BookDemoButton variant="secondary" size="md" className="w-full" />
              </div>
              
              <div className="flex items-center justify-between w-full text-xs text-muted-foreground font-medium px-1">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-primary" />
                  <span>For free</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-primary" />
                  <span>No credit card</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating TOC */}
        <FloatingTOC headings={headings} />
      </main>

      {recommendedBlogs.length > 0 && (
        <div className="w-full border-t border-border bg-background">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <h2 className="text-3xl font-denton font-medium mb-8">Read next</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendedBlogs.map((b) => (
                <Link href={`/blog/${b.slug}`} key={b.slug} className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
                  {b.frontmatter.imageUrl && (
                    <div className="relative w-full h-40 overflow-hidden bg-muted">
                      <Image 
                        src={b.frontmatter.imageUrl} 
                        alt={b.frontmatter.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-2">
                      <span>{new Date(b.frontmatter.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>{b.frontmatter.readTime}</span>
                    </div>
                    {b.frontmatter.tags && b.frontmatter.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {b.frontmatter.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground text-[10px] uppercase tracking-wider rounded-md font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {b.frontmatter.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="w-full border-t border-border">
        <FinalCTA />
      </div>
      <Footer />
    </div>
  );
}
