export type RiskLevel = 'critical' | 'high' | 'medium' | 'low'
export type Priority = 'high' | 'medium' | 'low'
export type Severity = 'critical' | 'high' | 'medium' | 'info'

/** Risk level badge + score text colours */
export const levelConfig: Record<RiskLevel, { label: string; cls: string; scoreCls: string }> = {
  critical: {
    label: 'Crítico',
    cls: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    scoreCls: 'text-red-600 dark:text-red-400',
  },
  high: {
    label: 'Alto',
    cls: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
    scoreCls: 'text-orange-600 dark:text-orange-400',
  },
  medium: {
    label: 'Medio',
    cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    scoreCls: 'text-amber-600 dark:text-amber-400',
  },
  low: {
    label: 'Bajo',
    cls: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
    scoreCls: 'text-green-600 dark:text-green-400',
  },
}

/** Task / audit priority badge colours */
export const priorityConfig: Record<Priority, { label: string; cls: string }> = {
  high: { label: 'Alta', cls: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' },
  medium: {
    label: 'Media',
    cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  },
  low: { label: 'Baja', cls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' },
}

/** Alert / notification severity colours */
export const severityConfig: Record<
  Severity,
  { label: string; cls: string; bg: string; border: string; iconCls: string }
> = {
  critical: {
    label: 'Crítico',
    cls: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-300 dark:border-red-800',
    iconCls: 'text-red-500',
  },
  high: {
    label: 'Alto',
    cls: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-300 dark:border-orange-800',
    iconCls: 'text-orange-500',
  },
  medium: {
    label: 'Medio',
    cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    iconCls: 'text-amber-500',
  },
  info: {
    label: 'Informativo',
    cls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    border: 'border-blue-200 dark:border-blue-800',
    iconCls: 'text-blue-500',
  },
}

/** Progress-bar background colour based on compliance % score */
export function scoreBgCls(score: number): string {
  if (score >= 80) return 'bg-green-500'
  if (score >= 60) return 'bg-amber-500'
  return 'bg-red-500'
}

/** Text colour based on compliance % score */
export function scoreTextCls(score: number): string {
  if (score >= 80) return 'text-green-600 dark:text-green-400'
  if (score >= 60) return 'text-amber-600 dark:text-amber-400'
  return 'text-red-600 dark:text-red-400'
}

/** Canonical badge class strings for consistent pill sizing */
export const badgeCls = 'text-xs font-medium px-2 py-0.5 rounded-full'
export const badgeSmCls = 'text-xs font-medium px-1.5 py-0.5 rounded'
