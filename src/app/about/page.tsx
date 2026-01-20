import Link from 'next/link';
import { Heart, Shield, Users, Award, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About LongevityIndex - Our Mission',
    description: 'LongevityIndex helps people find the best longevity clinics and regenerative medicine centers worldwide. Learn about our mission and values.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-cyan-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                        Helping You <span className="gradient-text">Live Longer, Better</span>
                    </h1>
                    <p className="text-xl text-slate-600">
                        LongevityIndex is the world's comprehensive directory for longevity clinics,
                        regenerative medicine centers, and cutting-edge anti-aging treatments.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-slate-900">Our Mission</h2>
                    <p className="text-lg text-slate-600 mb-6">
                        The longevity medicine field is rapidly advancing, with breakthrough treatments
                        becoming available at clinics around the world. However, finding reliable
                        information about these treatments and the clinics that offer them has been
                        challenging—until now.
                    </p>
                    <p className="text-lg text-slate-600 mb-6">
                        We believe everyone deserves access to information about treatments that could
                        extend their healthspan and quality of life. LongevityIndex bridges the gap
                        between cutting-edge science and patients seeking these therapies.
                    </p>
                    <p className="text-lg text-slate-600">
                        Our mission is to provide transparent, research-backed information about
                        longevity treatments and connect patients with verified clinics worldwide.
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 px-4 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-10 text-center text-slate-900">Our Values</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl p-6 border border-slate-200">
                            <Shield className="w-10 h-10 text-emerald-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-3 text-slate-900">Transparency</h3>
                            <p className="text-slate-600">
                                We present treatment information honestly, including both potential
                                benefits and risks. We cite research and clearly indicate FDA approval status.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-slate-200">
                            <Award className="w-10 h-10 text-emerald-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-3 text-slate-900">Verification</h3>
                            <p className="text-slate-600">
                                Clinics in our directory are verified for licensing, certifications, and
                                patient outcomes. We prioritize quality over quantity.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-slate-200">
                            <Heart className="w-10 h-10 text-emerald-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-3 text-slate-900">Patient-First</h3>
                            <p className="text-slate-600">
                                Our recommendations prioritize patient safety and outcomes. We don't
                                accept payment for placement or favorable reviews.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-slate-200">
                            <Users className="w-10 h-10 text-emerald-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-3 text-slate-900">Global Access</h3>
                            <p className="text-slate-600">
                                We believe geography shouldn't limit access to promising treatments.
                                We help patients navigate medical tourism safely.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
                        <h3 className="text-xl font-semibold mb-4 text-amber-800">Medical Disclaimer</h3>
                        <p className="text-amber-700 mb-4">
                            LongevityIndex provides educational information only and is not a substitute
                            for professional medical advice, diagnosis, or treatment. Always seek the
                            advice of your physician or other qualified health provider with any
                            questions you may have regarding a medical condition.
                        </p>
                        <p className="text-amber-700">
                            Information about treatments that are not FDA approved is provided for
                            educational purposes. We do not endorse or recommend any specific treatment
                            or clinic. Patients should conduct their own due diligence before pursuing
                            any medical treatment.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-cyan-600">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4 text-white">Ready to Explore?</h2>
                    <p className="text-emerald-100 mb-8">
                        Browse our directory of treatments and clinics worldwide.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/treatments"
                            className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition"
                        >
                            Explore Treatments <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/clinics"
                            className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-400 transition"
                        >
                            Browse Clinics <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
