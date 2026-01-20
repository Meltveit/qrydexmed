
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
  {
    name: "Stem Cell Therapy",
    full_description: `
**Mesenchymal Stem Cell (MSC) therapy** represents the forefront of regenerative medicine, utilizing the body's own repair mechanisms to heal damaged tissues, modulate the immune system, and combat physiological aging. Unlike traditional pharmaceutical interventions that often mask symptoms, stem cell therapy targets the root cause of cellular degeneration.

### Scientific Basis & Mechanism
Mesenchymal stem cells (MSCs) are multipotent stromal cells that can differentiate into various cell types, including osteoblasts (bone cells), chondrocytes (cartilage cells), myocytes (muscle cells), and adipocytes (fat cells). However, their primary therapeutic value in longevity medicine lies in their **paracrine signalling** capabilities.

When introduced into the body, MSCs home to sites of inflammation and tissue injury. Once there, they secrete bioactive molecules—including cytokines, growth factors, and extracellular vesicles (exosomes)—that orchestrate a healing response. This "medicinal signaling" effect:
*   **Modulates Inflammation:** Downregulates pro-inflammatory cytokines (IL-6, TNF-α) and upregulates anti-inflammatory ones (IL-10).
*   **Stimulates Angiogenesis:** Promotes the formation of new blood vessels, improving oxygen delivery to tissues.
*   **Prevents Apoptosis:** Reduces programmed cell death in stressed or damaged cells.
*   **Enhances Autophagy:** Encourages the cellular clearing of metabolic waste and folded proteins.

### The Procedure: What to Expect
A typicial systemic stem cell protocol typically spans 1–3 days.

1.  **Preparation**: Patients may be advised to avoid NSAIDs and alcohol for 72 hours prior. Simple blood work is conducted to ensure safety.
2.  **Administration**:
    *   **Intravenous (IV) Infusion**: The most common method for systemic anti-aging. ~100-300 million cells are suspended in saline and infused over 45–90 minutes. This allows cells to circulate and address systemic inflammation.
    *   **Local Injection**: For joint pain or specific injuries, cells are injected directly into the intra-articular space, often guided by ultrasound.
    *   **Intrathecal**: For neurological conditions, cells are effectively delivered into the spinal canal (requires specialized medical supervision).
3.  **Post-Treatment**: The procedure is outpatient. Patients rest for 30 minutes to monitor for any immediate reactions (which are rare).

### Evidence-Based Benefits
Clinical studies and patient outcomes in regenerative medicine highlight several key benefits:
*   **Systemic Inflammation Reduction**: Significant decrease in C-Reactive Protein (CRP) levels, a key marker of aging and chronic disease.
*   **Joint & Cartilage Repair**: Improved mobility and reduced pain in osteoarthritis patients by regenerating hyaline cartilage.
*   **Cognitive Enhancement**: Patients often report reduced "brain fog", improved focus, and better neuroplasticity.
*   **Immune System Reset**: Beneficial for autoimmune conditions by rebalancing T-regulatory cells.
*   **Energy & Vitality**: Improved mitochondrial function leading to sustained energy levels.

### Ideal Candidate
Stem cell therapy is versatile but best suited for:
*   Individuals seeking **proactive anti-aging** and longevity extension.
*   Patients with **autoimmune disorders** (Lupus, RA, Crohn's).
*   Those suffering from **degenerative joint disease** or chronic sports injuries.
*   Individuals with **chronic fatigue** or post-viral syndromes.

### Risks & Safety Profile
Stem cell therapy using expanded MSCs (specifically from umbilical cord Wharton’s Jelly) is considered safe with a low risk profile.
*   **Rejection Risk**: Umbilical cord MSCs are "immune-privileged," meaning they lack MHC Class II markers, virtually eliminating the risk of Graft-vs-Host Disease (GvHD).
*   **Side Effects**: Mild flu-like symptoms (fatigue, low-grade fever) for 12-24 hours post-treatment are common as the immune system activates.
*   **Contraindications**: Active cancer, uncontrolled infections, or pregnancy.

### Recovery Timeline
*   **Days 1-3**: Rest is recommended. Mild fatigue is normal.
*   **Weeks 2-4**: Initial improvements in sleep quality and inflammation reduction.
*   **Months 3-6**: Peak regenerative effects. Tissue repair and immune modulation continue to mature. Visual improvements in skin and hair may become apparent.
`
  },
  {
    name: "NAD+ IV Therapy",
    full_description: `
**Nicotinamide Adenine Dinucleotide (NAD+)** is a critical coenzyme found in every living cell. It is essential for mitochondrial function—the "power plants" of our cells—and plays a pivotal role in DNA repair and gene expression. As we age, NAD+ levels decline by up to 50% every 20 years, contributing to metabolic dysfunction, fatigue, and cellular senescence. IV Therapy restores these levels directly, bypassing the digestive system for 100% absorption.

### Scientific Basis & Mechanism
NAD+ operates on two primary fronts:
1.  **Energy Production (ATP)**: It is a key electron transporter in the Krebs cycle, converting nutrients into Adenosine Triphosphate (ATP), the cellular fuel. Without sufficient NAD+, mitochondria cannot function efficiently.
2.  **DNA Repair & Sirtuin Activation**: NAD+ is the exclusive fuel for *SIRTUINS* (longevity proteins) and *PARPs* (DNA repair enzymes). Sirtuins regulate cellular health, switch on "survival genes," protect telomeres, and control inflammation.

By saturating cells with NAD+, we "turn back on" these repair pathways that have become dormant due to age-related deficiency.

### The Procedure: What to Expect
NAD+ infusions can be intense for beginners due to the "NAD+ flush" or physiological load.

1.  **Dose Customization**: Doses typically range from 250mg to 1000mg per session.
2.  **Infusion**: The drip is administered slowly over 2–4 hours. Running it too fast can cause abdominal cramping, chest pressure, or nausea. This is a normal physiological response to rapid ATP upregulation in smooth muscle.
3.  **Duration**: A standard anti-aging protocol involves loading doses (e.g., 3-5 days in a row) followed by monthly maintenance.

### Evidence-Based Benefits
*   **Mental Clarity & Cognitive Function**: Clears "brain fog," improves focus, and is used clinically to support addiction recovery and neuroprotection.
*   **Restored Energy Levels**: Directly boosts ATP production, combating chronic fatigue and afternoon slumps.
*   **DNA Repair**: Enhances the body's ability to repair genomic damage from UV exposure and oxidation.
*   **Metabolic Reset**: Can improve insulin sensitivity and aid in weight management by activating metabolic regulators.
*   **Circadian Rhythm**: Helps regulate sleep cycles for deeper, more restorative sleep.

### Ideal Candidate
*   Executives and professionals seeking **cognitive optimization**.
*   Individuals suffering from **chronic fatigue**, burnout, or jet lag.
*   Those recovering from widespread systemic inflammation (anti-aging).
*   Individuals in recovery from substance dependency (reduces cravings and withdrawal).

### Risks & Safety Profile
NAD+ occurs naturally in the body, making allergic reactions extremely rare.
*   **Infusion Side Effects**: Nausea, headache, abdominal discomfort, or chest tightness *during* the infusion. These subside instantly if the drip rate is slowed down.
*   **Post-Treatment**: Most patients feel immediate clarity, though some may feel tired for a few hours before the energy surge hits.

### Recovery Timeline
*   **Immediate**: Visual acuity often sharpens; mental fog lifts.
*   **Day 1**: improved sleep quality.
*   **Week 1**: Sustained energy without jitters (unlike caffeine).
`
  },
  {
    name: "Exosome Therapy",
    full_description: `
**Exosome Therapy** is the next evolution in regenerative medicine, often described as "Stem Cell Therapy 2.0". Exosomes are nano-scale extracellular vesicles (30-150nm) secreted by stem cells. They act as the "messengers" of regeneration, carrying a cargo of miRNA, growth factors, and anti-inflammatory proteins that instruct recipient cells to heal and repair.

### Scientific Basis & Mechanism
While stem cells may or may not engraft in the host tissue, **exosomes are the active ingredients** responsible for the paracrine effect. Because they are not cells (they have no nucleus or DNA), they can cross the **blood-brain barrier** and penetrate dense tissues like cartilage more easily than whole cells.

*   **Cell-to-Cell Communication**: Exosomes transfer RNA instructions to target cells, essentially reprograming "old" or damaged cells to function like "young" cells.
*   **Immunomodulation**: They carry potent anti-inflammatory signals that can calm cytokine storms and autoimmune responses.

### The Procedure: What to Expect
Exosome therapy is faster and often simpler than whole stem cell therapy.

1.  **Source**: High-quality exosomes are isolated from young, healthy mesenchymal stem cells (often umbilical cord or placental) in a lab.
2.  **Administration**:
    *   **IV Infusion**: "Push" injection or saline drip for systemic anti-aging (15-30 mins).
    *   **Local Injection**: Into joints, scalp (for hair growth), or facial skin (microneedling).
    *   **Nebulized**: Inhaled exosomes for lung repair (COPD, post-COVID).
3.  **No Downtime**: Unlike whole cells, exosomes do not require careful preservation of cell viability during infusion to the same extent, and the risk of immune reaction is virtually zero.

### Evidence-Based Benefits
*   **Precision Targeting**: Exosomes naturally home to sites of inflammation.
*   **Skin Rejuvenation**: Significantly increases collagen and elastin production (up to 300% in some studies), reducing fine lines and scarring.
*   **Hair Restoration**: Reactivates dormant hair follicles in androgenetic alopecia.
*   **Neuroprotection**: Ability to cross blood-brain barrier makes them promising for neuro-inflammation.
*   **Reduced Inflammation**: Potent reduction in systemic inflammatory markers.

### Ideal Candidate
*   Patients looking for **aesthetic rejuvenation** (skin/hair) without surgery.
*   Those with **acute inflammation** or sports injuries needing rapid recovery.
*   Individuals seeking **neuro-cognitive support**.
*   Patients who may be wary of live cellular therapies.

### Risks & Safety Profile
*   **Acellular**: Since exosomes contain no genetic material (DNA), there is no risk of tumor formation or malignant transformation.
*   **Immune Neutral**: They do not trigger an immune response (HLA matching is not required).
*   **Safety**: Ensure the clinic uses a lab that provides **concentration reports** (e.g., billions of particles per ml) and rigorous sterility testing.

### Recovery Timeline
*   **Days 1-7**: Reduction in local pain or inflammation.
*   **Weeks 4-6**: Visible improvements in skin texture or hair density (for aesthetic protocols).
*   **Systemic**: Gradual improvement in energy and cognitive baseline over 1-2 months.
`
  },
  {
    name: "HBOT Hyperbaric Oxygen",
    full_description: `
**Hyperbaric Oxygen Therapy (HBOT)** involves breathing 100% pure oxygen in a pressurized chamber (typically 1.5 to 2.4 ATA). Henry's Law of physics dictates that under pressure, oxygen dissolves directly into the blood plasma, cerebrospinal fluid, and lymph, independent of red blood cells. This systemic supersaturation of oxygen accelerates healing and awakens dormant cells.

### Scientific Basis & Mechanism
Oxygen is the limiting factor in cellular energy production. HBOT creates a physiological environment where oxygen levels in tissues increase by 10-15x.
1.  **Stem Cell Mobilization**: Studies confirm that a protocol of 20 HBOT sessions can increase circulating stem cells by **800%**.
2.  **Angiogenesis**: Stimulates VEGF (Vascular Endothelial Growth Factor) to grow new capillaries in ischemic (oxygen-starved) tissues.
3.  **Telomere Elongation**: A landmark 2020 study from Israel (Sagol Center) showed HBOT can lengthen telomeres by ~20% and reduce senescent cells by ~37% in aging adults.
4.  **Anti-Inflammatory**: Constricts blood vessels to reduce edema (swelling) while delivering oxygen to the injury.

### The Procedure: What to Expect
A "dive" is a relaxing experience.

1.  **The Chamber**: You lie in a monoplace (single person) or multiplace (group) chamber.
2.  **Pressurization**: As pressure builds (similar to an airplane takeoff), your ears may pop. You will need to equalize them.
3.  **The Session**: Once at pressure (e.g., 2.0 ATA), you breathe pure oxygen through a mask or hood for 60-90 minutes. You can read, watch a movie, or sleep.
4.  **Depressurization**: The pressure is slowly released.

### Evidence-Based Benefits
*   **Wound Healing**: Gold standard for diabetic ulcers and non-healing wounds.
*   **Cognitive Recovery**: Used for Traumatic Brain Injury (TBI), stroke recovery, and improving neuroplasticity.
*   **Anti-Aging**: Lengthens telomeres and clears senescent "zombie" cells.
*   **Surgical Recovery**: Reduces post-op swelling and healing time by up to 50%.
*   **Long COVID**: Helps resolves "brain fog" and fatigue associated with hypoxia.

### Ideal Candidate
*   Patients recovering from **surgery** or **sports injuries**.
*   Individuals concerned with **cognitive decline** or brain health.
*   Biohackers seeking **telomere extension** (requires dedicated protocol, usually 60 sessions).
*   Those with chronic non-healing wounds.

### Risks & Safety Profile
HBOT is very safe but has physical implications due to pressure.
*   **Barotrauma**: Ear pain or sinus squeeze if unable to equalize pressure (similar to diving).
*   **Oxygen Toxicity**: Extremely rare at clinical pressures (<3.0 ATA) and strictly monitored durations.
*   **Vision Changes**: Temporary myopia (nearsightedness) can occur after many sessions but typically resolves weeks after cessation.

### Recovery Timeline
*   **Immediate**: Feeling of alertness or tiredness (varies).
*   **Sessions 10-20**: Noticeable cognitive improvements and reduced inflammation.
*   **Sessions 40+**: Structural cellular changes (telomere effects).
`
  },
  {
    name: "Ozone Therapy",
    full_description: `
**Ozone Therapy** is a potent biological regulator that utilizes medical-grade ozone (O3)—a supercharged form of oxygen—to stimulate the body's antioxidant defenses, improve oxygen utilization, and modulate the immune system. Widely used in Germany and Russia for decades, it is a cornerstone of integrative longevity protocols.

### Scientific Basis & Mechanism
Ozone is an oxidant. When introduced to the blood, it creates a momentary "hormetic stress" (good stress). This triggers a cascade of adaptive responses:
1.  **Antioxidant Surge**: Upregulates the production of Superoxide Dismutase (SOD), Catalase, and Glutathione—the body's master antioxidants.
2.  **Improve Oxygen Delivery**: Increases 2,3-DPG levels in red blood cells, which causes hemoglobin to release oxygen more readily into tissues (shifting the oxygen-dissociation curve).
3.  **Immune Modulation**: Activates the immune system to fight infections (bacterial, viral, fungal) while calming autoimmune overactivity.
4.  **Mitochondrial Efficiency**: Enhances the oxidative decarboxylation of pyruvate, boosting ATP production.

### The Procedure: Major Autohemotherapy (MAH)
The most common systemic method is the "10 Pass" or standard MAH.

1.  **Blood Draw**: 100-200ml of blood is drawn into a sterile, vacuum-sealed glass bottle.
2.  **Ozonation**: The blood is mixed with a precise concentration of medical ozone gas. The blood turns bright red as it becomes hyper-oxygenated.
3.  **Reinfusion**: The treated blood is gravity-fed back into the patient.
4.  **Multipass**: In "10 Pass" therapy, this cycle is repeated 10 times under hyperbaric pressure for a profound systemic effect.

### Evidence-Based Benefits
*   **Pathogen Eradication**: Ozone leads to the destruction of bacteria, viruses, and fungi by disrupting their cell membranes.
*   **Circulatory Health**: Cleanses arteries and improves microcirculation, helpful for cardiovascular prevention.
*   **Chronic Fatigue & Fibromyalgia**: Increases oxygenation and ATP, offering relief from chronic pain and exhaustion.
*   **Detoxification**: Enhances liver function and neutralizes toxins.
*   **Macular Degeneration**: Improves oxygen delivery to the retina (in specific protocols).

### Ideal Candidate
*   Individuals with **chronic infections** (Lyme, Epstein-Barr, Herpes).
*   Patients with **cardiovascular concerns** or poor circulation.
*   Those suffering from **autoimmune conditions** or chronic inflammation.
*   Biohackers seeking **mitochondrial optimization**.

### Risks & Safety Profile
*   **Safety**: Extremely safe when performed by trained professionals. Ozone must **never be inhaled** directly into the lungs (toxic to respiratory epithelium).
*   **Herxheimer Reaction**: A "die-off" reaction where patients feel flu-like symptoms as the body clears killed pathogens. This is temporary.
*   **Blood Thinners**: Patients on anticoagulants usually need adjusted protocols.

### Recovery Timeline
*   **Immediate**: Some feel energized; others feel relaxed or sleepy.
*   **Sessions 3-5**: Reduction in chronic pain and improved clarity.
*   **Cumulative**: Best results are seen with a series of treatments (e.g., 2x per week for 3-4 weeks).
`
  }
];

async function updateTreatments() {
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

  console.log('Treatment content update complete.');
}

updateTreatments();
