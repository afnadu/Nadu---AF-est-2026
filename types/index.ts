export type UserMode = 'patient' | 'clinician' | 'training' | 'admin'

export type UrgencyLevel = 'self-care' | 'contact-clinic' | 'urgent-medical'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp?: number
}

export interface Intervention {
  title: string
  steps: string[]
  urgency: UrgencyLevel
  notes?: string
  naduProducts?: string[]
  clinicianOnly?: boolean
}

export interface TriageNode {
  id: string
  label: string
  icon?: string
  description: string
  type: 'category' | 'symptom' | 'cause' | 'intervention'
  children?: TriageNode[]
  interventions?: Intervention[]
  tags?: string[]
}

export interface KnowledgeChunk {
  id: string
  topic: string
  category: 'machine' | 'mask' | 'protocol' | 'troubleshooting' | 'education' | 'settings'
  content: string
  tags: string[]
  clinicianOnly?: boolean
}

export interface Product {
  id: string
  name: string
  category: 'cpap' | 'apap' | 'bipap' | 'asv' | 'mask-fullface' | 'mask-nasal' | 'mask-pillow' | 'mask-hybrid' | 'accessory' | 'humidifier' | 'tubing' | 'cleaning'
  description: string
  features: string[]
  indications: string[]
  contraindications?: string[]
  settings?: Record<string, string>
  compatibility?: string[]
  troubleshootingTips?: string[]
  isNaduProduct?: boolean
  sku?: string
  image?: string
}

export interface Protocol {
  id: string
  title: string
  category: 'onboarding' | 'followup' | 'titration' | 'troubleshooting' | 'compliance' | 'hospital-to-home' | 'training'
  steps: ProtocolStep[]
  timeframe?: string
  requiredRole?: 'patient' | 'clinician' | 'both'
  references?: string[]
}

export interface ProtocolStep {
  step: number
  title: string
  description: string
  checklist?: string[]
  notes?: string
  escalateIf?: string[]
}

export interface TenantConfig {
  id: string
  name: string
  tagline: string
  primaryColor: string
  accentColor: string
  logoText: string
  clinicianEmail?: string
  phone?: string
  website?: string
  customContext?: string
}
