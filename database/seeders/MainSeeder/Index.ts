import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {

    private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
        await new Seeder.default(this.client).run()
    }

    public async run() {
        // Write your database queries inside the run method

        // // Tạo địa chỉ mặc định
        // await this.runSeeder(await import('../AddressProvinceSeeder'))
        // await this.runSeeder(await import('../AddressDistrictSeeder'))
        // await this.runSeeder(await import('../AddressWardsSeeder'))

        // Tạo địa chỉ mặc định theo format mới giao hàng nhanh
        await this.runSeeder(await import('../Address/AddressProvinceNewSeeder'))
        await this.runSeeder(await import('../Address/AddressDistrictNewSeeder'))
        await this.runSeeder(await import('../Address/AddressWardNewSeeder'))

        // Tạo user và các thông tin của user
        await this.runSeeder(await import('../UserSeeder'))
        await this.runSeeder(await import('../UserProfileSeeder'))
        await this.runSeeder(await import('../UserAddressSeeder'))

        // Tạo các thông tin về danh mục
        await this.runSeeder(await import('../ParentCategorySeeder'))
        await this.runSeeder(await import('../ChildCategorySeeder'))

        // Tạo các thông tin về sách
        await this.runSeeder(await import('../BookFormSeeder'))
        await this.runSeeder(await import('../BookLanguageSeeder'))
        await this.runSeeder(await import('../BookProviderSeeder'))
        await this.runSeeder(await import('../BookPublisherSeeder'))
        await this.runSeeder(await import('../BookAuthorSeeder'))

        // Tạo, thêm ảnh và bình luận cho sách
        await this.runSeeder(await import('../BookSeeder'))
        await this.runSeeder(await import('../BookImageSeederNewServer'))
        await this.runSeeder(await import('../BookCommentSeeder'))

        // Tạo thông tin về sự kiện khuyến mãi
        await this.runSeeder(await import('../FlashSaleSeeder'))
        await this.runSeeder(await import('../FlashSaleHourSeeder'))
        await this.runSeeder(await import('../FlashSaleProductSeeder'))

        // Tạo thông tin về voucher
        await this.runSeeder(await import('../VoucherSeeder'))

        // // Tạo thông tin về vỏ hàng
        // await this.runSeeder(await import('../CartSeeder'))

        // Tạo thông tin về đơn hàng
        await this.runSeeder(await import('../OrderSeeder'))
    }
}
