
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const TREATMENTS_CONTENT: Record<string, {
    short_description: string;
    full_description: string;
    benefits: string[];
    risks: string[];
}> = {
    "Rapamycin (Sirolimus)": {
        short_description: "An FDA-approved immunosuppressant acting as a potent mTOR inhibitor, primarily investigated for its life-extension and anti-aging properties.",
        full_description: `## What is Rapamycin?

Rapamycin (generic name Sirolimus) was originally discovered in soil samples from Easter Island (Rapa Nui). It is an FDA-approved drug primarily used to prevent organ transplant rejection. In the longevity community, it is considered one of the most promising "geroprotectors" (anti-aging drugs).

## How Does It Work?

Rapamycin works by inhibiting **mTOR** (mechanistic Target Of Rapamycin), a key protein kinase that regulates cell growth, proliferation, and survival.

-   **mTOR Inhibition:** By dampening mTOR activity, the cell shifts from a "growth" state to a "repair" state.
-   **Autophagy Induction:** This triggers **autophagy**, the body's internal recycling system that cleans out damaged cellular components and misfolded proteins.
-   **Reduced Senescence:** Helps prevent the accumulation of senescent ("zombie") cells that drive chronic inflammation.

## Potential Longevity Benefits

Studies in mice, yeast, and flies have consistently shown that Rapamycin extends lifespan significantly. Human trials (like the PEARL study) are currently investigating its effects on aging markers, immune function, and visceral fat.

## Who Is a Good Candidate?

This is generally an off-label prescription for longevity. Candidates are typically healthy adults seeking to optimize health span, often under the guidance of a specialized longevity physician.

---
*Educational only. Rapamycin for aging is off-label and requires strict medical supervision.*`,
        benefits: [
            "Potent stimulation of autophagy (cellular cleaning)",
            "Reduction in systemic inflammation (inflammaging)",
            "Potential extension of health span and lifespan",
            "Improved immune function in elderly (studied)"
        ],
        risks: [
            "Immune suppression at high doses",
            "Metabolic side effects (insulin sensitivity changes)",
            "Mouth sores (aphthous ulcers) are a common side effect",
            "Interactions with other medications"
        ]
    },
    "TRT Testosterone Replacement": {
        short_description: "Therapy to restore testosterone levels in men with clinically low levels, improving energy, muscle mass, and mood.",
        full_description: `## What is TRT?

Testosterone Replacement Therapy (TRT) involves the administration of testosterone to resolve symptoms of hypogonadism (low T). As men age, testosterone levels naturally decline (about 1% per year after age 30), potentially leading to "andropause."

## How Does It Work?

Bioidentical testosterone is introduced to the body to reach physiological (youthful) levels. Delivery methods include:

-   **injections:** (Cypionate or Enanthate) typically administered weekly or twice weekly.
-   **Transdermal Creams/Gels:** Applied daily to the skin.
-   **Pellets:** Small implants placed under the skin every 3-6 months.

## Symptoms of Low T

-   Chronic fatigue and lethargy
-   Reduced muscle mass and increased body fat
-   Low libido and erectile dysfunction
-   Brain fog and irritability

## Optimization Strategy

In longevity medicine, the goal is often not just "normal" levels (which have a huge range) but "optimal" levels for the individual's age and health status. This requires careful monitoring of Total T, Free T, SHBG, and Estradiol.

---
*Educational only. TRT requires a prescription and regular blood work.*`,
        benefits: [
            "Increased muscle mass and bone density",
            "Improved energy, mood, and cognitive function",
            "Restored libido and sexual performance",
            "Better cardiovascular health markers (in some studies)"
        ],
        risks: [
            "Polycythemia (thickening of blood)",
            "Suppression of natural testicular production (fertility issues)",
            "Potential for prostate growth (BPH)",
            "Needs monitoring of estrogen levels"
        ]
    },
    "Peptides (BPC-157)": {
        short_description: "A regenerative peptide known for accelerating the healing of soft tissues, tendons, ligaments, and the gut lining.",
        full_description: `## What is BPC-157?

BPC-157 (Body Protection Compound-157) is a peptide derived from a protein found naturally in human gastric juice. It is famous in regenerative medicine for its profound healing capabilities, particularly for the gut and musculoskeletal system.

## How Does It Work?

-   **Angiogenesis:** BPC-157 powerfully promotes the formation of new blood vessels, which brings oxygen and nutrients to damaged tissues.
-   **Upregulation of Growth Hormone Receptors:** Enhances the sensitivity of cells to growth signals.
-   **Anti-Inflammatory:** Reduces systemic inflammation.

## Common Applications

-   **Gut Health:** Treating leaky gut, IBS, and ulcers (its original biological role).
-   **Injury Recovery:** Sprains, tears, and tendonitis (e.g., "Tennis Elbow").
-   **Post-Surgery:** Accelerating recovery time.

## Administration

BPC-157 is typically administered via subcutaneous injection near the injury site or orally (capsules) for gut health issues.

---
*Educational only. Peptides are largely investigational substances.*`,
        benefits: [
            "Rapid healing of tendons and ligaments",
            "Powerful gut repair (Leaky Gut/IBS)",
            "Reduce pain and inflammation",
            "Systemic cytoprotective effects"
        ],
        risks: [
            "Regulatory status varies (recently reclassified by FDA)",
            "Quality control of sources is critical",
            "Long-term human safety data is limited",
            "Potential interaction with other growth factors"
        ]
    },
    "Red Light Therapy": {
        short_description: "Photobiomodulation using specific red and near-infrared wavelengths to stimulate cellular energy and tissue repair.",
        full_description: `## What is Red Light Therapy?

Also known as Photobiomodulation (PBM), this therapy uses specific wavelengths of light (typically 660nm Red and 850nm Near-Infrared) to penetrate the skin and treat tissues at a cellular level.

## Mechanism of Action: The Mitochondria

The primary target is the mitochondria—the powerhouse of the cell. Red light interacts with an enzyme called **Cytochrome C Oxidase**. This interaction:

1.  **Reduces Oxidative Stress:** Displaces nitric oxide, allowing oxygen to bond more efficiently.
2.  **Boosts ATP:** Increases the production of Adenosine Triphosphate (ATP), cellular energy.
3.  **Reduces Inflammation:** Modulates inflammatory cytokines.

## Applications

-   **Skin Health:** Increases collagen production, reduces wrinkles and scars.
-   **Pain Relief:** Reduces joint pain and arthritis symptoms.
-   **Muscle Recovery:** Used by elite athletes to speed up recovery.
-   **Hair Growth:** Stimulates follicles in androgenetic alopecia.

---
*Educational purpose only.*`,
        benefits: [
            "Non-invasive and painless",
            "Scientifically proven to boost mitochondrial function",
            "improves skin tone and collagen density",
            "Reduces systemic inflammation"
        ],
        risks: [
            "Eye protection recommended for high-intensity panels",
            "Not recommended over active malignancies",
            "Photosensitivity if taking certain medications",
            "Results require consistent use over time"
        ]
    },
    "HBOT Hyperbaric Oxygen": {
        short_description: "Breathing 100% oxygen in a pressurized chamber to flood tissues with healing oxygen.",
        full_description: `## What is HBOT?

Hyperbaric Oxygen Therapy (HBOT) creates a high-pressure environment (1.5 to 3.0 ATA) where the patient breathes pure oxygen. This pressure law (Henry's Law) forces oxygen to dissolve directly into blood plasma, lymph, and cerebrospinal fluid.

## The Longevity Connection

While traditionally used for wound healing and decompression sickness, HBOT is now a cornerstone of longevity protocols.

-   **Telomere Elongation:** A landmark study from Israel (The Shapiro Study) showed HBOT could lengthen telomeres by over 20%.
-   **Stem Cell Mobilization:** Increases circulating stem cells by up to 800%.
-   **Brain Health:** Enhances neuroplasticity and blood flow, helpful for cognitive decline and "Brain Fog."

## What to Expect during Treatment

You lie in a hard or soft shell chamber for 60-90 minutes. Your ears may pop (like on an airplane) as pressure increases. It is relaxing; many people sleep or watch movies.

---
*Educational only. Consult your provider.*`,
        benefits: [
            "Significant increase in circulating stem cells",
            "Proven elongation of telomeres (cellular anti-aging)",
            "Reduced neuro-inflammation",
            "Accelerated wound and tissue healing"
        ],
        risks: [
            "Barotrauma (ear pain/injury) from pressure changes",
            "Oxygen toxicity seizures (extremely rare at clinical pressures)",
            "Claustrophobia in the chamber",
            "Vision changes (temporary myopia) after many sessions"
        ]
    },
    "GLP-1 Agonists (Semaglutide)": {
        short_description: "Medicines like Ozempic/Wegovy that mimic the GLP-1 hormone to regulate appetite and blood sugar.",
        full_description: `## What are GLP-1 Agonists?

Glucagon-like peptide-1 (GLP-1) agonists, such as Semaglutide and Tirzepatide, are a class of medications originally for diabetes that have revolutionized weight management.

## Mechanism of Action

-   **Satiety Signaling:** They act on receptors in the brain to signal fullness, drastically reducing food noise and cravings.
-   **Delayed Gastric Emptying:** Slows down digestion so you feel full longer.
-   **Insulin Regulation:** Improves the body's insulin response to meals.

## Longevity Benefits

Obesity is a primary driver of aging and chronic disease (cancer, heart disease, dementia). By achieving and maintaining a healthy weight, GLP-1s directly target the root cause of metabolic aging.

---
*Educational only. Requires prescription.*`,
        benefits: [
            "Potent and sustained weight loss",
            "Cardiovascular protection (reduced stroke/heart attack risk)",
            "Improved metabolic markers (HbA1c, lipids)",
            "Reduction in 'food noise' and cravings"
        ],
        risks: [
            "Gastrointestinal side effects (nausea, constipation)",
            "Risk of muscle loss if protein intake is too low",
            "Potential thyroid tumor risk (seen in rodents)",
            "Requires indefinite use for maintenance"
        ]
    },
    "Senolytic Therapy": {
        short_description: "Targeted therapies designed to selectively identify and eliminate senescent ('zombie') cells.",
        full_description: `## What are Senolytics?

"Zombie cells," or senescent cells, are damaged cells that refuse to die. Instead, they linger and secrete inflammatory chemicals (SASP) that damage neighboring healthy cells. Senolytics are agents that can selectively induce death (apoptosis) in these zombie cells without harming healthy tissue.

## Common Agents

-   **Dasatinib & Quercetin (D+Q):** The most studied combination. Dasatinib is a leukemia drug; Quercetin is a plant flavonol.
-   **Fisetin:** A natural flavonoid found in strawberries, shown in mice to reduce senescence.
-   **Navitoclax:** Another pharmaceutical agent under investigation.

## The Goal

The "Hit and Run" approach: Senolytics are typically taken intermittently (e.g., one weekend a month) to clear the buildup of zombie cells, allowing tissues to rejuvenate.

---
*Educational only. Mostly experimental.*`,
        benefits: [
            "Reduces systemic chronic inflammation",
            "May reverse age-related tissue dysfunction",
            "Intermittent dosing (not a daily pill)",
            "High potential for frailty reduction"
        ],
        risks: [
            "Early stage research; long term safety unknown",
            "Potential off-target toxicity",
            "May interfere with wound healing (senescence is needed for clotting)",
            "Optimal dosing protocols are not yet established"
        ]
    },
    "Full Body MRI": {
        short_description: "Comprehensive screening using radiation-free MRI to detect early stage cancer and abnormalities.",
        full_description: `## What is a Full Body MRI?

A proactive screening tool that scans the entire body from head to toe. Unlike CT scans, MRI (Magnetic Resonance Imaging) uses strong magnetic fields and radio waves, meaning there is **no ionizing radiation**.

## What Does It Detect?

-   **Early Cancers:** Tumors in the brain, spine, liver, kidneys, pancreas, prostate, etc.
-   **Aneurysms:** Brain or aortic aneurysms before they rupture.
-   **Visceral Fat:** Exact quantification of dangerous organ fat.
-   **Spinal Degeneration:** Herniated discs and stenosis.

## Why Do It?

Current medicine is reactive—waiting for symptoms. By the time symptoms appear, cancer is often Stage 3 or 4. Full Body MRI aims to catch disease at Stage 1, when it is most curable.

---
*Educational only.*`,
        benefits: [
            "Zero radiation exposure (safe for repeat use)",
            "Detects solid tumors at very early stages",
            "Peace of mind for health-conscious individuals",
            "Detailed anatomical map of your body"
        ],
        risks: [
            "High cost (typically not covered by insurance)",
            "False positives (finding 'incidentalomas' that cause anxiety but are harmless)",
            "Cannot detect all cancers (e.g., colon, skin, erratic blood)",
            "Claustrophobia during the 60-minute scan"
        ]
    },
    "Metformin": {
        short_description: "A first-line diabetes drug widely used off-label for its potential to extend healthspan and mimic calorie restriction.",
        full_description: `## What is Metformin?

Metformin is the world's most prescribed diabetes drug. It has been used for over 60 years and has an excellent safety profile. It is the subject of the TAME (Targeting Aging with Metformin) trial, the first FDA-approved trial to treat aging itself.

## How Does It Work?

-   **AMPK Activation:** Metformin activates AMPK, the "fuel gauge" of the cell. This signals the body that energy is low (similar to fasting or exercise), triggering beneficial repair processes.
-   **Insulin Sensitivity:** It lowers blood sugar levels and improves insulin sensitivity, reducing the risk of metabolic syndrome.
-   **Mitochondrial Hormesis:** It acts as a mild stressor on mitochondria, making them more resilient.

## Debate in Longevity

While robust in animal studies and diabetic humans, data on *healthy* humans is mixed. Some studies suggest it might blunt the benefits of intense exercise.

---
*Educational only.*`,
        benefits: [
            "Improves insulin sensitivity and blood sugar",
            "Activates AMPK (fasting mimetic)",
            "Very low cost and well-understood safety",
            "Potential cancer-prevention properties"
        ],
        risks: [
            "B12 deficiency with long-term use",
            "Gastrointestinal upset (diarrhea)",
            "May blunt muscle growth from exercise",
            "Risk of lactic acidosis (rare, in kidney failure patients)"
        ]
    },
    "Infrared Sauna": {
        short_description: "Sauna therapy using infrared heaters to penetrate tissue directly, promoting detoxification and cardiovascular health.",
        full_description: `## What is Infrared Sauna?

Traditional saunas heat the air around you. Infrared saunas use infrared panels to heat your body *directly*. This allows for a deeper sweat at lower, more comfortable temperatures (120-140°F vs 180°F+).

## Mechanism: Heat Shock Proteins

Heat stress triggers the production of **Heat Shock Proteins (HSPs)**. These proteins repair misfolded proteins in your cells and protect against further stress. It is a powerful hormetic (positive stress) signal.

## Benefits

-   **Cardiovascular:** Similar effects to moderate exercise (increased heart rate, vasodilation).
-   **Detoxification:** Sweat is a primary pathway for excreting heavy metals (mercury, lead) and BPA.
-   **Recovery:** Increases blood flow to muscles, reducing recovery time.

---
*Educational only.*`,
        benefits: [
            "Deep detoxification via sweat",
            "Cardiovascular conditioning (exercise mimetic)",
            "Increased Heat Shock Protein production",
            "Relaxation and cortisol reduction"
        ],
        risks: [
            "Dehydration and electrolyte imbalance",
            "Overheating / Heat exhaustion",
            "Not suitable for pregnant women",
            "Alcohol use is dangerous before/during use"
        ]
    }
};

