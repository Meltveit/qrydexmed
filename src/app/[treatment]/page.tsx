import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, FlaskConical, Globe, ArrowRight, Shield, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { Metadata } from 'next';
import { MedicalProcedureSchema, BreadcrumbSchema, FAQSchema } from '@/components/Schema';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

interface Props {
    params: Promise<{ treatment: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { treatment: treatmentSlug } = await params;
    const supabase = await createClient();

    const { data: treatment } = await supabase
        .from('treatments')
        .select('name, short_description')
        .eq('slug', treatmentSlug)
        .single();

    if (!treatment) return { title: 'Treatment Not Found' };

    const currentYear = new Date().getFullYear();
    return {
        title: `${treatment.name}: Ultimate Guide, Costs & Best Clinics (${currentYear})`,
        description: `Everything you need to know about ${treatment.name}. Benefits, risks, global costs, and top-rated clinics worldwide.`,
        alternates: {
            canonical: `/${treatmentSlug}`,
        },
    };
}

export default async function GlobalTreatmentPage({ params }: Props) {
    const { treatment: treatmentSlug } = await params;
    const supabase = await createClient();

    // 1. Fetch Treatment
    const { data: treatment } = await supabase
        .from('treatments')
        .select('*, treatment_categories(name, slug)')
        .eq('slug', treatmentSlug)
        .single();

    if (!treatment) return notFound();

    // 2. Fetch Countries offering this treatment (via clinics)
    // We get unique countries involved
    const { data: countriesOffering } = await supabase
        .from('clinic_treatments')
        .select(`
            clinics!inner(
                city_id,
                cities!inner(
                    country_id,
                    countries!inner(name, slug, flag_emoji)
                )
            )
        `)
        .eq('treatment_id', treatment.id);

    // Process unique countries manually since distinct() on joined columns is tricky in simple query
    const uniqueCountriesMap = new Map();
    countriesOffering?.forEach((item: any) => {
        const country = item.clinics?.cities?.countries;
        if (country && !uniqueCountriesMap.has(country.slug)) {
            uniqueCountriesMap.set(country.slug, country);
        }
    });
    const countries = Array.from(uniqueCountriesMap.values());

    // Parse benefits/risks
    const parseList = (data: any) => {
        try {
            return Array.isArray(data) ? data : JSON.parse(data) || [];
        } catch {
            return Array.isArray(data) ? data : [data].filter(Boolean);
        }
    };
    const benefits = parseList(treatment.benefits);
    const risks = parseList(treatment.risks);

    // FAQ
    const faqItems = [
        {
            question: `What is ${treatment.name}?`,
            answer: treatment.short_description
        },
        {
            question: `How much does ${treatment.name} cost?`,
            answer: `Global prices typically range from $${treatment.price_range_min?.toLocaleString()} to $${treatment.price_range_max?.toLocaleString()}.`
        },
        {
            question: `Is ${treatment.name} FDA Approved?`,
            answer: treatment.fda_status || 'Varies by jurisdiction.'
        }
    ];

    const breadcrumbs = [
        { name: 'Home', url: 'https://longevityindex.com/' },
        { name: 'Treatments', url: 'https://longevityindex.com/treatments' },
        { name: treatment.name, url: `https://longevityindex.com/${treatment.slug}` },
    ];

    return (
        <div className="min-h-screen bg-white">
            <MedicalProcedureSchema
                name={treatment.name}
                description={treatment.short_description}
                status={treatment.fda_status}
            />
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema items={faqItems} />

            {/* Navigation */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <nav className="flex items-center text-sm text-slate-500 flex-wrap gap-1">
                    <Link href="/" className="hover:text-slate-900">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/treatments" className="hover:text-slate-900">Treatments</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-900 font-medium">{treatment.name}</span>
                </nav>
            </div>

            {/* Hero */}
            <section className="py-16 px-4 bg-gradient-to-br from-indigo-50 to-blue-50">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
                        <FlaskConical className="w-4 h-4" />
                        <span>Advanced Longevity Therapy</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">
                        {treatment.name}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
                        {treatment.short_description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="#destinations" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                            Find Clinics Worldwide
                        </a>
                        <a href="#about" className="bg-white text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition border border-slate-200">
                            Learn More
                        </a>
                    </div>
                </div>
            </section>

            {/* Key Stats Grid */}
            <section className="py-12 px-4 border-b border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                            <DollarSign className="w-8 h-8 text-emerald-500 mb-3" />
                            <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Average Cost</div>
                            <div className="text-2xl font-bold text-slate-900">${treatment.avg_price_usd?.toLocaleString()}</div>
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                            <Clock className="w-8 h-8 text-blue-500 mb-3" />
                            <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Duration</div>
                            <div className="text-2xl font-bold text-slate-900">{treatment.duration || 'Varies'}</div>
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                            <Shield className="w-8 h-8 text-purple-500 mb-3" />
                            <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Recovery</div>
                            <div className="text-2xl font-bold text-slate-900">{treatment.recovery_time || 'Minimal'}</div>
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                            <FlaskConical className="w-8 h-8 text-amber-500 mb-3" />
                            <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Status</div>
                            <div className="text-2xl font-bold text-slate-900">{treatment.fda_status || 'Experimental'}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Content */}
            <section id="about" className="py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-slate-900">Comprehensive Guide</h2>
                    <div className="prose prose-lg prose-slate prose-indigo">
                        <MarkdownRenderer content={treatment.full_description} />
                    </div>

                    {/* Benefits & Risks */}
                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <div className="bg-emerald-50 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold text-emerald-900 mb-4">Benefits</h3>
                            <ul className="space-y-3">
                                {benefits.map((b: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-emerald-800">
                                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-amber-50 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold text-amber-900 mb-4">Risks & Considerations</h3>
                            <ul className="space-y-3">
                                {risks.map((r: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-amber-800">
                                        <span className="text-lg leading-none">⚠️</span>
                                        <span>{r}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Destinations */}
            <section id="destinations" className="py-20 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Top Destinations</h2>
                            <p className="text-slate-600">Countries offering advanced {treatment.name}</p>
                        </div>
                        <Globe className="w-12 h-12 text-slate-200" />
                    </div>

                    {countries.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {countries.map((country: any) => (
                                <Link
                                    key={country.slug}
                                    href={`/${treatment.slug}/in-${country.slug}`}
                                    className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-4xl">{country.flag_emoji}</span>
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-700 transition">
                                        {treatment.name} in {country.name}
                                    </h3>
                                    <p className="text-slate-500 text-sm">
                                        View clinics, prices & regulations
                                    </p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-500">No specific countries listed yet. Contact us for availability.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
