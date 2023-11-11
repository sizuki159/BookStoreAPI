import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Voucher from 'App/Models/Voucher'

export default class extends BaseSchema {
    protected tableName = 'vouchers'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('voucher_name').nullable()
            table.enu('voucher_type', Object.values(Voucher.TYPE)).defaultTo(Voucher.TYPE.GENERAL).notNullable()
            table.string('voucher_code').notNullable()
            table.double('require_order_min_price').defaultTo(0)
            table.double('discount_percentage').defaultTo(0)
            table.double('discount_max_price').nullable()
            table.integer('count_used').defaultTo(0)
            table.integer('limited').nullable()
            table.string('desc').nullable()
            table.timestamp('start_date').nullable()
            table.timestamp('end_date').nullable()
            table.enu('status', Object.values(Voucher.STATUS)).defaultTo(Voucher.STATUS.ACTIVE)
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').nullable()
            table.integer('user_level_id').unsigned().references('id').inTable('user_levels').onDelete('CASCADE').nullable()

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
