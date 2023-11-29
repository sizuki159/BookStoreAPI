import { DateTime } from "luxon"

class DatetimeUtils {

    public static FORMAT_DATETIME_WITH_SQL = 'yyyy-MM-dd HH:mm:ss'

    public static DATE_NOW_WITH_OUT_TIME_SQL = DateTime.now().set({ hour: 0, minute: 0, second: 0 }).toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL)

    public static DATE_NOW_WITH_TIME_SQL = DateTime.now().toFormat(DatetimeUtils.FORMAT_DATETIME_WITH_SQL)

}

export default DatetimeUtils