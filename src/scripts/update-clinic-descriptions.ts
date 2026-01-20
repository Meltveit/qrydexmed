
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const clinicUpdates = [
    {
        name: "R3 Stem Cell International",
        description: `R3 Stem Cell International is a world leader in regenerative medicine, performing over 21,000 procedures worldwide. Located in Tijuana's premier medical district, the clinic specializes in high-potency Mesenchymal Stem Cell therapy derived from umbilical cord tissue. Their "Real Hope" protocol ensures ethically sourced, strictly screened biological products.

**Why Choose R3:**
*   **Safety First**: Stringent donor screening that exceeds FDA standards.
*   **Volume**: With millions of stem cells administered per treatment (30M - 200M), patients receive therapeutic doses rarely available in the US.
*   **Cost-Effectiveness**: Premium therapy at 40-60% less than US counterparts due to favorable regulatory environments.`
    },
    {
        name: "Vivid Health",
        description: `Vivid Health stands at the intersection of luxury and advanced biology in Los Angeles. This boutique clinic is designed for the high-performance individual, integrating NAD+ IV therapy, Peptide protocols, and hormone optimization into a seamless lifestyle experience.

**Why Choose Vivid Health:**
*   **Concierge Care**: Every treatment is personalized by MDs who understand the needs of executives and athletes.
*   **Cutting-Edge**: Early adopters of peptides like BPC-157 and Thymosin Alpha-1.
*   **Environment**: A spa-like setting that reduces cortisol and enhances the healing response.`
    },
    {
        name: "BioXcellerator",
        description: `BioXcellerator in Medellin, Colombia, is the destination of choice for pro athletes (UFC, NFL) seeking rapid injury repair and total body rejuvenation. Their proprietary "Golden Cells" selection process identifies the most potent anti-inflammatory stem cells for maximum impact.

**Why Choose BioXcellerator:**
*   **Golden Cells**: Only the top 2% of donor cells are selected for use.
*   **Athletic Focus**: Specialized structural repair protocols for knees, shoulders, and spine.
*   **Facility**: State-of-the-art laboratory on-site ensures cell viability is never compromised by transport.`
    },
    {
        name: "Cellular Performance Institute",
        description: `Located in Tijuana, CPI is widely regarded as one of the most advanced stem cell research and treatment centers globally. Founded on rigorous scientific principles, they offer targeted intrathecal (spinal) injections for manufacturing potent immune-modulating responses.

**Why Choose CPI:**
*   **Cancer Vaccine**: Pioneers in dendritic cell therapy and immunotherapy.
*   **Research Driven**: Ongoing clinical trials ensure protocols are data-backed.
*   **Advanced Delivery**: Expertise in direct-to-site injections for neurological conditions.`
    },
    {
        name: "European Wellness Center",
        description: `European Wellness (EWC) brings over 30 years of Swiss-German biological medicine to Asia. Their flagship center in Bangkok integrates cell therapy with holistic detoxification, offering a "Biological Maintenance" approach that treats the whole system, not just symptoms.

**Why Choose EWC:**
*   **Precursor Stem Cells**: Use of specific cell lines (kidney, liver, heart) for targeted organ regeneration.
*   **Holistic**: Integrates ozone, chelation, and nutrition with cellular therapy.
*   **Legacy**: A trusted brand with a global network of accredited physicians.`
    },
    {
        name: "Swiss Biological Medicine Center",
        description: `Nestled in Zurich, this center is the epitome of precision medicine. Following the Paracelsus methodology, they focus on determining the root cause of aging—often heavy metals, gut dysbiosis, or dental toxicity—before rebuilding the body with biological agents.

**Why Choose Swiss Bio**:
*   **Diagnostic Depth**: Unrivaled testing including darkfield microscopy and autonomic regulation testing.
*   **Detox First**: A belief that "adding new cells to a toxic body is waste."
*   **Luxury**: 5-star medical hospitality in the heart of Europe.`
    },
    {
        name: "Hope4Cancer",
        description: `Hope4Cancer uses non-toxic, evidence-based therapies to treat cancer and chronic immune dysfunction. With centers in Cancun and Tijuana, they employ the "7 Key Principles of Cancer Therapy," utilizing treatments like Hyperthermia, Cryotherapy, and Photodynamics.

**Why Choose Hope4Cancer:**
*   **Non-Toxic**: Focus on killing cancer cells without destroying the immune system.
*   **SPDT**: Sonic Photo-Dynamic Therapy utilizes sound and light to target tumors.
*   **Emotional Healing**: Mental and spiritual support are core components of the protocol.`
    },
    {
        name: "Panama Stem Cell Institute",
        description: `The Stem Cell Institute in Panama City is perhaps the most famous clinic in the Western Hemisphere, founded by Neil Riordan, PA, PhD. Known for treating autoimmune diseases and autism, they set the standard for umbilical cord tissue protocols.

**Why Choose Panama SCI:**
*   **Golden Cells™**: The originators of the high-potency selection protocol.
*   **Autism Success**: World-renowned for their work with children on the spectrum.
*   **History**: Over 15 years of uninterrupted operation and safety data.`
    }
];

async function updateClinicDescriptions() {
    console.log('Starting clinic description overhaul...');

    for (const update of clinicUpdates) {
        const { error } = await supabase
            .from('clinics')
            .update({ description: update.description })
            .eq('name', update.name);

        if (error) {
            console.error(`Failed to update ${update.name}:`, error.message);
        } else {
            console.log(`✅ Updated ${update.name} with professional bio.`);
        }
    }
}

updateClinicDescriptions();
