/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { LinkPreview } from './LinkPreview';



const Mermaid = ({ chart }: { chart: string }) => {
  const [svg, setSvg] = useState<string>('');
  const [id] = useState(() => `mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const renderChart = async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: true,
          theme: 'default',
          securityLevel: 'loose',
        });
        
        const { svg: renderedSvg } = await mermaid.render(id, chart.trim());
        setSvg(renderedSvg);
      } catch (e) {
        console.error("Mermaid parsing failed", e);
      }
    };
    renderChart();
  }, [chart, id]);

  return <div dangerouslySetInnerHTML={{ __html: svg }} className="my-8 flex justify-center w-full" />;
};

const components = {
  h1: ({ children, ...props }: any) => <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-10 mb-4" {...props}>{children}</h1>,
  h2: ({ children, ...props }: any) => {
    const id = typeof children === 'string' ? children.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : (Array.isArray(children) && typeof children[0] === 'string' ? children[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : undefined);
    return <h2 id={id} className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mt-10 mb-4" {...props}>{children}</h2>;
  },
  h3: ({ children, ...props }: any) => {
    const id = typeof children === 'string' ? children.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : (Array.isArray(children) && typeof children[0] === 'string' ? children[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : undefined);
    return <h3 id={id} className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4" {...props}>{children}</h3>;
  },
  h4: ({ children, ...props }: any) => <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-4" {...props}>{children}</h4>,
  p: ({ children, ...props }: any) => <p className="leading-7 not-first:mt-6" {...props}>{children}</p>,
  blockquote: ({ children, ...props }: any) => <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground" {...props}>{children}</blockquote>,
  ul: ({ children, ...props }: any) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>{children}</ul>,
  ol: ({ children, ...props }: any) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>{children}</ol>,
  li: ({ children, ...props }: any) => <li className="leading-7" {...props}>{children}</li>,
  a: ({ children, href, ...props }: any) => (
    <LinkPreview href={href} className="font-medium text-primary underline underline-offset-4" {...props}>
      {children}
    </LinkPreview>
  ),
  table: ({ children, ...props }: any) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full table-fixed border-collapse" {...props}>{children}</table>
    </div>
  ),
  tr: ({ children, ...props }: any) => <tr className="m-0 border-t p-0 even:bg-muted" {...props}>{children}</tr>,
  th: ({ children, ...props }: any) => <th className="border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right" {...props}>{children}</th>,
  td: ({ children, ...props }: any) => <td className="border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right" {...props}>{children}</td>,
  img: (props: any) => {
    return (
      <img
        src={props.src}
        alt={props.alt || ''}
        className="w-full h-auto rounded-lg my-8 object-cover"
      />
    );
  },
  pre: ({ children, ...props }: any) => (
    <pre className="mb-4 mt-6 overflow-x-auto rounded-md bg-gray-100 dark:bg-gray-900 py-4 px-4 font-mono text-sm text-gray-900 dark:text-gray-100" {...props}>
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const isMermaid = match && match[1] === 'mermaid';
    
    if (isMermaid) {
      return <Mermaid chart={String(children).replace(/\n$/, '')} />;
    }
    
    // If it has a language match or isn't inline, don't apply the inline padding so it looks good inside pre
    const isInline = !match && !className;
    
    if (isInline) {
      return (
        <code className="relative rounded-md bg-gray-100 dark:bg-gray-900 px-[0.4rem] py-[0.2rem] font-mono text-sm text-gray-900 dark:text-gray-100" {...props}>
          {children}
        </code>
      );
    }
    
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={components as any}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {content}
    </ReactMarkdown>
  );
}
