import { types } from '@ioc:Adonis/Core/Helpers'

const PageLimitUtils = (qs: Record<string, any>): {page: number, limit: number} => {
    let {page, limit} = qs
    if(!types.isInteger(Number.parseInt(page)) || Number.parseInt(page) < 1) {
        page = 1
    }
    if(!types.isInteger(Number.parseInt(limit)) || Number.parseInt(limit) < 1) {
        limit = 10
    }
    return {page, limit}
}

export default PageLimitUtils
