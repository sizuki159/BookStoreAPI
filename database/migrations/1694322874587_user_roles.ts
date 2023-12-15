import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Roles from 'App/Enums/Roles'

export default class extends BaseSchema {
    protected tableName = 'user_roles'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('name').notNullable()

            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true }).nullable()
            table.timestamp('updated_at', { useTz: true }).nullable()
        })

        this.defer(async (db) => {
            await db.table(this.tableName).multiInsert([
                {
                    id: Roles.USER,
                    name: 'User'
                },
                {
                    id: Roles.ADMIN,
                    name: 'Admin'
                }
            ])
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
