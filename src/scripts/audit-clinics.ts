
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function inspectExisitingData() {
    console.log('--- Auditing Clinics Data ---');

    const { data: clinics, error } = await supabase
        .from('clinics')
        .select('id, name, description, website, is_verified, certifications')
        .order('name');

    if (error) {
        console.error('Error fetching clinics:', error);
        return;
    }

    console.log(`Found ${clinics.length} clinics.`);

    // Dump to JSON for AI review
    if (clinics && clinics.length > 0) {
        fs.writeFileSync(
            path.resolve(__dirname, 'current_clinics.json'),
            JSON.stringify(clinics, null, 2)
        );
        console.log(`Exported ${clinics.length} clinics tosrc/scripts/current_clinics.json`);
    }
}

inspectExisitingData();
