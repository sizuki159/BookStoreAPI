import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'order_reviews'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('order_id').unsigned().references('order_id').inTable('orders').onDelete('CASCADE')
            table.enu('rate_star', [1, 2, 3, 4, 5]).defaultTo(5)
            table.text('review_comment').nullable()

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
