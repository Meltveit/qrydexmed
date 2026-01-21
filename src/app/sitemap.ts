import { createClient } from '@/lib/supabase/server';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.qrydex.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = await createClient();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/treatments`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/longevity-clinics-in`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/countries`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // Fetch countries
    const { data: countries } = await supabase
        .from('countries')
        .select('slug, updated_at');

    // 2. Dynamic Country Pages
    const countryPages: MetadataRoute.Sitemap = (countries || []).map((country) => ({
        url: `${BASE_URL}/longevity-clinics-in/${country.slug}`,
        lastModified: country.updated_at ? new Date(country.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Fetch cities with country slugs
    const { data: cities } = await supabase
        .from('cities')
        .select('slug, updated_at, countries(slug)');

    const cityPages: MetadataRoute.Sitemap = (cities || []).map((city: any) => ({
        url: `${BASE_URL}/longevity-clinics-in/${city.countries?.slug}/${city.slug}`,
        lastModified: city.updated_at ? new Date(city.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Fetch treatment categories
    const { data: categories } = await supabase
        .from('treatment_categories')
        .select('slug');

    const categoryPages: MetadataRoute.Sitemap = (categories || []).map((cat) => ({
        url: `${BASE_URL}/treatments/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Fetch treatments with category slugs
    const { data: treatments } = await supabase
        .from('treatments')
        .select('slug, updated_at, treatment_categories(slug)');

    const treatmentPages: MetadataRoute.Sitemap = (treatments || []).map((t: any) => ({
        url: `${BASE_URL}/treatments/${t.treatment_categories?.slug}/${t.slug}`,
        lastModified: t.updated_at ? new Date(t.updated_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    // 3. Country Treatment Indices (NEW)
    const countryTreatmentIndices: MetadataRoute.Sitemap = (countries || []).map((country) => ({
        url: `${BASE_URL}/longevity-treatments-in/${country.slug}`,
        lastModified: country.updated_at ? new Date(country.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 4. Country Treatment Pages (NEW - "Stem Cells in Mexico")
    const countryTreatmentPages: MetadataRoute.Sitemap = [];
    for (const country of countries || []) {
        for (const treatment of treatments || []) {
            const tData = treatment as any;
            countryTreatmentPages.push({
                url: `${BASE_URL}/longevity-treatments-in/${country.slug}/${tData.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.9,
            });
        }
    }

    // Generate money pages (treatment in city) - HIGH PRIORITY
    const moneyPages: MetadataRoute.Sitemap = [];

    for (const city of cities || []) {
        const cityData = city as any;
        for (const treatment of treatments || []) {
            const treatmentData = treatment as any;
            moneyPages.push({
                url: `${BASE_URL}/longevity-treatments-in/${cityData.countries?.slug}/${cityData.slug}/${treatmentData.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 1.0, // Highest priority - money pages
            });
        }
    }

    return [
        ...staticPages,
        ...countryPages,
        ...countryTreatmentIndices,
        ...cityPages,
        ...categoryPages,
        ...treatmentPages,
        ...countryTreatmentPages,
        ...moneyPages,
    ];
}
