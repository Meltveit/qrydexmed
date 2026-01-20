
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const majorClinics = [
    "R3 Stem Cell International",
    "Vivid Health",
    "BioXcellerator",
    "Cellular Performance Institute",
    "European Wellness Center",
    "Swiss Biological Medicine Center",
    "Hope4Cancer",
    "Panama Stem Cell Institute"
];

async function auditRemaining() {
    // Fetch clinics NOT in the major list
    const { data: clinics, error } = await supabase
        .from('clinics')
        .select('name, description, meta_description, meta_title')
        .not('name', 'in', `(${majorClinics.map(n => `"${n}"`).join(',')})`)
        .limit(5);

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log(`--- Auditing Sample of Remaining Clinics ---`);
    clinics.forEach(c => {
        console.log(`\nName: ${c.name}`);
        console.log(`Meta Title: ${c.meta_title || 'MISSING'}`);
        console.log(`Meta Desc: ${c.meta_description || 'MISSING (Will fallback to description)'}`);
        console.log(`Description Start: "${c.description?.substring(0, 100)}..."`);
        console.log(`Description Length: ${c.description?.length}`);
    });
}

auditRemaining();
