import Control from '#models/control'
import Framework from '#models/framework'
import db from '@adonisjs/lucid/services/db'

export type MappingStatus = 'full' | 'partial' | 'none'

export interface MappingEntry {
  controlId: number
  frameworkId: number
  mappingStatus: MappingStatus
}

export default class MappingService {
  async allControls(): Promise<Control[]> {
    return Control.query().preload('relatedFrameworks').orderBy('id', 'asc')
  }

  async allFrameworks(): Promise<Framework[]> {
    return Framework.query().where('status', 'active').orderBy('name', 'asc')
  }

  async allMappings(): Promise<MappingEntry[]> {
    const rows = await db.from('control_framework').select('*')
    return rows.map((row: { control_id: number; framework_id: number; mapping_status: string }) => ({
      controlId: row.control_id,
      frameworkId: row.framework_id,
      mappingStatus: row.mapping_status as MappingStatus,
    }))
  }

  async setMapping(controlId: number, frameworkId: number, status: MappingStatus): Promise<void> {
    if (status === 'none') {
      await db.from('control_framework')
        .where('control_id', controlId)
        .where('framework_id', frameworkId)
        .delete()
    } else {
      const existing = await db.from('control_framework')
        .where('control_id', controlId)
        .where('framework_id', frameworkId)
        .first()

      if (existing) {
        await db.from('control_framework')
          .where('control_id', controlId)
          .where('framework_id', frameworkId)
          .update({ mapping_status: status })
      } else {
        await db.table('control_framework').insert({
          control_id: controlId,
          framework_id: frameworkId,
          mapping_status: status,
        })
      }
    }
  }

  async stats() {
    const [controlCount] = await db.from('controls').count('* as total')
    const [frameworkCount] = await db.from('frameworks').where('status', 'active').count('* as total')
    const mappings = await db.from('control_framework').select('mapping_status').count('* as total').groupBy('mapping_status')
    const [overdueCount] = await db.from('controls').where('status', 'overdue').count('* as total')

    const fullMappings = Number(mappings.find((m: { mapping_status: string }) => m.mapping_status === 'full')?.total ?? 0)
    const partialMappings = Number(mappings.find((m: { mapping_status: string }) => m.mapping_status === 'partial')?.total ?? 0)
    const totalMappings = fullMappings + partialMappings

    const totalControls = Number(controlCount.total)
    const totalFrameworks = Number(frameworkCount.total)
    const maxPossible = totalControls * totalFrameworks
    const coveragePercent = maxPossible > 0 ? Math.round((totalMappings / maxPossible) * 100) : 0

    const controlsWithMapping = await db.from('control_framework')
      .countDistinct('control_id as total')
    const mappedControls = Number(controlsWithMapping[0].total)
    const unmappedControls = totalControls - mappedControls

    return {
      totalControls,
      totalFrameworks,
      fullMappings,
      partialMappings,
      totalMappings,
      coveragePercent,
      unmappedControls,
      overdueControls: Number(overdueCount.total),
    }
  }
}
