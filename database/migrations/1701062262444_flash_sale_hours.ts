import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'flash_sale_hours'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('flash_sale_id').unsigned().references('id').inTable('flash_sales').onDelete('CASCADE')
            table.double('percent_discount').defaultTo(10)

            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('time_start', { useTz: true }).nullable()
            table.timestamp('time_end', { useTz: true }).nullable()
            table.timestamp('created_at', { useTz: true }).nullable()
            table.timestamp('updated_at', { useTz: true }).nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
