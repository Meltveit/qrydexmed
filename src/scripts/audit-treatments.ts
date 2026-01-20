
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

async function inspectTreatmentData() {
    console.log('--- Auditing Treatment Data ---');

    const { data: treatments, error } = await supabase
        .from('treatments')
        .select('*')
        .order('name');

    if (error) {
        console.error('Error fetching treatments:', error);
        return;
    }

    console.log(`Found ${treatments.length} treatments.`);

    if (treatments && treatments.length > 0) {
        fs.writeFileSync(
            path.resolve(__dirname, 'current_treatments.json'),
            JSON.stringify(treatments, null, 2)
        );
        console.log(`Exported ${treatments.length} treatments to src/scripts/current_treatments.json`);

        // Log headers to see content length
        treatments.forEach(t => {
            console.log(`[${t.name}]: Desc Len: ${t.full_description?.length || 0}`);
        });
    }
}

inspectTreatmentData();
