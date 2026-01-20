
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
    // --- PHARMACOLOGY & MOLECULES ---
    {
        name: "Rapamycin (Sirolimus)",
        full_description: `
**Rapamycin (Sirolimus)** is currently the "gold standard" in longevity pharmacology. Originally discovered in soil samples from Easter Island (Rapa Nui), it is an FDA-approved immunosuppressant that, at low intermittent doses, acts as a potent **mTOR inhibitor**. This mechanism mimics the effects of caloric restriction, the most proven method for extending lifespan in model organisms.

### Scientific Basis & Mechanism
The **Mechanistic Target of Rapamycin (mTOR)** is a nutrient-sensing protein kinase that regulates cell growth, motility, and survival.
*   **mTOR Inhibition**: When nutrients are abundant, mTOR is active, driving cell growth (anabolism). When suppressed (by fasting or Rapamycin), the cell switches to a "survival and repair" mode.
*   **Autophagy Activation**: By inhibiting mTORC1, Rapamycin triggers **autophagy**, the cellular "cleanup" process where cells digest and recycle their own damaged components, including misfolded proteins and dysfunctional mitochondria.
*   **Geroprotection**: Studies in mice, yeast, and flies consistently show lifespan extension (up to 30% in mice) and delay of age-related diseases.

### The Procedure: Protocol
Longevity protocols differ significantly from transplant protocols.
1.  **Consultation**: Essential to review liver function, blood lipids, and immune status.
2.  **Dosing**: Typically a **low-dose, intermittent** schedule (e.g., 3mg - 6mg once weekly). This "pulsed" dosing inhibits mTORC1 (aging pathway) without chronically inhibiting mTORC2 (which can lead to insulin resistance).
3.  **Monitoring**: Regular blood panels to track glucose, lipids, and white blood cell count.

### Evidence-Based Benefits
*   **Life Extension**: The most robust pharmacological intervention for lifespan extension in mammal studies.
*   **Immune Function**: Surprisingly, low intermittent doses may *boost* immune response to vaccines in elderly patients (mTOR inhibition rejuvenates hematopoietic stem cells).
*   **Cancer Prevention**: Reduces the proliferation of senescent cells and potentially deters tumorigenesis.
*   **Neuroprotection**: Enhances autophagy in the brain, potentially clearing amyloid and tau proteins associated with Alzheimer's.

### Ideal Candidate
*   Biohackers seeking **maximum lifespan extension**.
*   Individuals with a family history of neurodegenerative disease or cancer.
*   Patients aged 40+ looking to slow biological aging.

### Risks & Safety Profile
*   **Mouth Sores**: Aphthous ulcers are the most common side effect (manageable with hygiene).
*   **Metabolic Changes**: Can transiently raise lipids or glucose; requires dietary management.
*   **Immune Suppression**: High daily doses suppress immunity; low weekly doses typically do not, but caution is advised during active infections.
`
    },
    {
        name: "Metformin",
        full_description: `
**Metformin** is widely known as a first-line type 2 diabetes drug, but it has emerged as a cornerstone of longevity due to its pleiotropic effects on metabolism and inflammation. It is often called a "caloric restriction mimetic" because it shifts cellular metabolism towards efficiency and resilience.

### Scientific Basis & Mechanism
Metformin acts primarily by inhibiting **Complex I of the mitochondrial electron transport chain**.
1.  **AMPK Activation**: This energy stress activates **AMPK** (AMP-activated protein kinase), the master metabolic regulator. AMPK tells the body to burn fat for energy, improve insulin sensitivity, and reduce glucose production in the liver.
2.  **Inhibition of Gluconeogenesis**: Stops the liver from dumping excess sugar into the blood.
3.  **Epigenetic Modulation**: May influence DNA methylation patterns associated with aging.

### The Procedure: Protocol
1.  **Screening**: Check kidney function (eGFR) and Vitamin B12 levels.
2.  **Administration**: Oral tablets, usually taken with dinner to minimize stomach upset. Extended-release (XR) versions are preferred.
3.  **Dosage**: Longevity protocols often range from 500mg to 1500mg daily.

### Evidence-Based Benefits
*   **Blood Sugar Control**: Lowers HbA1c and prevents insulin resistance, a primary driver of aging (glycation).
*   **Cancer Reduction**: Epidemiological studies suggest diabetics on Metformin have significantly lower cancer rates than non-diabetics.
*   **Cardiovascular Protection**: Improves endothelial function and reduces systemic inflammation.
*   **Weight Management**: Modest weight loss and reduced visceral fat.

### Ideal Candidate
*   individuals with **pre-diabetes** or insulin resistance.
*   Those with significant **visceral fat** (belly fat).
*   People seeking a low-cost, well-studied longevity intervention.

### Risks & Safety Profile
*   **Gastrointestinal**: Nausea or loose stools are common initially (mitigated by "low and slow" titration).
*   **Vitamin B12 Deficiency**: Long-term use interferes with absorption; supplementation/monitoring is required.
*   **Lactic Acidosis**: Extremely rare risk, primarily in patients with severe kidney or liver failure.
*   **Exercise Blunting?**: Some data suggests it might slightly blunt mitochondrial adaptations to *vigorous* exercise; some athletes cycle it off on training days.
`
    },
    {
        name: "Peptide Injections (BPC-157)",
        full_description: `
**BPC-157 (Body Protection Compound-157)** is a synthetic pentadecapeptide derived from a protective protein found in human gastric juice. It is famed in the biohacking community as the "Wolverine peptide" for its profound ability to accelerate the healing of soft tissues, tendons, ligaments, and the gut lining.

### Scientific Basis & Mechanism
BPC-157 acts as a signaling molecule that upregulates **angiogenesis** (growth of new blood vessels) specifically at sites of injury.
1.  **Nitric Oxide Pathway**: Modulates the NO system to protect endothelium and improve blood flow.
2.  **Fibroblast Recruitment**: Accelerates the migration of fibroblasts to repair connective tissue.
3.  **Growth Hormone Receptor**: Increases the density of growth hormone receptors in tendon fibroblasts.
4.  **Gut-Brain Axis**: Reduces neuro-inflammation and heals intestinal permeability (Leaky Gut).

### The Procedure: Protocol
1.  **Administration**: Subcutaneous injection (insulin needle) near the injury site or systemic. Oral capsules (specifically "Arg-BPC" salt) are preferred for gut health.
2.  **Frequency**: Typically daily for a cycle of 4-6 weeks.
3.  **Recovery**: Used aggressively post-injury or post-surgery.

### Evidence-Based Benefits
*   **Musculoskeletal Repair**: Dramatically shortens recovery from tears, sprains, and increasing tendon strength.
*   **Gut Health**: Heals ulcers, IBS, and inflammatory bowel disease by repairing the epithelial barrier.
*   **Joint Pain**: Reduces pain in chronic tendonitis (tennis elbow, knees).
*   **Neuroprotection**: Shows promise in protecting dopamine neurons and reducing neuro-inflammation.

### Ideal Candidate
*   Athletes recovering from **injuries** (ACL, rotator cuff).
*   Patients with **digestive issues** (IBS, Leaky Gut, Ulcers).
*   Individuals with **chronic joint pain**.

### Risks & Safety Profile
*   **Safety**: Excellent safety profile with no reported toxic or lethal dose in extensive animal studies. Human anecdotal safety is very high.
*   **Regulation**: Currently on the WADA prohibited list for professional athletes (in competition).
`
    },
    {
        name: "Senolytic Therapy",
        full_description: `
**Senolytic Therapy** involves the targeted elimination of **senescent cells**—often called "zombie cells." These are damaged cells that refuse to die (apoptosis resistance) and instead linger in tissues, secreting a toxic cocktail of inflammatory cytokines (SASP) that degrades neighboring healthy cells and accelerates systemic aging.

### Scientific Basis & Mechanism
Senolytics work by temporarily disabling the **SCAP (Senescent Cell Anti-Apoptotic Pathways)** that keep these zombie cells alive. By inhibiting these survival networks, the senescent cells are forced to undergo apoptosis and are cleared by the immune system.
*   **Dasatinib + Quercetin (D+Q)**: The most famous combination. Dasatinib targets specific senescent cell networks, while Quercetin targets others.
*   **Fisetin**: A potent plant flavonoid that eliminates senescent cells in fat and other tissues.

### The Procedure: Protocol
Unlike daily supplements, Senolytics are typically taken in a "Hit and Run" protocol.
1.  **Dosing**: High doses taken for 2-3 consecutive days.
2.  **Frequency**: Repeated only once every month or quarter. The goal is to clear the burden, then let the tissue heal.
3.  **Medical Supervision**: Requires tracking of kidney/liver function.

### Evidence-Based Benefits
*   **Rejuvenation**: Clearing senescent cells in mice has shown to reverse gray hair, increase running endurance, and extend healthy lifespan.
*   **Fibrosis Reversal**: Shows promise in reducing pulmonary fibrosis and kidney scarring.
*   **Inflammation Control**: Drastically reduces the systemic inflammatory burden (IL-6, TNF-alpha).
*   **Frailty Reduction**: Improves physical function and grip strength in elderly models.

### Ideal Candidate
*   Individuals over **40-50 years old** (accumulation of senescent cells increases with age).
*   Patients with **fibrotic conditions** or chronic inflammatory diseases.
*   Those seeking deep "cellular cleaning."

### Risks & Safety Profile
*   **Unknowns**: Long-term human data is still emerging.
*   **Temporary Fatigue**: Clearing a large burden of cells puts stress on the elimination organs; fatigue for a few days is common.
*   **Off-Target Effects**: D+Q are potent drugs; medical supervision is mandatory to avoid side effects.
`
    },

    // --- HORMONAL OPTIMIZATION ---
    {
        name: "TRT Testosterone Replacement",
        full_description: `
**Testosterone Replacement Therapy (TRT)** is the medical restoration of testosterone levels to a physiological "optimal" range. In men, testosterone declines ~1% per year after age 30. Low levels (Hypogonadism) are linked to cardiovascular disease, diabetes, depression, and frailty. TRT is not just for muscle; it is a critical metabolic and cardioprotective intervention.

### Scientific Basis & Mechanism
Testosterone acts on androgen receptors in almost every tissue in the male body.
1.  **Anabolism**: Increases muscle protein synthesis and bone density.
2.  **Metabolism**: Improves insulin sensitivity and mobilizes fatty acids (burns fat).
3.  **Neurology**: Regulates mood, confidence, and cognitive function (spatial memory).
4.  **Cardiovascular**: While controversial in the past, modern evidence suggests optimal testosterone protects the heart by reducing metabolic syndrome.

### The Procedure: Protocol
Modern TRT focuses on stable blood levels to avoid peaks and valleys.
1.  **Diagnosis**: Requires comprehensive blood panels (Total T, Free T, SHBG, Estradiol, LH/FSH) and symptom correlation.
2.  **Methods**:
    *   **Injections**: Weekly or twice-weekly (Cypionate/Enanthate) implies stable levels.
    *   **Creams**: Daily application (Topical).
    *   **Pellets**: Implanted under the skin every 3-6 months.
3.  **Adjuncts**: Often combined with HCG to maintain fertility/testicular size.

### Evidence-Based Benefits
*   **Body Composition**: Increased lean muscle mass and decreased visceral fat.
*   **Mental Health**: Improved mood, motivation, and reduced anxiety/depression.
*   **Sexual Function**: Restored libido and erectile function.
*   **Bone Health**: Significant increase in bone mineral density.
*   **Cardiometabolic**: Better lipid profiles and glucose control in hypogonadal men.

### Ideal Candidate
*   Men with **clinical symptoms** (fatigue, libido loss, brain fog) AND low blood levels (<350-400 ng/dL).
*   Men needing to preserve muscle mass (Sarcopenia prevention).

### Risks & Safety Profile
*   **Erythrocytosis**: Can thicken blood (high Hematocrit); requires blood donation or dose adjustment.
*   **Fertility**: Exogenous testosterone suppresses sperm production (manageable with HCG).
*   **Prostate**: Does not cause prostate cancer, but requires monitoring of PSA.
*   **Cardiovascular**: Unmonitored supraphysiological doses are dangerous; therapeutic doses are generally protective.
`
    },
    {
        name: "HRT Hormone Replacement",
        full_description: `
**Bioidentical Hormone Replacement Therapy (BHRT)** for women addresses the steep decline in estrogen, progesterone, and testosterone during perimenopause and menopause. Unlike synthetic progestins (which carried risks in older studies), bioidentical hormones are molecularly identical to human hormones and are essential for neuroprotection, bone density, and heart health.

### Scientific Basis & Mechanism
Estrogen is a "master regulator" for female longevity.
1.  **Neuroprotection**: Estrogen supports neural glucose uptake; its loss is a key driver of Alzheimer's risk in women.
2.  **Bone Density**: Estrogen inhibits osteoclasts (cells that break down bone). Menopause accelerates bone loss dramatically.
3.  **Vascular Health**: Maintains arterial flexibility and endothelial health.

### The Procedure: Protocol
1.  **Testing**: Assessment of hormonal status via blood, saliva, or urine (DUTCH test).
2.  **Customization**: Doses are tailored.
    *   **Estrogen**: Transdermal patch or cream (safer than oral as it bypasses the liver/clotting risk).
    *   **Progesterone**: Oral micronized (promotes sleep and protects uterus).
    *   **Testosterone**: Small doses for libido and energy.
3.  **Monitoring**: Regular checks of symptoms and levels.

### Evidence-Based Benefits
*   **Symptom Relief**: Eliminates hot flashes, night sweats, and vaginal dryness.
*   **Brain Health**: Reduction in risk of dementia and "brain fog".
*   **Bone Protection**: Prevention of Osteoporosis and fractures.
*   **Cardiovascular**: Reduced risk of heart disease if started within the "therapeutic window" (within 10 years of menopause).
*   **Skin**: Improved collagen and thickness.

### Ideal Candidate
*   Women in **perimenopause or menopause**.
*   Women with early surgical menopause (oophorectomy).
*   Those seeking long-term protection against osteoporosis and Alzheimer's.

### Risks & Safety Profile
*   **Breast Cancer**: Bioidentical Progesterone (unlike synthetic progestins) does NOT appear to increase breast cancer risk significantly in 5-year studies.
*   **Clotting**: Transdermal estrogen does not increase clot risk (unlike oral).
*   **Contraindications**: History of estrogen-sensitive cancers (individualized assessment needed).
`
    },
    {
        name: "Thyroid Optimization",
        full_description: `
**Thyroid Optimization** goes beyond merely treating "hypothyroidism" to achieving optimal metabolic function. The thyroid dictates the metabolic rate of every cell in the body. Sub-optimal levels (even within the wide "normal" reference range) can lead to weight gain, fatigue, depression, and high cholesterol.

### Scientific Basis & Mechanism
The thyroid produces T4 (inactive) which must be converted to **T3 (active)**. T3 enters the cell nucleus and ups energy production.
*   **Optimization**: Focuses on T3 levels. Many people have "normal" TSH but low Free T3 or high Reverse T3 (stress hormone that blocks T3).
*   **Metabolic Fire**: Adequate T3 ensures efficient burning of calories and regulation of body temperature.

### The Procedure: Protocol
1.  **Full Panel**: TSH, Free T4, Free T3, Reverse T3, TPO Antibodies (Hashimoto's exclusion).
2.  **Medication**:
    *   **T4 Monotherapy** (Synthroid): Often insufficient for poor converters.
    *   **Desiccated Thyroid** (Armour/NP): Contains T4 and T3 (more physiological).
    *   **T3 Monotherapy**: For specific cases of conversion failure.
3.  **Lifestyle**: Improving selenium, zinc, and gut health to support T4->T3 conversion.

### Evidence-Based Benefits
*   **Metabolism**: Easier weight management and fat loss.
*   **Energy**: Resolution of chronic fatigue.
*   **Mood**: T3 is critical for serotonin sensitivity; optimization often resolves resistant depression.
*   **Lipids**: Low thyroid causes high LDL; optimization naturally lowers cholesterol.

### Ideal Candidate
*   Patients with **"Normal" TSH but Hypothyroid Symptoms** (Cold hands, hair loss, fatigue).
*   Those with high cholesterol despite good diet.
*   Patients with "Treatment Resistant" depression.

### Risks & Safety Profile
*   **Arrhythmia**: Too much T3 can cause heart palpitations (requires careful titration).
*   **Bone Density**: Suppressed TSH for long periods *might* affect bones (debatable with modern monitoring).
`
    },

    // --- PHYSICAL & TECH THERAPIES ---
    {
        name: "Red Light Therapy",
        full_description: `
**Red Light Therapy**, or Photobiomodulation (PBM), uses specific wavelengths of light (Red 660nm and Near-Infrared 850nm) to penetrate the skin and stimulate cellular energy production. It is one of the most scientifically validated non-invasive biohacks available.

### Scientific Basis & Mechanism
PBM works on the **Mitochondria** (specifically Cytochrome C Oxidase).
1.  **ATP Boost**: Light photons displace nitric oxide from the respiratory chain, allowing oxygen to bond and dramatically increasing ATP (energy) production.
2.  **Reduced Oxidative Stress**: Balances ROS (Free radicals) to a healthy signaling level.
3.  **Gene Expression**: Activates transcription factors involved in protein synthesis and cell repair.

### The Procedure: Protocol
1.  **Device**: High-powered LED panels or laser devices.
2.  **Session**: 10-20 minutes exposing bare skin to the light at a distance of 6-12 inches.
3.  **Frequency**: 3-5 times per week for optimal cellular saturation.

### Evidence-Based Benefits
*   **Skin Health**: Increases collagen production, reduces wrinkles, and heals acne scars.
*   **Muscle Recovery**: Proven to reduce Delayed Onset Muscle Soreness (DOMS) and speed up return-to-play for athletes.
*   **Inflammation**: systemic reduction in inflammatory markers.
*   **Joint Pain**: deeply penetrates to soothe arthritis and tendonitis.
*   **Hair Growth**: Stimulates follicles (FDA cleared for alopecia).

### Ideal Candidate
*   Anyone seeking **skin rejuvenation** without chemicals.
*   **Athletes** for recovery.
*   Sufferers of **chronic pain/arthritis**.

### Risks & Safety Profile
*   **Eye Safety**: Do not stare directly into near-infrared LEDs; protective goggles are recommended.
*   **Safety**: Non-thermal and non-ionizing (no cancer risk). Very safe.
`
    },
    {
        name: "Cryotherapy",
        full_description: `
**Cryotherapy** involves brief exposure to extreme cold (up to -240°F / -150°C). This triggers a powerful "fight or flight" survival response that releases endorphins, reduces inflammation, and constricts blood vessels, followed by a rebound vasodilation that flushes fresh blood to tissues.

### Scientific Basis & Mechanism
1.  **Vasoconstriction/Dilation**: The "pump" effect flushes metabolic waste (lactic acid) from muscles.
2.  **Hormetic Stress**: Activates cold-shock proteins (RNA-binding proteins) that protect nerves and repair synapses.
3.  **Norepinephrine**: Massive release triggers focus, mood elevation, and anti-inflammatory pathways.
4.  **Brown Fat Activation**: Cold exposure converts white fat to metabolically active brown fat (thermogenesis).

### The Procedure: Protocol
1.  **Whole Body (WBC)**: Standing in a nitrogen-cooled chamber (head out) or electric chamber (full body) for 2 to 3 minutes.
2.  **Localized**: Stream of cold nitrogen applied to specific injury.
3.  **Experience**: Intense cold, but "dry" cold is more tolerable than an ice bath.

### Evidence-Based Benefits
*   **Pain Relief**: Immediate reduction in pain signals (numbing) and long-term inflammation reduction.
*   **Mood**: Significant boost in dopamine and norepinephrine (anti-depressant effect).
*   **Recovery**: Reduces muscle swelling and damage markers (creatine kinase) post-exercise.
*   **Calorie Burn**: Can burn 500-800 calories as the body reheats.

### Ideal Candidate
*   **Athletes** needing rapid recovery.
*   Patients with **Rheumatoid Arthritis** or inflammatory pain.
*   Individuals wishing to boost **metabolism and mood**.

### Risks & Safety Profile
*   **Frostbite**: Risk if wet clothing is worn or moisture is on skin (must be completely dry).
*   **Blood Pressure**: Uncontrolled preventative hypertension is a contraindication as cold spikes BP.
`
    },
    {
        name: "Plasmapheresis",
        full_description: `
**Therapeutic Plasma Exchange (TPE)**, or Plasmapheresis, is a medical procedure that separates plasma from blood cells to remove toxic substances. In longevity (specifically the AMBAR trial), it is used to "dilute" old, inflammatory plasma factors and replace them with fresh albumin/saline, effectively "cleaning the oil" of the human engine.

### Scientific Basis & Mechanism
Research suggests aging is driven partly by circulating pro-aging factors in the blood (SASP, misfolded proteins).
1.  **Dilution**: Removes pro-inflammatory cytokines, autoantibodies, and perhaps amyloid beta (Alzheimer's protein).
2.  **Conboy Protocol**: Based on UC Berkeley research showing that "young blood" benefits are actually due to the *removal of old plasma inhibitors*, not just the addition of young factors.
3.  **Albumin**: Replacement with fresh albumin (the body's master antioxidant/transport protein) restores buffering capacity.

### The Procedure: Protocol
1.  **Access**: IV lines in both arms (one out, one in).
2.  **Separation**: A centrifuge separates plasma (discarded) from Red/White cells (saved).
3.  **Replacement**: Cells are returned mixed with 5% Albumin solution.
4.  **Duration**: 2-3 hours per session. Series of 6+ sessions.

### Evidence-Based Benefits
*   **Alzheimer's Disease**: The AMBAR study showed 61% less progression in moderate Alzheimer's patients.
*   **Autoimmunity**: Gold standard for removing auto-antibodies in Lupus, Myasthenia Gravis.
*   **Rejuvenation**: anecdotal reports of improved cognition, energy, and biomarkers.

### Ideal Candidate
*   Patients with **early cognitive decline** or family history of Alzheimer's.
*   Severe **autoimmune disease**.
*   **Ultra-high-net-worth** biohackers (procedure is expensive).

### Risks & Safety Profile
*   **Vascular Access**: Requires good veins.
*   **Electrolyte Shift**: Citrate used to prevent clotting can lower calcium (tingling sensation); easily managed.
*   **Infection**: Low risk during catheter access.
`
    },
    {
        name: "Glutathione IV",
        full_description: `
**Glutathione** is the body's "Master Antioxidant." Produced in the liver, it protects every cell from oxidative stress, heavy metals, and toxins. Levels decline sharply with age, stress, and pollution exposure. Oral glutathione is poorly absorbed; IV delivery ensures 100% bioavailability for deep detoxification.

### Scientific Basis & Mechanism
Glutathione (GSH) is a tripeptide (cysteine, glycine, glutamate).
1.  **Detoxification**: Conjugates with toxins (Phase II liver detox) making them water-soluble for excretion.
2.  **Skin Brightening**: Inhibits tyrosinase (melanin production), leading to brighter, more even skin tone.
3.  **Immune Support**: vital for the function of T-cells and lymphocytes.
4.  **Neuroprotection**: Protects the brain from free radical damage.

### The Procedure: Protocol
1.  **Dose**: Typically 600mg to 2000mg.
2.  **Push or Drip**: Can be administered as a slow IV push (10 mins) or bag drip.
3.  **Frequency**: Weekly or bi-weekly for maintenance.

### Evidence-Based Benefits
*   **Skin Glow**: Visibly brighter skin and reduced hyperpigmentation (melasma).
*   **Liver Support**: Essential for those with fatty liver or high alcohol intake.
*   **Energy**: improved mitochondrial efficiency.
*   **Immunity**: Reduced frequency of illnesses.

### Ideal Candidate
*   Individuals seeking **skin whitening** or brightening.
*   Those exposed to **toxins/mold** or needing liver support.
*   Anyone looking for an **immunity boost**.

### Risks & Safety Profile
*   **Safety**: Extremely safe.
*   **Sulfur Sensitivity**: Rare, but those with sulfite allergies should test a small dose.
*   **Zinc**: Long term high-dose usage can deplete zinc; supplementation recommended.
`
    }
];

async function updateRemainingTreatments() {
    console.log(`Starting update for ${treatmentUpdates.length} treatments...`);

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

    console.log('Batch update complete.');
}

updateRemainingTreatments();
