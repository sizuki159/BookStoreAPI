import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'address_wards'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('wards_id').primary()
      table.integer('district_id').unsigned().references('district_id').inTable('address_districts').onDelete('CASCADE')
      table.string('name')

      table.unique(['wards_id'])
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
