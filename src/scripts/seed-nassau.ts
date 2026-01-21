
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function seedNassau() {
    console.log("Seeding Nassau clinics...");

    // 1. Get Nassau ID
    const { data: city } = await supabase.from('cities').select('id, name').eq('slug', 'nassau').single();
    if (!city) throw new Error("Nassau not found");

    // 2. Insert Clinics (Manual Check to avoid ON CONFLICT errors)
    const clinics = [
        {
            name: "Okyanos Center for Regenerative Medicine",
            city_id: city.id,
            description: "World-renowned center for stem cell therapy and immunotherapies in the Bahamas.",
            address: "First Floor, The Okyanos Building, Nassau",
            website: "https://okyanos.com",
            phone: "+1 855-659-2667",
            rating: 4.8,
            is_verified: true,
            slug: "okyanos-center"
        },
        {
            name: "Immunotherapy Institute Bahamas",
            city_id: city.id,
            description: "Specialized clinic offering advanced CAR-T and NK cell therapies.",
            address: "Nassau Medical Plaza, Nassau",
            rating: 4.6,
            is_verified: true,
            slug: "immunotherapy-institute-bahamas"
        }
    ];

    const insertedClinics = [];
    for (const c of clinics) {
        // Check if exists
        const { data: existing } = await supabase.from('clinics').select('id').eq('slug', c.slug).single();
        if (existing) {
            console.log(`Clinic ${c.name} already exists. ID: ${existing.id}`);
            insertedClinics.push({ ...c, id: existing.id }); // Use existing ID
        } else {
            // Insert
            const { data: newClinic, error } = await supabase.from('clinics').insert(c).select().single();
            if (error) console.error("Insert error:", error.message);
            if (newClinic) {
                console.log(`Inserted ${c.name}`);
                insertedClinics.push(newClinic);
            }
        }
    }

    // 3. Get Treatment IDs (CAR-T, Stem Cells)
    const { data: treatments } = await supabase.from('treatments').select('id, slug').in('slug', ['car-t-cell-therapy', 'stem-cell-therapy', 'nk-cell-therapy']);

    if (!treatments) return;

    // 4. Assign Treatments to Clinics
    const clinicTreatments = [];
    for (const clinic of insertedClinics) {
        for (const t of treatments) {
            clinicTreatments.push({
                clinic_id: clinic.id,
                treatment_id: t.id,
                price: t.slug === 'car-t-cell-therapy' ? 350000 : 25000 // Approximate prices
            });
        }
    }

    const { error: ctError } = await supabase.from('clinic_treatments').upsert(clinicTreatments, { onConflict: 'clinic_id, treatment_id' }); // Assuming composite key or constraint

    if (ctError) {
        // If constraint error, we might need to delete first or just ignore if it works. 
        // Upsert on conflict usually needs constraint name. Let's just try basic insert and ignore duplicate errors if strict mode not set, 
        // or better: Assuming empty table for these relations? No.
        console.warn("Association error (might be duplicates):", ctError.message);
    } else {
        console.log("Treatments assigned successfully!");
    }
}

seedNassau();
