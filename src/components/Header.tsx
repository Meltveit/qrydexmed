import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative h-24 w-96">
                            <Image
                                src="/logo.png"
                                alt="LongevityIndex"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition">
                                Treatments <ChevronDown className="w-4 h-4" />
                            </button>
                            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                <div className="p-4 space-y-3">
                                    <Link href="/treatments" className="block text-slate-600 hover:text-emerald-600">
                                        All Treatments
                                    </Link>
                                    <Link href="/treatments/regenerative-medicine" className="block text-slate-600 hover:text-emerald-600">
                                        Regenerative Medicine
                                    </Link>
                                    <Link href="/treatments/cell-optimization" className="block text-slate-600 hover:text-emerald-600">
                                        Cell Optimization
                                    </Link>
                                    <Link href="/treatments/hormone-optimization" className="block text-slate-600 hover:text-emerald-600">
                                        Hormone Optimization
                                    </Link>
                                    <Link href="/treatments/advanced-diagnostics" className="block text-slate-600 hover:text-emerald-600">
                                        Advanced Diagnostics
                                    </Link>
                                    <Link href="/treatments/physical-biohacks" className="block text-slate-600 hover:text-emerald-600">
                                        Physical Biohacks
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link href="/countries" className="text-slate-600 hover:text-slate-900 transition">
                            Destinations
                        </Link>

                        <Link href="/clinics" className="text-slate-600 hover:text-slate-900 transition">
                            Clinics
                        </Link>

                        <Link href="/about" className="text-slate-600 hover:text-slate-900 transition">
                            About
                        </Link>

                        <Link
                            href="/contact"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition"
                        >
                            Get Started
                        </Link>
                    </nav>

                    {/* Mobile menu button */}
                    <button className="md:hidden p-2">
                        <Menu className="w-6 h-6 text-slate-600" />
                    </button>
                </div>
            </div>
        </header>
    );
}
