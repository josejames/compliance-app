import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

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
  static environment = ['development', 'test']

  async run() {
    const password = process.env.SEED_USER_PASSWORD ?? 'Password1!'

    const users = [
      {
        fullName: 'Roberto Admin',
        email: 'admin@empresa.com',
        role: 'admin',
        department: 'TI',
        status: 'active' as const,
        mfaEnabled: true,
      },
      {
        fullName: 'Laura Martínez',
        email: 'laura@empresa.com',
        role: 'ciso',
        department: 'Seguridad',
        status: 'active' as const,
        mfaEnabled: true,
      },
      {
        fullName: 'Ana García',
        email: 'ana@empresa.com',
        role: 'compliance',
        department: 'Cumplimiento',
        status: 'active' as const,
        mfaEnabled: true,
      },
      {
        fullName: 'Claudia Ruiz',
        email: 'claudia@empresa.com',
        role: 'compliance',
        department: 'Cumplimiento',
        status: 'active' as const,
        mfaEnabled: true,
      },
      {
        fullName: 'Pablo Torres',
        email: 'pablo@empresa.com',
        role: 'auditor',
        department: 'Auditoría Interna',
        status: 'active' as const,
        mfaEnabled: true,
      },
      {
        fullName: 'Andrés Vega',
        email: 'andres@empresa.com',
        role: 'auditor',
        department: 'Auditoría Interna',
        status: 'active' as const,
        mfaEnabled: true,
      },
      {
        fullName: 'Carlos Rodríguez',
        email: 'carlos@empresa.com',
        role: 'employee',
        department: 'TI',
        status: 'active' as const,
        mfaEnabled: true,
      },
      {
        fullName: 'María González',
        email: 'maria@empresa.com',
        role: 'employee',
        department: 'RRHH',
        status: 'active' as const,
        mfaEnabled: false,
      },
      {
        fullName: 'Elena Sánchez',
        email: 'elena@empresa.com',
        role: 'employee',
        department: 'Legal',
        status: 'active' as const,
        mfaEnabled: true,
      },
      {
        fullName: 'Javier López',
        email: 'javier@empresa.com',
        role: 'employee',
        department: 'Calidad',
        status: 'active' as const,
        mfaEnabled: false,
      },
      {
        fullName: 'Sónia Ferreira',
        email: 'sonia@empresa.com',
        role: 'employee',
        department: 'Operaciones',
        status: 'active' as const,
        mfaEnabled: false,
      },
      {
        fullName: 'Diego Morales',
        email: 'diego@empresa.com',
        role: 'employee',
        department: 'Finanzas',
        status: 'active' as const,
        mfaEnabled: true,
      },
      {
        fullName: 'Natalia Pinto',
        email: 'natalia@empresa.com',
        role: 'employee',
        department: 'Marketing',
        status: 'inactive' as const,
        mfaEnabled: false,
      },
      {
        fullName: 'Fernando Blanco',
        email: 'fernando@empresa.com',
        role: 'employee',
        department: 'Ventas',
        status: 'pending' as const,
        mfaEnabled: false,
      },
      {
        fullName: 'Isabel Castro',
        email: 'isabel@empresa.com',
        role: 'employee',
        department: 'Soporte',
        status: 'pending' as const,
        mfaEnabled: false,
      },
    ]

    for (const userData of users) {
      await User.updateOrCreate(
        { email: userData.email },
        { ...userData, password }
      )
    }
  }
}
