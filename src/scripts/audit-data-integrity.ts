
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function auditData() {
    console.log('🔍 AUDITING CLINIC DATA INTEGRITY...\n');

    const { data: clinics, error } = await supabase
        .from('clinics')
        .select('name, address, website, description');

    if (error || !clinics) {
        console.error('Error:', error);
        return;
    }

    const total = clinics.length;
    const withAddress = clinics.filter(c => c.address && c.address.length > 5).length;
    const withWebsite = clinics.filter(c => c.website && c.website.includes('.')).length;

    console.log(`📊 Statistics:`);
    console.log(`   Total Clinics: ${total}`);
    console.log(`   With Address:  ${withAddress} (${((withAddress / total) * 100).toFixed(1)}%)`);
    console.log(`   With Website:  ${withWebsite} (${((withWebsite / total) * 100).toFixed(1)}%)`);

    console.log('\n🏥 Sample Data (First 3):');
    clinics.slice(0, 3).forEach(c => {
        console.log(`   - ${c.name}`);
        console.log(`     Address: ${c.address || '❌ MISSING'}`);
        console.log(`     Website: ${c.website || '❌ MISSING'}`);
    });
}

auditData();
