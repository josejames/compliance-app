import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Control from '#models/control'
import Framework from '#models/framework'
import db from '@adonisjs/lucid/services/db'

/**
 * Seeds the control_framework pivot table with mapping data
 * that mirrors the mockup matrix from the original hardcoded page.
 *
 * Uses framework slugs and control titles to find IDs dynamically,
 * so it works regardless of auto-increment state.
 */
export default class MappingSeeder extends BaseSeeder {
  async run() {
    const frameworks = await Framework.query().select('id', 'slug')
    const controls = await Control.query().select('id', 'title')

    const fwMap = new Map(frameworks.map((f) => [f.slug, f.id]))
    const ctlMap = new Map(controls.map((c) => [c.title, c.id]))

    type Status = 'full' | 'partial'

    const mappingData: { control: string; framework: string; status: Status }[] = [
      // CTL-001: Política de Control de Acceso
      { control: 'Política de Control de Acceso', framework: 'iso27001', status: 'full' },
      { control: 'Política de Control de Acceso', framework: 'gdpr', status: 'partial' },
      { control: 'Política de Control de Acceso', framework: 'soc2', status: 'full' },
      { control: 'Política de Control de Acceso', framework: 'pcidss', status: 'full' },
      { control: 'Política de Control de Acceso', framework: 'nistcsf', status: 'partial' },
      // CTL-002: Gestión de Cuentas Privilegiadas
      { control: 'Gestión de Cuentas Privilegiadas', framework: 'iso27001', status: 'full' },
      { control: 'Gestión de Cuentas Privilegiadas', framework: 'soc2', status: 'full' },
      { control: 'Gestión de Cuentas Privilegiadas', framework: 'pcidss', status: 'full' },
      { control: 'Gestión de Cuentas Privilegiadas', framework: 'nistcsf', status: 'full' },
      // CTL-003: Cifrado de Datos en Reposo
      { control: 'Cifrado de Datos en Reposo', framework: 'iso27001', status: 'full' },
      { control: 'Cifrado de Datos en Reposo', framework: 'gdpr', status: 'full' },
      { control: 'Cifrado de Datos en Reposo', framework: 'soc2', status: 'full' },
      { control: 'Cifrado de Datos en Reposo', framework: 'pcidss', status: 'full' },
      { control: 'Cifrado de Datos en Reposo', framework: 'nistcsf', status: 'partial' },
      // CTL-004: Política de Retención de Datos
      { control: 'Política de Retención de Datos', framework: 'iso27001', status: 'partial' },
      { control: 'Política de Retención de Datos', framework: 'gdpr', status: 'full' },
      { control: 'Política de Retención de Datos', framework: 'soc2', status: 'partial' },
      { control: 'Política de Retención de Datos', framework: 'pcidss', status: 'partial' },
      { control: 'Política de Retención de Datos', framework: 'iso9001', status: 'full' },
      // CTL-005: Segmentación de Redes
      { control: 'Segmentación de Redes', framework: 'iso27001', status: 'full' },
      { control: 'Segmentación de Redes', framework: 'soc2', status: 'full' },
      { control: 'Segmentación de Redes', framework: 'pcidss', status: 'full' },
      { control: 'Segmentación de Redes', framework: 'nistcsf', status: 'full' },
      // CTL-006: Gestión de Parches y Vulnerabilidades
      { control: 'Gestión de Parches y Vulnerabilidades', framework: 'iso27001', status: 'full' },
      { control: 'Gestión de Parches y Vulnerabilidades', framework: 'gdpr', status: 'partial' },
      { control: 'Gestión de Parches y Vulnerabilidades', framework: 'soc2', status: 'full' },
      { control: 'Gestión de Parches y Vulnerabilidades', framework: 'pcidss', status: 'full' },
      { control: 'Gestión de Parches y Vulnerabilidades', framework: 'nistcsf', status: 'full' },
      // CTL-007: Plan de Continuidad de Negocio
      { control: 'Plan de Continuidad de Negocio', framework: 'iso27001', status: 'full' },
      { control: 'Plan de Continuidad de Negocio', framework: 'gdpr', status: 'partial' },
      { control: 'Plan de Continuidad de Negocio', framework: 'soc2', status: 'full' },
      { control: 'Plan de Continuidad de Negocio', framework: 'pcidss', status: 'partial' },
      { control: 'Plan de Continuidad de Negocio', framework: 'nistcsf', status: 'full' },
      { control: 'Plan de Continuidad de Negocio', framework: 'iso9001', status: 'partial' },
      // CTL-008: Copias de Seguridad y Restauración
      { control: 'Copias de Seguridad y Restauración', framework: 'iso27001', status: 'full' },
      { control: 'Copias de Seguridad y Restauración', framework: 'gdpr', status: 'partial' },
      { control: 'Copias de Seguridad y Restauración', framework: 'soc2', status: 'full' },
      { control: 'Copias de Seguridad y Restauración', framework: 'pcidss', status: 'partial' },
      { control: 'Copias de Seguridad y Restauración', framework: 'nistcsf', status: 'full' },
      // CTL-009: Registro y Monitorización de Eventos
      { control: 'Registro y Monitorización de Eventos', framework: 'iso27001', status: 'full' },
      { control: 'Registro y Monitorización de Eventos', framework: 'gdpr', status: 'partial' },
      { control: 'Registro y Monitorización de Eventos', framework: 'soc2', status: 'full' },
      { control: 'Registro y Monitorización de Eventos', framework: 'pcidss', status: 'full' },
      { control: 'Registro y Monitorización de Eventos', framework: 'nistcsf', status: 'full' },
      // CTL-010: Gestión de Incidentes de Seguridad
      { control: 'Gestión de Incidentes de Seguridad', framework: 'iso27001', status: 'full' },
      { control: 'Gestión de Incidentes de Seguridad', framework: 'gdpr', status: 'full' },
      { control: 'Gestión de Incidentes de Seguridad', framework: 'soc2', status: 'full' },
      { control: 'Gestión de Incidentes de Seguridad', framework: 'pcidss', status: 'full' },
      { control: 'Gestión de Incidentes de Seguridad', framework: 'nistcsf', status: 'full' },
      { control: 'Gestión de Incidentes de Seguridad', framework: 'iso9001', status: 'partial' },
      // CTL-011: Evaluación de Riesgos de Proveedores
      { control: 'Evaluación de Riesgos de Proveedores', framework: 'iso27001', status: 'full' },
      { control: 'Evaluación de Riesgos de Proveedores', framework: 'gdpr', status: 'partial' },
      { control: 'Evaluación de Riesgos de Proveedores', framework: 'soc2', status: 'partial' },
      { control: 'Evaluación de Riesgos de Proveedores', framework: 'pcidss', status: 'partial' },
      { control: 'Evaluación de Riesgos de Proveedores', framework: 'nistcsf', status: 'partial' },
      { control: 'Evaluación de Riesgos de Proveedores', framework: 'iso9001', status: 'full' },
      // CTL-012: Formación y Concienciación en Seguridad
      { control: 'Formación y Concienciación en Seguridad', framework: 'iso27001', status: 'full' },
      { control: 'Formación y Concienciación en Seguridad', framework: 'gdpr', status: 'full' },
      { control: 'Formación y Concienciación en Seguridad', framework: 'soc2', status: 'partial' },
      { control: 'Formación y Concienciación en Seguridad', framework: 'pcidss', status: 'partial' },
      { control: 'Formación y Concienciación en Seguridad', framework: 'nistcsf', status: 'partial' },
      { control: 'Formación y Concienciación en Seguridad', framework: 'iso9001', status: 'partial' },
    ]

    for (const entry of mappingData) {
      const controlId = ctlMap.get(entry.control)
      const frameworkId = fwMap.get(entry.framework)
      if (!controlId || !frameworkId) continue

      const existing = await db
        .from('control_framework')
        .where('control_id', controlId)
        .where('framework_id', frameworkId)
        .first()

      if (existing) {
        await db
          .from('control_framework')
          .where('control_id', controlId)
          .where('framework_id', frameworkId)
          .update({ mapping_status: entry.status })
      } else {
        await db.table('control_framework').insert({
          control_id: controlId,
          framework_id: frameworkId,
          mapping_status: entry.status,
        })
      }
    }
  }
}
