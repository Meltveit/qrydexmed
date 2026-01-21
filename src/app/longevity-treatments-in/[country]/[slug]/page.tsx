import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, FlaskConical, MapPin, ArrowRight, Building2, Store } from 'lucide-react';
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/Schema';

interface Props {
    params: Promise<{ country: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { country: countrySlug, slug } = await params;
    const supabase = await createClient();

    // Check if it's a treatment
    const { data: treatment } = await supabase
        .from('treatments')
        .select('name')
        .eq('slug', slug)
        .single();

    if (treatment) {
        return {
            title: `${treatment.name} in ${countrySlug} - Costs & Clinics | LongevityIndex`,
            description: `Complete guide to ${treatment.name} in ${countrySlug}. Compare prices, find verified clinics, and read reviews.`,
            alternates: { canonical: `/longevity-treatments-in/${countrySlug}/${slug}` }
        };
    }

    // Check if it's a city
    const { data: city } = await supabase
        .from('cities')
        .select('name')
        .eq('slug', slug)
        .single();

    if (city) {
        return {
            title: `Longevity Treatments in ${city.name} - Full List | LongevityIndex`,
            description: `Browse all available longevity treatments in ${city.name}, including Stem Cells, HRT, and more.`,
            alternates: { canonical: `/longevity-treatments-in/${countrySlug}/${slug}` }
        };
    }

    return { title: 'Not Found' };
}

export default async function DispatcherPage({ params }: Props) {
    const { country: countrySlug, slug } = await params;
    const supabase = await createClient();

    // 1. Fetch Country
    const { data: country } = await supabase
        .from('countries')
        .select('*')
        .eq('slug', countrySlug)
        .single();

    if (!country) return notFound();

    // 2. Check if slug is TREATMENT
    const { data: treatment } = await supabase
        .from('treatments')
        .select('*, treatment_categories(name, slug)')
        .eq('slug', slug)
        .single();

    if (treatment) {
        // RENDER TREATMENT IN COUNTRY PAGE
        // Use RPC or join to find cities in this country offering this treatment
        // For now, getting valid cities via clinic_treatments
        const { data: citiesWithTreatment } = await supabase
            .from('clinic_treatments')
            .select(`
                clinics!inner(
                    city_id,
                    cities!inner(name, slug)
                )
            `)
            .eq('treatment_id', treatment.id)
            .eq('clinics.cities.country_id', country.id); // Filter by country logic if possible
        // Note: Nested filtering in Supabase JS client can be tricky. 
        // Alternative: Get all clinic_treatments for this treatment, filter in JS by country match if needed.
        // But 'cities!inner' implies we can constrain.

        // Simpler fetch: get cities in this country using standard query
        const { data: cities } = await supabase
            .from('cities')
            .select('*')
            .eq('country_id', country.id);

        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <nav className="flex items-center text-sm text-slate-500 flex-wrap gap-1">
                        <Link href="/" className="hover:text-slate-900">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/longevity-treatments-in" className="hover:text-slate-900">Treatments</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href={`/longevity-treatments-in/${country.slug}`} className="hover:text-slate-900">{country.name}</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-slate-900 font-medium">{treatment.name}</span>
                    </nav>
                </div>

                <section className="py-12 px-4 bg-gradient-to-br from-emerald-50 to-teal-50">
                    <div className="max-w-7xl mx-auto">
                        <span className="text-emerald-700 font-bold tracking-wider text-sm uppercase mb-2 block">
                            In {country.name}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                            {treatment.name} available in {country.name}
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl">
                            Compare clinics, prices, and regulations for {treatment.name} across {country.name}.
                        </p>
                    </div>
                </section>

                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-slate-900">Select a City in {country.name}</h2>
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {cities?.map((city) => (
                                <Link
                                    key={city.id}
                                    href={`/longevity-treatments-in/${country.slug}/${city.slug}/${treatment.slug}`}
                                    className="bg-white border border-slate-200 p-6 rounded-xl hover:border-emerald-500 hover:shadow-md transition group"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-slate-900 text-lg">{city.name}</span>
                                        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500" />
                                    </div>
                                    <p className="text-sm text-slate-500 mt-2">View clinics &rarr;</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // 3. Check if slug is CITY
    const { data: city } = await supabase
        .from('cities')
        .select('*')
        .eq('slug', slug)
        .eq('country_id', country.id)
        .single();

    if (city) {
        // RENDER CITY TREATMENTS INDEX
        const { data: allTreatments } = await supabase
            .from('treatments')
            .select('*, treatment_categories(name, slug)')
            .order('name');

        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <nav className="flex items-center text-sm text-slate-500 flex-wrap gap-1">
                        <Link href="/" className="hover:text-slate-900">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/longevity-treatments-in" className="hover:text-slate-900">Treatments</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href={`/longevity-treatments-in/${country.slug}`} className="hover:text-slate-900">{country.name}</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-slate-900 font-medium">{city.name}</span>
                    </nav>
                </div>

                <section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                            Treatments in {city.name}, {country.name}
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl">
                            Find specific longevity medical procedures available in {city.name}.
                        </p>
                    </div>
                </section>

                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allTreatments?.map((t) => (
                                <Link
                                    key={t.id}
                                    href={`/longevity-treatments-in/${country.slug}/${city.slug}/${t.slug}`}
                                    className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-400 transition group"
                                >
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600">{t.name} in {city.name}</h3>
                                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">{t.short_description}</p>
                                    <div className="text-blue-600 text-sm font-medium flex items-center gap-1">
                                        Check Availability <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // 4. Neither
    return notFound();
}
