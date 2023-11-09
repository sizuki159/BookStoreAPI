import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'voucher_usage_histories'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('voucher_id').unsigned().references('id').inTable('vouchers').onDelete('SET NULL')
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL')
            table.integer('order_id').unsigned().references('order_id').inTable('orders').onDelete('SET NULL')
            
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
