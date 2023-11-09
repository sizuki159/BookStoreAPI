import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('order_id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL')
      table.double('total_price')
      table.double('discount')
      table.string('voucher')
      table.string('payment_method').references('key').inTable('payment_methods')
      table.enu('status', ['', '', '', ''])
      table.string('logs')

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