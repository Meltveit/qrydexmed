
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function auditTreatments() {
    const { data: treatments } = await supabase
        .from('treatments')
        .select('name, full_description');

    if (!treatments) return;

    console.log('Treatments with "Generic" or short content:');
    treatments.forEach(t => {
        // Check for generic markers or short length
        if (t.full_description?.includes("leverages established medical principles") ||
            t.full_description?.length < 500) {
            console.log(`- ${t.name} (Length: ${t.full_description?.length || 0})`);
        }
    });
}

auditTreatments();
