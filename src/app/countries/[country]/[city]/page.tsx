import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, ChevronRight, Building2, Activity, Plane, Hotel, ArrowRight, Star, ExternalLink } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
    params: Promise<{ country: string; city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { country: countrySlug, city: citySlug } = await params;
    const supabase = await createClient();

    const { data: city } = await supabase
        .from('cities')
        .select('name, meta_title, meta_description, countries(name)')
        .eq('slug', citySlug)
        .single();

    if (!city) return { title: 'City Not Found' };

    const countryName = (city.countries as any)?.name;
    return {
        title: city.meta_title || `Longevity Clinics in ${city.name}, ${countryName} - LongevityIndex`,
        description: city.meta_description || `Find top-rated longevity clinics and biohacking centers in ${city.name}. Compare stem cell therapy, NAD+ treatments, and more.`,
    };
}

export default async function CityPage({ params }: Props) {
    const { country: countrySlug, city: citySlug } = await params;
    const supabase = await createClient();

    const { data: country } = await supabase
        .from('countries')
        .select('*')
        .eq('slug', countrySlug)
        .single();

    if (!country) return notFound();

    const { data: city } = await supabase
        .from('cities')
        .select('*')
        .eq('slug', citySlug)
        .eq('country_id', country.id)
        .single();

    if (!city) return notFound();

    // Fetch clinics in this city
    const { data: clinics } = await supabase
        .from('clinics')
        .select('*')
        .eq('city_id', city.id)
        .order('rating', { ascending: false });

    const { data: treatments } = await supabase
        .from('treatments')
        .select('*, treatment_categories(name, slug)')
        .order('avg_price_usd', { ascending: false });

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <nav className="flex items-center text-sm text-slate-500 flex-wrap gap-1">
                    <Link href="/" className="hover:text-slate-900">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/countries" className="hover:text-slate-900">Countries</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href={`/countries/${country.slug}`} className="hover:text-slate-900">{country.name}</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-900 font-medium">{city.name}</span>
                </nav>
            </div>

            {/* Hero */}
            <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-cyan-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-5xl">{country.flag_emoji}</span>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                                Longevity Clinics in <span className="gradient-text">{city.name}</span>
                            </h1>
                            <p className="text-xl text-slate-600 mt-2">{country.name}, {country.continent}</p>
                        </div>
                    </div>

                    {city.description && (
                        <p className="text-lg text-slate-600 max-w-4xl mb-8">{city.description}</p>
                    )}

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <Plane className="w-5 h-5 text-cyan-600 mb-2" />
                            <p className="text-2xl font-bold text-slate-900">{city.airport_code}</p>
                            <p className="text-slate-500 text-sm">Airport Code</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <Hotel className="w-5 h-5 text-purple-600 mb-2" />
                            <p className="text-2xl font-bold text-slate-900">${city.avg_hotel_cost_usd}</p>
                            <p className="text-slate-500 text-sm">Avg. Hotel/Night</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <Activity className="w-5 h-5 text-emerald-600 mb-2" />
                            <p className="text-2xl font-bold text-slate-900">#{city.medical_hub_ranking}</p>
                            <p className="text-slate-500 text-sm">Hub Ranking</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <Building2 className="w-5 h-5 text-amber-500 mb-2" />
                            <p className="text-2xl font-bold text-slate-900">{clinics?.length || 0}</p>
                            <p className="text-slate-500 text-sm">Verified Clinics</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Clinics Section */}
            {clinics && clinics.length > 0 && (
                <section className="py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                            <Building2 className="w-5 h-5 text-emerald-600" />
                            Top Clinics in {city.name}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {clinics.map((clinic) => (
                                <div
                                    key={clinic.id}
                                    className="bg-white border border-slate-200 rounded-xl p-6 hover:border-emerald-300 transition"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-900">{clinic.name}</h3>
                                            {clinic.is_verified && (
                                                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
                                                    ✓ Verified
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                            <span className="font-semibold">{clinic.rating}</span>
                                            <span className="text-slate-400 text-sm">({clinic.review_count})</span>
                                        </div>
                                    </div>

                                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">{clinic.description}</p>

                                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                        <span>📍 {clinic.address?.split(',').slice(0, 2).join(',')}</span>
                                    </div>

                                    {clinic.certifications && (() => {
                                        let certs: string[] = [];
                                        try {
                                            certs = typeof clinic.certifications === 'string'
                                                ? JSON.parse(clinic.certifications)
                                                : clinic.certifications;
                                        } catch { certs = []; }

                                        // Handle edge case where it might be a single string from bad import
                                        if (!Array.isArray(certs) && typeof certs === 'string') certs = [certs];
                                        if (!Array.isArray(certs)) certs = [];

                                        return certs.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {certs.slice(0, 3).map((cert: string, i: number) => (
                                                    <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                                        {cert}
                                                    </span>
                                                ))}
                                            </div>
                                        );
                                    })()}

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <span className="text-slate-500 text-sm">Est. {clinic.years_established}</span>
                                        {clinic.website && (
                                            <a
                                                href={clinic.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 text-sm font-medium"
                                            >
                                                Visit Website <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Treatment Pages (pSEO links) */}
            <section className="py-12 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-2 text-slate-900">Find Treatments in {city.name}</h2>
                    <p className="text-slate-600 mb-6">Browse specific treatments available at clinics in {city.name}</p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {treatments?.map((treatment) => (
                            <Link
                                key={treatment.id}
                                href={`/countries/${country.slug}/${city.slug}/${treatment.slug}`}
                                className="bg-white border border-slate-200 rounded-lg p-4 card-hover hover:border-emerald-300 group flex items-center justify-between"
                            >
                                <div>
                                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-medium">
                                        {treatment.treatment_categories?.name}
                                    </span>
                                    <h4 className="font-medium mt-2 group-hover:text-emerald-600 transition text-slate-900">
                                        {treatment.name} in {city.name}
                                    </h4>
                                    <p className="text-slate-500 text-sm mt-1">
                                        From ${treatment.price_range_min?.toLocaleString()}
                                    </p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto text-center bg-white rounded-2xl p-10 border border-slate-200">
                    <h2 className="text-2xl font-bold mb-4 text-slate-900">Looking for a Specific Treatment in {city.name}?</h2>
                    <p className="text-slate-600 mb-6">Get personalized recommendations and connect with top clinics.</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                    >
                        Request Free Consultation <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
