import React, { useState, useContext } from 'react';

export const OrderContext = React.createContext()
export const OrderContextUpdate = React.createContext()

export const useOrder = () => {
  return useContext(OrderContext)
}

export const useOrderUpdate = () => {
  return useContext(OrderContextUpdate)
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])

  const updateOrderData = (data) => {
    setOrders(data)
  }

  return (
    <OrderContext.Provider value={ orders }>
      <OrderContextUpdate.Provider value={ updateOrderData }>
        { children }
      </OrderContextUpdate.Provider>
    </OrderContext.Provider>
  )
}