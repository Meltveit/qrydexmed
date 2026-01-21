import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Star, ArrowRight, ChevronRight, Globe, Building2, Activity } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
    params: Promise<{ country: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { country: slug } = await params;
    const supabase = await createClient();

    const { data: country } = await supabase
        .from('countries')
        .select('name, meta_title, meta_description')
        .eq('slug', slug)
        .single();

    if (!country) return { title: 'Country Not Found' };

    return {
        title: country.meta_title || `Longevity Clinics in ${country.name} - LongevityIndex`,
        description: country.meta_description || `Find the best longevity and biohacking clinics in ${country.name}. Compare treatments, prices, and book consultations.`,
    };
}

export default async function CountryPage({ params }: Props) {
    const { country: slug } = await params;
    const supabase = await createClient();

    const { data: country } = await supabase
        .from('countries')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!country) return notFound();

    const { data: cities } = await supabase
        .from('cities')
        .select('*')
        .eq('country_id', country.id)
        .order('medical_hub_ranking');

    const { data: treatments } = await supabase
        .from('treatments')
        .select('*, treatment_categories(name, slug)')
        .limit(8);

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <nav className="flex items-center text-sm text-slate-500">
                    <Link href="/" className="hover:text-slate-900">Home</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <Link href="/countries" className="hover:text-slate-900">Countries</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="text-slate-900 font-medium">{country.name}</span>
                </nav>
            </div>

            {/* Hero */}
            <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-cyan-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-6 mb-6">
                        <span className="text-7xl">{country.flag_emoji}</span>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                                Longevity Clinics in <span className="gradient-text">{country.name}</span>
                            </h1>
                            <p className="text-xl text-slate-600 mt-2">{country.continent}</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <Star className="w-5 h-5 text-amber-500 mb-2" />
                            <p className="text-2xl font-bold text-slate-900">{country.healthcare_rating}/10</p>
                            <p className="text-slate-500 text-sm">Healthcare Rating</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <Activity className="w-5 h-5 text-emerald-600 mb-2" />
                            <p className="text-2xl font-bold text-slate-900">{country.medical_tourism_score}/100</p>
                            <p className="text-slate-500 text-sm">Tourism Score</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <Globe className="w-5 h-5 text-cyan-600 mb-2" />
                            <p className="text-2xl font-bold text-slate-900">{country.currency}</p>
                            <p className="text-slate-500 text-sm">Currency</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <Building2 className="w-5 h-5 text-purple-600 mb-2" />
                            <p className="text-2xl font-bold text-slate-900">{cities?.length || 0}</p>
                            <p className="text-slate-500 text-sm">Medical Hubs</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cities */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                        Medical Tourism Cities in {country.name}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cities?.map((city) => (
                            <Link
                                key={city.id}
                                href={`/countries/${country.slug}/${city.slug}`}
                                className="bg-white border border-slate-200 rounded-xl p-6 card-hover hover:border-emerald-300 group"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold group-hover:text-emerald-600 transition text-slate-900">
                                            {city.name}
                                        </h3>
                                        <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                                            ✈️ {city.airport_code}
                                        </p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition" />
                                </div>

                                <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                                    <span>🏨 ~${city.avg_hotel_cost_usd}/night</span>
                                    <span>📊 Rank #{city.medical_hub_ranking}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Available Treatments */}
            <section className="py-12 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">Treatments Available in {country.name}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {treatments?.map((treatment) => (
                            <Link
                                key={treatment.id}
                                href={`/treatments/${treatment.treatment_categories?.slug}/${treatment.slug}`}
                                className="bg-white border border-slate-200 rounded-lg p-4 hover:border-emerald-300 transition"
                            >
                                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-medium">
                                    {treatment.treatment_categories?.name}
                                </span>
                                <h4 className="font-medium mt-2 text-slate-900">{treatment.name}</h4>
                                <p className="text-emerald-600 text-sm mt-1">
                                    From ${treatment.price_range_min?.toLocaleString()}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
