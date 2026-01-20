'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle } from 'lucide-react';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        treatment: '',
        destination: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // In production, this would submit to an API
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-4">
                <div className="max-w-md text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4 text-slate-900">Thank You!</h1>
                    <p className="text-slate-600 mb-8">
                        We've received your inquiry and will connect you with the best clinics within 24-48 hours.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                    >
                        Back to Home <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-cyan-50">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                        Get a <span className="gradient-text">Free Consultation</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Tell us about your treatment goals and we'll connect you with the best clinics worldwide.
                    </p>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-slate-50 rounded-xl p-6">
                            <h3 className="font-semibold mb-4 text-slate-900">Why Contact Us?</h3>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
                                    <span>Free clinic recommendations</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
                                    <span>Price comparisons</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
                                    <span>Help with travel logistics</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
                                    <span>Verified clinic connections</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-6">
                            <h3 className="font-semibold mb-4 text-slate-900">Contact Direct</h3>
                            <div className="space-y-3 text-sm">
                                <a href="mailto:hello@longevityindex.com" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600">
                                    <Mail className="w-4 h-4" />
                                    hello@longevityindex.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="md:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-8">
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Your Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        placeholder="John Smith"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        placeholder="john@email.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone (optional)</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        placeholder="+1 234 567 8900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Treatment Interest</label>
                                    <select
                                        value={formData.treatment}
                                        onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="">Select treatment...</option>
                                        <option value="stem-cell">Stem Cell Therapy</option>
                                        <option value="nad">NAD+ IV Therapy</option>
                                        <option value="exosomes">Exosome Therapy</option>
                                        <option value="prp">PRP Therapy</option>
                                        <option value="diagnostics">Full Body MRI / Diagnostics</option>
                                        <option value="hormones">Hormone Optimization</option>
                                        <option value="biohacking">Biohacking (Cryo, HBOT, etc.)</option>
                                        <option value="other">Other / Not Sure</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Destination</label>
                                <select
                                    value={formData.destination}
                                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="">Open to suggestions...</option>
                                    <option value="mexico">Mexico (Tijuana, Cancun)</option>
                                    <option value="colombia">Colombia (Medellin)</option>
                                    <option value="thailand">Thailand (Bangkok)</option>
                                    <option value="panama">Panama</option>
                                    <option value="uae">Dubai, UAE</option>
                                    <option value="usa">United States</option>
                                    <option value="europe">Europe</option>
                                    <option value="asia">Asia (Singapore, Korea)</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Tell us about your goals</label>
                                <textarea
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    placeholder="What condition are you looking to address? Any specific questions?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                            >
                                Submit Inquiry <ArrowRight className="w-4 h-4" />
                            </button>

                            <p className="text-xs text-slate-400 mt-4 text-center">
                                By submitting, you agree to receive communications from LongevityIndex and our partner clinics.
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
