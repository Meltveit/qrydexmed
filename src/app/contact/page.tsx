import Link from 'next/link';
import { Mail, ArrowRight, Building2, User } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us - Qrydex',
    description: 'Contact Qrydex for help finding a clinic or listing your medical center.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="py-20 px-4 text-center bg-gradient-to-br from-emerald-50 to-cyan-50">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                    Get in <span className="gradient-text">Touch</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Whether you are a patient looking for care or a clinic looking to partner,
                    we are here to help.
                </p>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* For Patients */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-emerald-300 transition shadow-sm">
                        <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                            <User className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">For Patients</h2>
                        <p className="text-slate-600 mb-6">
                            Need help finding the right longevity clinic or treatment? Our team can guide you to verified providers worldwide.
                        </p>
                        <ul className="space-y-3 mb-8 text-slate-600">
                            <li className="flex items-center gap-2">
                                <span className="text-emerald-500">✓</span> Free clinic recommendations
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-emerald-500">✓</span> Treatment cost comparisons
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-emerald-500">✓</span> Travel logistics assistance
                            </li>
                        </ul>
                        <div className="space-y-4">
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="patient-email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="patient-email"
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    />
                                </div>
                                <button className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2">
                                    Send Inquiry <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* For Clinics */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-300 transition shadow-sm">
                        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                            <Building2 className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">For Clinics</h2>
                        <p className="text-slate-600 mb-6">
                            Operate a longevity or regenerative medicine center? Join our global directory to reach qualified international patients.
                        </p>
                        <ul className="space-y-3 mb-8 text-slate-600">
                            <li className="flex items-center gap-2">
                                <span className="text-blue-500">✓</span> Verified directory listing
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-blue-500">✓</span> High-intent patient leads
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-blue-500">✓</span> Brand visibility globally
                            </li>
                        </ul>
                        <div className="space-y-4">
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="clinic-email" className="block text-sm font-medium text-slate-700 mb-1">Work Email</label>
                                    <input
                                        type="email"
                                        id="clinic-email"
                                        placeholder="doctor@clinic.com"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                                    List Your Clinic <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                            <p className="text-xs text-slate-400 text-center">
                                Partner inquiries only.
                            </p>
                        </div>
                    </div>
                </div>


            </section>
        </div>
    );
}
