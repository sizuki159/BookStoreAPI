import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class extends BaseSchema {
    protected tableName = 'api_tokens'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
            table.string('name').notNullable()
            table.string('type').notNullable()
            table.string('token', 64).notNullable().unique()
            table.string('jwt').notNullable().unique().defaultTo(string.generateRandom(128))

            /**
             * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('expires_at', { useTz: true }).nullable()
            table.timestamp('created_at', { useTz: true }).nullable()
            table.timestamp('updated_at', { useTz: true }).nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
