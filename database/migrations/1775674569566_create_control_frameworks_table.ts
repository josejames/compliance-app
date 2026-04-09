import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'control_framework'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('control_id').unsigned().notNullable().references('id').inTable('controls').onDelete('CASCADE')
      table.integer('framework_id').unsigned().notNullable().references('id').inTable('frameworks').onDelete('CASCADE')
      table.unique(['control_id', 'framework_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}