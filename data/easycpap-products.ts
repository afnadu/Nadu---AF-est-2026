import type { Product, TenantConfig } from '@/types'

export const easyCpapTenantConfig: TenantConfig = {
  id: 'easycpap',
  name: 'Clinic A',
  tagline: "Australia's Most Trusted CPAP Store",
  primaryColor: '#16a34a',
  accentColor: '#0f4c2a',
  logoText: 'Clinic A',
  clinicianEmail: 'info@easycpap.com.au',
  phone: '1300 064 779',
  website: 'https://easycpap.com.au',
  customContext: `
Clinic A is Australia's most trusted online CPAP store. We are an Authorised Australian Dealer for ResMed, Fisher & Paykel, BMC, and Philips — all devices are TGA-approved and meet Australian Therapeutic Goods Administration standards.

KEY POLICIES:
- Free express shipping nationwide on all orders
- 30-day mask fit guarantee — if the mask doesn't fit, we exchange it
- NDIS registered provider (self-managed and plan-managed participants)
- Private health fund rebates available on eligible items
- Local Australian customer support: 1300 064 779 | info@easycpap.com.au

BRANDS STOCKED: ResMed, Fisher & Paykel (F&P), BMC, Philips Respironics, Medistrom

PRODUCT RANGE:
Machines: Fixed CPAP, Auto CPAP (APAP), BiPAP/VPAP, Travel CPAP
Masks: Full face, nasal, nasal pillow — all major brands
Parts: Cushions, headgear, filters, tubing (heated & standard), water chambers
Power: Medistrom battery packs (Pilot-24 Lite, Pilot-12 Lite, Pilot Flex), DC cords, solar chargers
Cleaning: CPAP cleaning supplies and accessories

PRICING CONTEXT (approximate AUD, always check easycpap.com.au for current prices):
- APAP machines: $799–$1,299 (machine only) or $1,249–$1,599 (machine + mask package)
- Full face masks: $189–$299
- Nasal masks: $149–$249
- Nasal pillow masks: $129–$199
- Medistrom batteries: $289–$399
- Replacement cushions: $49–$119
- Heated tubing: $69–$119
  `.trim(),
}

