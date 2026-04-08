import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'frameworks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('slug', 100).notNullable().unique()
      table.string('name', 255).notNullable()
      table.string('version', 50).notNullable()
      table.text('description').nullable()
      table.enum('category', ['international', 'regional', 'sector', 'custom']).notNullable().defaultTo('international')
      table.enum('status', ['active', 'inactive', 'custom']).notNullable().defaultTo('active')
      table.integer('domains_count').unsigned().notNullable().defaultTo(0)
      table.integer('controls_count').unsigned().notNullable().defaultTo(0)
      table.integer('compliance_percentage').unsigned().notNullable().defaultTo(0)
      table.date('last_review_date').nullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}