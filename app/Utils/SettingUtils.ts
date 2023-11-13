import Setting from "App/Models/Setting"

class SettingUtils {

    public static KEY = {
        BACKEND_URL: 'BACKEND_URL',
        FRONTEND_URL: 'FRONTEND_URL',
    }

    public static async getSettingByKey(key: string) {
        const setting = await Setting.findBy('key', key)
        return setting ? setting.value : ''
    }
}

export default SettingUtils