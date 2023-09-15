import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AddressDistrict from 'App/Models/AddressDistrict'
import AddressProvine from 'App/Models/AddressProvine'

export default class AddressController {
    public async getProvince({response}: HttpContextContract) {
        const provinces = await AddressProvine.query().select(['province_id', 'name'])
        return response.json(provinces)
    }

    public async getDistrictWithProvinceId({response, params}: HttpContextContract) {
        const provinceId = params.provinceId
        const province = await AddressProvine.findOrFail(provinceId)
        const districts = await province.related('districts').query().select(['province_id', 'district_id', 'name'])
        return response.json(districts)
    }

    public async getWardsWithDistrictId({response, params}: HttpContextContract) {
        const districtId = params.districtId
        const district = await AddressDistrict.findOrFail(districtId)
        const wards = await district.related('wards').query().select(['wardsId', 'districtId', 'name'])
        return response.json(wards)
    }
}
