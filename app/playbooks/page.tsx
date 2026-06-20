import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';

interface Playbook {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link: string;
  featured: boolean;
  isDummy?: boolean;
}

function getPlaybooks(): Playbook[] {
  const filePath = path.join(process.cwd(), 'content', 'playbooks.json');
  if (!fs.existsSync(filePath)) return [];
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const playbooks: Playbook[] = JSON.parse(fileContents);
  return playbooks.filter(p => process.env.NODE_ENV === 'development' || !p.isDummy);
}

export default function PlaybooksPage() {
  const playbooks = getPlaybooks();
  
  // Split into featured and regular
  const featured = playbooks.find(p => p.featured) || playbooks[0];
  const others = playbooks.filter(p => p.id !== featured?.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-32">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border">
            Resources & Tools
          </div>
          <h1 className="text-4xl md:text-6xl font-denton font-medium mb-6">Playbooks & Guides</h1>
          <p className="text-lg text-muted-foreground">
            Access our free Excel sheets, hiring templates, and top startup reports to help you scale your engineering teams faster.
          </p>
        </div>

        {/* Featured Playbook */}
        {featured && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8">Featured</h2>
            <Link href={featured.link} className="group block relative rounded-3xl overflow-hidden border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 md:p-12">
                <div className="order-2 lg:order-1 flex flex-col items-start">
                  <span className="px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                    {featured.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-denton font-medium mb-4 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-8">
                    {featured.description}
                  </p>
                  <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                    <Download className="w-5 h-5 mr-2" />
                    Get it now
                  </div>
                </div>
                <div className="order-1 lg:order-2 relative w-full aspect-video rounded-xl overflow-hidden border border-border/50">
                  <Image 
                    src={featured.imageUrl} 
                    alt={featured.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* All Playbooks Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">All Resources</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {others.map(playbook => (
              <Link href={playbook.link} key={playbook.id} className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                <div className="relative w-full aspect-[4/3] overflow-hidden border-b border-border/50">
                  <Image 
                    src={playbook.imageUrl} 
                    alt={playbook.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-foreground text-xs font-semibold uppercase tracking-wider shadow-sm border border-border/50">
                      {playbook.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {playbook.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                    {playbook.description}
                  </p>
                  <div className="flex items-center text-primary font-medium text-sm mt-auto">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
