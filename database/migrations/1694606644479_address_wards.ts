import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'address_wards'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('wards_id')
      table.integer('district_id').unsigned().references('district_id').inTable('address_districts').onDelete('CASCADE')
      table.string('name')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
