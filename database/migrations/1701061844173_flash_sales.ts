import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import FlashSale from 'App/Models/FlashSale'

export default class extends BaseSchema {
    protected tableName = 'flash_sales'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('event_name')
            table.enu('status', Object.values(FlashSale.STATUS)).defaultTo(FlashSale.STATUS.ACTIVE)

            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('event_date', { useTz: true }).nullable()
            table.timestamp('created_at', { useTz: true }).nullable()
            table.timestamp('updated_at', { useTz: true }).nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
