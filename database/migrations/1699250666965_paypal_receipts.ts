import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'paypal_receipts'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('payment_id').notNullable().unique()
            table.string('token').unique().nullable()
            table.string('payer_id').nullable()

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
