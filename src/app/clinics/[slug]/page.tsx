import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { MapPin, Star, Globe, Phone, Mail, CheckCircle, Shield, Award, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { MedicalClinicSchema, BreadcrumbSchema } from '@/components/Schema';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: clinic } = await supabase
        .from('clinics')
        .select('name, description, cities(name, countries(name))')
        .eq('slug', slug)
        .single();

    if (!clinic) return { title: 'Clinic Not Found' };

    return {
        title: `${clinic.name} - Verified Longevity Clinic in ${clinic.cities?.name} | LongevityIndex`,
        description: clinic.description?.substring(0, 160) || `Book a consultation at ${clinic.name} in ${clinic.cities?.name}. Specialized in longevity and regenerative medicine.`,
    };
}

export default async function ClinicPage({ params }: Props) {
    const { slug } = await params;
    const supabase = await createClient();

    // Fetch clinic details
    const { data: clinic } = await supabase
        .from('clinics')
        .select(`
            *,
            cities(name, slug, countries(name, slug, flag_emoji))
        `)
        .eq('slug', slug)
        .single();

    if (!clinic) return notFound();

    // Fetch treatments offered by this clinic
    const { data: clinicTreatments } = await supabase
        .from('clinic_treatments')
        .select(`
            *,
            treatments(name, slug, short_description)
        `)
        .eq('clinic_id', clinic.id);

    // Parse certifications safely
    let certifications: string[] = [];
    try {
        certifications = Array.isArray(clinic.certifications)
            ? clinic.certifications
            : JSON.parse(clinic.certifications as string || '[]');
        if (!Array.isArray(certifications)) certifications = [certifications];
    } catch { certifications = []; }

    const breadcrumbs = [
        { name: 'Home', url: 'https://longevityindex.com/' },
        { name: 'Clinics', url: 'https://longevityindex.com/clinics' },
        { name: clinic.name, url: `https://longevityindex.com/clinics/${clinic.slug}` },
    ];

    return (
        <div className="min-h-screen bg-white">
            <MedicalClinicSchema
                name={clinic.name}
                description={clinic.description}
                address={{
                    streetAddress: clinic.address || clinic.cities?.name,
                    addressLocality: clinic.cities?.name,
                    addressCountry: clinic.cities?.countries?.name,
                }}
                rating={clinic.rating}
                reviewCount={clinic.review_count}
                telephone={clinic.phone}
                url={clinic.website}
            />
            <BreadcrumbSchema items={breadcrumbs} />

            {/* Header */}
            <div className="bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-4 text-sm text-slate-500">
                                <Link href="/clinics" className="hover:text-emerald-600">Clinics</Link>
                                <span>/</span>
                                <Link href={`/countries/${clinic.cities?.countries?.slug}`} className="hover:text-emerald-600">
                                    {clinic.cities?.countries?.name}
                                </Link>
                                <span>/</span>
                                <span className="text-slate-900">{clinic.name}</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                                {clinic.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-6">
                                <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full text-sm">
                                    <MapPin className="w-4 h-4" />
                                    {clinic.cities?.name}, {clinic.cities?.countries?.name}
                                </span>
                                <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full text-sm">
                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                    {clinic.rating} ({clinic.review_count} reviews)
                                </span>
                                {clinic.is_verified && (
                                    <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                                        <CheckCircle className="w-4 h-4" />
                                        Verified Clinic
                                    </span>
                                )}
                            </div>

                            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
                                {clinic.description}
                            </p>
                        </div>

                        {/* Right Column / CTA Card */}
                        <div className="w-full md:w-80 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4">Contact Information</h3>
                            <div className="space-y-4 mb-6">
                                {clinic.website && (
                                    <a href={clinic.website} target="_blank" rel="noopener" className="flex items-center gap-3 text-emerald-600 hover:text-emerald-700">
                                        <Globe className="w-5 h-5 flex-shrink-0" />
                                        <span className="truncate">Visit Website</span>
                                    </a>
                                )}
                                {clinic.phone && (
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <Phone className="w-5 h-5 flex-shrink-0" />
                                        <span>{clinic.phone}</span>
                                    </div>
                                )}
                                <div className="flex items-start gap-3 text-slate-600">
                                    <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                                    <span>{clinic.address || `${clinic.cities?.name}, ${clinic.cities?.countries?.name}`}</span>
                                </div>
                            </div>

                            <Link
                                href="/contact"
                                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 transition"
                            >
                                Request Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-12">

                        {/* Certifications */}
                        {certifications.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Award className="w-6 h-6 text-emerald-600" />
                                    Accreditations & Certifications
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {certifications.map((cert, i) => (
                                        <span key={i} className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg text-slate-700 font-medium">
                                            {cert}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Treatments */}
                        {clinicTreatments && clinicTreatments.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Shield className="w-6 h-6 text-emerald-600" />
                                    Available Treatments
                                </h2>
                                <div className="grid gap-4">
                                    {clinicTreatments.map((ct: any) => (
                                        <div key={ct.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-emerald-300 transition">
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                                <div>
                                                    <h3 className="font-bold text-lg text-slate-900 mb-1">
                                                        {ct.treatments?.name}
                                                    </h3>
                                                    <p className="text-slate-500 text-sm max-w-xl">
                                                        {ct.treatments?.short_description}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xl font-bold text-emerald-600">
                                                        ${ct.price?.toLocaleString()}
                                                    </div>
                                                    {ct.notes && (
                                                        <div className="text-xs text-slate-400 mt-1">{ct.notes}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                                                <Link
                                                    href={`/countries/${clinic.cities?.countries?.slug}/${clinic.cities?.slug}/${ct.treatments?.slug}`}
                                                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                                                >
                                                    Learn about this treatment <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {clinic.description && (
                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">About {clinic.name}</h2>
                                <div className="prose prose-slate max-w-none">
                                    <MarkdownRenderer content={clinic.description} />
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                            <h3 className="font-bold text-emerald-800 mb-4">Why Choose This Clinic?</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                                    <span className="text-slate-700">Verified international standards</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                                    <span className="text-slate-700">Specialized longevity protocols</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                                    <span className="text-slate-700">English-speaking staff</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                                    <span className="text-slate-700">Concierge services available</span>
                                </li>
                            </ul>
                        </div>

                        {clinic.years_established && (
                            <div className="bg-white border border-slate-200 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <Calendar className="w-5 h-5 text-slate-400" />
                                    <span className="text-slate-500 font-medium">Established</span>
                                </div>
                                <p className="text-2xl font-bold text-slate-900">{clinic.years_established}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
