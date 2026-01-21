import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, DollarSign, Clock, Shield, ArrowRight, Building2, FlaskConical, Star, ExternalLink, CheckCircle } from 'lucide-react';
import { Metadata } from 'next';
import { MedicalProcedureSchema, MedicalClinicSchema, FAQSchema, BreadcrumbSchema, OfferSchema } from '@/components/Schema';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

interface Props {
    params: Promise<{ country: string; city: string; treatment: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { country: countrySlug, city: citySlug, treatment: treatmentSlug } = await params;
    const supabase = await createClient();

    const { data: city } = await supabase
        .from('cities')
        .select('name, countries(name)')
        .eq('slug', citySlug)
        .single();

    const { data: treatment } = await supabase
        .from('treatments')
        .select('name, short_description, avg_price_usd')
        .eq('slug', treatmentSlug)
        .single();

    if (!city || !treatment) return { title: 'Page Not Found' };

    const countryName = (city.countries as any)?.name;
    const currentYear = new Date().getFullYear();

    return {
        title: `${treatment.name} in ${city.name}, ${countryName} - Top Clinics & Prices ${currentYear}`,
        description: `Find the best ${treatment.name} clinics in ${city.name}, ${countryName}. Compare prices from $${treatment.avg_price_usd?.toLocaleString()}, read reviews, and book consultations.`,
        openGraph: {
            title: `${treatment.name} in ${city.name} - LongevityIndex`,
            description: treatment.short_description,
            type: 'website',
        },
        alternates: {
            canonical: `/countries/${countrySlug}/${citySlug}/${treatmentSlug}`,
        },
    };
}

export default async function TreatmentInCityPage({ params }: Props) {
    const { country: countrySlug, city: citySlug, treatment: treatmentSlug } = await params;
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

    const { data: treatment } = await supabase
        .from('treatments')
        .select('*, treatment_categories(name, slug)')
        .eq('slug', treatmentSlug)
        .single();

    if (!treatment) return notFound();

    // Fetch clinics offering this treatment in this city
    const { data: clinicTreatments } = await supabase
        .from('clinic_treatments')
        .select(`
      *,
      clinics!inner(*, city_id)
    `)
        .eq('treatment_id', treatment.id);

    // Filter to clinics in this city
    const clinicsInCity = clinicTreatments?.filter(
        (ct: any) => ct.clinics?.city_id === city.id
    ) || [];

    const { data: relatedTreatments } = await supabase
        .from('treatments')
        .select('name, slug')
        .eq('category_id', treatment.category_id)
        .neq('id', treatment.id)
        .limit(4);

    // Parse benefits and risks safely
    const parseList = (data: any) => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [data];
        } catch {
            return [data];
        }
    };

    const benefits = parseList(treatment.benefits);
    const risks = parseList(treatment.risks);

    // Generate FAQ items from benefits and risks
    const faqItems = [
        {
            question: `What is ${treatment.name}?`,
            answer: treatment.short_description || `${treatment.name} is a longevity treatment available at clinics in ${city.name}.`
        },
        {
            question: `How much does ${treatment.name} cost in ${city.name}?`,
            answer: `Prices for ${treatment.name} in ${city.name} range from $${treatment.price_range_min?.toLocaleString()} to $${treatment.price_range_max?.toLocaleString()}, with an average of $${treatment.avg_price_usd?.toLocaleString()}.`
        },
        {
            question: `Is ${treatment.name} FDA approved?`,
            answer: `${treatment.name} has FDA status: ${treatment.fda_status || 'Not specified'}. Always consult with your physician before pursuing treatment.`
        },
        {
            question: `What is the recovery time for ${treatment.name}?`,
            answer: `Recovery time for ${treatment.name} is typically ${treatment.recovery_time || 'minimal to none'}. Treatment duration is ${treatment.duration || 'variable'}.`
        },
        ...(benefits.length > 0 ? [{
            question: `What are the benefits of ${treatment.name}?`,
            answer: benefits.slice(0, 3).join('. ') + '.'
        }] : []),
    ];

    // Breadcrumb data
    const breadcrumbs = [
        { name: 'Home', url: 'https://longevityindex.com/' },
        { name: 'Countries', url: 'https://longevityindex.com/countries' },
        { name: country.name, url: `https://longevityindex.com/countries/${country.slug}` },
        { name: city.name, url: `https://longevityindex.com/countries/${country.slug}/${city.slug}` },
        { name: treatment.name, url: `https://longevityindex.com/countries/${country.slug}/${city.slug}/${treatment.slug}` },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Schema.org Structured Data */}
            <MedicalProcedureSchema
                name={treatment.name}
                description={treatment.short_description || treatment.name}
                howPerformed={treatment.duration}
                followup={treatment.recovery_time}
                status={treatment.fda_status?.includes('Approved') ? 'Approved' : 'Experimental'}
            />
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema items={faqItems} />

            {/* Clinic schemas */}
            {clinicsInCity.map((ct: any) => (
                <MedicalClinicSchema
                    key={ct.clinics.id}
                    name={ct.clinics.name}
                    description={ct.clinics.description || `${treatment.name} clinic in ${city.name}`}
                    address={{
                        streetAddress: ct.clinics.address || city.name,
                        addressLocality: city.name,
                        addressCountry: country.name,
                    }}
                    telephone={ct.clinics.phone}
                    url={ct.clinics.website}
                    rating={ct.clinics.rating}
                    reviewCount={ct.clinics.review_count}
                    geo={ct.clinics.lat && ct.clinics.lng ? { latitude: ct.clinics.lat, longitude: ct.clinics.lng } : undefined}
                />
            ))}

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <nav className="flex items-center text-sm text-slate-500 flex-wrap gap-1">
                    <Link href="/" className="hover:text-slate-900">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/countries" className="hover:text-slate-900">Countries</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href={`/countries/${country.slug}`} className="hover:text-slate-900">{country.name}</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href={`/countries/${country.slug}/${city.slug}`} className="hover:text-slate-900">{city.name}</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-900 font-medium">{treatment.name}</span>
                </nav>
            </div>

            {/* Hero */}
            <section className="py-12 px-4 bg-gradient-to-br from-emerald-50 to-cyan-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-3xl">{country.flag_emoji}</span>
                        <span className="text-slate-600">{city.name}, {country.name}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                        <span className="gradient-text">{treatment.name}</span> in {city.name}
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl">
                        {treatment.short_description}
                    </p>

                    {/* Key Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <DollarSign className="w-5 h-5 text-emerald-600 mb-2" />
                            <p className="text-2xl font-bold text-slate-900">${treatment.avg_price_usd?.toLocaleString()}</p>
                            <p className="text-slate-500 text-sm">Average Price</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <Clock className="w-5 h-5 text-cyan-600 mb-2" />
                            <p className="text-2xl font-bold text-slate-900">{treatment.duration || 'Varies'}</p>
                            <p className="text-slate-500 text-sm">Treatment Time</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <Shield className="w-5 h-5 text-purple-600 mb-2" />
                            <p className="text-2xl font-bold text-slate-900">{treatment.recovery_time || 'Minimal'}</p>
                            <p className="text-slate-500 text-sm">Recovery Time</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <FlaskConical className="w-5 h-5 text-amber-500 mb-2" />
                            <p className="text-lg font-bold text-slate-900">{treatment.fda_status || 'N/A'}</p>
                            <p className="text-slate-500 text-sm">FDA Status</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About This Treatment */}
            {treatment.full_description && (
                <section className="py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4 text-slate-900">About {treatment.name}</h2>
                        <div className="prose prose-slate max-w-4xl">
                            <MarkdownRenderer content={treatment.full_description} />
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            {benefits.length > 0 && (
                                <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                                    <h3 className="font-semibold text-emerald-800 mb-4">Potential Benefits</h3>
                                    <ul className="space-y-2">
                                        {benefits.map((b: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2 text-emerald-700">
                                                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {risks.length > 0 && (
                                <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                                    <h3 className="font-semibold text-amber-800 mb-4">Risks & Considerations</h3>
                                    <ul className="space-y-2">
                                        {risks.map((r: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2 text-amber-700">
                                                <span className="w-5 h-5 text-center flex-shrink-0">⚠️</span>
                                                <span>{r}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Clinics Offering This Treatment */}
            <section className="py-12 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                        <Building2 className="w-5 h-5 text-emerald-600" />
                        Clinics Offering {treatment.name} in {city.name}
                    </h2>

                    {clinicsInCity.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {clinicsInCity.map((ct: any) => (
                                <div
                                    key={ct.id}
                                    className="bg-white border border-slate-200 rounded-xl p-6"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-900">{ct.clinics.name}</h3>
                                            {ct.clinics.is_verified && (
                                                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
                                                    ✓ Verified
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                            <span className="font-semibold">{ct.clinics.rating}</span>
                                        </div>
                                    </div>

                                    <div className="bg-emerald-50 rounded-lg p-4 mb-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-600">Price for {treatment.name}</span>
                                            <span className="text-2xl font-bold text-emerald-600">
                                                ${ct.price?.toLocaleString()} {ct.currency}
                                            </span>
                                        </div>
                                        {ct.notes && (
                                            <p className="text-sm text-slate-500 mt-2">{ct.notes}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        {ct.clinics.website && (
                                            <a
                                                href={ct.clinics.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 text-sm font-medium"
                                            >
                                                Visit Website <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                        <Link
                                            href="/contact"
                                            className="text-slate-500 hover:text-slate-700 text-sm"
                                        >
                                            Request Quote →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl p-10 text-center border border-slate-200">
                            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-slate-900">No Clinics Listed Yet</h3>
                            <p className="text-slate-600 mb-6">
                                We're actively adding clinics that offer {treatment.name} in {city.name}.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                            >
                                Get Notified When Available <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqItems.map((faq, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
                                <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                                <p className="text-slate-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Price Comparison */}
            <section className="py-12 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">
                        {treatment.name} Cost Comparison
                    </h2>
                    <div className="bg-white rounded-xl p-6 border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-slate-600">Global Price Range</span>
                            <span className="text-2xl font-bold text-emerald-600">
                                ${treatment.price_range_min?.toLocaleString()} - ${treatment.price_range_max?.toLocaleString()}
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                            <div
                                className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-3 rounded-full"
                                style={{ width: '60%' }}
                            />
                        </div>
                        <p className="text-slate-500 text-sm mt-4">
                            Prices in {city.name} are typically {country.medical_tourism_score && country.medical_tourism_score > 80 ? '40-60% lower' : 'competitive'} compared to the United States.
                        </p>
                    </div>
                </div>
            </section>

            {/* Related Treatments */}
            {relatedTreatments && relatedTreatments.length > 0 && (
                <section className="py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-slate-900">Related Treatments in {city.name}</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {relatedTreatments.map((rt) => (
                                <Link
                                    key={rt.slug}
                                    href={`/countries/${country.slug}/${city.slug}/${rt.slug}`}
                                    className="bg-white border border-slate-200 rounded-lg p-4 hover:border-emerald-300 transition"
                                >
                                    <h4 className="font-medium text-slate-900">{rt.name}</h4>
                                    <p className="text-emerald-600 text-sm mt-1">View in {city.name} →</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-cyan-600">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4 text-white">
                        Ready for {treatment.name} in {city.name}?
                    </h2>
                    <p className="text-emerald-100 mb-6">
                        Get personalized clinic recommendations and free consultation booking.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-xl font-semibold hover:bg-emerald-50 transition"
                    >
                        Request Free Quote <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
