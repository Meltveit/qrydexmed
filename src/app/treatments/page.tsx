import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Activity, ChevronRight, ArrowRight, DollarSign } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Longevity Treatments - Complete Guide to Anti-Aging Therapies',
    description: 'Explore all longevity and biohacking treatments available worldwide. From stem cell therapy to NAD+ infusions, find the right treatment for you.',
};

export default async function TreatmentsPage() {
    const supabase = await createClient();

    const { data: categories } = await supabase
        .from('treatment_categories')
        .select(`
      *,
      treatments(*)
    `)
        .order('display_order');

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <nav className="flex items-center text-sm text-slate-500">
                    <Link href="/" className="hover:text-slate-900">Home</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="text-slate-900 font-medium">Treatments</span>
                </nav>
            </div>

            {/* Hero */}
            <section className="py-16 px-4 text-center bg-gradient-to-br from-emerald-50 to-cyan-50">
                <Activity className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                    Longevity <span className="gradient-text">Treatments</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Comprehensive guide to cutting-edge anti-aging therapies,
                    regenerative medicine, and biohacking treatments.
                </p>
            </section>

            {/* Categories with Treatments */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                {categories?.map((category) => (
                    <div key={category.id} className="mb-16">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">{category.name}</h2>
                            <Link
                                href={`/treatments/${category.slug}`}
                                className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 text-sm"
                            >
                                View all <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <p className="text-slate-600 mb-6">{category.description}</p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {category.treatments?.map((treatment: any) => (
                                <Link
                                    key={treatment.id}
                                    href={`/treatments/${category.slug}/${treatment.slug}`}
                                    className="bg-white border border-slate-200 rounded-xl p-5 card-hover hover:border-emerald-300 group"
                                >
                                    <h3 className="font-semibold group-hover:text-emerald-600 transition mb-2 text-slate-900">
                                        {treatment.name}
                                    </h3>
                                    <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                                        {treatment.short_description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="flex items-center gap-1 text-emerald-600 font-medium">
                                            <DollarSign className="w-4 h-4" />
                                            {treatment.avg_price_usd?.toLocaleString()}
                                        </span>
                                        <span className="text-slate-400">{treatment.fda_status}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
