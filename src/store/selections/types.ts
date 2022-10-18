type TQuerySelections = {
    filterQuery: string,
    sort: {
        by: string
        order: string
    }
}

type TSort = {
    by: string
    order: string
    name: string
}

interface ISelectionsState {
    status: string,
    pages: number
    currentPage: number
    limit: number
    searchQuery: string
    filterQuery: string
    sort: TSort
    sortOptions: TSort[]
}

export type {TQuerySelections, TSort, ISelectionsState}