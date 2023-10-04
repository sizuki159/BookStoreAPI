import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Levels from 'App/Enums/Levels'

export default class extends BaseSchema {
  protected tableName = 'user_levels'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('level_name').notNullable()
      table.double('discount').defaultTo(10)
      
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })

    this.defer(async(db) => {
      await db.table(this.tableName).multiInsert([
        {
          id: Levels.BASIC,
          level_name: 'Basic',
          discount: 0
        },
        {
          id: Levels.BRONZE,
          level_name: 'Bronze',
          discount: 3
        },
        {
          id: Levels.SILVER,
          level_name: 'Silver',
          discount: 8
        },
        {
          id: Levels.GOLDEN,
          level_name: 'Golden',
          discount: 15
        },
        {
          id: Levels.DIAMOND,
          level_name: 'Diamond',
          discount: 24
        },
      ])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
