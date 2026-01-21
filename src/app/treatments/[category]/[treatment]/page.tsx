import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, DollarSign, Clock, Shield, FlaskConical, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

interface Props {
    params: Promise<{ category: string; treatment: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { treatment: slug } = await params;
    const supabase = await createClient();

    const { data: treatment } = await supabase
        .from('treatments')
        .select('name, short_description, full_description')
        .eq('slug', slug)
        .single();

    if (!treatment) return { title: 'Treatment Not Found' };

    const currentYear = new Date().getFullYear();
    const title = `${treatment.name}: Benefits, Cost & Top Clinics (${currentYear}) | LongevityIndex`;
    const description = treatment.short_description?.substring(0, 160) ||
        `Discover ${treatment.name}: A complete guide to benefits, costs, and verified clinics. Book your consultation for ${currentYear}.`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": treatment.name,
        "description": description,
        "bodyLocation": "Whole body",
        "procedureType": "https://schema.org/TherapeuticProcedure",
        "status": "https://schema.org/Experimental",
        "howPerformed": treatment.full_description ? "Consultation followed by customized protocol application." : undefined,
    };

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'article',
        },
        other: {
            'script:ld+json': JSON.stringify(jsonLd),
        },
    };
}

export default async function TreatmentDetailPage({ params }: Props) {
    const { category: categorySlug, treatment: treatmentSlug } = await params;
    const supabase = await createClient();

    const { data: category } = await supabase
        .from('treatment_categories')
        .select('*')
        .eq('slug', categorySlug)
        .single();

    if (!category) return notFound();

    const { data: treatment } = await supabase
        .from('treatments')
        .select('*')
        .eq('slug', treatmentSlug)
        .eq('category_id', category.id)
        .single();

    if (!treatment) return notFound();

    // Get clinics offering this treatment
    const { data: clinicTreatments } = await supabase
        .from('clinic_treatments')
        .select(`
      *,
      clinics(*, cities(name, slug, countries(name, slug, flag_emoji)))
    `)
        .eq('treatment_id', treatment.id)
        .limit(6);

    // Get related treatments
    const { data: relatedTreatments } = await supabase
        .from('treatments')
        .select('name, slug')
        .eq('category_id', category.id)
        .neq('id', treatment.id)
        .limit(4);

    // Get top cities for this treatment
    const { data: topCities } = await supabase
        .from('cities')
        .select('name, slug, countries(name, slug, flag_emoji)')
        .order('medical_hub_ranking')
        .limit(6);

    // Parse benefits and risks safely
    const parseList = (data: any) => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [data];
        } catch {
            // If parse fails, assume it's a plain string and wrap in array
            return [data];
        }
    };

    const benefits = parseList(treatment.benefits);
    const risks = parseList(treatment.risks);

    return (
        <div className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "MedicalProcedure",
                        "name": treatment.name,
                        "description": treatment.short_description,
                        "howPerformed": treatment.full_description ? `See full guide: https://longevityindex.com/treatments/${category.slug}/${treatment.slug}` : undefined
                    })
                }}
            />
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <nav className="flex items-center text-sm text-slate-500 flex-wrap gap-1">
                    <Link href="/" className="hover:text-slate-900">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/treatments" className="hover:text-slate-900">Treatments</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href={`/treatments/${category.slug}`} className="hover:text-slate-900">{category.name}</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-900 font-medium">{treatment.name}</span>
                </nav>
            </div>

            {/* Hero */}
            <section className="py-12 px-4 bg-gradient-to-br from-emerald-50 to-cyan-50">
                <div className="max-w-7xl mx-auto">
                    <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                        {category.name}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-slate-900">
                        {treatment.name}
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
                            <p className="text-slate-500 text-sm">Duration</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <Shield className="w-5 h-5 text-purple-600 mb-2" />
                            <p className="text-2xl font-bold text-slate-900">{treatment.recovery_time || 'Minimal'}</p>
                            <p className="text-slate-500 text-sm">Recovery</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <FlaskConical className="w-5 h-5 text-amber-500 mb-2" />
                            <p className="text-lg font-bold text-slate-900">{treatment.fda_status || 'N/A'}</p>
                            <p className="text-slate-500 text-sm">FDA Status</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About */}
            {treatment.full_description && (
                <section className="py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4 text-slate-900">About {treatment.name}</h2>
                        <MarkdownRenderer content={treatment.full_description} />

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

            {/* Find This Treatment */}
            <section className="py-12 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-2 text-slate-900">Find {treatment.name} Worldwide</h2>
                    <p className="text-slate-600 mb-6">Browse top destinations offering this treatment</p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {topCities?.map((city: any) => (
                            <Link
                                key={city.slug}
                                href={`/${treatment.slug}/in-${city.slug}`}
                                className="bg-white border border-slate-200 rounded-lg p-4 hover:border-emerald-300 transition group flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{city.countries?.flag_emoji}</span>
                                    <div>
                                        <h4 className="font-medium text-slate-900 group-hover:text-emerald-600 transition">
                                            {treatment.name} in {city.name}
                                        </h4>
                                        <p className="text-slate-500 text-sm">{city.countries?.name}</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Clinics Offering */}
            {clinicTreatments && clinicTreatments.length > 0 && (
                <section className="py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-slate-900">Top Clinics Offering {treatment.name}</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {clinicTreatments.map((ct: any) => (
                                <div key={ct.id} className="bg-white border border-slate-200 rounded-xl p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span>{ct.clinics?.cities?.countries?.flag_emoji}</span>
                                        <span className="text-slate-500 text-sm">
                                            {ct.clinics?.cities?.name}, {ct.clinics?.cities?.countries?.name}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-slate-900">{ct.clinics?.name}</h3>
                                    <p className="text-emerald-600 font-bold mt-2">${ct.price?.toLocaleString()}</p>
                                    {ct.notes && <p className="text-slate-500 text-sm mt-1">{ct.notes}</p>}
                                    <Link
                                        href={`/countries/${ct.clinics?.cities?.countries?.slug}/${ct.clinics?.cities?.slug}/${treatment.slug}`}
                                        className="text-emerald-600 text-sm font-medium mt-3 inline-block hover:text-emerald-700"
                                    >
                                        View details →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Related */}
            {relatedTreatments && relatedTreatments.length > 0 && (
                <section className="py-12 px-4 bg-slate-50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-slate-900">Related Treatments</h2>
                        <div className="flex flex-wrap gap-3">
                            {relatedTreatments.map((rt) => (
                                <Link
                                    key={rt.slug}
                                    href={`/treatments/${category.slug}/${rt.slug}`}
                                    className="bg-white border border-slate-200 px-4 py-2 rounded-lg hover:border-emerald-300 transition"
                                >
                                    {rt.name}
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
                        Interested in {treatment.name}?
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
