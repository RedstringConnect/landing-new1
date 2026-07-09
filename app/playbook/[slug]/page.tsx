import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const title = params.slug.replace(/-/g, ' ');
  return {
    title: `${title} | Playbook | Redstring`,
    description: `Learn how to scale your hiring process with the ${title} playbook.`,
    alternates: {
      canonical: `https://www.redstring.co.in/playbook/${params.slug}`,
    },
  };
}

export default function PlaybookDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-32 text-center px-6 max-w-3xl mx-auto">
        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">Playbook</div>
        <h1 className="text-3xl md:text-5xl font-denton font-medium mb-6 capitalize">{params.slug.replace(/-/g, ' ')}</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Learn how to scale your hiring process effectively.
        </p>
        <div className="prose dark:prose-invert text-left w-full">
          <p>This is a placeholder for the playbook content or download link.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
