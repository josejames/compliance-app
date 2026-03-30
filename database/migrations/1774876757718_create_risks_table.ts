import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'risks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 255).notNullable()
      table.string('category', 100).notNullable()
      table.text('description').nullable()
      table.integer('impact').unsigned().notNullable().defaultTo(3)
      table.integer('probability').unsigned().notNullable().defaultTo(3)
      table.string('treatment', 50).notNullable().defaultTo('mitigate')
      table.string('owner', 255).notNullable()
      table.string('status', 50).notNullable().defaultTo('open')
      table.string('frameworks', 500).nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
