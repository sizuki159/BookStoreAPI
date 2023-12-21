import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Book from 'App/Models/Book'
import Order from 'App/Models/Order'
import PaymentMethod from 'App/Models/PaymentMethod'
import User from 'App/Models/User'

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method

        const users = await User.all()
        const books = await Book.all()

        function getRandomObject<T>(array: T[]): T | undefined {
            const randomIndex = Math.floor(Math.random() * array.length)
            return array[randomIndex]
        }

        function getRandomElementsFromArray<T>(objects: T[]): T[] {
            const minCount = 1;
            const maxCount = 5;

            const randomCount = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;

            // Shuffle the array
            const shuffledArray = objects.sort(() => Math.random() - 0.5);

            // Slice the array to get the random elements
            const randomElements = shuffledArray.slice(0, randomCount);

            return randomElements;
        }


        function getStatusPayment(status: string): string {
            switch (status) {
                case Order.STATUS.COMPLETED: {
                    return Order.PAYMENT_STATUS.PAID
                }
                default: {
                    return Order.PAYMENT_STATUS.UNPAID
                }
            }
        }

        for (const user of users) {
            await user.load('addresses')

            // Mỗi user cho mua đại 3-5 đơn hàng
            for (let i = 1; i <= Math.floor(3 + Math.random() * 5); i++) {
                const booksArr = getRandomElementsFromArray(books)
                const productPrice = booksArr.reduce((acc, book) => acc + book.price, 0)

                const status = getRandomObject(Object.values(Order.STATUS))

                if(status) {
                    const order = await Order.create({
                        userId: user.id,
                        userAddressId: user.addresses[0].id,
                        productPrice: productPrice,
                        feePrice: 29000,
                        finalPrice: productPrice + 29000,
                        discountPrice: 0,
                        paymentMethod: PaymentMethod.METHOD.COD,
                        status: status,
                        paymentStatus: getStatusPayment(status),
                    })
                    
                    for (const book of booksArr) {
                        await order.related('items').create({
                            isbnCode: book.isbnCode,
                            quantity: 1,
                            pricePerUnit: book.price,
                        })
                    }
                }

            }

        }
    }
}
