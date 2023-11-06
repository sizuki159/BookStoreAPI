import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('isbn_code').unique().notNullable()
      table.text('book_name').nullable()
      // table.string('slug', 255).unique().nullable() //Cach 1
      table.text('slug').nullable() //Cach 2
      table.double('price').notNullable()
      table.integer('quantity').unsigned().defaultTo(0)
      table.text('desc').nullable()
      table.double('weight').nullable()
      table.integer('number_of_pages').nullable()
      table.integer('publishing_year').nullable()
      table.integer('ccategory_id').unsigned().references('id').inTable('child_categories').onDelete('SET NULL')
      table.integer('author_id').unsigned().references('id').inTable('book_authors').onDelete('SET NULL')
      table.integer('publisher_id').unsigned().references('id').inTable('book_publishers').onDelete('SET NULL')
      table.integer('provider_id').unsigned().references('id').inTable('book_providers').onDelete('SET NULL')
      table.integer('language_id').unsigned().references('id').inTable('book_languages').onDelete('SET NULL')
      table.integer('book_form_id').unsigned().references('id').inTable('book_forms').onDelete('SET NULL')

      // table.primary(['isbn_code'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
