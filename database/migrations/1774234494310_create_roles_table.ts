import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      /**
       * Unique machine-readable identifier, e.g. "admin", "ciso".
       */
      table.string('slug', 50).notNullable().unique()

      /**
       * Human-readable name shown in the UI.
       */
      table.string('name', 100).notNullable()

      /**
       * Description of the role's permissions and responsibilities.
       * Space reserved so each role can explain its scope to administrators.
       */
      table.text('description').nullable()

      /**
       * Controls the display order in dropdowns and listings.
       */
      table.integer('sort_order').unsigned().notNullable().defaultTo(0)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
