import React, { createContext, useState } from 'react'
export const EstadoGlobalContext = createContext();

export default function EstadoGlobalUser({ children }) {
  const [login, setLogin] = useState(false);
  return (
    <EstadoGlobalContext.Provider value={{ login, setLogin }}>
      {children}
    </EstadoGlobalContext.Provider>
  )
}