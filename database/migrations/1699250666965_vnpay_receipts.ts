import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'vnpay_receipts'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('payment_id').notNullable().unique()
            table.double('amount').notNullable()
            table.string('tmn_code').nullable()
            table.string('bank_code').nullable()
            table.string('bank_tran_no').nullable()
            table.string('card_type').nullable()
            table.string('order_info').nullable()
            table.string('pay_date').nullable()
            table.string('response_code').nullable()
            table.string('transaction_no').nullable()
            table.string('transaction_status').nullable()
            table.string('secure_hash').nullable()

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
