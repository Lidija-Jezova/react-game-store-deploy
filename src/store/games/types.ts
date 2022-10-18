type TGameItem = {
    id: number
    name: string
    description: string
    price: number
    image: string
    releaseDate: string
    genres: string[]
}

interface IGamesState {
    games: TGameItem[],
    status: string
}

export type {TGameItem, IGamesState}