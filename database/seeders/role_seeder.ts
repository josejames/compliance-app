import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'

/**
 * Seed the five application roles.
 *
 * Each role has a machine-readable `slug`, a human-readable `name`, a
 * `description` that explains its permissions and responsibilities, and a
 * `sort_order` that controls how roles are listed in the UI.
 *
 * To add a new role simply append an entry below and re-run the seeder.
 * The `updateOrCreate` call makes it safe to run multiple times.
 */
export default class RoleSeeder extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const roles = [
      {
        slug: 'admin',
        name: 'Administrador',
        description:
          'Acceso total al sistema. Puede gestionar usuarios, configurar la organización, ver los registros de actividad y administrar todas las integraciones.',
        sortOrder: 1,
      },
      {
        slug: 'ciso',
        name: 'CISO',
        description:
          'Responsable de seguridad de la información. Aprueba riesgos críticos, políticas y flujos de trabajo de seguridad. Accede a todos los módulos con permisos de aprobación.',
        sortOrder: 2,
      },
      {
        slug: 'compliance',
        name: 'Responsable de Cumplimiento',
        description:
          'Gestiona los marcos normativos, controles, evidencias y flujos de aprobación. Puede crear y asignar tareas, subir documentos y generar informes de cumplimiento.',
        sortOrder: 3,
      },
      {
        slug: 'auditor',
        name: 'Auditor',
        description:
          'Acceso de solo lectura a evidencias, hallazgos, planes de prueba y registros de actividad. Puede registrar hallazgos durante una auditoría asignada.',
        sortOrder: 4,
      },
      {
        slug: 'employee',
        name: 'Empleado',
        description:
          'Acceso restringido a sus propias tareas asignadas y subida de evidencias. No puede ver información de otros usuarios ni configurar el sistema.',
        sortOrder: 5,
      },
    ]

    for (const role of roles) {
      await Role.updateOrCreate({ slug: role.slug }, role)
    }
  }
}
