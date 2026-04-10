import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'risk_evaluations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 255).notNullable()
      table.enum('scope', ['project', 'area', 'asset']).notNullable()
      table.string('scope_target', 255).notNullable()
      table.string('framework', 255).nullable()
      table.enum('status', ['completed', 'in-progress', 'scheduled']).notNullable().defaultTo('scheduled')
      table.integer('progress').unsigned().notNullable().defaultTo(0)
      table.integer('risks_found').unsigned().notNullable().defaultTo(0)
      table.enum('risk_level', ['critical', 'high', 'medium', 'low']).notNullable().defaultTo('medium')
      table.string('owner', 255).notNullable()
      table.integer('questions_total').unsigned().notNullable().defaultTo(0)
      table.integer('questions_answered').unsigned().notNullable().defaultTo(0)
      table.text('notes').nullable()
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
