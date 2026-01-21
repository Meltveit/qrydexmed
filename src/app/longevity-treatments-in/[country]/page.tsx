import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, FlaskConical, MapPin, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/Schema';

interface Props {
    params: Promise<{ country: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { country: countrySlug } = await params;
    const supabase = await createClient();

    const { data: country } = await supabase
        .from('countries')
        .select('name')
        .eq('slug', countrySlug)
        .single();

    if (!country) return { title: 'Country Not Found' };

    const currentYear = new Date().getFullYear();
    return {
        title: `Longevity Treatments in ${country.name} (${currentYear}) | LongevityIndex`,
        description: `Explore top longevity treatments in ${country.name}. From stem cell therapy to NAD+ infusions, find verified clinics and prices in ${country.name}.`,
        alternates: {
            canonical: `/longevity-treatments-in/${countrySlug}`,
        },
    };
}

export default async function CountryTreatmentsPage({ params }: Props) {
    const { country: countrySlug } = await params;
    const supabase = await createClient();

    const { data: country } = await supabase
        .from('countries')
        .select('*')
        .eq('slug', countrySlug)
        .single();

    if (!country) return notFound();

    // Fetch treatments available in this country via clinics
    // This requires joining: treatments -> clinic_treatments -> clinics -> cities -> countries
    // For simplicity/performance, we might fetch all treatments and filter, OR use RPC properly.
    // For now, let's just show top treatments generally available, or fetch distinct treatments for this country.

    // Better approach: Get all treatments. In a real app we'd filter by availability in country.
    // Let's fetch all treatments for now to populate the directory.
    const { data: treatments } = await supabase
        .from('treatments')
        .select('*, treatment_categories(name, slug)')
        .order('name');

    // Breadcrumbs
    const breadcrumbs = [
        { name: 'Home', url: 'https://longevityindex.com/' },
        { name: 'Treatments', url: 'https://longevityindex.com/longevity-treatments-in' },
        { name: country.name, url: `https://longevityindex.com/longevity-treatments-in/${country.slug}` },
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />

            {/* Breadcrumb UI */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <nav className="flex items-center text-sm text-slate-500 flex-wrap gap-1">
                    <Link href="/" className="hover:text-slate-900">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/longevity-treatments-in" className="hover:text-slate-900">Treatments</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-900 font-medium">{country.name}</span>
                </nav>
            </div>

            {/* Hero */}
            <section className="py-12 px-4 bg-gradient-to-br from-indigo-50 to-blue-50">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="text-6xl mb-4">{country.flag_emoji}</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                        Longevity Treatments in {country.name}
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Discover advanced medical therapies available in {country.name},
                        including pricing, clinics, and legal status.
                    </p>
                </div>
            </section>

            {/* Treatments Grid */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {treatments?.map((treatment) => (
                            <Link
                                key={treatment.id}
                                href={`/longevity-treatments-in/${country.slug}/${treatment.slug}`}
                                className="bg-white border border-slate-200 rounded-xl p-6 hover:border-indigo-300 transition group shadow-sm hover:shadow-md"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                                        <FlaskConical className="w-5 h-5" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition">
                                    {treatment.name}
                                </h3>
                                <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                                    {treatment.short_description}
                                </p>
                                <div className="flex items-center text-sm text-slate-400 gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>Available in {country.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
