'use client';

import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
    content: string;
}

/**
 * Professional Markdown renderer using react-markdown.
 * Supports full markdown syntax including headers, lists, bold, italic, links, etc.
 */
export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    if (!content) return null;

    return (
        <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-800 prose-a:text-emerald-600 hover:prose-a:text-emerald-700">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}
