import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AdminUserFilterFields from 'App/FilterFields/Admin/AdminUserFilterFields'
import User from 'App/Models/User'
import PageLimitUtils from 'App/Utils/PageLimitUtils'

export default class AdminUserController {

    // Lấy tất cả người dùng với phân trang và search
    public async getAllUsers({ request, response }: HttpContextContract) {
        let { email, status } = request.qs()

        let query = User.query()
            .preload('userRole')
            .preload('userLevel')
            .preload('profile')
            .orderBy('created_at', 'desc')

        // Email text search
        if (email) {
            query.where('email', 'like', `%${email}%`)
        }

        // Filter status
        if(status) {
            query.where('status', status)
        }

        // Phân trang
        const { page, limit } = PageLimitUtils(request.qs())
        const result = await query.paginate(page, limit)

        return response.json(result.serialize(AdminUserFilterFields))
    }

    // Khóa tài khoản người dùng
    public async lockUser({ params, response }: HttpContextContract) {
        const userId = params.user_id

        // Lấy người dùng nếu không có thì trả không tìm thấy
        const user = await User.find(userId)
        if (!user) {
            return response.notFound({ message: 'Không tìm thấy người dùng' })
        }

        // Khóa tài khoản người dùng
        await user.lock()

        return response.ok({
            message: 'Khóa tài khoản thành công',
        })
    }

    // Mở khóa tài khoản người dùng
    public async unlockUser({ params, response }: HttpContextContract) {
        const userId = params.user_id

        // Lấy người dùng nếu không có thì trả không tìm thấy
        const user = await User.find(userId)
        if (!user) {
            return response.notFound({ message: 'Không tìm thấy người dùng' })
        }

        // Mở tài khoản người dùng
        await user.unlock()

        return response.ok({
            message: 'Mở khóa tài khoản thành công',
        })
    }
}
