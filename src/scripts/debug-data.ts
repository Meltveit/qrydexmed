
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
    console.log("Checking data related to CAR-T and Nassau...");

    // 1. Get Nassau City ID
    const { data: city } = await supabase.from('cities').select('*').eq('slug', 'nassau').single();
    if (!city) {
        console.error("City 'nassau' not found!");
        return;
    }
    console.log("City found:", city.name, city.id);

    // 2. Get CAR-T Treatment ID
    const { data: treatment } = await supabase.from('treatments').select('*').eq('slug', 'car-t-cell-therapy').single(); // Adjust slug if different
    if (!treatment) {
        console.error("Treatment 'car-t-therapy' not found! Trying 'car-t-cell-therapy'...");
        const { data: t2 } = await supabase.from('treatments').select('*').eq('slug', 'car-t-therapy').single();
        if (!t2) {
            console.error("Treatment not found with either slug.");
            // List all treatments
            const { data: allT } = await supabase.from('treatments').select('slug');
            console.log("Available treatment slugs:", allT?.map(t => t.slug));
            return;
        }
        console.log("Treatment found (v2):", t2.name, t2.id);
        return checkClinics(city.id, t2.id);
    }
    console.log("Treatment found:", treatment.name, treatment.id);
    checkClinics(city.id, treatment.id);
}

async function checkClinics(cityId: string, treatmentId: string) {
    // 3. Find Clinics in City
    const { data: clinics } = await supabase.from('clinics').select('id, name, city_id').eq('city_id', cityId);
    console.log(`Clinics in Nassau (${clinics?.length}):`, clinics?.map(c => c.name));

    if (!clinics || clinics.length === 0) return;

    // 4. Check Clinic Treatments
    const { data: cts } = await supabase
        .from('clinic_treatments')
        .select('*')
        .eq('treatment_id', treatmentId)
        .in('clinic_id', clinics.map(c => c.id));

    console.log(`Clinic Treatments found for CAR-T in these clinics (${cts?.length}):`, cts);

    if (!cts || cts.length === 0) {
        console.log("❌ No clinics in Nassau have CAR-T treatment assigned.");
        // Suggest fix: Add it to one of them
        const targetClinic = clinics[0];
        console.log(`💡 Suggestion: Add CAR-T to ${targetClinic.name}`);
    } else {
        console.log("✅ Data exists! The page should show it.");
    }
}

checkData();
