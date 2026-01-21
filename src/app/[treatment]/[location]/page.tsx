import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, DollarSign, Clock, Shield, ArrowRight, Building2, FlaskConical, Star, ExternalLink, CheckCircle, MapPin } from 'lucide-react';
import { Metadata } from 'next';
import { MedicalProcedureSchema, MedicalClinicSchema, FAQSchema, BreadcrumbSchema } from '@/components/Schema';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

interface Props {
    params: Promise<{ treatment: string; location: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { treatment: treatmentSlug, location: locationParam } = await params;

    // Clean location slug (remove 'in-' prefix if present)
    const locationSlug = locationParam.replace(/^in-/, '');

    const supabase = await createClient();

    const { data: treatment } = await supabase
        .from('treatments')
        .select('name, short_description')
        .eq('slug', treatmentSlug)
        .single();

    if (!treatment) return { title: 'Not Found' };

    // Check Country
    const { data: country } = await supabase
        .from('countries')
        .select('name')
        .eq('slug', locationSlug)
        .single();

    if (country) {
        return {
            title: `${treatment.name} in ${country.name}: Complete Guide & Clinics`,
            description: `Find top clinics for ${treatment.name} in ${country.name}. Compare prices, regulations, and read patient reviews to make an informed choice.`,
            alternates: { canonical: `/${treatmentSlug}/${locationParam}` }
        };
    }

    // Check City
    const { data: city } = await supabase
        .from('cities')
        .select('name, countries(name)')
        .eq('slug', locationSlug)
        .single();

    if (city) {
        const countryName = (city.countries as any)?.name;
        return {
            title: `${treatment.name} in ${city.name}, ${countryName} - Verified Clinics`,
            description: `Best clinics for ${treatment.name} in ${city.name}. Prices, doctor profiles, and appointment booking for medical tourists.`,
            alternates: { canonical: `/${treatmentSlug}/${locationParam}` }
        };
    }

    return { title: 'Not Found' };
}

export default async function LocationDispatcherPage({ params }: Props) {
    const { treatment: treatmentSlug, location: locationParam } = await params;
    const locationSlug = locationParam.replace(/^in-/, '');

    const supabase = await createClient();

    // 1. Fetch Treatment
    const { data: treatment } = await supabase
        .from('treatments')
        .select('*, treatment_categories(name, slug)')
        .eq('slug', treatmentSlug)
        .single();

    if (!treatment) return notFound();

    // 2. CHECK IF COUNTRY
    const { data: country } = await supabase
        .from('countries')
        .select('*')
        .eq('slug', locationSlug)
        .single();

    if (country) {
        // RENDER: TREATMENT IN COUNTRY
        // Fetch cities in this country offering the treatment
        const { data: clinicTreatments } = await supabase
            .from('clinic_treatments')
            .select(`
                clinics!inner(
                    city_id,
                    cities!inner(name, slug)
                )
            `)
            .eq('treatment_id', treatment.id);

        const citiesMap = new Map();
        clinicTreatments?.forEach((ct: any) => {
            const city = ct.clinics?.cities;
            // Manual filter for country match if not using specific country filter in query (simplifies query complexity)
            // But since we fetched cities!inner, we need to ensure they belong to this country.
            // Wait, we didn't filter by country in the query above.
            // We should filter client side or correct query.
            // Let's filter client side for safety since we have 'countries' table relation via cities usually.

            // Actually, let's just fetch all cities in country and show them, marking available ones later?
            // Or better: Fetch cities in this country and show those.
        });

        // Better approach for display: Fetch ALL cities in this country.
        const { data: cities } = await supabase
            .from('cities')
            .select('*')
            .eq('country_id', country.id);

        const breadcrumbs = [
            { name: 'Home', url: 'https://longevityindex.com/' },
            { name: 'Treatments', url: 'https://longevityindex.com/treatments' },
            { name: treatment.name, url: `https://longevityindex.com/${treatment.slug}` },
            { name: `In ${country.name}`, url: `https://longevityindex.com/${treatment.slug}/${locationParam}` },
        ];

        return (
            <div className="min-h-screen bg-white">
                <BreadcrumbSchema items={breadcrumbs} />
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <nav className="flex items-center text-sm text-slate-500 flex-wrap gap-1">
                        <Link href="/" className="hover:text-slate-900">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href={`/${treatment.slug}`} className="hover:text-slate-900">{treatment.name}</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-slate-900 font-medium">{country.name}</span>
                    </nav>
                </div>

                <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-5xl">{country.flag_emoji}</span>
                            <div className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium">
                                Country Guide
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            {treatment.name} in {country.name}
                        </h1>
                        <p className="text-xl opacity-90 max-w-2xl">
                            Everything you need to know about getting {treatment.name} in {country.name}. Prices, legal status, and top cities.
                        </p>
                    </div>
                </section>

                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold mb-8 text-slate-900">Select a City for Clinics</h2>
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {cities?.map((city) => (
                                <Link
                                    key={city.id}
                                    href={`/${treatment.slug}/${city.slug}`} // Or /in-city
                                    className="bg-white border border-slate-200 p-6 rounded-xl hover:border-emerald-500 hover:shadow-lg transition group"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-bold text-slate-900 text-lg">{city.name}</h3>
                                        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition" />
                                    </div>
                                    <p className="text-sm text-slate-500">View clinics in {city.name}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // 3. CHECK IF CITY
    // We need to find the city and its country to properly verify context if strictly needed, 
    // but slug is unique enough typically.
    const { data: city } = await supabase
        .from('cities')
        .select('*, countries(*)')
        .eq('slug', locationSlug)
        .single();

    if (city) {
        const country = city.countries as any;

        // FETCH CLINICS (Money Page Logic)
        const { data: clinicTreatments } = await supabase
            .from('clinic_treatments')
            .select(`
                *,
                clinics!inner(*, city_id)
            `)
            .eq('treatment_id', treatment.id);

        const clinicsInCity = clinicTreatments?.filter(
            (ct: any) => ct.clinics?.city_id === city.id
        ) || [];

        // Parsing logic
        const parseList = (data: any) => {
            try { return Array.isArray(data) ? data : JSON.parse(data) || []; }
            catch { return Array.isArray(data) ? data : [data].filter(Boolean); }
        };
        const benefits = parseList(treatment.benefits);
        const risks = parseList(treatment.risks);

        const breadcrumbs = [
            { name: 'Home', url: 'https://longevityindex.com/' },
            { name: 'Treatments', url: 'https://longevityindex.com/treatments' },
            { name: treatment.name, url: `https://longevityindex.com/${treatment.slug}` },
            { name: country.name, url: `https://longevityindex.com/${treatment.slug}/${country.slug}` },
            { name: city.name, url: `https://longevityindex.com/${treatment.slug}/${locationParam}` },
        ];

        return (
            <div className="min-h-screen bg-white">
                <BreadcrumbSchema items={breadcrumbs} />
                <MedicalProcedureSchema name={treatment.name} description={treatment.short_description} status={treatment.fda_status} />

                {/* Clinic Schema Loop */}
                {clinicsInCity.map((ct: any) => (
                    <MedicalClinicSchema
                        key={ct.clinics.id}
                        name={ct.clinics.name}
                        description={ct.clinics.description}
                        address={{ streetAddress: ct.clinics.address, addressLocality: city.name, addressCountry: country.name }}
                        telephone={ct.clinics.phone}
                        url={ct.clinics.website}
                        rating={ct.clinics.rating}
                    />
                ))}

                <div className="max-w-7xl mx-auto px-4 py-4">
                    <nav className="flex items-center text-sm text-slate-500 flex-wrap gap-1">
                        <Link href="/" className="hover:text-slate-900">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href={`/${treatment.slug}`} className="hover:text-slate-900">{treatment.name}</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href={`/${treatment.slug}/${country.slug}`} className="hover:text-slate-900">{country.name}</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-slate-900 font-medium">{city.name}</span>
                    </nav>
                </div>

                {/* Hero */}
                <section className="py-12 px-4 bg-gradient-to-br from-slate-50 to-indigo-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-3xl">{country.flag_emoji}</span>
                            <span className="text-slate-600">{city.name}, {country.name}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                            {treatment.name} in {city.name}
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl">
                            Compare verified clinics, prices, and reviews for {treatment.name} in {city.name}.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            {/* Stats ... (similar to before) */}
                            <div className="bg-white p-4 rounded-xl border border-slate-200">
                                <div className="text-slate-500 text-xs uppercase font-bold">Price Est.</div>
                                <div className="text-xl font-bold text-slate-900">${treatment.avg_price_usd?.toLocaleString()}</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200">
                                <div className="text-slate-500 text-xs uppercase font-bold">Clinics</div>
                                <div className="text-xl font-bold text-slate-900">{clinicsInCity.length} Available</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Clinics List */}
                <section className="py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Building2 className="w-6 h-6 text-indigo-600" />
                            Clinics in {city.name}
                        </h2>

                        {clinicsInCity.length > 0 ? (
                            <div className="grid gap-6">
                                {clinicsInCity.map((ct: any) => (
                                    <div key={ct.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition">
                                        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                                    {ct.clinics.name}
                                                    {ct.clinics.is_verified && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                                                </h3>
                                                <p className="text-slate-500 text-sm mb-2">{ct.clinics.address || city.name}</p>
                                                <div className="flex items-center gap-1 text-amber-500 font-bold">
                                                    <Star className="w-4 h-4 fill-amber-500" />
                                                    {ct.clinics.rating}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-emerald-600">${ct.price?.toLocaleString()}</div>
                                                <div className="text-xs text-slate-400">Starting Price</div>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex gap-3">
                                            <Link href="/contact" className="flex-1 bg-indigo-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                                                Book Consultation
                                            </Link>
                                            {ct.clinics.website && (
                                                <a href={ct.clinics.website} target="_blank" className="flex-1 bg-slate-50 text-slate-700 text-center py-3 rounded-lg font-semibold hover:bg-slate-100 transition border border-slate-200">
                                                    Website
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                <p className="text-slate-500">No clinics verified in {city.name} yet for this treatment.</p>
                                <Link href="/contact" className="text-indigo-600 font-semibold hover:underline">Get notified when added</Link>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        );
    }

    return notFound();
}
