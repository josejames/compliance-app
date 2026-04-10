import { BaseSeeder } from '@adonisjs/lucid/seeders'
import MitigationAction from '#models/mitigation_action'
import Risk from '#models/risk'
import { DateTime } from 'luxon'

export default class MitigationActionSeeder extends BaseSeeder {
  async run() {
    const risks = await Risk.query().select('id', 'title')
    if (risks.length === 0) return

    const riskByTitle = new Map(risks.map((r) => [r.title, r.id]))
    const firstRiskId = risks[0].id

    function riskId(title: string): number {
      return riskByTitle.get(title) ?? firstRiskId
    }

    await MitigationAction.updateOrCreateMany('action', [
      {
        riskId: riskId('Política de Control de Acceso'),
        action: 'Implementar MFA en todos los sistemas críticos',
        description: 'Despliegue de autenticación multifactor en los 12 sistemas identificados como críticos.',
        owner: 'Carlos Rodríguez',
        dueDate: DateTime.fromISO('2026-03-20'),
        status: 'in-progress',
        progress: 70,
        residualLevel: 'medium',
        residualScore: 8,
        linkedTaskId: 'TSK-045',
      },
      {
        riskId: riskId('Gestión de Cuentas Privilegiadas'),
        action: 'Revisar y revocar accesos privilegiados innecesarios',
        description: 'Auditoría completa de cuentas privilegiadas y revocación de accesos no justificados.',
        owner: 'Laura Martínez',
        dueDate: DateTime.fromISO('2026-03-15'),
        status: 'in-progress',
        progress: 85,
        residualLevel: 'low',
        residualScore: 4,
        linkedTaskId: 'TSK-046',
      },
      {
        riskId: riskId('Cifrado de Datos en Reposo'),
        action: 'Cifrado end-to-end en base de datos de clientes',
        description: 'Aplicar cifrado AES-256 a la base de datos CRM y auditar transferencias de datos.',
        owner: 'Ana García',
        dueDate: DateTime.fromISO('2026-03-10'),
        status: 'overdue',
        progress: 50,
        residualLevel: 'low',
        residualScore: 3,
        linkedTaskId: 'TSK-047',
      },
      {
        riskId: riskId('Segmentación de Redes'),
        action: 'Desplegar solución EDR en todos los endpoints',
        description: 'Instalación y configuración de herramienta EDR con detección en tiempo real.',
        owner: 'Pablo Torres',
        dueDate: DateTime.fromISO('2026-03-30'),
        status: 'pending',
        progress: 10,
        residualLevel: 'medium',
        residualScore: 6,
        linkedTaskId: 'TSK-051',
      },
      {
        riskId: riskId('Política de Retención de Datos'),
        action: 'Automatizar purga de datos según política de retención',
        description: 'Configurar pipeline de eliminación automática de datos caducados en los sistemas de RRHH y CRM.',
        owner: 'María González',
        dueDate: DateTime.fromISO('2026-02-25'),
        status: 'overdue',
        progress: 30,
        residualLevel: 'low',
        residualScore: 4,
        linkedTaskId: 'TSK-052',
      },
      {
        riskId: riskId('Plan de Continuidad de Negocio'),
        action: 'Contratar seguro de responsabilidad civil TI',
        description: 'Negociación y contratación de póliza de ciberriesgo con cobertura de continuidad de negocio.',
        owner: 'Elena Sánchez',
        dueDate: DateTime.fromISO('2026-04-01'),
        status: 'pending',
        progress: 0,
        residualLevel: 'medium',
        residualScore: 6,
      },
      {
        riskId: riskId('Gestión de Parches y Vulnerabilidades'),
        action: 'Aplicar parches críticos en portal e-commerce',
        description: 'Aplicación urgente de parches CVE-2025-11872 y CVE-2025-11901 en el entorno de producción.',
        owner: 'Pablo Torres',
        dueDate: DateTime.fromISO('2026-03-12'),
        status: 'overdue',
        progress: 60,
        residualLevel: 'low',
        residualScore: 4,
        linkedTaskId: 'TSK-053',
      },
      {
        riskId: riskId('Formación y Concienciación en Seguridad'),
        action: 'Implantar formación obligatoria en manejo de datos',
        description: 'Programa de microlearning trimestral sobre buenas prácticas de gestión de datos sensibles.',
        owner: 'Ana García',
        dueDate: DateTime.fromISO('2026-02-28'),
        status: 'completed',
        progress: 100,
        residualLevel: 'low',
        residualScore: 3,
        linkedTaskId: 'TSK-040',
      },
      {
        riskId: riskId('Registro y Monitorización de Eventos'),
        action: 'Implementar monitorización de comportamiento de usuarios (UBA)',
        description: 'Despliegue de software de análisis de comportamiento de usuarios (UEBA) en sistemas críticos.',
        owner: 'Carlos Rodríguez',
        dueDate: DateTime.fromISO('2026-04-15'),
        status: 'pending',
        progress: 0,
        residualLevel: 'medium',
        residualScore: 6,
      },
      {
        riskId: riskId('Gestión de Incidentes de Seguridad'),
        action: 'Remediar hallazgos del último análisis ASV',
        description: 'Corrección de las 9 no conformidades detectadas en el último scan de vulnerabilidades PCI.',
        owner: 'María González',
        dueDate: DateTime.fromISO('2026-03-20'),
        status: 'in-progress',
        progress: 45,
        residualLevel: 'low',
        residualScore: 4,
        linkedTaskId: 'TSK-055',
      },
    ])
  }
}
