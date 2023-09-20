import React, { useState, useContext } from 'react';

export const CarContext = React.createContext()
export const CarContextUpdate = React.createContext()

export const useCar = () => {
  return useContext(CarContext)
}

export const useCarUpdate = () => {
  return useContext(CarContextUpdate)
}

export function CarProvider({ children }) {
  const [cars, setCars] = useState([])

  const updateCarData = (data) => {
    setCars(data)
  }
  return (
    <CarContext.Provider value={ cars }>
      <CarContextUpdate.Provider value={ updateCarData }>
        { children }
      </CarContextUpdate.Provider>
    </CarContext.Provider>
  )
}