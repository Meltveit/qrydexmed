
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function inspectSchema() {
    console.log('--- Inspecting Clinics Schema ---');
    const { data: clinic, error: clinicError } = await supabase
        .from('clinics')
        .select('*')
        .limit(1);

    if (clinicError) {
        console.error('Error fetching clinic:', clinicError.message);
    } else if (clinic && clinic.length > 0) {
        console.log('Clinic Keys:', Object.keys(clinic[0]));
        console.log('Sample Clinic:', clinic[0]);
    } else {
        console.log('No clinics found.');
    }

    console.log('\n--- Inspecting Reviews Table ---');
    const { data: reviews, error: reviewError } = await supabase
        .from('reviews')
        .select('*')
        .limit(1);

    if (reviewError) {
        console.error('Error fetching reviews:', reviewError.message); // Will error if table doesn't exist
    } else {
        console.log('Reviews exist. Keys:', reviews && reviews.length > 0 ? Object.keys(reviews[0]) : 'Table empty');
    }
}

inspectSchema();
