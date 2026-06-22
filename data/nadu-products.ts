import type { Product, TenantConfig } from '@/types'

export const naduTenantConfig: TenantConfig = {
  id: 'nadu',
  name: 'Nadu Sleep Solutions',
  tagline: 'Expert Sleep Therapy, Delivered With Care',
  primaryColor: '#0d9488',
  accentColor: '#1e1d50',
  logoText: 'Nadu',
  clinicianEmail: 'clinical@nadu.co',
  phone: '1800 SLEEP WELL',
  website: 'https://www.nadu.co',
  customContext: `
Nadu Sleep Solutions is an Australian-based sleep therapy provider specialising in CPAP and PAP therapy, home sleep testing, and ongoing clinical support. We supply ResMed and Fisher & Paykel equipment as our primary brands, with a focus on long-term patient outcomes. Our clinical team includes registered respiratory therapists and sleep-trained nurses available for remote support.

Key Nadu differentiators:
- Free mask trial exchange program (within 30 days of purchase)
- Remote monitoring via AirView (ResMed) and Nox T3 home sleep testing
- Direct clinician messaging through the Nadu patient portal
- 5-year CPAP machine warranty through our network
- Monthly compliance review service for Medicare-funded patients
  `.trim(),
}

export const naduProducts: Product[] = [
  // ─── CPAP / APAP Machines ───
  {
    id: 'nadu-airsense11-autoset',
    name: 'ResMed AirSense 11 AutoSet',
    category: 'apap',
    isNaduProduct: true,
    sku: 'RS-AS11-AUTO',
    description: 'Our flagship APAP device. Intelligent auto-adjusting pressure with built-in 4G connectivity and the myAir companion app.',
    features: [
      'Auto-adjusting APAP (4–20 cmH2O range)',
      'Built-in 4G modem — no Wi-Fi setup required',
      'AutoRamp with sleep-onset detection',
      'EPR (Expiratory Pressure Relief) levels 1–3',
      'AutoClimate heated humidifier control',
      'myAir app: daily therapy score, sleep tips, clinician messaging',
      'Quiet motor: <27 dBA',
      'Personal Therapy Assistant: onboarding guidance on-device',
    ],
    indications: ['Obstructive Sleep Apnea (OSA)', 'UARS (Upper Airway Resistance Syndrome)', 'Snoring with prescribed CPAP'],
    contraindications: ['Central sleep apnea (primary)', 'Severe COPD requiring BiPAP', 'CHF with central apneas (use caution, consider ASV)'],
    settings: {
      'Pressure Range': '4–20 cmH2O (APAP) or single fixed pressure (CPAP mode)',
      'EPR': '1, 2, or 3 (full-time or ramp-only)',
      'Humidity': 'Auto or manual 1–8',
      'Ramp': 'AutoRamp or manual 0–45 min',
      'Altitude': 'Auto (0–5000m)',
    },
    compatibility: ['ClimateLineAir 11 heated tube', 'HumidAir 11 tub', 'AirFit/AirTouch mask range'],
    troubleshootingTips: [
      'If "No Mask" error: check mask is plugged in, cushion is seated, airflow path is open',
      'If AHI>5 persistently: check P90 pressure against max setting — may need max increase',
      'If rainout: enable AutoClimate or reduce humidity by 1; add ClimateLineAir tube',
      'If aerophagia: enable EPR 3 or reduce min pressure',
    ],
  },
  {
    id: 'nadu-airsense11-cpap',
    name: 'ResMed AirSense 11 CPAP',
    category: 'cpap',
    isNaduProduct: true,
    sku: 'RS-AS11-CPAP',
    description: 'Fixed-pressure CPAP for patients with a titrated pressure prescription. Same platform as the AutoSet.',
    features: [
      'Fixed CPAP with clinician-set pressure',
      'EPR comfort setting',
      'AutoRamp to ease sleep onset',
      '4G connectivity + myAir app',
      'HumidAir heated humidifier',
    ],
    indications: ['OSA with stable titrated pressure', 'Patients where APAP range is not appropriate'],
    settings: {
      'Pressure': 'Clinician-set (4–20 cmH2O)',
      'EPR': '1, 2, or 3',
    },
    compatibility: ['ClimateLineAir 11 heated tube', 'Full AirFit mask range'],
    troubleshootingTips: [
      'Pressure changes require clinician order — do not adjust without clinical guidance',
      'For persistent discomfort: enable EPR 3 (may require clinician menu access)',
    ],
  },
  {
    id: 'nadu-fp-sleepstyle',
    name: 'Fisher & Paykel SleepStyle Auto',
    category: 'apap',
    isNaduProduct: true,
    sku: 'FP-SS-AUTO',
    description: 'Premium APAP with patented SensAwake technology that detects wakefulness and reduces pressure to help patients return to sleep quickly.',
    features: [
      'APAP with SensAwake (lowers pressure on wakefulness detection)',
      'InfoSmart TheraCal algorithm',
      'Built-in humidifier with 3D printed chamber',
      'Ambient light sensor for automatic backlight adjustment',
      'Remote monitoring via Nox',
      'Optional heated breathing tube (600 series)',
    ],
    indications: ['OSA', 'Patients with frequent awakenings who struggle to return to sleep'],
    settings: {
      'Pressure Range': '4–20 cmH2O',
      'SensAwake': 'On/Off, sensitivity adjustable',
      'Humidity': 'Auto or 1–6',
    },
    compatibility: ['F&P 600 series heated tube', 'Evora, Eson 2, Brevida mask range'],
    troubleshootingTips: [
      'SensAwake: if waking frequently, confirm SensAwake is enabled and sensitivity is appropriate',
      'Unique 3D printed chamber — do not use generic chambers',
    ],
  },

  // ─── Masks ───
  {
    id: 'nadu-airfit-n20',
    name: 'ResMed AirFit N20 Nasal Mask',
    category: 'mask-nasal',
    isNaduProduct: true,
    sku: 'RS-N20',
    description: 'Our best-selling nasal mask. Flexible cushion technology for a forgiving seal even with movement.',
    features: [
      'InfinitySeal cushion — flexible rim adapts to face contours',
      'Magnetic headgear clips for easy on/off in the dark',
      'Soft fabric headgear minimises contact marks',
      'Available in XS, S, M, L cushion sizes',
      'Fits a wide face width range',
    ],
    indications: ['OSA', 'Nasal breathers', 'Side sleepers (medium contact)', 'Pressures up to 20 cmH2O'],
    troubleshootingTips: [
      'If bridge leak: check size — N20 tends to leak at bridge when too large',
      'Magnetic clips: keep away from pacemakers/medical implants',
      'Replace cushion when discolouration or hardening appears (typically 3 months)',
    ],
  },
  {
    id: 'nadu-airfit-p10',
    name: 'ResMed AirFit P10 Nasal Pillow Mask',
    category: 'mask-pillow',
    isNaduProduct: true,
    sku: 'RS-P10',
    description: 'Ultra-minimal nasal pillow mask. Ideal for claustrophobia, side sleepers, and those with facial hair.',
    features: [
      'Dual-wall nasal pillows for low insertion depth',
      'Weighs just 45g — lightest mask in range',
      'SpringFit headgear: one-size-fits-all, no adjustment needed',
      'Available in XS, S, M pillow sizes',
      'Compatible with AirMini travel CPAP (with adapter)',
    ],
    indications: ['Mild–moderate OSA', 'Claustrophobia', 'Facial hair', 'Side sleepers', 'Pressures up to ~15 cmH2O'],
    contraindications: ['Mouth breathing (use chin strap or switch to full face)', 'Pressure >16 cmH2O (discomfort)'],
    troubleshootingTips: [
      'Nostril soreness: try smaller pillow size or alternate nostril position nightly',
      'Mouth leak: add chin strap or switch to nasal or full-face mask',
      'Not suitable for pressures above 15 cmH2O — consider N20 or F20',
    ],
  },
  {
    id: 'nadu-airfit-f20',
    name: 'ResMed AirFit F20 Full Face Mask',
    category: 'mask-fullface',
    isNaduProduct: true,
    sku: 'RS-F20',
    description: 'Full face mask covering nose and mouth. The reliable choice for mouth breathers and higher pressures.',
    features: [
      'InfinitySeal full-face cushion for adaptive seal',
      'Quick-release elbow for easy removal',
      'Available in XS, S, M, L frame sizes',
      'Interchangeable with AirFit F20 For Her (narrower frame)',
      'Upper support arm allows reading/TV without mask shifting',
    ],
    indications: ['Mouth breathers', 'Chronic nasal congestion', 'High-pressure therapy', 'BiPAP patients'],
    troubleshootingTips: [
      'If air leaks toward eyes: check chin seal and under-nose area — F20 leaks can be chin-originated',
      'Aerophagia risk higher with full-face — enable EPR 3 or consider BiPAP',
      'If forehead support causes marks: lower the adjustment bracket',
    ],
  },
  {
    id: 'nadu-airfit-n30i',
    name: 'ResMed AirFit N30i Nasal Cradle',
    category: 'mask-nasal',
    isNaduProduct: true,
    sku: 'RS-N30I',
    description: 'Under-the-nose nasal mask with top-of-head connection. Avoids the nasal bridge entirely — ideal for bridge pressure sores or glasses wearers.',
    features: [
      'Top-of-head tube connection — read, watch TV, or sleep on stomach freely',
      'Under-nose cushion — no nasal bridge contact',
      'Lightweight at 58g',
      'Available in XS/S and M/L cushion sizes',
    ],
    indications: ['Bridge pressure sores', 'Glasses wearers', 'Stomach sleepers', 'Claustrophobia (more open feel)'],
    troubleshootingTips: [
      'Leak from under cushion: ensure cushion is pressed flat against upper lip area',
      'Not suitable for moustaches that interfere with seal area',
    ],
  },

  // ─── Accessories ───
  {
    id: 'nadu-climateline-11',
    name: 'ResMed ClimateLineAir 11 Heated Tube',
    category: 'tubing',
    isNaduProduct: true,
    sku: 'RS-CLM11',
    description: 'Heated breathing tube for AirSense 11. Eliminates rainout and optimises humidification delivery.',
    features: [
      'Integrated heating wire maintains tube temperature throughout length',
      'Works with AirSense 11 AutoClimate mode for automatic adjustment',
      'Compatible with all AirFit mask range',
      '1.8m length',
    ],
    indications: ['Rainout prevention', 'Cold bedroom environments', 'Optimal humidification'],
    troubleshootingTips: [
      'If still getting rainout with heated tube: check AutoClimate is enabled, or manually increase tube temperature',
      'Replace annually or if heating wire is damaged',
    ],
  },
  {
    id: 'nadu-airmini',
    name: 'ResMed AirMini Travel CPAP',
    category: 'cpap',
    isNaduProduct: true,
    sku: 'RS-AIRMINI',
    description: 'World\'s smallest CPAP at 300g. FAA-approved for in-flight use. Connects to the AirMini app.',
    features: [
      'AutoSet, CPAP, and AutoSet for Her algorithms',
      '300g total weight',
      'Waterless HumidX humidification (with compatible masks)',
      'Bluetooth-only (no cellular — no subscription needed)',
      'AirMini app for therapy tracking',
      'Compatible with AirFit F20, N20, P10 (requires AirMini mask connector)',
      'FAA approved, universal power supply (100–240V)',
    ],
    indications: ['Travel use', 'Backup device', 'Camping (battery-compatible)'],
    troubleshootingTips: [
      'Requires specific AirMini mask connectors — standard ResMed masks will not connect directly',
      'HumidX waterless HME must be replaced every 30 days',
      'Not a replacement for a home device — not designed for nightly long-term use',
    ],
  },
  {
    id: 'nadu-soclean-alt',
    name: 'Nadu CPAP Cleaning Kit',
    category: 'cleaning',
    isNaduProduct: true,
    sku: 'NDU-CLEAN-KIT',
    description: 'Manual cleaning essentials for safe, manufacturer-approved CPAP hygiene. Includes mild mask soap, microfibre cloths, and tube brush.',
    features: [
      'pH-neutral CPAP mask wash (no alcohol, no bleach)',
      'Tube brush for thorough hose cleaning',
      'Microfibre drying cloth',
      '30-day supply of mask wipes for travel',
    ],
    indications: ['Daily and weekly CPAP cleaning routine'],
    troubleshootingTips: [
      'Avoid alcohol or bleach-based cleaners — degrades silicone and voids warranty',
      'CPAP sanitizers (SoClean, Lumin) are not recommended by ResMed or F&P',
    ],
  },
]
