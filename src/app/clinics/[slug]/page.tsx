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

    const city = Array.isArray(clinic.cities) ? clinic.cities[0] : clinic.cities;
    const cityName = city?.name;

    return {
        title: `${clinic.name} - Verified Longevity Clinic in ${cityName} | LongevityIndex`,
        description: clinic.description?.substring(0, 160) || `Book a consultation at ${clinic.name} in ${cityName}. Specialized in longevity and regenerative medicine.`,
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
                    streetAddress: clinic.address || (Array.isArray(clinic.cities) ? clinic.cities[0]?.name : clinic.cities?.name),
                    addressLocality: Array.isArray(clinic.cities) ? clinic.cities[0]?.name : clinic.cities?.name,
                    addressCountry: Array.isArray(clinic.cities) ? (Array.isArray(clinic.cities[0]?.countries) ? clinic.cities[0]?.countries[0]?.name : clinic.cities[0]?.countries?.name) : clinic.cities?.countries?.name,
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
                                <Link href={`/longevity-clinics-in/${Array.isArray(clinic.cities) ? (Array.isArray(clinic.cities[0]?.countries) ? clinic.cities[0]?.countries[0]?.slug : clinic.cities[0]?.countries?.slug) : clinic.cities?.countries?.slug}`} className="hover:text-emerald-600">
                                    {Array.isArray(clinic.cities) ? (Array.isArray(clinic.cities[0]?.countries) ? clinic.cities[0]?.countries[0]?.name : clinic.cities[0]?.countries?.name) : clinic.cities?.countries?.name}
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
                                    {Array.isArray(clinic.cities) ? clinic.cities[0]?.name : clinic.cities?.name}, {Array.isArray(clinic.cities) ? (Array.isArray(clinic.cities[0]?.countries) ? clinic.cities[0]?.countries[0]?.name : clinic.cities[0]?.countries?.name) : clinic.cities?.countries?.name}
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

                            <div className="flex flex-wrap gap-2 mb-8">
                                <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-100">
                                    Longevity Medicine
                                </span>
                                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium border border-slate-200">
                                    Regenerative Therapies
                                </span>
                            </div>

                            {/* About Section - Moved Up */}
                            {clinic.description && (
                                <div className="prose prose-slate max-w-none mb-12">
                                    <h2 className="text-xl font-bold text-slate-900 mb-4">About {clinic.name}</h2>
                                    <MarkdownRenderer content={clinic.description || ''} />
                                </div>
                            )}

                            {/* Accreditations */}
                            {certifications && certifications.length > 0 && (
                                <div className="mb-12">
                                    <h3 className="flex items-center gap-2 font-bold text-lg text-slate-900 mb-4">
                                        <Award className="w-5 h-5 text-emerald-600" />
                                        Accreditations & Certifications
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {certifications.map((cert: string, i: number) => (
                                            <span key={i} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm shadow-sm">
                                                {cert}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Treatments */}
                            <div className="mb-8">
                                <h3 className="flex items-center gap-2 font-bold text-lg text-slate-900 mb-6">
                                    <Shield className="w-5 h-5 text-emerald-600" />
                                    Available Treatments
                                </h3>

                                {clinicTreatments && clinicTreatments.length > 0 ? (
                                    <div className="grid gap-4">
                                        {clinicTreatments.map((ct: any) => (
                                            <div key={ct.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-emerald-300 transition group">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition">
                                                        {ct.treatments?.name}
                                                    </h4>
                                                    {ct.price && (
                                                        <span className="font-bold text-emerald-600">
                                                            ${ct.price.toLocaleString()}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-slate-600 text-sm mb-3">
                                                    {ct.treatments?.short_description}
                                                </p>
                                                <Link
                                                    href={`/longevity-clinics-in/${Array.isArray(clinic.cities) ? (Array.isArray(clinic.cities[0]?.countries) ? clinic.cities[0]?.countries[0]?.slug : clinic.cities[0]?.countries?.slug) : clinic.cities?.countries?.slug}/${Array.isArray(clinic.cities) ? clinic.cities[0]?.slug : clinic.cities?.slug}/${ct.treatments?.slug}`}
                                                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                                                >
                                                    Learn about this treatment <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-500 italic">No specific treatments listed.</p>
                                )}
                            </div>
                        </div>

                        {/* Right Column / CTA Card */}
                        <div className="w-full md:w-80 bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit sticky top-24">
                            <h3 className="font-bold text-slate-900 mb-4">Contact Information</h3>
                            <div className="space-y-4 mb-6">
                                {clinic.website && (
                                    <div className="flex items-start gap-3 text-slate-600 group">
                                        <Globe className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:text-emerald-600 transition" />
                                        <a href={clinic.website} target="_blank" rel="noopener" className="hover:text-emerald-600 transition break-all text-sm font-medium">
                                            Visit Website
                                        </a>
                                    </div>
                                )}
                                {clinic.phone && (
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <Phone className="w-5 h-5 flex-shrink-0" />
                                        <span className="text-sm font-medium">{clinic.phone}</span>
                                    </div>
                                )}
                                <div className="flex items-start gap-3 text-slate-600">
                                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm leading-relaxed font-medium">
                                        {clinic.address ? clinic.address : (
                                            <span className="italic text-slate-400">Location details upon request</span>
                                        )}
                                    </span>
                                </div>
                            </div>

                            {clinic.website ? (
                                <a
                                    href={clinic.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 transition shadow-sm hover:shadow-md"
                                >
                                    Visit Official Website <ArrowRight className="w-4 h-4" />
                                </a>
                            ) : (
                                <Link
                                    href="/contact"
                                    className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white font-semibold py-3 rounded-lg hover:bg-slate-900 transition shadow-sm hover:shadow-md"
                                >
                                    Contact for Access <ArrowRight className="w-4 h-4" />
                                </Link>
                            )}

                            <div className="mt-6 pt-6 border-t border-slate-100">
                                <h4 className="font-semibold text-slate-900 text-sm mb-3">Why Choose This Clinic?</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2 text-sm text-slate-600">
                                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                        <span>Verified international standards</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-slate-600">
                                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                        <span>Specialized longevity protocols</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-slate-600">
                                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                        <span>English-speaking staff</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-slate-600">
                                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                        <span>Concierge services available</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-12">
                        {/* This section is now empty as content moved up */}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
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
