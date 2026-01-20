import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - LongevityIndex',
    description: 'Privacy policy for LongevityIndex, explaining how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-slate-900">Privacy Policy</h1>
                <p className="text-slate-500 mb-8">Last updated: January 2026</p>

                <div className="prose prose-slate max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-slate-900">1. Information We Collect</h2>
                        <p className="text-slate-600 mb-4">
                            We collect information you provide directly to us, such as when you fill out our
                            contact form, subscribe to our newsletter, or communicate with us. This may include:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Name and contact information (email, phone number)</li>
                            <li>Treatment interests and health goals</li>
                            <li>Preferred destinations for treatment</li>
                            <li>Any messages or inquiries you submit</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-slate-900">2. How We Use Your Information</h2>
                        <p className="text-slate-600 mb-4">We use the information we collect to:</p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Respond to your inquiries and provide clinic recommendations</li>
                            <li>Connect you with clinics that match your treatment interests</li>
                            <li>Send you relevant information about treatments and clinics</li>
                            <li>Improve our website and services</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-slate-900">3. Information Sharing</h2>
                        <p className="text-slate-600 mb-4">
                            We may share your information with clinics that you express interest in so they
                            can contact you about their services. We will always inform you before sharing
                            your information with any specific clinic.
                        </p>
                        <p className="text-slate-600">
                            We do not sell your personal information to third parties for marketing purposes.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-slate-900">4. Cookies and Analytics</h2>
                        <p className="text-slate-600 mb-4">
                            We use cookies and similar technologies to improve your browsing experience,
                            analyze website traffic, and understand how visitors use our site. You can
                            control cookie settings through your browser preferences.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-slate-900">5. Data Security</h2>
                        <p className="text-slate-600">
                            We implement appropriate security measures to protect your personal information.
                            However, no method of transmission over the Internet is 100% secure, and we cannot
                            guarantee absolute security.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-slate-900">6. Your Rights</h2>
                        <p className="text-slate-600 mb-4">You have the right to:</p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Access the personal information we hold about you</li>
                            <li>Request correction of inaccurate information</li>
                            <li>Request deletion of your information</li>
                            <li>Opt out of marketing communications</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-slate-900">7. Contact Us</h2>
                        <p className="text-slate-600">
                            If you have questions about this Privacy Policy or your personal information,
                            please contact us at privacy@longevityindex.com.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
