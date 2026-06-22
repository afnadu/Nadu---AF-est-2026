import type { Product, TenantConfig } from '@/types'

export const naduTenantConfig: TenantConfig = {
  id: 'nadu',
  name: 'Nadu Sleep Solutions',
  tagline: 'Expert Sleep Therapy, Delivered With Care',
  primaryColor: '#1B4332',
  accentColor: '#C9B99A',
  logoText: 'Nadu',
  clinicianEmail: 'clinical@nadu.co',
  phone: '1800 SLEEP WELL',
  website: 'https://www.nadu.co',
  customContext: `
Nadu Sleep Solutions is an Australian-based sleep therapy provider specialising in CPAP and PAP therapy, home sleep testing, and ongoing clinical support. Nadu also manufactures its own line of therapeutic CPAP accessories under the Nadu brand.

Key Nadu differentiators:
- Nadu-branded therapeutic accessories (Mask Soothe, Mouth Tape, Recharge Spritz)
- Free mask trial exchange program (within 30 days of purchase)
- Remote monitoring via AirView (ResMed) and Nox T3 home sleep testing
- Direct clinician messaging through the Nadu patient portal
- 5-year CPAP machine warranty through our network
- Monthly compliance review service for Medicare-funded patients
  `.trim(),
}

export const naduProducts: Product[] = [
  // ─── Nadu Brand Products ───
  {
    id: 'nadu-mask-soothe',
    name: 'Nadu Mask Soothe',
    category: 'accessory',
    isNaduProduct: true,
    sku: 'NDU-MASK-SOOTHE',
    description: 'A calming, skin-safe balm formulated for CPAP users. Soothes facial redness, pressure marks, and skin irritation caused by nightly mask wear.',
    features: [
      'Gentle enough for nightly use on sensitive skin',
      'Non-greasy formula — does not affect mask seal',
      'Fragrance-free and hypoallergenic',
      'Contains aloe vera, chamomile, and vitamin E',
      'Safe on silicone cushions — no degradation',
      '30ml tube — 60-day supply',
    ],
    indications: [
      'Red marks or pressure sores from mask frame',
      'Dry or irritated skin under mask seal area',
      'Sensitivity to silicone cushion contact',
      'Morning facial redness after CPAP use',
    ],
    contraindications: ['Known allergy to aloe vera or chamomile'],
    troubleshootingTips: [
      'Apply a thin layer to affected areas after removing mask in the morning',
      'Do not apply to mask seal area before wearing — may reduce seal',
      'If irritation worsens, discontinue use and consult a dermatologist',
    ],
  },
  {
    id: 'nadu-mouth-tape',
    name: 'Nadu Mouth Tape',
    category: 'accessory',
    isNaduProduct: true,
    sku: 'NDU-MOUTH-TAPE',
    description: 'Gentle, skin-safe mouth tape designed specifically for CPAP users. Prevents mouth breathing and dry mouth without restricting airway safety.',
    features: [
      'H-shaped design — seals lips while allowing emergency opening',
      'Medical-grade gentle adhesive — no residue on waking',
      'Latex-free, hypoallergenic, breathable fabric',
      'Works with nasal and nasal pillow CPAP masks',
      '30 strips per pack — 1-month supply',
      'Tested safe for use with CPAP therapy',
    ],
    indications: [
      'Mouth breathing during CPAP therapy',
      'Dry mouth on waking despite humidification',
      'Air leaking from mouth with nasal or pillow mask',
      'Patients transitioning from full face to nasal mask',
    ],
    contraindications: [
      'Nasal obstruction or congestion preventing nasal breathing',
      'Claustrophobia or anxiety around mouth/face',
      'Children under 12 — use under clinical supervision only',
    ],
    troubleshootingTips: [
      'Start with a small strip across the centre of lips for first few nights',
      'If still getting dry mouth: check nasal passage is clear (try saline spray before bed)',
      'Combine with humidity setting 5+ for best results',
      'Remove gently on waking — wet lips first if adhesive feels strong',
    ],
  },
  {
    id: 'nadu-recharge-spritz',
    name: 'Nadu Recharge Spritz',
    category: 'accessory',
    isNaduProduct: true,
    sku: 'NDU-RECHARGE-SPRITZ',
    description: 'A refreshing morning facial mist formulated for CPAP users. Rehydrates skin, removes residual adhesive, and leaves a clean, energised feeling after therapy.',
    features: [
      'Micellar water base — lifts mask residue without scrubbing',
      'Hyaluronic acid for morning skin rehydration',
      'Light eucalyptus and peppermint scent — wake-up freshness',
      'No alcohol, no parabens, no sulphates',
      'Travel-size 100ml — TSA/airport compliant',
      'Suitable for all skin types including oily and combination',
    ],
    indications: [
      'Removing adhesive residue from mouth tape',
      'Refreshing skin after overnight mask wear',
      'Dry or dehydrated facial skin from CPAP therapy',
      'Morning skincare reset after therapy',
    ],
    troubleshootingTips: [
      'Spray onto face from 20cm distance, pat in gently — no need to rinse',
      'Can be used to pre-clean mask seating area before applying Mask Soothe',
      'Refrigerate for an extra cooling effect in warm months',
    ],
  },
]
