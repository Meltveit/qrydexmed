
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

const treatmentUpdates = [
    // --- DIAGNOSTICS & SCREENING ---
    {
        name: "Biological Age Test (TruAge)",
        full_description: `
**Biological Age Testing** (often using DNA methylation clocks like TruAge, Horvath, or DunedinPACE) is the ultimate metric for longevity. Unlike chronological age (years lived), biological age measures the rate at which your cells are aging. This provides a quantifiable baseline to test if your lifestyle interventions are actually working.

### Scientific Basis & Mechanism
These tests analyze **epigenetic markers**—specifically methylation patterns on DNA.
1.  **DNA Methylation**: Methyl groups (CH3) attach to specific cytosine bases on DNA, turning genes "on" or "off."
2.  **Epigenetic Drift**: As we age, precise methylation patterns become chaotic. "Youthful" genes (repair) get silenced, and "Aging" genes (inflammation) get activated.
3.  **The Algorithm**: By analyzing 500,000+ CpG sites, AI algorithms correlate these patterns with mortality risk and physiological function.

### The Procedure: Protocol
1.  **Sample Collection**: Typically a simple blood draw (more accurate) or saliva/buccal swab.
2.  **Analysis**: The sample is sequenced in a lab.
3.  **Report**: You receive your "BioAge" and often your "Pace of Aging" (e.g., aging 0.8 years for every 1 chronological year).
4.  **Retesting**: Recommended every 6-12 months to track progress.

### Evidence-Based Benefits
*   **Validation**: It is currently the most accurate predictor of all-cause mortality, independent of risk factors.
*   **Personalization**: Allows you to A/B test interventions (e.g., "Did taking Rapamycin actually slow my aging?").

### Ideal Candidate
*   Every serious biohacker needs a baseline.
*   Individuals starting a major lifestyle overhaul.

### Risks & Safety Profile
*   **None**: Non-invasive diagnostic.
`
    },
    {
        name: "Full Body MRI",
        full_description: `
**Full Body MRI (Magnetic Resonance Imaging)** for screening is a proactive approach to early cancer and aneurysm detection. Unlike CT scans, MRI uses no ionizing radiation, making it safe for regular prevention. High-field scanners (1.5T or 3.0T) combined with AI software can detect anomalies as small as a few millimeters.

### Scientific Basis & Mechanism
MRI uses strong magnetic fields and radio waves to generate detailed images of soft tissues.
1.  **Diffusion Weighted Imaging (DWI)**: Highlights areas of high cellular density (often tumors) by tracking water molecule movement.
2.  **Early Detection**: Finds solid tumors (pancreas, liver, kidney, spine) at Stage 0 or 1, where cure rates are significantly higher.
3.  **Vascular Screening**: Identifies brain aneurysms or vascular malformations before rupture.

### The Procedure: Protocol
1.  **Scan Time**: Approx 60 minutes inside the tube.
2.  **Contrast?**: Usually non-contrast for general screening (safer).
3.  **Results**: Reviewed by a radiologist, often processed by AI for "second reads."

### Evidence-Based Benefits
*   **Cancer Detection**: Highly sensitive for soft tissue cancers often missed by blood tests.
*   **Peace of Mind**: Rules out major pathologies.
*   **Spinal Health**: Incidental findings of disc herniations allow for preventative PT.

### Ideal Candidate
*   Individuals aged **40+**.
*   Those with **cancer anxiety** or family history.
*   Executives seeking a "comprehensive tune-up."

### Risks & Safety Profile
*   **Claustrophobia**: The tube is tight; open MRI options exist but are lower resolution.
*   **False Positives**: Can find benign "incidentalomas" (cysts, nodules) that trigger unnecessary anxiety and follow-up biopsies.
`
    },
    {
        name: "Coronary Calcium Score",
        full_description: `
The **Coronary Artery Calcium (CAC) Score** is a quick CT scan that detects calcified plaque in the arteries of the heart. It is widely considered the single best predictor of a future heart attack, superior to cholesterol levels alone.

### Scientific Basis & Mechanism
*   **Calcification**: When plaque (atherosclerosis) builds up in arteries, the body tries to repair it with calcium. This "hard" plaque shows up clearly on X-ray.
*   **Score**:
    *   **0**: No plaque. Extremely low risk suitable for <1% 10-year risk.
    *   **1-100**: Mild plaque.
    *   **400+**: Extensive plaque. High risk of obstruction.

### The Procedure: Protocol
1.  **Scan**: Non-invasive CT scan (takes 5-10 minutes).
2.  **Radiation**: Low dose (approx same as a mammogram).
3.  **Frequency**: Every 3-5 years if score is >0. If 0, every 5-7 years.

### Evidence-Based Benefits
*   **Risk Stratification**: Determines if you *really* need statins. A score of 0 often allows patients to delay medication even with high LDL.
*   **Motivation**: Seeing the scan often motivates aggressive lifestyle changes.

### Ideal Candidate
*   Men 40+ and Women 50+.
*   Anyone with **intermediate cardiovascular risk** or high cholesterol.

### Risks & Safety Profile
*   **Radiation**: Small exposure (approx 1 mSv).
`
    },
    {
        name: "DEXA Body Composition Scan",
        full_description: `
**DEXA (Dual-Energy X-ray Absorptiometry)** is the gold standard for measuring bone density, but in longevity, it is prized for its ability to precisely quantify **Visceral Adipose Tissue (VAT)** and lean muscle mass.

### Scientific Basis & Mechanism
DEXA uses two low-dose X-ray beams with different energy levels. Soft tissue and bone absorb the beams differently, allowing a pixel-by-pixel map of the body.
1.  **Visceral Fat**: The toxic fat around organs that drives inflammation and insulin resistance.
2.  **Bone Density (T-Score)**: Crucial for detecting Osteopenia/Osteoporosis early.
3.  **Sarcopenia**: Measures muscle symmetry and mass, predicting frailty risk.

### The Procedure: Protocol
1.  **Scan**: You lie on an open table for 6-10 minutes.
2.  **Preparation**: Fasting is preferred for accuracy.
3.  **Results**: Immediate detailed report.

### Evidence-Based Benefits
*   **Metabolic Health**: Visceral fat volume correlates directly with cardiovascular risk.
*   **Muscle Focus**: Shifts focus from "weight loss" to "fat loss" and "muscle gain."

### Ideal Candidate
*   Anyone starting a *weight loss* or *muscle building* program.
*   Women post-menopause (bone health).

### Risks & Safety Profile
*   **Radiation**: Extremely low (less than a cross-country flight).
`
    },

    // --- ADVANCED MOLECULES & THERAPIES ---
    {
        name: "GLP-1 Agonists (Semaglutide)",
        full_description: `
**GLP-1 Agonists** (Semaglutide, Tirzepatide) have revolutionized metabolic medicine. Originally approved for diabetes, they are now the most effective agents for weight loss and are showing profound potential for addiction, cardiovascular protection, and neuroprotection.

### Scientific Basis & Mechanism
**Glucagon-Like Peptide-1 (GLP-1)** is a hormone released by the gut after eating.
1.  **Satiety**: Acts on the hypothalamus to drastically reduce hunger and "food noise."
2.  **Gastric Emptying**: Slows digestion, keeping you full longer.
3.  **Insulin**: Enhances glucose-dependent insulin secretion.
4.  **Brain**: Reduces inflammation in the reward centers (dopamine), potentially helping with alcohol and gambling addictions.

### The Procedure: Protocol
1.  **Administration**: Weekly subcutaneous injection (pen).
2.  **Titration**: Critical to start very low (0.25mg) and essentially "micro-dose" up over months to avoid nausea.
3.  **Lifestyle**: Must be paired with *resistance training* and *high protein* to prevent muscle loss.

### Evidence-Based Benefits
*   **Weight Loss**: 15-20% body weight reduction in clinical trials.
*   **Cardioprotection**: 20% reduction in major adverse cardiac events (SELECT trial).
*   **Longevity**: Caloric restriction is a consistent life-extender; GLP-1s make this effortless.

### Ideal Candidate
*   BMI > 30, or > 27 with comorbidities.
*   Patients with **metabolic syndrome**.

### Risks & Safety Profile
*   **Muscle Loss**: Can cause rapid sarcopenia if protein/lifting is neglected.
*   **GI Issues**: Nausea, constipation, gastroparesis (rare but serious).
*   **Thyroid**: Box warning for thyroid C-cell tumors (seen in rodents, not confirmed in humans).
`
    },
    {
        name: "IV Nutrient Therapy",
        full_description: `
**IV Nutrient Therapy** (Myer's Cocktail, Vitamin C, Magnesium) delivers vitamins and minerals directly into the bloodstream, bypassing the digestive system where absorption (bioavailability) is often compromised by age, stress, or gut issues.

### Scientific Basis & Mechanism
*   **Concentration Gradient**: IV delivery allows for serum concentrations 50-100x higher than oral supplementation.
*   **Vitamin C**: At high IV doses, Vitamin C acts as an **oxidant** (pro-oxidant) to cancer cells while boosting immune cells.
*   **Magnesium**: Powerful smooth muscle relaxant for migraines and anxiety.

### The Procedure: Protocol
1.  **Duration**: 30-60 minutes.
2.  **Cocktails**: Customizable (Immunity, Energy, Recovery).

### Evidence-Based Benefits
*   **Acute Illness**: Rapid recovery from flu/viral infections.
*   **Dehydration**: Instant cellular rehydration (hangovers, sports).
*   **Nutrient Deficiencies**: Corrects issues in patients with Malabsorption (Crohn's, Celiac).

### Ideal Candidate
*   **Burned out executives**.
*   **Athletes** post-event.
*   Those with **GI compromise**.

### Risks & Safety Profile
*   **Vein Irritation**: High osmolarity can sting.
*   **Kidney Stones**: High dose Vit C can trigger oxalate stones in susceptible individuals.
`
    },
    {
        name: "Methylene Blue",
        full_description: `
**Methylene Blue** is a synthetic dye with a unique property: it acts as an electron cycler in the mitochondria. At low doses (hormetic range), it is a potent cognitive enhancer and mitochondrial booster.

### Scientific Basis & Mechanism
1.  **Electron Transport**: MB accepts electrons from NADH and donates them to Cytochrome C, effectively bypassing blockages in the electron transport chain and boosting ATP.
2.  **Antioxidant**: Scavenges free radicals in the water phase.
3.  **Monoamine Oxidase Inhibition (MAOI)**: Mildly inhibits MAO-A, increasing serotonin/dopamine (antidepressant effect).

### The Procedure: Protocol
1.  **Grade**: MUST be **USP Pharmaceutical Grade** (Lab/Chemical grade contains heavy metals).
2.  **Dose**: Very low (0.5 - 2 mg/kg). "Less is more."
3.  **Form**: Dissolved in water or sublingual troche.

### Evidence-Based Benefits
*   **Brain Fog**: Acute improvement in focus and memory recall.
*   **Neuroprotection**: Studied for Alzheimer's and Parkinson's.
*   **Skin**: Stimulates collagen (often used topically).

### Ideal Candidate
*   Biohackers seeking **nootropic effects**.
*   **Mitochondrial dysfunction**.

### Risks & Safety Profile
*   **Serotonin Syndrome**: Do NOT combine with SSRIs (Antidepressants).
*   **Blue Urine**: Will stain urine blue/green for 24 hours.
`
    },
    {
        name: "Growth Hormone Therapy",
        full_description: `
**Human Growth Hormone (HGH)** is vital for tissue repair, muscle growth, and metabolism. Levels peak in puberty and crash by age 40 (Somatopause). Replacement can reverse signs of physical aging, but requires strict medical management.

### Scientific Basis & Mechanism
HGH stimulates the liver to produce **IGF-1** (Insulin-like Growth Factor 1), which mediates most anabolic effects.
1.  **Lipolysis**: Potent fat burner (especially abdominal).
2.  **Collagen**: Thickens skin and improves joint connective tissue.
3.  **Sleep**: Improves REM and Deep sleep architecture.

### The Procedure: Protocol
1.  **HGH Peptides**: Modern medicine prefers **Secretagogues** (Sermorelin, Ipamorelin, CJC-1295) which stimulate the body's *own* pulse of HGH, preserving the feedback loop and reducing side effects.
2.  **Direct rHGH**: Only for severe deficiency (more side effects).
3.  **Dosage**: Subcutaneous injection nightly (mimics natural rhythm).

### Evidence-Based Benefits
*   **Physique**: "Leaning out" effect.
*   **Skin**: Increased elasticity and thickness.
*   **Injury Repair**: Faster healing of tendons.

### Ideal Candidate
*   Adults with diagnosed **Adult Growth Hormone Deficiency (AGHD)**.
*   Those seeking **recovery** and aesthetic improvements.

### Risks & Safety Profile
*   **Water Retention**: Carpal tunnel syndrome, joint swelling.
*   **Insulin Resistance**: HGH raises blood sugar; requires glucose monitoring.
*   **Cancer**: Theoretically could accelerate tumor growth (IGF-1 is mitogenic). Contraindicated in active cancer.
`
    },
    {
        name: "PRP Therapy",
        full_description: `
**Platelet-Rich Plasma (PRP)** concentrates the platelets from your own blood (3-5x baseline) and injects them into injured tissues. Platelets are "bags of growth factors" that signal repair.

### Scientific Basis & Mechanism
Platelets release granules containing:
*   **PDGF**: Platelet-Derived Growth Factor (cell replication).
*   **VEGF**: Vascular Endothelial Growth Factor (new blood vessels).
*   **TGF-B**: Transforming Growth Factor (matrix formation).

### The Procedure: Protocol
1.  **Draw**: 30-60ml blood drawn.
2.  **Spin**: Centrifuged to isolate the "buffy coat" (platelets).
3.  **Inject**: Guided injection into knee, tendon, or scalp (Vampire Facial).

### Evidence-Based Benefits
*   **Hair Loss**: Effective for Androgenetic Alopecia (keeps follicles alive).
*   **Joints**: Mild to moderate osteoarthritis relief (better than steroid shots).
*   **Skin**: Microneedling with PRP ("Vampire Facial") boosts collagen.

### Ideal Candidate
*   **Hair loss** sufferers.
*   Patients with **tendonitis** or mild arthritis.

### Risks & Safety Profile
*   **Safe**: Autologous (your own blood), so no rejection risk.
*   **Pain**: Injection can be inflammatory and painful for 2-3 days (healing response).
`
    },
    {
        name: "PEMF Therapy",
        full_description: `
**Pulsed Electromagnetic Field (PEMF)** therapy uses magnetic energy to "recharge" cells. It attempts to mimic the earth's natural electromagnetic frequency (Schumann resonance) to restore cellular transmembrane potential.

### Scientific Basis & Mechanism
Healthy cells have a charge of -70mV. Sick/aging cells drop to -40mV or lower.
1.  **Ion Transport**: PEMF improves the opening of cell membrane channels (calcium, sodium, potassium), enhancing nutrient intake and detox.
2.  **Nitric Oxide**: Increases blood flow.

### The Procedure: Protocol
1.  **Mat or Coil**: You lie on a mat (low intensity) or have a coil placed on an injury (high intensity).
2.  **Sensation**: Mild pulsing or tapping sensation; mostly relaxing.

### Evidence-Based Benefits
*   **Bone Healing**: FDA approved for non-union fractures.
*   **Pain**: Reduces chronic pain signaling.
*   **Recovery**: Popular among athletes for reducing inflammation.

### Ideal Candidate
*   Chronic pain patients.
*   Those looking for passive recovery tools.

### Risks & Safety Profile
*   **Implants**: Contraindicated for pacemakers or electrical implants.
`
    },
    {
        name: "Infrared Sauna",
        full_description: `
**Infrared Saunas** use light to heat the body *directly* rather than heating the air. This allows for a deep, detoxifying sweat at lower, more tolerable temperatures than traditional Finnish saunas.

### Scientific Basis & Mechanism
1.  **Detoxification**: Sweat analysis shows infrared sweat contains higher levels of heavy metals (arsenic, cadmium, lead) compared to regular sweat.
2.  **Heat Shock Proteins**: Activates HSPs which refold damaged proteins and protect cells.
3.  **Cardio Mimetic**: Raises heart rate and cardiac output similar to moderate exercise.

### The Procedure: Protocol
1.  **Temp**: 120-140°F.
2.  **Time**: 20-45 minutes.
3.  **Frequency**: 4x per week for max cardiovascular benefit.

### Evidence-Based Benefits
*   **Cardiovascular**: Reduces blood pressure and arterial stiffness.
*   **Detox**: Elimination of environmental toxins.
*   **Relaxation**: Shift to parasympathetic (rest & digest) state.

### Ideal Candidate
*   Everyone! Specifically those who cannot tolerate high-heat saunas.
*   Patients with **heavy metal burden**.

### Risks & Safety Profile
*   **Dehydration**: Replenish electrolytes/minerals.
`
    }
];

async function updateDiagnostics() {
    console.log(`Starting update for ${treatmentUpdates.length} diagnostic & active treatments...`);

    for (const update of treatmentUpdates) {
        const { data, error } = await supabase
            .from('treatments')
            .update({ full_description: update.full_description })
            .eq('name', update.name)
            .select();

        if (error) {
            console.error(`Failed to update ${update.name}:`, error.message);
        } else if (data.length === 0) {
            console.warn(`Treatment not found: ${update.name}`);
        } else {
            console.log(`✅ Updated content for: ${update.name}`);
        }
    }

    console.log('Final batch update complete.');
}

updateDiagnostics();
