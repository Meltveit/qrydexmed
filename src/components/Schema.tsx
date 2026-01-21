interface MedicalProcedureSchemaProps {
    name: string;
    description: string;
    procedureType?: string;
    bodyLocation?: string;
    followup?: string;
    howPerformed?: string;
    preparation?: string;
    status?: 'Experimental' | 'Approved' | 'NotApproved';
    image?: string;
}

interface MedicalClinicSchemaProps {
    name: string;
    description: string;
    address: {
        streetAddress: string;
        addressLocality: string;
        addressCountry: string;
    };
    telephone?: string;
    url?: string;
    priceRange?: string;
    rating?: number;
    reviewCount?: number;
    geo?: {
        latitude: number;
        longitude: number;
    };
}

interface FAQItem {
    question: string;
    answer: string;
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

export function MedicalProcedureSchema({
    name,
    description,
    procedureType = 'TherapeuticProcedure',
    bodyLocation,
    followup,
    howPerformed,
    preparation,
    status = 'Experimental'
}: MedicalProcedureSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'MedicalProcedure',
        name,
        description,
        procedureType: `https://schema.org/${procedureType}`,
        ...(bodyLocation && { bodyLocation }),
        ...(followup && { followup }),
        ...(howPerformed && { howPerformed }),
        ...(preparation && { preparation }),
        status: `https://schema.org/${status}`,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function MedicalClinicSchema({
    name,
    description,
    address,
    telephone,
    url,
    priceRange,
    rating,
    reviewCount,
    geo,
}: MedicalClinicSchemaProps) {
    const schema: any = {
        '@context': 'https://schema.org',
        '@type': 'MedicalClinic',
        name,
        description,
        address: {
            '@type': 'PostalAddress',
            streetAddress: address.streetAddress,
            addressLocality: address.addressLocality,
            addressCountry: address.addressCountry,
        },
        ...(telephone && { telephone }),
        ...(url && { url }),
        ...(priceRange && { priceRange }),
        ...(geo && {
            geo: {
                '@type': 'GeoCoordinates',
                latitude: geo.latitude,
                longitude: geo.longitude,
            },
        }),
    };

    if (rating && reviewCount) {
        schema.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: rating,
            reviewCount: reviewCount,
            bestRating: 5,
            worstRating: 1,
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function OrganizationSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Qrydex',
        url: 'https://www.qrydex.com',
        logo: 'https://www.qrydex.com/logo.png',
        description: 'The world\'s AI index for longevity clinics and regenerative medicine centers.',
        sameAs: [
            'https://twitter.com/qrydex',
            'https://linkedin.com/company/qrydex',
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function WebSiteSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'LongevityIndex',
        url: 'https://longevityindex.com',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://longevityindex.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface OfferSchemaProps {
    name: string;
    description: string;
    price: number;
    priceCurrency: string;
    url: string;
    seller: {
        name: string;
        url?: string;
    };
}

export function OfferSchema({ name, description, price, priceCurrency, url, seller }: OfferSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Offer',
        name,
        description,
        price,
        priceCurrency,
        url,
        seller: {
            '@type': 'Organization',
            name: seller.name,
            ...(seller.url && { url: seller.url }),
        },
        availability: 'https://schema.org/InStock',
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
