/**
 * Shared mock data for the compliance mockup.
 *
 * Centralise here any dataset that is (or will be) consumed by more than one
 * page so that numbers and names stay consistent across the UI.
 *
 * Page-specific data (alert lists, findings, report entries, etc.) should live
 * in the page file itself.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Frameworks
// Every field is used by at least one page; `color` is the Tailwind bg class
// used in progress bars.  shortName is used where horizontal space is tight.
// ─────────────────────────────────────────────────────────────────────────────

export interface Framework {
  /** Full display name for tables and detail cards */
  name: string
  /** Compact name for KPI chips and narrow layouts */
  shortName: string
  /** 0-100 compliance score derived from compliant/controls */
  score: number
  /** Total applicable controls / obligations */
  controls: number
  /** Controls currently passing */
  compliant: number
  /** Tailwind bg-* class for progress bars */
  color: string
}

export const frameworks: Framework[] = [
  {
    name: 'ISO 27001:2022',
    shortName: 'ISO 27001',
    score: 78,
    controls: 114,
    compliant: 89,
    color: 'bg-blue-500',
  },
  {
    // Ley Federal de Protección de Datos Personales en Posesión de los Particulares
    name: 'LFPDPPP',
    shortName: 'LFPDPPP',
    score: 91,
    controls: 47,
    compliant: 43,
    color: 'bg-purple-500',
  },
  {
    // Norma Oficial Mexicana sobre factores de riesgo psicosocial en el trabajo
    name: 'NOM-035-STPS-2018',
    shortName: 'NOM-035',
    score: 64,
    controls: 80,
    compliant: 51,
    color: 'bg-rose-500',
  },
  {
    name: 'PCI DSS v4.0',
    shortName: 'PCI DSS',
    score: 55,
    controls: 60,
    compliant: 33,
    color: 'bg-orange-500',
  },
  {
    name: 'ISO 9001:2015',
    shortName: 'ISO 9001',
    score: 82,
    controls: 36,
    compliant: 30,
    color: 'bg-emerald-500',
  },
  {
    // Marco de Administración de Tecnologías de la Información para el Gobierno Federal
    name: 'MAAGTICSI',
    shortName: 'MAAGTICSI',
    score: 70,
    controls: 108,
    compliant: 76,
    color: 'bg-teal-500',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Key Risk Indicators (KRIs)
// Shown on the executive overview and will appear on the dashboard home.
// ─────────────────────────────────────────────────────────────────────────────

export type KriLevel = 'low' | 'medium' | 'high'
export type KriTrend = 'up' | 'down' | 'stable'

export interface KriItem {
  label: string
  value: number
  level: KriLevel
  trend: KriTrend
}

export const kris: KriItem[] = [
  { label: 'Vulnerabilidades Críticas', value: 3, level: 'high', trend: 'up' },
  { label: 'Controles Vencidos', value: 12, level: 'medium', trend: 'down' },
  { label: 'Proveedores Sin Evaluar', value: 5, level: 'medium', trend: 'stable' },
  { label: 'Incidentes Abiertos', value: 1, level: 'low', trend: 'down' },
  { label: 'Tareas Atrasadas', value: 8, level: 'medium', trend: 'up' },
  { label: 'Políticas por Revisar', value: 2, level: 'low', trend: 'stable' },
]

// ─────────────────────────────────────────────────────────────────────────────
// Upcoming Milestones
// Shown on the executive overview and will appear on the dashboard home.
// ─────────────────────────────────────────────────────────────────────────────

export type MilestoneType = 'Auditoría' | 'Tarea' | 'Informe' | 'Control' | 'Vencimiento'
export type MilestonePriority = 'high' | 'medium' | 'low'

export interface Milestone {
  date: string
  type: MilestoneType
  title: string
  priority: MilestonePriority
}

export const milestones: Milestone[] = [
  {
    date: '21 Mar 2026',
    type: 'Auditoría',
    title: 'Auditoría externa ISO 27001 — Despacho Galindo & Asociados',
    priority: 'high',
  },
  {
    date: '22 Mar 2026',
    type: 'Vencimiento',
    title: 'Fecha límite Aviso de Privacidad — revisión INAI',
    priority: 'high',
  },
  {
    date: '31 Mar 2026',
    type: 'Informe',
    title: 'Informe trimestral de riesgos Q1 2026',
    priority: 'medium',
  },
  {
    date: '05 Abr 2026',
    type: 'Control',
    title: 'Renovación de certificado de firma electrónica (e.firma SAT)',
    priority: 'high',
  },
  {
    date: '18 Abr 2026',
    type: 'Tarea',
    title: 'Capacitación en protección de datos — LFPDPPP Arco',
    priority: 'low',
  },
]
