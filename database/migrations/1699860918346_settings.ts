import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import SettingUtils from 'App/Utils/SettingUtils'

export default class extends BaseSchema {
    protected tableName = 'settings'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('key').unique().notNullable()
            table.string('value').notNullable()

            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true }).nullable()
            table.timestamp('updated_at', { useTz: true }).nullable()
        })

        this.defer(async(db) => {
            await db.table(this.tableName).multiInsert([
                {
                    key: SettingUtils.KEY.BACKEND_URL,
                    value: 'http://127.0.0.1:3333'
                },
                {
                    key: SettingUtils.KEY.FRONTEND_URL,
                    value: 'http://localhost:3000'
                },
            ])
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
