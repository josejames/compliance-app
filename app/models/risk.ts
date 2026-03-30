import { RiskSchema } from '#database/schema'

export default class Risk extends RiskSchema {
  get code(): string {
    return `RSK-${String(this.id).padStart(3, '0')}`
  }

  get score(): number {
    return this.impact * this.probability
  }

  get level(): 'critical' | 'high' | 'medium' | 'low' {
    const s = this.score
    if (s >= 15) return 'critical'
    if (s >= 10) return 'high'
    if (s >= 6) return 'medium'
    return 'low'
  }
}
