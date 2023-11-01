import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {

  public async up () {
    this.schema.raw('ALTER TABLE books ADD FULLTEXT fulltext_index1(isbn_code)')
    this.schema.raw('ALTER TABLE books ADD FULLTEXT fulltext_index2(book_name)')
    this.schema.raw('ALTER TABLE books ADD FULLTEXT fulltext_index3(`desc`)')
    this.schema.raw('ALTER TABLE books ADD FULLTEXT fulltext_index4(book_name, `desc`)')
  }

  public async down () {
    this.schema.raw('ALTER TABLE books DROP INDEX fulltext_index1')
    this.schema.raw('ALTER TABLE books DROP INDEX fulltext_index2')
    this.schema.raw('ALTER TABLE books DROP INDEX fulltext_index3')
    this.schema.raw('ALTER TABLE books DROP INDEX fulltext_index4')
  }
}
