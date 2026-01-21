import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { MapPin, Activity, Search, ArrowRight, Star, Globe, Users, Sparkles, FlaskConical, Heart } from 'lucide-react';

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch featured data
  const { data: countries } = await supabase
    .from('countries')
    .select('*')
    .order('medical_tourism_score', { ascending: false })
    .limit(6);

  const { data: treatments } = await supabase
    .from('treatments')
    .select('*, treatment_categories(name, slug)')
    .order('avg_price_usd', { ascending: false })
    .limit(6);

  const { data: categories } = await supabase
    .from('treatment_categories')
    .select('*')
    .order('display_order');

  const { data: clinicCount } = await supabase
    .from('clinics')
    .select('id', { count: 'exact' });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            The world's longevity clinic directory
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
            Find the World's Best <span className="gradient-text">Longevity Clinics</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto">
            Compare stem cell therapy, NAD+ infusions, and cutting-edge anti-aging treatments
            at top clinics worldwide. Research-backed information to guide your journey.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-2 flex items-center shadow-lg border border-slate-200">
            <Search className="w-5 h-5 text-slate-400 ml-4" />
            <input
              type="text"
              placeholder="Search treatments, clinics, or destinations..."
              className="flex-1 bg-transparent px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition">
              Search
            </button>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 mt-12">
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">{countries?.length || 20}+</p>
              <p className="text-slate-500">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">{clinicCount?.length || 18}+</p>
              <p className="text-slate-500">Clinics</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">{treatments?.length || 25}+</p>
              <p className="text-slate-500">Treatments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-900">Explore Treatment Categories</h2>
          <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto">
            From regenerative medicine to advanced diagnostics, find the right treatment for your goals.
          </p>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories?.map((category) => (
              <Link
                key={category.id}
                href={`/treatments/${category.slug}`}
                className="bg-white border border-slate-200 rounded-xl p-6 text-center card-hover hover:border-emerald-300 group"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-100 transition">
                  <FlaskConical className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Treatments */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Popular Treatments</h2>
              <p className="text-slate-600">Research-backed longevity interventions</p>
            </div>
            <Link href="/treatments" className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments?.slice(0, 6).map((treatment) => (
              <Link
                key={treatment.id}
                href={`/treatments/${treatment.treatment_categories?.slug}/${treatment.slug}`}
                className="bg-white border border-slate-200 rounded-xl p-6 card-hover hover:border-emerald-300 group"
              >
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-medium">
                  {treatment.treatment_categories?.name}
                </span>
                <h3 className="text-xl font-semibold mt-3 mb-2 group-hover:text-emerald-600 transition text-slate-900">
                  {treatment.name}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-4">{treatment.short_description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-600 font-semibold">
                    From ${treatment.price_range_min?.toLocaleString()}
                  </span>
                  <span className="text-slate-400">{treatment.fda_status}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Top Destinations</h2>
              <p className="text-slate-600">World-class medical tourism hubs</p>
            </div>
            <Link href="/longevity-clinics-in" className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries?.map((country) => (
              <Link
                key={country.id}
                href={`/longevity-clinics-in/${country.slug}`}
                className="bg-white border border-slate-200 rounded-xl p-6 card-hover hover:border-emerald-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{country.flag_emoji}</span>
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-emerald-600 transition text-slate-900">
                      {country.name}
                    </h3>
                    <p className="text-slate-500 text-sm">{country.continent}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500" />
                    <span className="text-slate-600">Healthcare: {country.healthcare_rating}/10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    <span className="text-slate-600">Tourism: {country.medical_tourism_score}/100</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Why LongevityIndex?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FlaskConical className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Research-Backed</h3>
              <p className="text-slate-600">Every treatment includes scientific references, mechanisms of action, and clinical evidence.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Global Coverage</h3>
              <p className="text-slate-600">Clinics across 20+ countries, from Mexico to Thailand to Europe.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Verified Clinics</h3>
              <p className="text-slate-600">We verify licensing, certifications, and patient outcomes before listing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Start Your Longevity Journey?</h2>
          <p className="text-emerald-100 mb-8">Get personalized recommendations and free consultations from top clinics worldwide.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-xl font-semibold hover:bg-emerald-50 transition"
            >
              Get Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/treatments"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-400 transition"
            >
              Explore Treatments
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
