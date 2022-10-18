type TCartItem = {
    id: number
    name: string
    priceOfOne: number
    price: number
    image: string
    count: number
}

interface ICartState {
    items: TCartItem[]
    maxToBuyOfOne: number
    totalItems: number
    totalPrice: number
}

export type {TCartItem, ICartState}