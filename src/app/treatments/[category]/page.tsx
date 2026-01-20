import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowRight, DollarSign, Activity } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category: slug } = await params;
    const supabase = await createClient();

    const { data: category } = await supabase
        .from('treatment_categories')
        .select('name, description')
        .eq('slug', slug)
        .single();

    if (!category) return { title: 'Category Not Found' };

    return {
        title: `${category.name} Treatments - LongevityIndex`,
        description: category.description || `Explore ${category.name} treatments available at longevity clinics worldwide.`,
    };
}

export default async function TreatmentCategoryPage({ params }: Props) {
    const { category: slug } = await params;
    const supabase = await createClient();

    const { data: category } = await supabase
        .from('treatment_categories')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!category) return notFound();

    const { data: treatments } = await supabase
        .from('treatments')
        .select('*')
        .eq('category_id', category.id)
        .order('avg_price_usd', { ascending: false });

    // Get other categories for navigation
    const { data: allCategories } = await supabase
        .from('treatment_categories')
        .select('name, slug')
        .neq('id', category.id)
        .order('display_order');

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <nav className="flex items-center text-sm text-slate-500">
                    <Link href="/" className="hover:text-slate-900">Home</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <Link href="/treatments" className="hover:text-slate-900">Treatments</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="text-slate-900 font-medium">{category.name}</span>
                </nav>
            </div>

            {/* Hero */}
            <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-cyan-50">
                <div className="max-w-7xl mx-auto">
                    <Activity className="w-12 h-12 text-emerald-600 mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                        <span className="gradient-text">{category.name}</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl">
                        {category.description}
                    </p>
                </div>
            </section>

            {/* Treatments Grid */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">
                        {treatments?.length || 0} Treatments Available
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {treatments?.map((treatment) => (
                            <Link
                                key={treatment.id}
                                href={`/treatments/${category.slug}/${treatment.slug}`}
                                className="bg-white border border-slate-200 rounded-xl p-6 card-hover hover:border-emerald-300 group"
                            >
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-600 transition text-slate-900">
                                    {treatment.name}
                                </h3>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                                    {treatment.short_description}
                                </p>

                                <div className="flex items-center gap-4 text-sm mb-4">
                                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                                        <DollarSign className="w-4 h-4" />
                                        {treatment.avg_price_usd?.toLocaleString()}
                                    </span>
                                    <span className="text-slate-400">{treatment.duration}</span>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                        {treatment.fda_status}
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Other Categories */}
            <section className="py-12 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">Explore Other Categories</h2>
                    <div className="flex flex-wrap gap-3">
                        {allCategories?.map((cat) => (
                            <Link
                                key={cat.slug}
                                href={`/treatments/${cat.slug}`}
                                className="bg-white border border-slate-200 px-4 py-2 rounded-lg hover:border-emerald-300 transition"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
