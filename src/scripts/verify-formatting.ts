
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function verifyFormatting() {
    console.log('🔍 CHECKING CLINIC DESCRIPTION FORMATTING...\n');

    // Fetch 5 random clinics
    const { data: clinics } = await supabase
        .from('clinics')
        .select('name, description')
        .limit(5);

    if (clinics) {
        clinics.forEach(c => {
            console.log(`\n🏥 Clinic: ${c.name}`);
            // Check for double newlines
            const hasBreaks = c.description.includes('\n\n');
            console.log(`   Has Paragraph Breaks (\\n\\n): ${hasBreaks ? '✅ YES' : '❌ NO'}`);

            // Print a snippet showing the break if it exists
            if (hasBreaks) {
                const snippet = c.description.split('\n\n')[1]?.substring(0, 100);
                console.log(`   Snippet (Para 2): "${snippet}..."`);
            } else {
                console.log(`   Snippet (First 100 chars): "${c.description.substring(0, 100)}..."`);
            }
        });
    }
}

verifyFormatting();
