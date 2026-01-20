
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const cityUpdates = [
    // --- ASIA ---
    { slug: 'bangkok', avg_hotel_cost_usd: 85, medical_hub_ranking: 1 },
    { slug: 'seoul', avg_hotel_cost_usd: 150, medical_hub_ranking: 3 },
    { slug: 'tokyo', avg_hotel_cost_usd: 180, medical_hub_ranking: 5 },
    { slug: 'bali', avg_hotel_cost_usd: 120, medical_hub_ranking: 12 },

    // --- AMERICAS ---
    { slug: 'cancun', avg_hotel_cost_usd: 200, medical_hub_ranking: 4 },
    { slug: 'tijuana', avg_hotel_cost_usd: 90, medical_hub_ranking: 6 },
    { slug: 'medellin', avg_hotel_cost_usd: 75, medical_hub_ranking: 8 },
    { slug: 'los-angeles', avg_hotel_cost_usd: 250, medical_hub_ranking: 2 },
    { slug: 'miami', avg_hotel_cost_usd: 280, medical_hub_ranking: 9 },

    // --- EUROPE ---
    { slug: 'zurich', avg_hotel_cost_usd: 350, medical_hub_ranking: 7 },
    { slug: 'london', avg_hotel_cost_usd: 300, medical_hub_ranking: 10 },
    { slug: 'istanbul', avg_hotel_cost_usd: 110, medical_hub_ranking: 11 },
];

async function updateCityData() {
    console.log('Starting city data update...');

    for (const city of cityUpdates) {
        const { error } = await supabase
            .from('cities')
            .update({
                avg_hotel_cost_usd: city.avg_hotel_cost_usd,
                medical_hub_ranking: city.medical_hub_ranking
            })
            .eq('slug', city.slug);

        if (error) {
            console.error(`Failed to update ${city.slug}:`, error.message);
        } else {
            console.log(`✅ Updated ${city.slug}: $${city.avg_hotel_cost_usd}/night, Rank #${city.medical_hub_ranking}`);
        }
    }
}

updateCityData();
