import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {

  public async up () {
    this.schema.raw('ALTER TABLE books ADD FULLTEXT fulltext_index(isbn_code, book_name, `desc`)')
  }

  public async down () {
    this.schema.raw('ALTER TABLE books DROP INDEX fulltext_index')
  }
}
