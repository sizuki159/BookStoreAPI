import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserNotificationFilterFields from 'App/FilterFields/User/UserNotificationFilterFields'
import UserNotification from 'App/Models/UserNotification'
import PageLimitUtils from 'App/Utils/PageLimitUtils'

type Statistics = {
    countUnread: number,
    countRead: number,
    countTotal: number,
}
export default class UserNotificationController {
    // Lấy danh sách thông báo (phân trang)
    public async index({ auth, request, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const { page, limit } = PageLimitUtils(request.qs())

        const notifications = await UserNotification.query()
            .where('user_id', userAuth.id)
            .orderBy('created_at', 'desc')
            .paginate(page, limit)


        return response.json(notifications.serialize(UserNotificationFilterFields))

    }

    // Đánh dấu đã đọc thông báo
    public async readNotification({ auth, params, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const notification = await UserNotification.query()
            .where('user_id', userAuth.id)
            .where('id', params.notification_id)
            .first()

        if (!notification) {
            return response.notFound({
                message: 'Thông báo không tồn tại'
            })
        }

        notification.isRead = true
        await notification.save()

        return response.json(notification.serialize(UserNotificationFilterFields))
    }

    // Đánh dấu đã đọc tất cả thông báo
    public async readAllNotification({ auth, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        await UserNotification.query()
            .where('user_id', userAuth.id)
            .update({
                isRead: true
            })

        return response.json({
            message: 'Đánh dấu đã đọc tất cả thông báo thành công'
        })
    }

    // Lấy thống kê thông báo
    // Đã đọc và chưa đọc
    public async getStatistics({ auth, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const statistics = await UserNotification.query()
            .where('user_id', userAuth.id)

        // Đếm số lượng thông báo chưa đọc
        // Từ mảng đối tượng ở trên
        const countUnread = statistics.filter(notification => !notification.isRead).length

        const result: Statistics = {
            countUnread: countUnread,
            countRead: statistics.length - countUnread,
            countTotal: statistics.length,
        }
        return response.json(result)
    }
}
