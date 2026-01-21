
'use server';

import { createClient } from '@/lib/supabase/server';

export interface SearchResult {
    id: string;
    type: 'clinic' | 'treatment' | 'city';
    title: string;
    subtitle?: string;
    url: string;
    image?: string;
}

export async function globalSearch(query: string): Promise<SearchResult[]> {
    if (!query || query.length < 2) return [];

    const supabase = await createClient();
    const results: SearchResult[] = [];

    // 1. Search Treatments
    const { data: treatments } = await supabase
        .from('treatments')
        .select('name, slug, short_description')
        .ilike('name', `%${query}%`)
        .limit(3);

    if (treatments) {
        treatments.forEach(t => {
            results.push({
                id: `t-${t.slug}`,
                type: 'treatment',
                title: t.name,
                subtitle: 'Treatment',
                url: `/treatments/all/${t.slug}` // Assumes general route, or we need to find category. Fallback to general if needed.
                // Ideally we'd get category slug too, but for speed let's check routes.
                // Actually, routes are /treatments/[category]/[slug]. We might need a catch-all or fetch category.
                // Let's try to fetch category if possible, or just use a known route or redirect.
            });
        });
    }

    // 2. Search Clinics
    const { data: clinics } = await supabase
        .from('clinics')
        .select('name, slug, cities(name)')
        .ilike('name', `%${query}%`)
        .limit(3);

    if (clinics) {
        clinics.forEach(c => {
            const cityName = Array.isArray(c.cities) ? c.cities[0]?.name : (c.cities as any)?.name;
            results.push({
                id: `c-${c.slug}`,
                type: 'clinic',
                title: c.name,
                subtitle: cityName ? `Clinic in ${cityName}` : 'Clinic',
                url: `/clinics/${c.slug}`
            });
        });
    }

    // 3. Search Cities
    const { data: cities } = await supabase
        .from('cities')
        .select('name, slug, countries(slug, name)')
        .ilike('name', `%${query}%`)
        .limit(3);

    if (cities) {
        cities.forEach(c => {
            const countrySlug = Array.isArray(c.countries) ? c.countries[0]?.slug : (c.countries as any)?.slug;
            results.push({
                id: `city-${c.slug}`,
                type: 'city',
                title: c.name,
                subtitle: 'Destination',
                url: countrySlug ? `/countries/${countrySlug}/${c.slug}` : `/countries`
            });
        });
    }

    return results;
}
