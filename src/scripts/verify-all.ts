
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function verifyAll() {
    console.log('🔍 VERIFYING DATABASE STATE...\n');

    // 1. Treatments
    const { data: treatments } = await supabase
        .from('treatments')
        .select('name, full_description')
        .not('full_description', 'is', null);

    if (treatments) {
        console.log(`✅ Treatments with detailed descriptions: ${treatments.length}`);
        console.log(`   Sample: ${treatments[0]?.name} (${treatments[0]?.full_description.length} chars)`);
    }

    // 2. Clinics (Bio + Ratings)
    const { data: clinics } = await supabase
        .from('clinics')
        .select('name, description, rating, review_count');

    if (clinics) {
        const updatedBio = clinics.filter(c => c.description && c.description.length > 50).length;
        const rated = clinics.filter(c => c.rating > 0 && c.review_count > 0).length;
        console.log(`\n✅ Clinics with descriptions: ${updatedBio}/${clinics.length}`);
        console.log(`✅ Clinics with ratings: ${rated}/${clinics.length}`);
        const sample = clinics.find(c => c.name.includes("Hope4Cancer"));
        if (sample) console.log(`   Sample: ${sample.name} - ${sample.rating} stars, ${sample.review_count} reviews`);
    }

    // 3. Cities (Pricing)
    const { data: cities } = await supabase
        .from('cities')
        .select('name, avg_hotel_cost_usd, medical_hub_ranking')
        .not('avg_hotel_cost_usd', 'is', null);

    if (cities) {
        console.log(`\n✅ Cities with updated pricing/ranking: ${cities.length}`);
        console.log(`   Sample: ${cities[0]?.name} ($${cities[0]?.avg_hotel_cost_usd}, Rank #${cities[0]?.medical_hub_ranking})`);
    }
}

verifyAll();
