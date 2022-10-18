import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartState, TCartItem} from "./types";

const initialState = {
    items: [],
    maxToBuyOfOne: 10,
    totalItems: 0,
    totalPrice: 0
} as ICartState

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<TCartItem>) => {
            const item = state.items.find(item => item.id === action.payload.id)
            if (item) {
                state.items = state.items.map(item => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            price: item.count === state.maxToBuyOfOne ? item.price : item.price + action.payload.price,
                            count: item.count === state.maxToBuyOfOne ? state.maxToBuyOfOne : item.count + 1
                        }
                    } else return item
                })
            } else {
                state.items.push({...action.payload, priceOfOne: action.payload.price, count: 1})
            }
            state.totalPrice = state.items.reduce((prev, curr) => prev + curr.price, 0)
            state.totalItems = state.items.reduce((prev, curr) => prev + curr.count, 0)
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload)

            if (item) {
                state.items = state.items.filter(item => item.id !== action.payload)
                state.totalPrice = state.items.reduce((prev, curr) => prev + curr.price, 0)
                state.totalItems = state.items.reduce((prev, curr) => prev + curr.count, 0)
            }
        },
        changeItemCount: (state, action: PayloadAction<{ item: TCartItem, count: number }>) => {
            const item = state.items.find(item => item.id === action.payload.item.id)

            if (item) {
                item.count = action.payload.count
                item.price = item.priceOfOne * action.payload.count
                state.totalPrice = state.items.reduce((prev, curr) => prev + curr.price, 0)
                state.totalItems = state.items.reduce((prev, curr) => prev + curr.count, 0)
            }
        },
        checkout: (state) => {
            state.items = []
            state.totalItems = 0
            state.totalPrice = 0
        }
    }
})

export const {addItem, removeItem, changeItemCount, checkout} = cartSlice.actions

export default cartSlice.reducer