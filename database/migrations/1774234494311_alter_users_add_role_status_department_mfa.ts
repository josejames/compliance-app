import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      /**
       * Role slug – loosely coupled to the roles table's `slug` column.
       * A hard foreign-key constraint is intentionally omitted here because:
       *   1. The default value ('employee') needs to exist in roles before any
       *      user row is inserted; enforcing a FK at the schema level would
       *      require the seeder to run before the first signup, which is fragile.
       *   2. Role validation is enforced at the application layer (validators
       *      and model guard). This keeps migrations independent of seed data.
       *
       * If you add future roles, update RoleSeeder and the role enum in
       * app/validators/user.ts accordingly.
       */
      table.string('role', 50).notNullable().defaultTo('employee')

      /**
       * Account lifecycle status.
       * - active   : fully operational account
       * - inactive : manually deactivated by an administrator
       * - pending  : invitation sent, user has not yet set a password
       */
      table.enum('status', ['active', 'inactive', 'pending']).notNullable().defaultTo('active')

      /**
       * Organisational unit the user belongs to (free-form string kept
       * flexible enough for different company structures).
       */
      table.string('department', 150).nullable()
      table.timestamp('last_login').nullable()
      /**
       * Whether the user has enabled multi-factor authentication (MFA) on their
       */
      table.boolean('mfa_enabled').notNullable().defaultTo(false)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role')
      table.dropColumn('status')
      table.dropColumn('department')
      table.dropColumn('last_login')
      table.dropColumn('mfa_enabled')
    })
  }
}
