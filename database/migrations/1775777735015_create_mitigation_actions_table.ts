import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'mitigation_actions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('risk_id').unsigned().notNullable().references('id').inTable('risks').onDelete('CASCADE')
      table.string('action', 255).notNullable()
      table.text('description').nullable()
      table.string('owner', 255).notNullable()
      table.date('due_date').notNullable()
      table.enum('status', ['completed', 'in-progress', 'pending', 'overdue']).notNullable().defaultTo('pending')
      table.integer('progress').unsigned().notNullable().defaultTo(0)
      table.enum('residual_level', ['critical', 'high', 'medium', 'low']).notNullable().defaultTo('medium')
      table.integer('residual_score').unsigned().notNullable().defaultTo(0)
      table.string('linked_task_id', 50).nullable()
      table.text('notes').nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
