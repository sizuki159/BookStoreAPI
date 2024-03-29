import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Levels from 'App/Enums/Levels'
import Roles from 'App/Enums/Roles'
import User from 'App/Models/User'

export default class extends BaseSchema {
    protected tableName = 'users'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.string('email', 255).notNullable().unique()
            table.string('password', 180).notNullable()
            table.double('money').defaultTo(0)
            table.string('remember_me_token').nullable()
            table.integer('user_level_id').unsigned().references('id').inTable('user_levels').onDelete('SET NULL').defaultTo(Levels.BASIC)
            table.integer('user_role_id').unsigned().references('id').inTable('user_roles').onDelete('SET NULL').defaultTo(Roles.USER)
            table.boolean('is_email_verified').notNullable().defaultTo(false)
            table.enum('status', Object.values(User.STATUS)).defaultTo(User.STATUS.ACTIVE)

            /**
             * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true }).nullable()
            table.timestamp('updated_at', { useTz: true }).nullable()
            table.timestamp('deleted_at', { useTz: true }).nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
