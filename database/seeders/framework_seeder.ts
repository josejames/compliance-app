import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Framework from '#models/framework'

export default class FrameworkSeeder extends BaseSeeder {
  async run() {
    await Framework.updateOrCreateMany('slug', [
      {
        slug: 'iso27001',
        name: 'ISO 27001',
        version: '2022',
        description:
          'Norma internacional para sistemas de gestión de seguridad de la información (SGSI). Define requisitos para establecer, implementar, mantener y mejorar la seguridad.',
        category: 'international',
        status: 'active',
        domainsCount: 14,
        controlsCount: 114,
        compliancePercentage: 78,
        lastReviewDate: null,
      },
      {
        slug: 'gdpr',
        name: 'GDPR',
        version: '2016/679',
        description:
          'Reglamento General de Protección de Datos de la Unión Europea. Establece las reglas para el tratamiento de datos personales de ciudadanos europeos.',
        category: 'regional',
        status: 'active',
        domainsCount: 11,
        controlsCount: 47,
        compliancePercentage: 91,
        lastReviewDate: null,
      },
      {
        slug: 'soc2',
        name: 'SOC 2 Type II',
        version: 'AICPA 2022',
        description:
          'Marco de auditoría para proveedores de servicios en la nube basado en los Criterios de Servicios de Confianza: seguridad, disponibilidad, confidencialidad y privacidad.',
        category: 'international',
        status: 'active',
        domainsCount: 5,
        controlsCount: 80,
        compliancePercentage: 64,
        lastReviewDate: null,
      },
      {
        slug: 'pcidss',
        name: 'PCI DSS',
        version: 'v4.0',
        description:
          'Estándar de seguridad de datos de la industria de tarjetas de pago. Obligatorio para organizaciones que almacenan, procesan o transmiten datos de titulares de tarjetas.',
        category: 'sector',
        status: 'active',
        domainsCount: 12,
        controlsCount: 60,
        compliancePercentage: 55,
        lastReviewDate: null,
      },
      {
        slug: 'nistcsf',
        name: 'NIST CSF',
        version: '2.0',
        description:
          'Marco de ciberseguridad del NIST organizado en seis funciones: Gobernar, Identificar, Proteger, Detectar, Responder y Recuperar.',
        category: 'international',
        status: 'active',
        domainsCount: 6,
        controlsCount: 108,
        compliancePercentage: 70,
        lastReviewDate: null,
      },
      {
        slug: 'iso9001',
        name: 'ISO 9001',
        version: '2015',
        description:
          'Norma internacional para sistemas de gestión de calidad. Establece requisitos para demostrar la capacidad de proporcionar productos y servicios conformes.',
        category: 'international',
        status: 'active',
        domainsCount: 8,
        controlsCount: 36,
        compliancePercentage: 82,
        lastReviewDate: null,
      },
      {
        slug: 'politica-tic-interna',
        name: 'Política TIC Interna',
        version: 'v2.1',
        description:
          'Marco normativo interno de tecnologías de la información y comunicación adaptado a los requisitos específicos de la organización.',
        category: 'custom',
        status: 'custom',
        domainsCount: 6,
        controlsCount: 42,
        compliancePercentage: 95,
        lastReviewDate: null,
      },
    ])
  }
}