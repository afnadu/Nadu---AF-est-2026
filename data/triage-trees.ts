import type { TriageNode } from '@/types'

export const triageTrees: TriageNode[] = [
  {
    id: 'mask-issues',
    label: 'Mask & Interface',
    icon: '😷',
    description: 'Problems with mask fit, comfort, leaks, or skin',
    type: 'category',
    tags: ['mask', 'interface', 'fit'],
    children: [
      {
        id: 'mask-leak',
        label: 'Mask is Leaking',
        icon: '💨',
        description: 'Air escaping from the mask seal during therapy',
        type: 'symptom',
        children: [
          {
            id: 'mask-leak-bridge',
            label: 'Leaking at Nose Bridge',
            icon: '👃',
            description: 'Air blowing toward eyes or upper face',
            type: 'cause',
            interventions: [
              {
                title: 'Refit Your Mask',
                urgency: 'self-care',
                steps: [
                  'Put the mask on sitting upright (not lying down)',
                  'Start with all straps loose before tightening',
                  'Place the cushion on your nose and press lightly',
                  'Tighten headgear until snug — do NOT over-tighten',
                  'Run your CPAP and check the seal by placing your hand near the bridge',
                ],
                notes: 'Over-tightening is the #1 cause of bridge leaks — it deforms the cushion and breaks the seal.',
              },
              {
                title: 'Try a Different Mask Size or Style',
                urgency: 'contact-clinic',
                steps: [
                  'Consider an under-the-nose nasal mask (ResMed N30, Philips DreamWear)',
                  'These avoid the nasal bridge completely',
                  'Call your clinic to arrange a mask trial',
                ],
              },
            ],
          },
          {
            id: 'mask-leak-side',
            label: 'Leaking on Cheeks or Sides',
            icon: '↔️',
            description: 'Air coming from the sides of the mask',
            type: 'cause',
            interventions: [
              {
                title: 'Check Cushion Condition',
                urgency: 'self-care',
                steps: [
                  'Inspect the silicone cushion for tears, discolouration, or hardening',
                  'Replace cushion if it is more than 3 months old',
                  'Clean cushion with warm soapy water — skin oils break down silicone',
                  'Ensure cushion is clicked firmly into the frame',
                ],
              },
              {
                title: 'Re-size Your Mask',
                urgency: 'contact-clinic',
                steps: [
                  'Use the sizing guide included with your mask',
                  'Many brands offer XS, S, M, L — most patients use S or M',
                  'Contact your provider for a sizing appointment',
                ],
              },
            ],
          },
          {
            id: 'mask-leak-positional',
            label: 'Leaks When I Change Position',
            icon: '🛏️',
            description: 'Mask seals when lying still but leaks with movement',
            type: 'cause',
            interventions: [
              {
                title: 'Try a Minimal-Contact Mask',
                urgency: 'self-care',
                steps: [
                  'Nasal pillow masks (e.g. ResMed P10) have the fewest contact points',
                  'Less contact = less chance of positional leak',
                  'Ask your clinic about a nasal pillow trial',
                ],
              },
              {
                title: 'CPAP-Friendly Pillow',
                urgency: 'self-care',
                steps: [
                  'CPAP pillows have cutouts that accommodate the mask frame',
                  'Prevents the pillow from pushing the mask off-seal when side sleeping',
                  'Available from your equipment provider or online',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'mask-skin',
        label: 'Skin Redness or Sores',
        icon: '🔴',
        description: 'Pressure marks, redness, or sores from the mask',
        type: 'symptom',
        children: [
          {
            id: 'mask-skin-overtight',
            label: 'Over-Tightening',
            icon: '😣',
            description: 'Marks from strapping mask too tight',
            type: 'cause',
            interventions: [
              {
                title: 'Loosen Headgear',
                urgency: 'self-care',
                steps: [
                  'You should be able to slide 2 fingers under the headgear straps',
                  'Paradoxically, tighter = more leaks, not fewer',
                  'The cushion seals from air pressure, not mechanical force',
                  'Loosen gradually until you find the minimum needed for seal',
                ],
              },
              {
                title: 'Use a Mask Liner',
                urgency: 'self-care',
                steps: [
                  'Fabric mask liners (Padacheek, Remzzzs) absorb pressure and reduce contact marks',
                  'Wash daily — they trap oils from skin',
                  'May slightly reduce seal; test with CPAP data after',
                ],
              },
            ],
          },
          {
            id: 'mask-skin-allergy',
            label: 'Possible Silicone Reaction',
            icon: '⚠️',
            description: 'Rash or itching beyond just pressure marks',
            type: 'cause',
            interventions: [
              {
                title: 'Test for Silicone Sensitivity',
                urgency: 'contact-clinic',
                steps: [
                  'Clean the mask cushion thoroughly before each use',
                  'Try using a fabric mask liner as a barrier',
                  'Ask your clinician about a cloth/foam mask (Sleepweaver Anew)',
                  'See your GP if rash spreads or persists',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'mask-claustrophobia',
        label: 'Feeling Claustrophobic',
        icon: '😰',
        description: 'Anxiety, panic, or discomfort wearing the mask',
        type: 'symptom',
        interventions: [
          {
            title: 'Gradual Desensitisation',
            urgency: 'self-care',
            steps: [
              'Day 1: Hold mask near face for 10 minutes while watching TV — no straps, no machine',
              'Day 2–3: Put mask on face with straps but no machine running',
              'Day 4–5: Put mask on and run machine at low ramp pressure while awake',
              'Day 6+: Try sleeping with mask — use CPAP for naps first',
              'Be patient — most people adapt within 2 weeks',
            ],
            notes: 'Nasal pillow masks (minimal face contact) are best for anxiety-prone patients.',
          },
          {
            title: 'Switch to Minimal-Contact Mask',
            urgency: 'contact-clinic',
            steps: [
              'Request nasal pillow mask trial from your clinic (e.g. ResMed AirFit P10)',
              'Nasal pillows only touch the nostrils — most open feel available',
              'Not suitable if you mouth-breathe or need pressures above ~15 cmH2O',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'pressure-breathing',
    label: 'Pressure & Breathing',
    icon: '🫁',
    description: 'Difficulty breathing with CPAP, bloating, or pressure discomfort',
    type: 'category',
    tags: ['pressure', 'breathing', 'aerophagia', 'central'],
    children: [
      {
        id: 'pressure-too-high',
        label: 'Pressure Feels Too High',
        icon: '📈',
        description: 'Hard to exhale, feeling like you are fighting the machine',
        type: 'symptom',
        children: [
          {
            id: 'cause-epr',
            label: 'No Expiratory Relief Enabled',
            icon: '⚙️',
            description: 'EPR/Flex comfort setting may not be activated',
            type: 'cause',
            interventions: [
              {
                title: 'Enable EPR or Flex',
                urgency: 'self-care',
                steps: [
                  'On ResMed devices: Menu → My Options → EPR → set to 3 (full-time)',
                  'On Philips DreamStation: Settings → Flex → set to 3',
                  'This reduces pressure during exhalation making it easier to breathe out',
                  'Check your device manual or ask your provider to activate this setting',
                ],
                notes: 'Some devices require a clinician access code to change settings. Call your clinic if you cannot access the menu.',
              },
            ],
          },
          {
            id: 'cause-pressure-rx',
            label: 'Prescribed Pressure May Be Too High',
            icon: '📋',
            description: 'Overall therapeutic pressure could need adjustment',
            type: 'cause',
            interventions: [
              {
                title: 'Request Pressure Review',
                urgency: 'contact-clinic',
                steps: [
                  'Download your therapy data (myAir app for ResMed)',
                  'Note: average pressure, 90th percentile pressure, and AHI',
                  'Call your clinic with this data — clinician can adjust APAP max pressure',
                  'For fixed CPAP: a physician order is required to change pressure',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'pressure-aerophagia',
        label: 'Bloating / Air Swallowing',
        icon: '🫃',
        description: 'Gas, belching, or stomach bloating from swallowing CPAP air',
        type: 'symptom',
        interventions: [
          {
            title: 'Reduce Expiratory Pressure',
            urgency: 'self-care',
            steps: [
              'Enable EPR (ResMed) or Flex (Philips) at level 3 if not already set',
              'This reduces effective pressure during swallowing',
              'Avoid eating 2–3 hours before bed',
              'Elevate head of bed 15–30° (wedge pillow)',
            ],
          },
          {
            title: 'Request APAP or Pressure Reduction',
            urgency: 'contact-clinic',
            steps: [
              'If on fixed CPAP: ask clinician to switch to APAP (lower average pressure)',
              'If already on APAP: ask clinician to lower maximum pressure',
              'If severe: clinician may consider BiPAP which has a larger IPAP/EPAP split',
              'Most aerophagia resolves within days of pressure reduction',
            ],
          },
        ],
      },
      {
        id: 'pressure-mouth-breathing',
        label: 'Mouth Breathing / Dry Mouth',
        icon: '👄',
        description: 'Breathing through your mouth, waking with dry mouth or throat',
        type: 'symptom',
        interventions: [
          {
            title: 'Add a Chin Strap',
            urgency: 'self-care',
            steps: [
              'A chin strap holds the jaw closed to prevent mouth opening',
              'Use with nasal or nasal pillow mask only — not full face',
              'Start gently — should not feel uncomfortable',
              'If mouth still opens: try a full-face mask instead',
            ],
          },
          {
            title: 'Switch to Full-Face Mask',
            urgency: 'contact-clinic',
            steps: [
              'Full-face masks cover nose AND mouth',
              'Ideal for confirmed mouth breathers',
              'Contact your provider for a full-face mask fitting',
              'Note: full-face masks require good cheek and chin seal — proper fit is critical',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'comfort-sleep',
    label: 'Comfort & Sleep Quality',
    icon: '😴',
    description: 'Dryness, humidity problems, or difficulty sleeping with CPAP',
    type: 'category',
    tags: ['comfort', 'humidity', 'sleep', 'dryness'],
    children: [
      {
        id: 'comfort-dry',
        label: 'Dry Mouth, Nose, or Throat',
        icon: '🌵',
        description: 'Waking with dryness or irritation of airways',
        type: 'symptom',
        interventions: [
          {
            title: 'Increase Humidifier Setting',
            urgency: 'self-care',
            steps: [
              'Increase humidity by 1 increment each night until dryness resolves',
              'ResMed: Menu → Climate → Humidity (or use AutoClimate)',
              'Philips: Settings → Humidifier Level',
              'Target: no dryness but no condensation in tube',
            ],
          },
          {
            title: 'Add Heated Tubing',
            urgency: 'contact-clinic',
            steps: [
              'Heated tubing warms air throughout the tube, delivering more humidity to the mask',
              'Most effective solution for persistent dryness and rainout simultaneously',
              'Ask your provider about compatible heated tube for your machine',
            ],
          },
        ],
      },
      {
        id: 'comfort-rainout',
        label: 'Water in Tube or Mask (Rainout)',
        icon: '💧',
        description: 'Gurgling sounds, water droplets, or sudden water splash in mask',
        type: 'symptom',
        interventions: [
          {
            title: 'Reduce Humidity and Manage Tubing',
            urgency: 'self-care',
            steps: [
              'Reduce humidifier setting by 1–2 increments',
              'Route tubing under bedcovers to keep it warm',
              'Place machine at or below bed height so water runs away from mask',
              'Use a tube wrap/insulation sleeve if available',
            ],
          },
          {
            title: 'Install Heated Tubing',
            urgency: 'contact-clinic',
            steps: [
              'Heated tubing is the definitive fix for rainout in cold rooms',
              'It eliminates the temperature drop that causes condensation',
              'Contact your provider to arrange compatible heated tube',
            ],
          },
        ],
      },
      {
        id: 'comfort-cant-sleep',
        label: "Can't Fall Asleep with Mask On",
        icon: '🌙',
        description: 'Difficulty initiating sleep, staying awake due to CPAP',
        type: 'symptom',
        interventions: [
          {
            title: 'Enable AutoRamp',
            urgency: 'self-care',
            steps: [
              'AutoRamp holds pressure at a low comfortable level until you fall asleep',
              'Once sleep is detected, pressure ramps quickly to therapeutic level',
              'ResMed: Menu → My Options → Ramp → AutoRamp',
              'This prevents the "fighting the pressure" feeling at sleep onset',
            ],
          },
          {
            title: 'Practice with CPAP During the Day',
            urgency: 'self-care',
            steps: [
              'Wear mask + machine running for 20–30 minutes while watching TV',
              'Nap with CPAP before attempting overnight use',
              'This trains your brain to associate the mask with relaxation',
              'Gradual exposure is more effective than forcing overnight use immediately',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'machine-equipment',
    label: 'Machine & Equipment',
    icon: '⚙️',
    description: 'Device noise, malfunction, cleaning, or maintenance questions',
    type: 'category',
    tags: ['machine', 'device', 'noise', 'cleaning', 'maintenance'],
    children: [
      {
        id: 'machine-noise',
        label: 'Machine Making Unusual Noise',
        icon: '🔊',
        description: 'New or increased noise from the CPAP device or tubing',
        type: 'symptom',
        children: [
          {
            id: 'noise-leak',
            label: 'Hissing or Whistling',
            icon: '🌬️',
            description: 'High-pitched noise from mask or connections',
            type: 'cause',
            interventions: [
              {
                title: 'Find and Fix the Air Leak',
                urgency: 'self-care',
                steps: [
                  'Check all tubing connections: machine port, tubing ends, mask connection',
                  'Ensure tubing is firmly clicked in — rotate until you feel a click',
                  'Check for cracks in tubing (inspect full length)',
                  'Refit mask — whistling from mask = mask leak, not machine issue',
                  'If connections are fine but noise persists: contact provider',
                ],
              },
            ],
          },
          {
            id: 'noise-motor',
            label: 'Loud Motor or Grinding',
            icon: '🔧',
            description: 'Changed motor sound, grinding, or rattling from device',
            type: 'cause',
            interventions: [
              {
                title: 'Check Filter and Contact Provider',
                urgency: 'contact-clinic',
                steps: [
                  'Check the air inlet filter — replace if dirty (blocks airflow, stresses motor)',
                  'Ensure machine is on a flat, stable surface with vents unobstructed',
                  'Do NOT disassemble the machine',
                  'If noise persists: device may need service — contact your provider',
                  'Under warranty: provider will arrange repair or replacement',
                ],
              },
            ],
          },
          {
            id: 'noise-rainout',
            label: 'Gurgling / Water Sounds',
            icon: '💧',
            description: 'Water in tubing creating gurgling or bubbling sounds',
            type: 'cause',
            interventions: [
              {
                title: 'Address Rainout',
                urgency: 'self-care',
                steps: [
                  'Condensation in tube is the cause — see the Rainout section for full fix',
                  'Quick fix: empty tubing by holding mask end up and blowing back',
                  'Reduce humidity by 1 increment tonight',
                  'Consider heated tubing as a permanent solution',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'machine-not-working',
        label: "Machine Won't Start or Error",
        icon: '❌',
        description: 'Device not powering on, error messages, or shutting off',
        type: 'symptom',
        interventions: [
          {
            title: 'Basic Power and Error Check',
            urgency: 'self-care',
            steps: [
              'Check power cable is firmly connected at both machine and wall',
              'Try a different power outlet',
              'Check for error code on display — note the code exactly',
              'Check water chamber is properly seated (if humidifier enabled)',
              'For ResMed: power off, wait 30 seconds, power on',
            ],
          },
          {
            title: 'Contact Provider for Device Service',
            urgency: 'contact-clinic',
            steps: [
              'Note the error code and what was happening when it occurred',
              'Do not attempt to repair the device yourself',
              'Provider can usually loan a replacement machine while yours is serviced',
              'If device is under warranty: manufacturer may replace',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'therapy-effectiveness',
    label: 'Therapy Effectiveness',
    icon: '📊',
    description: 'Still tired, high event count, data questions, or compliance',
    type: 'category',
    tags: ['effectiveness', 'ahi', 'tired', 'compliance', 'data'],
    children: [
      {
        id: 'still-tired',
        label: 'Still Feeling Tired',
        icon: '😴',
        description: 'Excessive daytime sleepiness despite using CPAP',
        type: 'symptom',
        interventions: [
          {
            title: 'Review Your Therapy Data',
            urgency: 'self-care',
            steps: [
              'Check myAir (ResMed) or DreamMapper (Philips) app for your nightly scores',
              'Identify your AHI — should be under 5, ideally under 2',
              'Check usage hours — minimum 4h/night, ideally 7h+ for full benefit',
              'Review mask leak score — large leaks reduce therapy effectiveness',
              'Bring this data to your next clinic appointment',
            ],
          },
          {
            title: 'Clinical Review Required',
            urgency: 'contact-clinic',
            steps: [
              'Persistent fatigue after 3+ months of good CPAP use warrants investigation',
              'Possible causes: residual AHI too high, comorbid sleep disorder (RLS, insomnia)',
              'Blood tests: thyroid function, full blood count, iron studies',
              'Sleep physician review may be needed',
            ],
          },
        ],
      },
      {
        id: 'high-ahi',
        label: 'High Event Count on Therapy',
        icon: '📈',
        description: 'AHI or events still elevated despite using CPAP',
        type: 'symptom',
        interventions: [
          {
            title: 'Check Leak Rate First',
            urgency: 'self-care',
            steps: [
              'Large leaks corrupt AHI data — fix leaks before assuming therapy failure',
              'Check your leak data in the app',
              'Reduce leaks to <24 L/min (ResMed) then re-assess AHI',
            ],
          },
          {
            title: 'Pressure Adjustment Required',
            urgency: 'contact-clinic',
            steps: [
              'AHI >5 with good seal = likely under-pressured or wrong therapy mode',
              'For APAP: clinician can increase max pressure',
              'Persistent central apneas: may need BiPAP or ASV evaluation',
              'Request urgent clinic review with 30-day data download',
            ],
          },
        ],
      },
    ],
  },
]
