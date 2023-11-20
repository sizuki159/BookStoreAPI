import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import PaymentMethod from 'App/Models/PaymentMethod'

export default class extends BaseSchema {
  protected tableName = 'payment_methods'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('key').notNullable().unique()
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
          key: PaymentMethod.METHOD.COD,
          name: 'Thanh toán bằng tiền mặt khi nhận hàng',
        },
        {
          key: PaymentMethod.METHOD.VNPAY,
          name: 'Ví điện tử VNPay',
        },
        {
          key: PaymentMethod.METHOD.PAYPAL,
          name: 'Ví điện tử Paypal',
        }
      ])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
