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
  }
}