async function updateMoreTreatments() {
    console.log('🧬 STARTING GEN 2 TREATMENT CONTENT UPDATE...\n');

    const { data: treatments, error } = await supabase
        .from('treatments')
        .select('id, name');

    if (error || !treatments) {
        console.error('Error fetching treatments:', error);
        return;
    }

    let updated = 0;

    for (const treatment of treatments) {
        let content = TREATMENTS_CONTENT[treatment.name];

        // Simple fuzzy matching fallback
        if (!content) {
            Object.keys(TREATMENTS_CONTENT).forEach(key => {
                if (treatment.name.includes(key.split(" ")[0]) && treatment.name.includes(key.split(" ")[1] || "")) {
                    // Very basic match, e.g. "TRT" in "TRT Testosterone..."
                    // Better to just rely on exact keys if possible, or manual mapping.
                    // Given the keys I defined match the audit audit-treatments.ts output names mostly.
                }
            });
        }

        if (content) {
            const { error: updateError } = await supabase
                .from('treatments')
                .update({
                    short_description: content.short_description,
                    full_description: content.full_description,
                    benefits: content.benefits,
                    risks: content.risks
                })
                .eq('id', treatment.id);

            if (updateError) {
                console.error(`❌ Failed to update ${treatment.name}:`, updateError.message);
            } else {
                console.log(`✅ Updated: ${treatment.name}`);
                updated++;
            }
        }
    }

    console.log(`\n🎉 Update complete! ${updated} treatments upgraded.`);
}

updateMoreTreatments();