export const easyCpapProducts: Product[] = [
  // ─── MACHINES: ResMed ───
  {
    id: 'ec-airsense11-autoset',
    name: 'ResMed AirSense 11 AutoSet 4G',
    category: 'apap',
    isNaduProduct: false,
    sku: 'RS-AS11-AUTO-4G',
    description:
      "ResMed's most advanced APAP. Auto-adjusting pressure with 4G cellular connectivity, integrated heated humidifier, and the myAir companion app. Voted best overall CPAP machine in Australia.",
    features: [
      'AutoSet APAP: auto-adjusts pressure breath-by-breath (range 4–20 cmH₂O)',
      'Built-in 4G modem — no Wi-Fi setup needed',
      'AutoRamp: holds low pressure until sleep onset detected, then ramps fast',
      'EPR (Expiratory Pressure Relief) levels 1–3 — easier exhalation',
      'AutoClimate heated humidifier with ClimateLineAir 11 tube',
      'Personal Therapy Assistant: on-device setup guidance',
      'myAir app: daily therapy score, leak/AHI data, direct clinic messaging',
      'Ultra-quiet: <27 dBA',
      '5-year warranty through Clinic A',
    ],
    indications: ['Obstructive Sleep Apnea (OSA)', 'UARS', 'Prescribed CPAP therapy'],
    contraindications: ['Primary central sleep apnea', 'CHF with central apneas — discuss ASV with specialist'],
    settings: {
      'Pressure Range': '4–20 cmH₂O (APAP) or fixed CPAP mode',
      EPR: '1, 2, or 3 (full-time or ramp-only)',
      Humidity: 'AutoClimate or manual 1–8',
      Ramp: 'AutoRamp or manual 0–45 min',
      Altitude: 'Auto-compensating 0–5000m',
    },
    compatibility: ['ClimateLineAir 11 heated tube', 'HumidAir 11 water chamber', 'Full AirFit/AirTouch mask range'],
    troubleshootingTips: [
      '"No Mask" alert: check mask is plugged in, cushion seated, and airflow path clear',
      'AHI >5 with low leak: raise APAP max pressure — contact Clinic A clinical support',
      'Rainout: enable AutoClimate or add ClimateLineAir heated tube',
      'Aerophagia: enable EPR 3; if persists, call 1300 064 779 for pressure review',
    ],
  },
  {
    id: 'ec-airsense10-autoset',
    name: 'ResMed AirSense 10 AutoSet 4G',
    category: 'apap',
    sku: 'RS-AS10-AUTO-4G',
    description:
      'The proven workhorse APAP that defined the category. Full-featured with 4G connectivity, HumidAir humidifier and myAir app — now at an excellent price point.',
    features: [
      'AutoSet APAP 4–20 cmH₂O',
      '4G cellular connectivity + myAir app',
      'HumidAir heated humidifier',
      'EPR levels 1–3',
      'AutoRamp',
      'Clinically proven — over 10 years of outcomes data',
    ],
    indications: ['OSA', 'APAP therapy'],
    settings: {
      'Pressure Range': '4–20 cmH₂O',
      EPR: '1, 2, or 3',
      Humidity: 'Auto or manual 1–8',
    },
    compatibility: ['ClimateLineAir heated tube', 'HumidAir 10 water chamber', 'Full AirFit/AirTouch range'],
    troubleshootingTips: [
      'Older model but settings access is identical to AS11 via menu',
      'ClimateLineAir 10 tube is required for heated tube function (not ClimateLineAir 11)',
    ],
  },
  {
    id: 'ec-airsense10-elite',
    name: 'ResMed AirSense 10 Elite CPAP 4G',
    category: 'cpap',
    sku: 'RS-AS10-ELITE',
    description:
      'Fixed-pressure CPAP for patients with a stable titrated prescription. Clinician-locked settings ensure the prescribed pressure is delivered consistently every night.',
    features: [
      'Fixed CPAP — clinician-set pressure (4–20 cmH₂O)',
      'EPR comfort setting',
      'AutoRamp for sleep-onset comfort',
      '4G + myAir app',
      'HumidAir humidifier',
    ],
    indications: ['OSA with stable titrated pressure prescription', 'Patients where APAP auto-titration is not indicated'],
    troubleshootingTips: [
      'Pressure changes require a new prescription — do not adjust without clinical guidance',
      'Contact Clinic A if you feel your pressure is wrong: 1300 064 779',
    ],
  },
  {
    id: 'ec-airmini',
    name: 'ResMed AirMini Travel CPAP',
    category: 'cpap',
    sku: 'RS-AIRMINI',
    description:
      "World's smallest CPAP at just 300g. FAA-approved for in-flight use. Compatible with AirFit F20, N20, and P10 masks via AirMini-specific connectors. Voted best travel CPAP in Australia.",
    features: [
      'AutoSet, CPAP, AutoSet for Her algorithms',
      '300g / fits in the palm of your hand',
      'Waterless HumidX humidification (compatible masks only)',
      'Bluetooth + AirMini app (iOS & Android)',
      'FAA approved; universal power 100–240V',
      'Compatible with Medistrom Pilot-24 Lite battery',
      'Requires AirMini mask connectors (sold separately)',
    ],
    indications: ['Travel use', 'Camping/caravanning', 'Backup device'],
    contraindications: ['Not a full replacement for home device — not rated for sole long-term use'],
    settings: {
      'Pressure Range': '4–20 cmH₂O',
      'HumidX': 'Waterless HME (replaces every 30 uses)',
    },
    compatibility: [
      'AirFit F20 + AirMini F20 connector',
      'AirFit N20 + AirMini N20 connector',
      'AirFit P10 + AirMini P10 connector',
      'Medistrom Pilot-24 Lite battery (with AirMini cable)',
    ],
    troubleshootingTips: [
      'Must use AirMini-specific mask connectors — standard hose will not fit',
      'HumidX: replace every 30 uses or when HumidX indicator shows',
      'At altitude >2000m: use Auto altitude compensation in AirMini app settings',
    ],
  },
  {
    id: 'ec-aircurve10-vauto',
    name: 'ResMed AirCurve 10 VAuto BiPAP',
    category: 'bipap',
    sku: 'RS-AC10-VAUTO',
    description:
      'Variable APAP (VAuto) BiPAP for patients requiring two-level pressure support. Dual-pressure with auto-adjusting IPAP and EPAP, EPR, and full 4G data connectivity.',
    features: [
      'VAuto mode: auto-adjusting IPAP and EPAP',
      'Clinician-set IPAP/EPAP range',
      'Pressure support (PS) range adjustable',
      '4G + myAir/AirView monitoring',
      'HumidAir humidifier + ClimateLineAir tube',
    ],
    indications: ['CPAP-intolerant OSA requiring BiPAP', 'COPD overlap', 'Obesity hypoventilation syndrome (OHS)', 'High-pressure OSA'],
    contraindications: ['ASV-indicated complex apnea — use AirCurve 10 ASV instead'],
    settings: {
      'EPAP Min': '4 cmH₂O',
      'IPAP Max': 'Up to 25 cmH₂O',
      'PS Range': '2–10 cmH₂O',
      EPR: '1–3',
    },
    troubleshootingTips: [
      'Clinician access code required for IPAP/EPAP adjustments',
      'Aerophagia on BiPAP: increase PS differential or add EPR — call clinical support',
    ],
  },

  // ─── MACHINES: Fisher & Paykel ───
  {
    id: 'ec-fp-sleepstyle',
    name: 'Fisher & Paykel SleepStyle Auto CPAP',
    category: 'apap',
    sku: 'FP-SS-AUTO',
    description:
      "Premium APAP with patented SensAwake technology — detects wakefulness and instantly reduces pressure to help you return to sleep. Paired with F&P's world-leading humidification. 5-year warranty.",
    features: [
      'SensAwake: drops pressure instantly when wakefulness detected',
      'TheraCal auto-pressure algorithm',
      'Integrated heated humidifier with 3D-printed water chamber',
      'Optional 600-series heated breathing tube',
      'Ambient light sensor for backlight adjustment',
      'Remote monitoring via Nox system',
      '5-year manufacturer warranty',
    ],
    indications: ['OSA', 'Patients with frequent nocturnal awakenings', 'Patients wanting premium humidification'],
    settings: {
      'Pressure Range': '4–20 cmH₂O',
      SensAwake: 'Adjustable sensitivity',
      Humidity: 'Auto or manual 1–6',
    },
    compatibility: ['F&P 600-series heated tube', 'Evora, Eson 2, Brevida, Solo, Nova Micro, Vitera masks'],
    troubleshootingTips: [
      'Use only genuine F&P 3D-printed chamber — generic chambers do not fit',
      'SensAwake frequent pressure drops: increase SensAwake sensitivity threshold',
      'Best matched with F&P masks for optimal fit and seal reporting',
    ],
  },

  // ─── MACHINES: BMC ───
  {
    id: 'ec-bmc-luna-g3-auto',
    name: 'BMC Luna G3 Auto CPAP',
    category: 'apap',
    sku: 'BMC-G3-AUTO',
    description:
      "BMC's flagship APAP. Full-colour touchscreen display, whisper-quiet motor, built-in heated humidifier, Wi-Fi module, and SpO₂ oximetry option. Outstanding value — machine + mask packages from $794.",
    features: [
      'Auto CPAP 4–20 cmH₂O',
      'Full-colour touchscreen with real-time data display',
      'Detachable heated humidifier with integrated heated tubing',
      'Wi-Fi module included for remote data monitoring',
      'Optional SpO₂ sensor kit (SG-300) for blood oxygen monitoring',
      'Fine-particle filter box for improved air quality',
      'Ultra-quiet operation',
      '2-year warranty',
    ],
    indications: ['OSA', 'Patients wanting value-for-money auto CPAP with monitoring'],
    settings: {
      'Pressure Range': '4–20 cmH₂O (auto or fixed)',
      Humidity: 'Adjustable',
      'Wi-Fi': 'For cloud data upload',
    },
    compatibility: ['BMC N5A nasal mask', 'Standard 22mm CPAP hose (heated integrated)', 'Medistrom Pilot-24 Lite battery'],
    troubleshootingTips: [
      'Wi-Fi module: connect to home network via BMC iBreeze app for remote monitoring',
      'SpO₂ kit upgrade available at easycpap.com.au if not included',
      'Filter: replace BMC G3 standard filter every 3–6 months',
    ],
  },
  {
    id: 'ec-bmc-luna-g3-cpap',
    name: 'BMC Luna G3 Fixed CPAP',
    category: 'cpap',
    sku: 'BMC-G3-CPAP',
    description:
      'Fixed-pressure version of the Luna G3. Full-colour display, heated humidifier, Wi-Fi connectivity. Ideal for patients with a stable titrated prescription who want best value.',
    features: [
      'Fixed CPAP mode',
      'Full-colour display',
      'Detachable heated humidifier',
      'Wi-Fi included',
      'Same form factor as G3 Auto',
    ],
    indications: ['OSA with stable titrated pressure'],
    troubleshootingTips: [
      'Same maintenance as G3 Auto — replace standard filter every 3–6 months',
    ],
  },

  // ─── MACHINES: Travel ───
  {
    id: 'ec-dreamstation-go',
    name: 'Philips DreamStation Go Travel CPAP',
    category: 'cpap',
    sku: 'PH-DSG',
    description:
      'Compact travel CPAP from Philips. Lightweight with optional DC travel adaptor and optional heated humidifier module. Note: Philips supply may be limited — check availability.',
    features: [
      'Lightweight travel design',
      'Optional humidifier module',
      'Flex pressure relief',
      'Travel DC power adapter compatible',
      'Compatible with Medistrom Pilot-12 Lite battery',
    ],
    indications: ['Travel use', 'Backup device'],
    troubleshootingTips: [
      'Check availability — Philips supply chain has been impacted since 2021 recall; Clinic A will advise on current stock',
      'If DreamStation Go unavailable, ResMed AirMini is the recommended alternative',
    ],
  },

  // ─── MASKS: Full Face ───
  {
    id: 'ec-airfit-f20',
    name: 'ResMed AirFit F20 Full Face Mask',
    category: 'mask-fullface',
    sku: 'RS-F20',
    description:
      'The best-selling full face mask in Australia. InfinitySeal cushion adapts to face contours for reliable seal. Available in XS, S, M, L. 30-day fit guarantee from Clinic A.',
    features: [
      'InfinitySeal cushion — flexible rim for forgiving fit',
      'Quick-release elbow for easy removal',
      'Magnetic headgear clips — attach in the dark',
      'Soft fabric headgear minimises contact marks',
      'AirFit F20 For Her variant (narrower frame) available',
      'XS, S, M, L cushion sizes',
    ],
    indications: ['Mouth breathers', 'Nasal congestion', 'Higher pressure therapy', 'BiPAP patients'],
    troubleshootingTips: [
      'Air toward eyes: check chin seal — leaks near eyes on F20 are often chin-origin not bridge',
      'Aerophagia higher risk with full face: enable EPR 3 or discuss BiPAP with clinician',
      'Replace cushion every 1–3 months; headgear every 6 months',
    ],
  },
  {
    id: 'ec-airfit-f30',
    name: 'ResMed AirFit F30 Full Face Mask',
    category: 'mask-fullface',
    sku: 'RS-F30',
    description:
      'Under-the-nose full face mask — seals below the nose rather than over it. No nasal bridge contact. Ideal for readers, TV watchers, and patients who dislike bridge pressure.',
    features: [
      'Under-nose cushion: no nasal bridge contact',
      'Minimal frame — clear field of vision',
      'InfinitySeal technology',
      'Available S, M, L',
    ],
    indications: ['Mouth breathing', 'Nasal bridge pressure sores', 'Glasses wearers', 'Readers/TV watchers'],
    troubleshootingTips: [
      'Under-nose seal requires the cushion to sit flat against the upper lip — ensure no gap',
      'Not suitable for facial hair that disrupts the upper lip seal area',
    ],
  },
  {
    id: 'ec-airfit-f30i',
    name: 'ResMed AirFit F30i Full Face Mask',
    category: 'mask-fullface',
    sku: 'RS-F30I',
    description:
      'Top-of-head tube connection with under-nose cushion. Completely unobstructed front of face. Ideal for stomach sleepers and those who move frequently during sleep.',
    features: [
      'Top-of-head tube connection — face completely clear',
      'Under-nose cushion design',
      'Excellent for side and stomach sleepers',
      'Can read or watch TV freely with mask on',
    ],
    indications: ['Stomach sleepers', 'Active sleepers', 'Mouth breathers who want minimal face obstruction'],
    troubleshootingTips: [
      'Top-tube connection: ensure tube is not kinked when adjusting sleep position',
      'Seal under nose — same as F30; must press flat to upper lip area',
    ],
  },
  {
    id: 'ec-fp-vitera',
    name: 'Fisher & Paykel Vitera Full Face Mask',
    category: 'mask-fullface',
    sku: 'FP-VITERA',
    description:
      'F&P Vitera with RollFit XT seal — the cushion pivots as you move for a consistent seal in any sleep position. Excellent for patients who find traditional full face masks leak when they shift positions.',
    features: [
      'RollFit XT seal: pivots with head movement',
      'VentiCool forehead cushion: breathable mesh reduces sweat',
      'Slim profile with top headgear connection',
      'Available in S, M, L',
    ],
    indications: ['Mouth breathers', 'Active sleepers who have leak problems with other full face masks'],
    troubleshootingTips: [
      'RollFit seal works best when forehead pad is correctly adjusted — not too high',
      'Compatible with F&P SleepStyle and standard 22mm hose',
    ],
  },
  {
    id: 'ec-airfit-f10',
    name: 'ResMed AirFit F10 Full Face Mask',
    category: 'mask-fullface',
    sku: 'RS-F10',
    description:
      'Predecessor to the F20 — still widely used and available at a lower price point. Standard seal design. Good entry-level full face mask.',
    features: ['Traditional cushion design', 'Soft headgear', 'Available XS, S, M, L', 'Lower price point'],
    indications: ['Mouth breathers', 'Existing F10 users'],
    troubleshootingTips: [
      'Bridge leak: more common on F10 than F20 — proper size selection is critical',
    ],
  },

  // ─── MASKS: Nasal ───
  {
    id: 'ec-airfit-n20',
    name: 'ResMed AirFit N20 Nasal Mask',
    category: 'mask-nasal',
    sku: 'RS-N20',
    description:
      "Australia's best-selling nasal mask. InfinitySeal cushion with magnetic headgear clips. Forgiving fit for side sleepers and active sleepers. Available in XS, S, M, L.",
    features: [
      'InfinitySeal flexible cushion rim',
      'Magnetic headgear clips for easy on/off',
      'Soft fabric headgear — fewer pressure marks',
      'XS, S, M, L sizes',
      'AirFit N20 For Her variant available',
    ],
    indications: ['Nasal breathers', 'Side sleepers', 'Patients on higher pressures', 'OSA therapy'],
    contraindications: ['Mouth breathing (add chin strap or switch to full face)', 'Nasal obstruction'],
    troubleshootingTips: [
      'Bridge leak: try smaller size; if persists, consider N30i (under-nose design)',
      'Magnetic clips: keep away from pacemakers and credit cards',
      'Replace cushion every 1–3 months — oils break down silicone',
    ],
  },
  {
    id: 'ec-airfit-n30i',
    name: 'ResMed AirFit N30i Nasal Cradle',
    category: 'mask-nasal',
    sku: 'RS-N30I',
    description:
      'Under-nose nasal mask with top-of-head tube connection. Zero nasal bridge contact. Ideal for patients with bridge pressure sores or who wear glasses.',
    features: [
      'Under-nose cradle cushion — no nasal bridge contact',
      'Top-of-head tube connection',
      'Lightweight at 58g',
      'XS/S and M/L cushion sizes',
      'Read, watch TV, or sleep face-down comfortably',
    ],
    indications: ['Bridge pressure sores', 'Glasses wearers', 'Stomach sleepers', 'Mild claustrophobia'],
    troubleshootingTips: [
      'Seal requires cushion to press flat against philtrum (upper lip area)',
      'Not suitable for heavy facial hair in the philtrum area',
    ],
  },
  {
    id: 'ec-fp-evora',
    name: 'Fisher & Paykel Evora Compact Nasal Mask',
    category: 'mask-nasal',
    sku: 'FP-EVORA',
    description:
      "F&P Evora — extremely low profile with an innovative under-nose seal. One of the quietest nasal masks available. Designed for patients who want minimal facial contact without going to nasal pillows.",
    features: [
      'Under-nose seal — below-bridge design',
      'FlexWing stabilisers hold the mask in position without tight headgear',
      'Very quiet — diffuse vent technology',
      'Available in XS, S, M',
      'Compatible with F&P SleepStyle and all standard machines',
    ],
    indications: ['Bridge sores', 'Patients wanting quiet mask', 'Minimal-contact preference'],
    troubleshootingTips: [
      'FlexWing fit: adjust until wings rest flat against sides of nose — not too tight',
      'Quiet vent: do not block diffuse vent holes with headgear',
    ],
  },
  {
    id: 'ec-fp-eson2',
    name: 'Fisher & Paykel Eson 2 Nasal Mask',
    category: 'mask-nasal',
    sku: 'FP-ESON2',
    description:
      'Classic nasal mask from F&P with RollFit seal — pivots with movement for consistent overnight seal. Good fit across a wide range of face shapes.',
    features: [
      'RollFit seal: adjusts with head movement',
      'Minimal headgear straps',
      'Available in XS, S, M, L',
      'Easy-clean design',
    ],
    indications: ['OSA', 'Active sleepers who have leaks with standard nasal masks'],
    troubleshootingTips: [
      'RollFit: ensure seal is properly seated before lying down — it adjusts from there',
    ],
  },
  {
    id: 'ec-fp-solo',
    name: 'Fisher & Paykel Solo Nasal Mask',
    category: 'mask-nasal',
    sku: 'FP-SOLO',
    description:
      "F&P Solo — a new-generation nasal mask with a uniquely shaped cushion for a wide, soft seal. Great for patients who've had seal issues with other nasal masks.",
    features: [
      'Broad soft silicone cushion for wide seal',
      'Single-piece frame for simplified cleaning',
      'Available S, M, L',
    ],
    indications: ['Nasal breathing', 'Patients who find standard nasal masks leak'],
    troubleshootingTips: [
      'Wider cushion: ensure no skin folds under cushion edges when fitting',
    ],
  },
  {
    id: 'ec-ph-dreamwear-nasal',
    name: 'Philips DreamWear Nasal Mask',
    category: 'mask-nasal',
    sku: 'PH-DW-NASAL',
    description:
      'Philips DreamWear — under-nose design with top-of-head tube connection. Excellent minimal-contact nasal mask. Note: Philips supply availability may vary — check at easycpap.com.au.',
    features: [
      'Magnetic under-nose seal',
      'Top-of-head connection for unrestricted sleeping position',
      'Soft frame hugs the face',
      'Available in XS, S, M, L',
    ],
    indications: ['Active sleepers', 'Bridge pressure sores', 'Patients wanting minimal contact'],
    troubleshootingTips: [
      'Check availability — Philips supply may be impacted; AirFit N30i is a direct alternative',
    ],
  },

  // ─── MASKS: Nasal Pillow ───
  {
    id: 'ec-airfit-p10',
    name: 'ResMed AirFit P10 Nasal Pillow Mask',
    category: 'mask-pillow',
    sku: 'RS-P10',
    description:
      'The lightest nasal pillow mask at just 45g. SpringFit headgear — one size fits most. Minimal contact, ideal for claustrophobia, active sleepers, and facial hair. Compatible with AirMini travel CPAP.',
    features: [
      'Dual-wall nasal pillows for secure seal with low insertion depth',
      '45g total weight — lightest mask in range',
      'SpringFit headgear: one size fits all (no adjustment)',
      'XS, S, M nasal pillow sizes',
      'AirFit P10 For Her variant available',
      'Compatible with ResMed AirMini (with P10 AirMini connector)',
    ],
    indications: ['Claustrophobia', 'Facial hair', 'Side sleepers', 'Active/restless sleepers', 'Pressures up to ~15 cmH₂O'],
    contraindications: ['Mouth breathing (add chin strap)', 'Pressure >16 cmH₂O', 'Severe nasal obstruction'],
    troubleshootingTips: [
      'Nostril soreness: try smaller pillow size; alternate pillow position nightly',
      'Mouth leak: add CPAP chin strap or switch to nasal mask',
      'High pressure (>15): consider AirFit N20 nasal mask instead',
    ],
  },
  {
    id: 'ec-fp-brevida',
    name: 'Fisher & Paykel Brevida Nasal Pillow Mask',
    category: 'mask-pillow',
    sku: 'FP-BREVIDA',
    description:
      'F&P Brevida — ultra-lightweight nasal pillow mask with AirPillow™ seal that inflates with therapy pressure for a self-adjusting comfortable fit. Excellent for claustrophobia and active sleepers.',
    features: [
      'AirPillow seal: self-inflates with therapy pressure — no over-tightening needed',
      'Magnetic headgear clip',
      'Minimal contact design',
      'XS/S and M/L sizes',
      'Compatible with F&P SleepStyle and all machines',
    ],
    indications: ['Claustrophobia', 'Facial hair', 'Patients who dislike rigid nasal pillows', 'Active sleepers'],
    troubleshootingTips: [
      'AirPillow seal: do NOT over-tighten headgear — the pillow seals itself with pressure',
      'Leak before pressure builds: ensure pillow is seated in nostril, then start machine',
    ],
  },
  {
    id: 'ec-fp-nova-micro',
    name: 'Fisher & Paykel Nova Micro Nasal Pillow',
    category: 'mask-pillow',
    sku: 'FP-NOVA-MICRO',
    description:
      'F&P Nova Micro — minimalist nasal pillow with a uniquely angled design for side sleepers. Excellent for patients who want almost no mask awareness during sleep.',
    features: [
      'Compact nasal pillow design',
      'Angled fit for side sleeping',
      'Available S, M, L',
      'Extremely low profile',
    ],
    indications: ['Side sleepers', 'Minimal contact preference', 'Facial hair'],
    troubleshootingTips: [
      'Ensure pillow is angled correctly into nostril — slight upward angle for best seal',
    ],
  },
  {
    id: 'ec-fp-pilairo-q',
    name: 'Fisher & Paykel Pilairo Q Nasal Pillow',
    category: 'mask-pillow',
    sku: 'FP-PILAIRO-Q',
    description:
      'F&P Pilairo Q — lightweight nasal pillow with unique pillows that gently cradle rather than insert into the nostrils. One of the most comfortable nasal pillow options for sensitive patients.',
    features: [
      'Non-insertive pillows — cradle around the nostril opening',
      'Less nostril soreness than insertive pillows',
      'Available S, M, L',
      'Lightweight minimal headgear',
    ],
    indications: ['Nostril sensitivity', 'Patients uncomfortable with insertive nasal pillows', 'Claustrophobia'],
    troubleshootingTips: [
      'Non-insertive: works best with correct angle — pillows should cradle, not push',
      'At higher pressures (>14), may see slight leak — consider nasal mask instead',
    ],
  },
  {
    id: 'ec-ph-dreamwear-pillows',
    name: 'Philips DreamWear Gel Pillow Mask',
    category: 'mask-pillow',
    sku: 'PH-DW-GEL',
    description:
      'Philips DreamWear with gel nasal pillows — top-of-head tube connection, gel cushioning for added softness. Check stock availability at easycpap.com.au.',
    features: ['Gel pillow inserts for soft seal', 'Top-of-head tube', 'Fitpack includes S, M, L pillows'],
    indications: ['Minimal contact preference', 'Active sleepers'],
    troubleshootingTips: ['Check availability — Philips supply may be limited'],
  },
  {
    id: 'ec-bmc-n5a',
    name: 'BMC N5A Nasal CPAP Starter Kit',
    category: 'mask-nasal',
    sku: 'BMC-N5A',
    description:
      'BMC N5A nasal mask — bundled in BMC Luna G3 machine packages. Lightweight gel cushion, anti-asphyxia valve, suitable for pressures up to 20 cmH₂O.',
    features: [
      'Gel cushion for comfortable seal',
      'Anti-asphyxia valve',
      'Available S, M, L',
      'Good value for BMC Luna users',
    ],
    indications: ['OSA', 'Standard nasal mask use'],
    troubleshootingTips: ['Replace cushion every 3 months', 'Compatible with any standard 22mm CPAP machine'],
  },

  // ─── ACCESSORIES: Power ───
  {
    id: 'ec-medistrom-pilot24',
    name: 'Medistrom Pilot-24 Lite Battery Pack',
    category: 'accessory',
    sku: 'MED-P24L',
    description:
      '1–2 night battery backup for ResMed AirSense 10, AirSense 11, AirMini, and BMC G3 devices. Essential for camping, caravanning, and international travel. FAA-compliant.',
    features: [
      '1–2 nights of power (without humidifier)',
      'Compatible: ResMed AirSense 10, AirSense 11, AirCurve 10, AirMini, BMC G3',
      'Built-in USB charging port',
      'Integrated flashlight',
      'FAA carry-on approved',
      'Solar charging compatible (with Medistrom solar panel)',
      'Medistrom DC car charging cord compatible',
    ],
    indications: ['Travel', 'Camping/caravanning', 'Power outage backup', 'International travel'],
    troubleshootingTips: [
      'Turn off humidifier on battery to extend runtime to 2 nights',
      'Charge battery before trip — full charge takes ~3 hours',
      'AirMini users: requires AirMini-specific cable from Medistrom range',
    ],
  },
  {
    id: 'ec-medistrom-pilot12',
    name: 'Medistrom Pilot-12 Lite Battery Pack',
    category: 'accessory',
    sku: 'MED-P12L',
    description:
      '1–2 night battery backup specifically for Philips DreamStation and DreamStation Go. Weighs just 600g.',
    features: [
      '1–2 nights of power',
      'Compatible: Philips DreamStation, DreamStation Go, System One 60 Series',
      'Solar charging compatible',
      'DC car charging compatible',
      'USB charging port',
    ],
    indications: ['Travel for Philips DreamStation users', 'Power backup'],
    troubleshootingTips: ['Only compatible with Philips devices — use Pilot-24 for ResMed/BMC'],
  },
  {
    id: 'ec-medistrom-pilot-flex',
    name: 'Medistrom Pilot Flex CPAP Battery',
    category: 'accessory',
    sku: 'MED-FLEX',
    description:
      'Universal CPAP battery compatible with most major CPAP brands. Flexible connectivity for a broad range of devices.',
    features: [
      'Universal connectivity',
      'Supports CPAP and BiPAP devices',
      'Multiple output options',
      'FAA-compliant',
    ],
    indications: ['Universal travel battery', 'Mixed-brand households'],
    troubleshootingTips: ['Check device compatibility list on easycpap.com.au before purchasing'],
  },

  // ─── ACCESSORIES: Tubing ───
  {
    id: 'ec-climateline-11',
    name: 'ResMed ClimateLineAir 11 Heated Tube',
    category: 'tubing',
    sku: 'RS-CLM11',
    description:
      'Heated breathing tube for AirSense 11 and AirCurve 10. Eliminates rainout (condensation in tube) and optimises humidity delivery. Works with AutoClimate mode.',
    features: [
      'Integrated heating element maintains tube temperature',
      'Enables AirSense 11 AutoClimate mode',
      '1.8m length',
      'Compatible with all AirFit mask range',
    ],
    indications: ['Rainout prevention', 'Cold bedroom environments', 'Optimal humidification delivery'],
    troubleshootingTips: [
      'Ensure AutoClimate is enabled on AirSense 11 for automatic management',
      'Replace if heating wire is damaged (visible kinking or fraying)',
      'ClimateLineAir 11 is NOT compatible with AirSense 10 (use ClimateLineAir 10)',
    ],
  },
  {
    id: 'ec-climateline-10',
    name: 'ResMed ClimateLineAir Heated Tube (AirSense 10)',
    category: 'tubing',
    sku: 'RS-CLM10',
    description:
      'Heated tube for AirSense 10 series and AirCurve 10 series. Eliminates condensation and improves humidity delivery.',
    features: ['Heated for AirSense 10/AirCurve 10', '1.8m length'],
    indications: ['Rainout', 'Cold room use'],
    troubleshootingTips: ['Not compatible with AirSense 11 — use ClimateLineAir 11 for that device'],
  },
  {
    id: 'ec-fp-heating-tube',
    name: 'Fisher & Paykel 600 Series Heated Breathing Tube',
    category: 'tubing',
    sku: 'FP-HT600',
    description:
      'Heated tube for Fisher & Paykel SleepStyle CPAP machines. Prevents rainout and delivers optimal humidification throughout the tube.',
    features: ['Heated for F&P SleepStyle', 'Works with all F&P SleepStyle models', '1.8m length'],
    indications: ['Rainout', 'Cold room use with F&P SleepStyle'],
    troubleshootingTips: ['Only compatible with F&P SleepStyle — not for other brands'],
  },

  // ─── ACCESSORIES: Filters ───
  {
    id: 'ec-resmed-filters-fine',
    name: 'ResMed AirSense 10/11 Disposable Fine Filters (Pack of 6)',
    category: 'accessory',
    sku: 'RS-FILT-FINE-6',
    description:
      'Genuine ResMed disposable ultra-fine filters for AirSense 10 and AirSense 11. Replace every 2–4 weeks for optimal air quality.',
    features: ['Ultra-fine particle filtration', 'Pack of 6', 'Compatible: AirSense 10 & 11, AirCurve 10'],
    indications: ['Regular machine maintenance', 'Allergy/asthma patients (replace more frequently)'],
    troubleshootingTips: ['Blocked filter = noisy motor — replace on schedule'],
  },
  {
    id: 'ec-resmed-filters-foam',
    name: 'ResMed AirSense Reusable Foam Filter (Pack of 2)',
    category: 'accessory',
    sku: 'RS-FILT-FOAM-2',
    description:
      'Reusable foam pre-filter for AirSense 10 and AirSense 11. Wash monthly, replace every 6 months.',
    features: ['Reusable — wash with warm water', 'Pack of 2', 'Compatible: AirSense 10 & 11'],
    indications: ['Regular machine maintenance'],
    troubleshootingTips: ['Wash monthly; air dry completely before reinserting'],
  },
  {
    id: 'ec-fp-sleepstyle-filter',
    name: 'Fisher & Paykel SleepStyle Filter',
    category: 'accessory',
    sku: 'FP-SS-FILT',
    description:
      'Washable replacement filter for F&P SleepStyle CPAP. Replace every 3 months. Located at the rear of the machine.',
    features: ['Washable', 'Replace every 3 months', 'F&P SleepStyle compatible'],
    indications: ['Regular maintenance for F&P SleepStyle machines'],
    troubleshootingTips: ['Air dry fully before replacing — machine should not be run with wet filter'],
  },
  {
    id: 'ec-bmc-g3-filter',
    name: 'BMC G3 CPAP Filter',
    category: 'accessory',
    sku: 'BMC-G3-FILT',
    description: 'Replacement air filter for BMC Luna G3 machines. Replace every 3–6 months.',
    features: ['Standard BMC G3 filter', 'Replace 3–6 monthly'],
    indications: ['Regular maintenance for BMC Luna G3 machines'],
    troubleshootingTips: ['Fine-particle filter box on G3 — can also add aftermarket antibacterial filter'],
  },

  // ─── ACCESSORIES: Water Chambers ───
  {
    id: 'ec-humidair11-tub',
    name: 'ResMed HumidAir 11 Water Chamber',
    category: 'humidifier',
    sku: 'RS-HA11-TUB',
    description:
      'Replacement water chamber for AirSense 11 HumidAir humidifier. Genuine ResMed. Replace every 6–12 months or when cracks, mineral deposits, or discolouration appear.',
    features: ['For AirSense 11 HumidAir only', 'Replace every 6–12 months', 'Use distilled water for longevity'],
    indications: ['Replacement humidifier chamber for AirSense 11'],
    troubleshootingTips: [
      'Use distilled or cooled boiled water — tap water leaves mineral deposits',
      'NOT compatible with AirSense 10 tub',
    ],
  },
  {
    id: 'ec-humidair10-tub',
    name: 'ResMed HumidAir 10 Water Chamber',
    category: 'humidifier',
    sku: 'RS-HA10-TUB',
    description: 'Replacement water chamber for AirSense 10 HumidAir. Genuine ResMed.',
    features: ['For AirSense 10 HumidAir', 'Replace every 6–12 months'],
    indications: ['Replacement humidifier chamber for AirSense 10'],
    troubleshootingTips: ['NOT compatible with AirSense 11 tub'],
  },
  {
    id: 'ec-fp-sleepstyle-chamber',
    name: 'Fisher & Paykel SleepStyle Humidification Chamber',
    category: 'humidifier',
    sku: 'FP-SS-CHAMBER',
    description:
      'Proprietary 3D-printed water chamber exclusively for F&P SleepStyle CPAP machines. Genuine F&P — do not use generic alternatives.',
    features: ['F&P SleepStyle only', 'Unique 3D printed design', 'Replace every 6 months'],
    indications: ['Replacement chamber for F&P SleepStyle machines'],
    troubleshootingTips: ['Generic chambers do not fit — genuine F&P chamber required'],
  },

  // ─── ACCESSORIES: Cleaning ───
  {
    id: 'ec-cpap-wipes',
    name: 'CPAP Mask Cleaning Wipes (30 pack)',
    category: 'cleaning',
    sku: 'CLN-WIPES-30',
    description:
      'Daily CPAP mask wipes for quick, on-the-go cleaning. Gentle formula safe for silicone cushions. Removes skin oils and residue without damaging mask materials.',
    features: [
      'Safe for silicone, gel, and memory foam cushions',
      'Unscented option available',
      'Travel-friendly pack',
      '30 wipes per pack',
    ],
    indications: ['Daily mask wipe between full washes', 'Travel cleaning'],
    troubleshootingTips: [
      'Not a substitute for weekly wash — use alongside regular soap-and-water cleaning',
      'Avoid alcohol or bleach-based wipes — degrades silicone',
    ],
  },
  {
    id: 'ec-cpap-mask-wash',
    name: 'CPAP Mask Wash Solution (250ml)',
    category: 'cleaning',
    sku: 'CLN-WASH-250',
    description:
      'pH-neutral CPAP mask cleaning solution for weekly wash of cushions, frames, headgear, and tubing. No alcohol, no bleach, no harsh chemicals.',
    features: [
      'pH-neutral — safe on all mask materials',
      'No alcohol or bleach',
      '250ml bottle',
      'Gentle fragrance-free formula',
    ],
    indications: ['Weekly mask and tubing cleaning routine'],
    troubleshootingTips: ['Rinse all components thoroughly after washing — soap residue can irritate airways'],
  },
]
