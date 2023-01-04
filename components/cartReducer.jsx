export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
export const TOGGLE_CART_ITEM_AMOUNT = 'TOGGLE_CART_ITEM_AMOUNT'
export const CLEAR_CART = 'CLEAR_CART'
export const COUNT_CART_TOTALS = 'COUNT_CART_TOTALS'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const {  product } = action.payload
    const isItemInCart = state.cart.find((item) => item.id === product.id)
    if (isItemInCart) {
      return { ...state }
    }else {
      return { ...state, cart: [...state.cart, { ...product }] }
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: tempCart }
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === 'inc') {
          let newAmount = item.amount + 1
          if (newAmount > item.max) {
            newAmount = item.max
          }
          return { ...item, amount: newAmount }
        }
        if (value === 'dec') {
          let newAmount = item.amount - 1
          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...item, amount: newAmount }
        }
      }
      return item
    })
    return { ...state, cart: tempCart }
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const {  price } = cartItem

        total.total_amount += (+price.split('$')[1])
        total.total_items += 1
        return total
      },
      { total_items: 0, total_amount: 0 }
    )
    return { ...state, total_items, total_amount }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
