import React, { createContext, useState, useEffect } from 'react'
import { addItemToCart, removeItemFromCart, setTotal, filterItemFromCart, getCartItemsCount } from './cart.utils'

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  total: 0,
  cartItemsCount: 0,
})

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true)
  const [cartItems, setCartItems] = useState([])
  const [cartItemsCount, setCartItemsCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  const addItem = (item) => setCartItems(addItemToCart(cartItems, item))
  const removeItem = (item) => setCartItems(removeItemFromCart(cartItems, item))
  const toggleHidden = () => setHidden(!hidden)
  const clearItemFromCart = (item) => setCartItems(filterItemFromCart(cartItems, item))
  console.log(cartItems)
  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems))
    setCartTotal(setTotal(cartItems))
  }, [cartItems])
  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        cartItemsCount,
        removeItem,
        total: cartTotal,
        clearItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
