import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

/**
 * Seed a representative set of system users that mirrors the wireframe data
 * from `inertia/pages/dashboard/administration/users-roles.tsx`.
 *
 * The password used for seeded accounts is read from the `SEED_USER_PASSWORD`
 * environment variable, falling back to `Password1!` when it is not set.
 * **Never run this seeder in production against real accounts.**
 *
 * The `updateOrCreate` call makes it safe to run multiple times without
 * creating duplicates.
 */
export default class UserSeeder extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const password = process.env.SEED_USER_PASSWORD ?? 'Pa$$w0rd!'

    const users = [
      {
        fullName: 'Jaime Rodríguez',
        email: 'jaime@innovatio.dev',
        role: 'admin',
        department: 'TI',
        status: 'active' as const,
        // last login in the past
        lastLogin: DateTime.fromJSDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)), // 7 days ago
        mfaEnabled: true,
      },
      {
        fullName: 'Laura Martínez',
        email: 'laura@empresa.com',
        role: 'ciso',
        department: 'Seguridad',
        status: 'active' as const,
        lastLogin: DateTime.fromJSDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)), // 7 days ago
        mfaEnabled: true,
      },
      {
        fullName: 'Carlos Gonzales',
        email: 'carlos@lex.ai',
        role: 'compliance',
        department: 'Cumplimiento',
        status: 'active' as const,
        lastLogin: DateTime.fromJSDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)), // 3 days ago
        mfaEnabled: true,
      },
      {
        fullName: 'Claudia Ruiz',
        email: 'claudia@empresa.com',
        role: 'compliance',
        department: 'Cumplimiento',
        status: 'active' as const,
        lastLogin: DateTime.fromJSDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 1)), // 1 day ago
        mfaEnabled: true,
      },
      {
        fullName: 'Pablo Torres',
        email: 'pablo@empresa.com',
        role: 'auditor',
        department: 'Auditoría Interna',
        status: 'active' as const,
        lastLogin: DateTime.fromJSDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 10)), // 10 days ago
        mfaEnabled: true,
      },
      {
        fullName: 'Andrés Vega',
        email: 'andres@empresa.com',
        role: 'auditor',
        department: 'Auditoría Interna',
        status: 'active' as const,
        lastLogin: DateTime.fromJSDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 15)), // 15 days ago
        mfaEnabled: true,
      },
      {
        fullName: 'Carlos Rodríguez',
        email: 'carlos@empresa.com',
        role: 'employee',
        department: 'TI',
        status: 'active' as const,
        lastLogin: DateTime.fromJSDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)), // 2 days ago
        mfaEnabled: true,
      },
      {
        fullName: 'María González',
        email: 'maria@empresa.com',
        role: 'employee',
        department: 'RRHH',
        status: 'active' as const,
        lastLogin: DateTime.fromJSDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)), // 5 days ago
        mfaEnabled: false,
      },
      {
        fullName: 'Elena Sánchez',
        email: 'elena@empresa.com',
        role: 'employee',
        department: 'Legal',
        status: 'active' as const,
        lastLogin: DateTime.fromJSDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 20)), // 20 days ago
        mfaEnabled: true,
      },
      {
        fullName: 'Javier López',
        email: 'javier@empresa.com',
        role: 'employee',
        department: 'Calidad',
        status: 'active' as const,
        lastLogin: DateTime.fromJSDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)), // 30 days ago
        mfaEnabled: false,
      },
      {
        fullName: 'Sónia Ferreira',
        email: 'sonia@empresa.com',
        role: 'employee',
        department: 'Operaciones',
        status: 'active' as const,
        lastLogin: DateTime.fromJSDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 1)), // 1 day ago
        mfaEnabled: false,
      },
      {
        fullName: 'Diego Morales',
        email: 'diego@empresa.com',
        role: 'employee',
        department: 'Finanzas',
        status: 'active' as const,
        lastLogin: DateTime.fromJSDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)), // 3 days ago
        mfaEnabled: true,
      },
      {
        fullName: 'Natalia Pinto',
        email: 'natalia@empresa.com',
        role: 'employee',
        department: 'Marketing',
        status: 'inactive' as const,
        lastLogin: DateTime.fromJSDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 60)), // 60 days ago
        mfaEnabled: false,
      },
      {
        fullName: 'Fernando Blanco',
        email: 'fernando@empresa.com',
        role: 'employee',
        department: 'Ventas',
        status: 'pending' as const,
        lastLogin: DateTime.fromJSDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 90)), // 90 days ago
        mfaEnabled: false,
      },
      {
        fullName: 'Isabel Castro',
        email: 'isabel@empresa.com',
        role: 'employee',
        department: 'Soporte',
        status: 'pending' as const,
        lastLogin: DateTime.fromJSDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 120)), // 120 days ago
        mfaEnabled: false,
      },
    ]

    for (const userData of users) {
      await User.updateOrCreate({ email: userData.email }, { ...userData, password })
    }
  }
}
