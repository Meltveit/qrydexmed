
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const updates = [
    {
        name: "Absolute Health Integrative Medicine",
        description: "A premier integrative wellness center in Bangkok treating the root causes of aging. Specializes in Quantum Medicine, NAD+ IV therapy, CPTG essential oils, and personalized anti-aging protocols. The clinic employs a holistic 'Functional Medicine' approach combining detox, immunity boosting, and hormonal balance for total rejuvenation."
    },
    {
        name: "AEON Clinic Dubai",
        description: "Dubai's leading regenerative wellness center located in Atlantis The Royal. Harnesses the power of cellular regeneration, advanced stem cell therapy, and genetic testing. Affiliated with the American Board of Regenerative Medicine, AEON offers VIP longevity programs including ozone therapy and metabolic optimization."
    },
    {
        name: "Aestha Clinic London",
        description: "An award-winning aesthetic and regenerative clinic in London. Pioneers within the UK for Regenera Activa® technology, using autologous stromal stem cells for hair restoration and skin rejuvenation. Offers a bespoke approach to non-surgical anti-aging with a focus on natural, undetectable results."
    },
    {
        name: "Angel Longevity Medical Center",
        description: "A holistic medical center focused on preventative aging and functional medicine.Offers high- dose NAD + IV therapy to repair DNA and boost cellular energy.Dr.Angel's protocols integrate nutrition, detoxification, and bio-identical hormone replacement to reverse the biological clock."
    },
    {
        name: "ANOVA Institute",
        description: "The world's first clinic licensed for 'Stem Cell 2.0' (MSC Secretome/Exosomes). Based in Frankfurt, ANOVA specializes in minimally invasive regenerative medicine for systemic anti-aging and chronic inflammation. Their proprietary isolation methods ensure the highest concentration of growth factors."
    },
    {
        name: "Bioscience Institute Dubai",
        description: "A global leader in autologous fat - derived stem cell banking and therapy.The Dubai facility features a state - of - the - art GMP laboratory for expanding cells for future use.Specializes in 'CellBanking' and personalized regenerative treatments for aesthetic, orthopedic, and systemic anti - aging purposes."
    },
    {
        name: "BioXcellerator",
        description: "Regarded as one of the world's most advanced stem cell clinics, located in Medellin. Famous for treating elite athletes and UFC fighters. Utilizes 'Golden Cells'—high-potency mesenchymal stem cells selected for superior regeneration. All-inclusive VIP concierge service includes luxury accommodation and transport."
    },
    {
        name: "Bumrungrad International Hospital - Regenerative Center",
        description: "Asia's first JCI-accredited hospital and a global hub for medical tourism. The VitalLife Scientific Wellness Center offers genome sequencing, hormone screening, and personalized micronutrient supplements. Combines hospital-grade safety with luxury wellness services."
    },
    {
        name: "Cancun Longevity Center",
        description: "A tropical wellness retreat specializing in integrative cancer therapies and anti - aging.Combines immunotherapy, Gerson therapy, and high - dose Vitamin C with relaxed beachfront recovery.Focuses on detoxification and boosting the body's natural healing mechanisms."
    },
    {
        name: "Cellular Hope Institute",
        description: "A renowned clinic in Cancun led by Dr.Maritza Novas, specializing in autologous and allogeneic stem cell therapies.Treats complex autoimmune conditions and anti - aging.The facility operates under strict COFEPRIS guidelines and offers 300 million + cell count protocols."
    },
    {
        name: "Chaum Life Center",
        description: "South Korea's premier anti-aging center, known as a 'hospital of the future'. Offers the 'Triple Health Checkup' combining Western diagnostics, genetic testing, and Eastern medicine. Features a private member's club, theraspa, and bio - insurance DNA banking services."
    },
    {
        name: "Clinic La Prairie",
        description: "The legendary Swiss clinic that pioneered 'Revitalization Therapy' in 1931. Home of the exclusive CLP Extract for immune system renewal.Offers week - long comprehensive longevity programs in renewed medical facilities overlooking Lake Geneva.The ultimate destination for ultra - high - net - worth individuals."
    },
    {
        name: "Clinique Lémana",
        description: "A historic Swiss clinic famous for 'Cellvital' therapy—a proprietary cellular treatment derived from fetal ovine cells.Focused on revitalizing the immune system and slowing aging.Located in the Fairmont Le Montreux Palace, offering 5 - star luxury alongside medical expertise."
    },
    {
        name: "EDEN Aesthetics Clinic",
        description: "A luxury medical spa in Dubai combining dermatology with regenerative medicine.Specializes in 'Baby Face' stem cell facials, exosomes, and IV nutrient drips.Provides a holistic approach to beauty that starts from cellular health."
    },
    {
        name: "Fountain Life",
        description: "Co - founded by Tony Robbins and Peter Diamandis, Fountain Life is the gold standard for preventative medicine.Uses AI - driven full - body MRI, coronary CT, and genome sequencing to detect disease years before symptoms.Offers 'APEX' membership for continuous health optimization."
    },
    {
        name: "LivCells",
        description: "A Portuguese innovator in immunotherapies and stem cell treatments.Located in Porto, LivCells creates personalized 'biological drugs' using the patient's own cells (dendritic cells, killer cells) to fight disease and aging. GMP-certified laboratory ensuring EU-standard safety."
    },
    {
        name: "Next Health",
        description: "The pioneer of 'Health Optimization' centers, with locations in LA and NYC.Known for making biohacking accessible, offering cryotherapy chambers, infrared saunas, hyperbaric oxygen, and an extensive IV drip menu.A favorite among biohackers and celebrities for maintenance and recovery."
    },
    {
        name: "Paracelsus Recovery",
        description: "The world's most exclusive addiction and mental health clinic, which treats only one client at a time. Also offers comprehensive 'Biochemical Restoration' for executive burnout and longevity. Located in a private lakefront residence in Zurich with 24/7 live-in staff."
    },
    {
        name: "R3 Stem Cell Tijuana",
        description: "A high - volume center of excellence offering affordable, high - quality stem cell procedures.Uses biologics containing over 30 million live cells per cc.Known for transparent pricing and 'Real Hope' protocols for orthopedic and systemic conditions."
    },
    {
        name: "Stem Cell Institute Panama",
        description: "Founded by Dr.Neil Riordan, author of 'Stem Cell Therapy: A Rising Tide'.The clinic is world - famous for its research on Golden Cells™ and treatment of autism and autoimmune diseases.Located in Punta Pacifica, it adheres to the highest international bioethics and safety standards."
    },
    {
        name: "Swiss Medica",
        description: "A leading European clinic specializing in autologous stem cell treatments and stromal vascular fraction(SVF).Located in Belgrade and Switzerland, they treat complex neurological and autoimmune diseases.Offers complete residential medical programs with specialized nursing care."
    }
];

async function updateClinics() {
    console.log(`Starting update for ${updates.length} clinics...`);

    for (const update of updates) {
        const { data, error } = await supabase
            .from('clinics')
            .update({ description: update.description })
            .eq('name', update.name)
            .select();

        if (error) {
            console.error(`Failed to update ${update.name}:`, error.message);
        } else if (data.length === 0) {
            console.warn(`Clinic not found: ${update.name}`);
        } else {
            console.log(`✅ Updated: ${update.name}`);
        }
    }

    console.log('Update complete.');
}

updateClinics();
