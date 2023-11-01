import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookImage from 'App/Models/BookImage'

export default class TestsController {
    public async test({}: HttpContextContract) {
        const images = await BookImage.query()
        return images
    }
}
