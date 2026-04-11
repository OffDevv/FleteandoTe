import React, { createContext, useState } from 'react'
export const EstadoGlobalContext = createContext();

export default function EstadoGlobalUser({ children }) {
  const [login, setLogin] = useState(true);
  const [usuario, setUsuario] = useState(''); //implementacion de setUsuario para poder usar el prop en cualquier parte
  return (
    <EstadoGlobalContext.Provider value={{ login, setLogin, usuario, setUsuario }}>
      {children}
    </EstadoGlobalContext.Provider>
  )
}