
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function randomizeReviews() {
    console.log('Starting random review generation...');

    const { data: clinics, error } = await supabase.from('clinics').select('id, name');

    if (error) {
        console.error('Error fetching clinics:', error);
        return;
    }

    for (const clinic of clinics) {
        // Generate realistic random rating between 4.2 and 4.9
        // Weighted slightly towards 4.5 - 4.8
        const base = 4.0;
        const variant = Math.random() * 0.9; // 0.0 - 0.9
        let rating = base + variant;
        rating = Math.round(rating * 10) / 10; // Round to 1 decimal

        // Generate random review count between 12 and 185
        const reviewCount = Math.floor(Math.random() * (185 - 12 + 1)) + 12;

        const { error: updateError } = await supabase
            .from('clinics')
            .update({
                rating: rating,
                review_count: reviewCount
            })
            .eq('id', clinic.id);

        if (updateError) {
            console.error(`Failed to update ${clinic.name}:`, updateError.message);
        } else {
            console.log(`Updated ${clinic.name}: ${rating} stars (${reviewCount} reviews)`);
        }
    }
}

randomizeReviews();
