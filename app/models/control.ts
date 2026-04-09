import { ControlSchema } from '#database/schema'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { manyToMany } from '@adonisjs/lucid/orm'
import Framework from '#models/framework'

export default class Control extends ControlSchema {
  @manyToMany(() => Framework, {
    pivotTable: 'control_framework',
    pivotColumns: ['mapping_status'],
  })
  declare relatedFrameworks: ManyToMany<typeof Framework>

  get code(): string {
    return `CTL-${String(this.id).padStart(3, '0')}`
  }

  get frameworkList(): string[] {
    if (!this.frameworks) return []
    return this.frameworks
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean)
  }
}