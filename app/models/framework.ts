import { FrameworkSchema } from '#database/schema'

export default class Framework extends FrameworkSchema {
  get code(): string {
    return this.slug.toUpperCase()
  }

  get complianceLevel(): 'good' | 'warning' | 'critical' {
    if (this.compliancePercentage >= 80) return 'good'
    if (this.compliancePercentage >= 60) return 'warning'
    return 'critical'
  }
}