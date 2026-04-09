import { FrameworkSchema } from '#database/schema'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { manyToMany } from '@adonisjs/lucid/orm'
import Control from '#models/control'

export default class Framework extends FrameworkSchema {
  @manyToMany(() => Control, {
    pivotTable: 'control_framework',
    pivotColumns: ['mapping_status'],
  })
  declare relatedControls: ManyToMany<typeof Control>

  get code(): string {
    return this.slug.toUpperCase()
  }

  get complianceLevel(): 'good' | 'warning' | 'critical' {
    if (this.compliancePercentage >= 80) return 'good'
    if (this.compliancePercentage >= 60) return 'warning'
    return 'critical'
  }
}