import { MitigationActionSchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo } from '@adonisjs/lucid/orm'
import Risk from '#models/risk'
import { DateTime } from 'luxon'

export default class MitigationAction extends MitigationActionSchema {
  @belongsTo(() => Risk)
  declare risk: BelongsTo<typeof Risk>

  get code(): string {
    return `MIT-${String(this.id).padStart(3, '0')}`
  }

  get daysLeft(): number {
    const now = DateTime.now().startOf('day')
    const due = this.dueDate.startOf('day')
    return Math.round(due.diff(now, 'days').days)
  }
}
