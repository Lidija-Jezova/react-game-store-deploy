type TGameItem = {
    id: number
    name: string
    description: string
    price: number
    image: string
    releaseDate: string
    genres: string[]
}

interface IGameState {
    game: TGameItem
    status: string
}

export type {TGameItem, IGameState}