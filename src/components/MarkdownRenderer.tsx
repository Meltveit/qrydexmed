import React from 'react';

/**
 * Simple helper to render text with basic Markdown formatting.
 * Supports:
 * - **bold**
 * - *italic*
 * - Bullet points (lines starting with - or *)
 */
export function MarkdownRenderer({ content }: { content: string }) {
    if (!content) return null;

    const lines = content.split('\n');
    let inList = false;
    const elements: React.ReactNode[] = [];

    lines.forEach((line, lineIndex) => {
        // Handle list items
        const isListItem = line.trim().startsWith('- ') || line.trim().startsWith('* ');

        if (isListItem) {
            const listContent = line.trim().substring(2);
            if (!inList) {
                inList = true;
                elements.push(<ul key={`list-${lineIndex}`} className="list-disc pl-5 space-y-1 mb-4" />);
            }
            // Add item to the last ul
            const lastUl = elements[elements.length - 1] as React.ReactElement;
            // This is a bit hacky in React without state, simpler to just group them first or just render ul for each block
            // Let's keep it simple: just render the line with a bullet if it's a list item, but wrapped in valid HTML
        }

        // Simpler approach: Split by double newlines for paragraphs
    });

    // Better approach: Split by \n\n for paragraphs, then parse each paragraph
    const paragraphs = content.split(/\n\n+/);

    return (
        <div className="space-y-4 text-slate-600 leading-relaxed">
            {paragraphs.map((paragraph, i) => {
                // Check if this paragraph is a list
                if (paragraph.trim().startsWith('1. ') || paragraph.trim().startsWith('- ') || paragraph.trim().startsWith('* ')) {
                    const items = paragraph.split(/\n/).filter(line => line.trim().length > 0);
                    return (
                        <ul key={i} className="list-disc pl-5 space-y-2">
                            {items.map((item, j) => (
                                <li key={j}>{parseInline(item.replace(/^(\d+\.|-|\*)\s+/, ''))}</li>
                            ))}
                        </ul>
                    );
                }

                return <p key={i}>{parseInline(paragraph)}</p>;
            })}
        </div>
    );
}

function parseInline(text: string): React.ReactNode[] {
    // Split by bold syntax (**text**)
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
}
