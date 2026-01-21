
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { globalSearch, SearchResult } from '@/lib/actions/search';
import Link from 'next/link';
import Image from 'next/image';

// Simple debounce hook implementation if package specific isn't available
function useDebounceValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const debouncedQuery = useDebounceValue(query, 300);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchResults = async () => {
            if (debouncedQuery.length < 2) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const data = await globalSearch(debouncedQuery);
                setResults(data);
                setIsOpen(true);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery]);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSelect = () => {
        setIsOpen(false);
        setQuery('');
    };

    return (
        <div className="relative w-full max-w-md hidden md:block" ref={wrapperRef}>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        if (e.target.value.length >= 2) setIsOpen(true);
                    }}
                    placeholder="Search treatments, clinics, cities..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-400 text-sm"
                />
                <div className="absolute left-3 top-2.5 text-slate-400">
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Search className="w-4 h-4" />
                    )}
                </div>
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50">
                    <div className="py-2">
                        {results.map((result) => (
                            <Link
                                key={result.id}
                                href={result.url}
                                onClick={handleSelect}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group"
                            >
                                <div className={`p-2 rounded-lg ${result.type === 'treatment' ? 'bg-blue-50 text-blue-600' :
                                    result.type === 'clinic' ? 'bg-emerald-50 text-emerald-600' :
                                        'bg-amber-50 text-amber-600'
                                    }`}>
                                    {/* Icon based on type */}
                                    {result.type === 'treatment' && <span className="text-xs font-bold">Rx</span>}
                                    {result.type === 'clinic' && <span className="text-xs font-bold">🏥</span>}
                                    {result.type === 'city' && <span className="text-xs font-bold">📍</span>}
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-900 group-hover:text-emerald-700">
                                        {result.title}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        {result.subtitle}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
