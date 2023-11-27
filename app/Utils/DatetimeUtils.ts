import { DateTime } from "luxon"

class DatetimeUtils {
    public static DATE_NOW_WITH_OUT_TIME_SQL = DateTime.now().set({ hour: 0, minute: 0, second: 0 }).toFormat('yyyy-MM-dd HH:mm:ss')

    public static DATE_NOW_WITH_TIME_SQL = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')
}

export default DatetimeUtils