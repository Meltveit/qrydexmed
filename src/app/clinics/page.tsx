import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Building2, ArrowRight, Star, ExternalLink, MapPin } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Clinics - LongevityIndex',
    description: 'Browse verified longevity clinics and regenerative medicine centers worldwide. Compare ratings, treatments, and prices.',
};

export default async function ClinicsPage() {
    const supabase = await createClient();

    const { data: clinics } = await supabase
        .from('clinics')
        .select(`
      *,
      cities(name, slug, countries(name, slug, flag_emoji))
    `)
        .order('rating', { ascending: false });

    // Group by country
    const byCountry = clinics?.reduce((acc: Record<string, any[]>, clinic) => {
        const country = (clinic.cities as any)?.countries?.name || 'Other';
        if (!acc[country]) acc[country] = [];
        acc[country].push(clinic);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="py-16 px-4 text-center bg-gradient-to-br from-emerald-50 to-cyan-50">
                <Building2 className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                    Verified <span className="gradient-text">Clinics</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Browse {clinics?.length || 0} verified longevity clinics and regenerative medicine centers worldwide.
                </p>
            </section>

            {/* Clinics by Country */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                {byCountry && Object.entries(byCountry).map(([country, countryClinicsList]) => (
                    <div key={country} className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                            <span className="text-3xl">{(countryClinicsList[0]?.cities as any)?.countries?.flag_emoji}</span>
                            {country}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {countryClinicsList.map((clinic: any) => (
                                <div
                                    key={clinic.id}
                                    className="bg-white border border-slate-200 rounded-xl p-6 hover:border-emerald-300 transition"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <Link href={`/clinics/${clinic.slug}`} className="hover:text-emerald-600 transition">
                                                <h3 className="text-xl font-semibold text-slate-900">{clinic.name}</h3>
                                            </Link>
                                            <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                                                <MapPin className="w-3 h-3" />
                                                {clinic.cities?.name}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                            <span className="font-semibold">{clinic.rating}</span>
                                            <span className="text-slate-400 text-sm">({clinic.review_count})</span>
                                        </div>
                                    </div>

                                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{clinic.description}</p>

                                    {clinic.certifications && (() => {
                                        let certs: string[] = [];
                                        try {
                                            certs = typeof clinic.certifications === 'string'
                                                ? JSON.parse(clinic.certifications)
                                                : clinic.certifications;
                                        } catch { certs = []; }
                                        return certs.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {certs.slice(0, 2).map((cert: string, i: number) => (
                                                    <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                                        {cert}
                                                    </span>
                                                ))}
                                            </div>
                                        );
                                    })()}

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <Link
                                            href={`/clinics/${clinic.slug}`}
                                            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                                        >
                                            View Clinic Profile →
                                        </Link>
                                        {clinic.website && (
                                            <a
                                                href={clinic.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-500 hover:text-slate-700 flex items-center gap-1 text-sm"
                                            >
                                                Website <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
