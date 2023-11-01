import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {

  private async runSeeder(Seeder: {default: typeof BaseSeeder}) {
    await new Seeder.default(this.client).run()
  }

  public async run () {
    // Write your database queries inside the run method
    await this.runSeeder(await import('../AddressProvinceSeeder'))
    await this.runSeeder(await import('../AddressDistrictSeeder'))
    await this.runSeeder(await import('../AddressWardsSeeder'))
    await this.runSeeder(await import('../ParentCategorySeeder'))
    await this.runSeeder(await import('../ChildCategorySeeder'))
    await this.runSeeder(await import('../BookFormSeeder'))
    await this.runSeeder(await import('../BookLanguageSeeder'))
    await this.runSeeder(await import('../UserSeeder'))
    await this.runSeeder(await import('../BookProviderSeeder'))
    await this.runSeeder(await import('../BookPublisherSeeder'))
    await this.runSeeder(await import('../BookAuthorSeeder'))
    await this.runSeeder(await import('../BookSeeder'))
    await this.runSeeder(await import('../BookImageSeeder'))
  }
}
