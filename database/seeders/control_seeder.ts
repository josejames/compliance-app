import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Control from '#models/control'

export default class ControlSeeder extends BaseSeeder {
  async run() {
    await Control.updateOrCreateMany('title', [
      {
        title: 'Política de Control de Acceso',
        description:
          'Define las reglas de concesión, revisión y revocación de accesos a sistemas y datos de la organización.',
        domain: 'Seguridad de Acceso',
        owner: 'Carlos Rodríguez',
        frequency: 'quarterly',
        status: 'active',
        frameworks: 'ISO 27001, SOC 2, PCI DSS',
        lastReviewedAt: null,
        nextReviewAt: null,
      },
      {
        title: 'Gestión de Cuentas Privilegiadas',
        description:
          'Procedimiento para la creación, seguimiento y revisión periódica de cuentas con privilegios elevados.',
        domain: 'Seguridad de Acceso',
        owner: 'Laura Martínez',
        frequency: 'monthly',
        status: 'needs-review',
        frameworks: 'ISO 27001, SOC 2, PCI DSS, NIST CSF',
        lastReviewedAt: null,
        nextReviewAt: null,
      },
      {
        title: 'Cifrado de Datos en Reposo',
        description:
          'Estándar de cifrado AES-256 obligatorio para todos los datos sensibles almacenados en sistemas corporativos.',
        domain: 'Protección de Datos',
        owner: 'Ana García',
        frequency: 'annual',
        status: 'active',
        frameworks: 'ISO 27001, GDPR, SOC 2, PCI DSS',
        lastReviewedAt: null,
        nextReviewAt: null,
      },
      {
        title: 'Política de Retención de Datos',
        description:
          'Define los plazos de retención y disposición de datos personales y corporativos conforme a GDPR e ISO.',
        domain: 'Protección de Datos',
        owner: 'María González',
        frequency: 'annual',
        status: 'active',
        frameworks: 'GDPR, ISO 9001',
        lastReviewedAt: null,
        nextReviewAt: null,
      },
      {
        title: 'Segmentación de Redes',
        description:
          'Arquitectura de red con zonas de seguridad diferenciadas (DMZ, producción, desarrollo) y reglas de firewall auditadas.',
        domain: 'Infraestructura',
        owner: 'Pablo Torres',
        frequency: 'quarterly',
        status: 'overdue',
        frameworks: 'ISO 27001, SOC 2, PCI DSS, NIST CSF',
        lastReviewedAt: null,
        nextReviewAt: null,
      },
      {
        title: 'Gestión de Parches y Vulnerabilidades',
        description:
          'Proceso de identificación, priorización y aplicación de parches de seguridad en plazos definidos por criticidad.',
        domain: 'Infraestructura',
        owner: 'Pablo Torres',
        frequency: 'monthly',
        status: 'active',
        frameworks: 'ISO 27001, SOC 2, PCI DSS, NIST CSF',
        lastReviewedAt: null,
        nextReviewAt: null,
      },
      {
        title: 'Plan de Continuidad de Negocio',
        description:
          'Marco BCP/DRP con escenarios de desastre definidos, RPO/RTO documentados y pruebas anuales de recuperación.',
        domain: 'Continuidad',
        owner: 'Elena Sánchez',
        frequency: 'annual',
        status: 'active',
        frameworks: 'ISO 27001, SOC 2, NIST CSF',
        lastReviewedAt: null,
        nextReviewAt: null,
      },
      {
        title: 'Copias de Seguridad y Restauración',
        description:
          'Procedimiento de backup con frecuencia diaria incremental y semanal completa, con pruebas de restauración mensuales.',
        domain: 'Continuidad',
        owner: 'Javier López',
        frequency: 'monthly',
        status: 'needs-review',
        frameworks: 'ISO 27001, SOC 2',
        lastReviewedAt: null,
        nextReviewAt: null,
      },
      {
        title: 'Registro y Monitorización de Eventos',
        description:
          'SIEM con retención de logs de 12 meses, alertas en tiempo real y revisión diaria de eventos críticos.',
        domain: 'Monitorización',
        owner: 'Carlos Rodríguez',
        frequency: 'continuous',
        status: 'active',
        frameworks: 'ISO 27001, SOC 2, PCI DSS, NIST CSF',
        lastReviewedAt: null,
        nextReviewAt: null,
      },
      {
        title: 'Gestión de Incidentes de Seguridad',
        description:
          'Proceso de detección, clasificación, contención, erradicación y reporte de incidentes según severidad.',
        domain: 'Respuesta',
        owner: 'Laura Martínez',
        frequency: 'quarterly',
        status: 'active',
        frameworks: 'ISO 27001, GDPR, SOC 2, PCI DSS, NIST CSF',
        lastReviewedAt: null,
        nextReviewAt: null,
      },
      {
        title: 'Evaluación de Riesgos de Proveedores',
        description:
          'Proceso de due diligence de seguridad para terceros con acceso a datos o sistemas críticos de la organización.',
        domain: 'Cadena de Suministro',
        owner: 'María González',
        frequency: 'annual',
        status: 'overdue',
        frameworks: 'ISO 27001, GDPR, ISO 9001',
        lastReviewedAt: null,
        nextReviewAt: null,
      },
      {
        title: 'Formación y Concienciación en Seguridad',
        description:
          'Programa de formación anual obligatoria para todos los empleados sobre seguridad de la información y protección de datos.',
        domain: 'Personas',
        owner: 'Ana García',
        frequency: 'annual',
        status: 'active',
        frameworks: 'ISO 27001, GDPR, SOC 2',
        lastReviewedAt: null,
        nextReviewAt: null,
      },
    ])
  }
}
