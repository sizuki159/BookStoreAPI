import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BookValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    "ccategory_id": schema.number([
      rules.exists({table: 'child_categories', column: 'id'})
    ]),
    "name": schema.string(),
    "price": schema.number(),
    "quantity": schema.number(),
    "desc": schema.string.optional(),
    "weight": schema.number.optional(),
    "number_of_pages": schema.number.optional(),
    "publishing_year": schema.number.optional(),
    "author_id": schema.number.optional([
      rules.exists({table: 'book_authors', column: 'id'})
    ]),
    "publisher_id": schema.number.optional([
      rules.exists({table: 'book_publishers', column: 'id'})
    ]),
    "language_id": schema.number.optional([
      rules.exists({table: 'book_languages', column: 'id'})
    ]),
    "book_form_id": schema.number.optional([
      rules.exists({table: 'book_forms', column: 'id'})
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'ccategory_id.required': 'Cho biết sách này thuộc loại nào!',
    'ccategory_id.exists': 'Loại này không tồn tại trong dữ liệu!',
    'name.required': 'Thiếu tên sách!',
    'price.required': 'Thiếu giá tiền!',
    'author_id.exists': 'Tác giả không tồn tại trong dữ liệu!',
    'publisher_id.exists': 'Nhà xuất bản không tồn tại trong dữ liệu!',
    'language_id.exists': 'Ngôn ngữ sách không tồn tại trong dữ liệu!',
    'book_form_id.exists': 'Hình thức sách không tồn tại trong dữ liệu!',
  }
}
