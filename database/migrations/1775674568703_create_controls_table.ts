import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'controls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 255).notNullable()
      table.text('description').nullable()
      table.string('domain', 100).notNullable()
      table.string('owner', 255).notNullable()
      table.enum('frequency', ['continuous', 'monthly', 'quarterly', 'annual']).defaultTo('quarterly')
      table.enum('status', ['active', 'needs-review', 'overdue', 'inactive']).defaultTo('active')
      table.text('frameworks').nullable()
      table.date('last_reviewed_at').nullable()
      table.date('next_review_at').nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}