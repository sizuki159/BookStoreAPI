import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'flash_sale_products'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('flash_sale_hour_id').unsigned().references('id').inTable('flash_sale_hours').onDelete('CASCADE')
            table.string('isbn_code').references('isbn_code').inTable('books').onDelete('CASCADE')
            table.double('percent_discount').defaultTo(10)
            
            
            table.unique(['flash_sale_hour_id', 'isbn_code'])
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
