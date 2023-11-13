import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Invoice from 'App/Models/Invoice'

export default class extends BaseSchema {
    protected tableName = 'invoices'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('order_id').unsigned().references('order_id').inTable('orders').onDelete('SET NULL')
            table.string('payment_method').references('key').inTable('payment_methods').onDelete('SET NULL')
            table.string('paypal_payment_id').references('payment_id').inTable('paypal_receipts').onDelete('SET NULL').nullable()
            table.string('pay_url').nullable()
            table.enu('status', Object.values(Invoice.STATUS)).defaultTo(Invoice.STATUS.UNPAID)
            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true }).nullable()
            table.timestamp('updated_at', { useTz: true }).nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
