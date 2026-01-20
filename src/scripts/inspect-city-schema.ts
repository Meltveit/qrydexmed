
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function inspectCitySchema() {
    const { data: city, error } = await supabase
        .from('cities')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error:', error.message);
    } else if (city && city.length > 0) {
        console.log('City Keys:', Object.keys(city[0]));
        console.log('Sample City:', city[0]);
    }
}

inspectCitySchema();
