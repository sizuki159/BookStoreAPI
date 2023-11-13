interface IOrderResponse {
    message: string,
    payment: {
        method: string,
        url: string | null
    }
}


export default IOrderResponse