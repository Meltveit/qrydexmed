import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">🧬</span>
                            <span className="font-bold text-xl text-white">Qrydex</span>
                        </Link>
                        <p className="text-slate-400 text-sm">
                            The world's AI index for longevity clinics and regenerative medicine centers.
                        </p>
                    </div>

                    {/* Treatments */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Treatments</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/treatments/regenerative-medicine" className="hover:text-white transition">Regenerative Medicine</Link></li>
                            <li><Link href="/treatments/cell-optimization" className="hover:text-white transition">Cell Optimization</Link></li>
                            <li><Link href="/treatments/hormone-optimization" className="hover:text-white transition">Hormone Optimization</Link></li>
                            <li><Link href="/treatments/advanced-diagnostics" className="hover:text-white transition">Advanced Diagnostics</Link></li>
                            <li><Link href="/treatments/physical-biohacks" className="hover:text-white transition">Physical Biohacks</Link></li>
                        </ul>
                    </div>

                    {/* Destinations */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Top Destinations</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/countries/mexico" className="hover:text-white transition">Mexico</Link></li>
                            <li><Link href="/countries/thailand" className="hover:text-white transition">Thailand</Link></li>
                            <li><Link href="/countries/colombia" className="hover:text-white transition">Colombia</Link></li>
                            <li><Link href="/countries/panama" className="hover:text-white transition">Panama</Link></li>
                            <li><Link href="/countries/uae" className="hover:text-white transition">Dubai, UAE</Link></li>
                            <li><Link href="/countries" className="hover:text-white transition text-emerald-400">View All →</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                            <li><Link href="/clinics" className="hover:text-white transition">All Clinics</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-slate-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-500">
                            © {new Date().getFullYear()} Qrydex. All rights reserved.
                        </p>
                        <p className="text-xs text-slate-500 max-w-xl text-center md:text-right">
                            Medical Disclaimer: This website provides educational information only.
                            Always consult a qualified healthcare provider before pursuing any treatment.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
