import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'payment_methods'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('key').unique().notNullable()
      table.string('name')
      table.enu('status', ['active', 'inactive']).defaultTo('active')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          key: 'cod',
          name: 'Thanh toán bằng tiền mặt khi nhận hàng'
        },
        {
          key: 'paypal',
          name: 'Ví điện tử Paypal'
        },
        {
          key: 'momo',
          name: 'Ví điện tử Momo'
        },
      ])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
