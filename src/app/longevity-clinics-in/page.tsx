import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { MapPin, ArrowRight, Star, Globe, ChevronRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Medical Tourism Destinations - LongevityIndex',
    description: 'Explore the best countries for longevity treatments and medical tourism. Compare healthcare quality, costs, and available treatments.',
};

export default async function CountriesPage() {
    const supabase = await createClient();

    const { data: countries } = await supabase
        .from('countries')
        .select(`
      *,
      cities:cities(count)
    `)
        .order('medical_tourism_score', { ascending: false });

    // Group by continent
    const continents = countries?.reduce((acc: Record<string, any[]>, country) => {
        const continent = country.continent || 'Other';
        if (!acc[continent]) acc[continent] = [];
        acc[continent].push(country);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <nav className="flex items-center text-sm text-slate-500">
                    <Link href="/" className="hover:text-slate-900">Home</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="text-slate-900 font-medium">Countries</span>
                </nav>
            </div>

            {/* Hero */}
            <section className="py-16 px-4 text-center bg-gradient-to-br from-emerald-50 to-cyan-50">
                <Globe className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                    Medical Tourism <span className="gradient-text">Destinations</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Discover the world's best countries for longevity treatments,
                    stem cell therapy, and advanced anti-aging procedures.
                </p>
            </section>

            {/* Countries by Continent */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                {continents && Object.entries(continents).map(([continent, countryList]) => (
                    <div key={continent} className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                            <MapPin className="w-5 h-5 text-emerald-600" />
                            {continent}
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {countryList.map((country: any) => (
                                <Link
                                    key={country.id}
                                    href={`/countries/${country.slug}`}
                                    className="bg-white border border-slate-200 rounded-xl p-6 card-hover hover:border-emerald-300 group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <span className="text-5xl">{country.flag_emoji}</span>
                                            <div>
                                                <h3 className="text-xl font-semibold group-hover:text-emerald-600 transition text-slate-900">
                                                    {country.name}
                                                </h3>
                                                <p className="text-slate-500 text-sm">{country.currency}</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-100">
                                        <div>
                                            <p className="text-slate-400 text-xs uppercase">Healthcare Rating</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Star className="w-4 h-4 text-amber-500" />
                                                <span className="font-semibold text-slate-900">{country.healthcare_rating}/10</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-xs uppercase">Tourism Score</p>
                                            <p className="font-semibold text-emerald-600 mt-1">{country.medical_tourism_score}/100</p>
                                        </div>
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
