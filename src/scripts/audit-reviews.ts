
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function inspectData() {
    console.log('--- Inspecting Reviews ---');
    // Check if reviews table exists and sample data
    const { data: reviews, error: reviewError } = await supabase
        .from('reviews')
        .select('*')
        .limit(5);

    if (reviewError) {
        console.error('Error fetching reviews:', reviewError.message);
    } else if (!reviews || reviews.length === 0) {
        console.log('No reviews found.');
    } else {
        console.log(`Found ${reviews.length} sample reviews:`);
        reviews.forEach(r => {
            console.log(`- [${r.rating} stars] ${r.author_name}: "${r.comment?.substring(0, 50)}..."`);
        });
    }

    console.log('\n--- Inspecting Clinics (Pricing & Tourist Score) ---');
    const { data: clinics, error: clinicError } = await supabase
        .from('clinics')
        .select('name, price_per_night, tourist_score')
        .limit(10);

    if (clinicError) {
        console.error('Error fetching clinics:', clinicError.message);
    } else {
        clinics.forEach(c => {
            console.log(`${c.name}: Price=${c.price_per_night}, TouristScore=${c.tourist_score}`);
        });
    }
}

inspectData();
