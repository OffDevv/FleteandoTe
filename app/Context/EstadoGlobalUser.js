import React, { createContext, useState } from 'react'
export const EstadoGlobalContext = createContext();

export default function EstadoGlobalUser({ children }) {
  const [login, setLogin] = useState(false);
  const [usuario, setUsuario] = useState(''); //implementacion de setUsuario para poder usar el prop en cualquier parte
  const [transportista, setTransportista] = useState(false);
  const [authReady, setAuthReady] = useState(true);
  return (
    <EstadoGlobalContext.Provider value={{ login, setLogin, usuario, setUsuario, transportista, setTransportista, authReady, setAuthReady }}>
      {children}
    </EstadoGlobalContext.Provider>
  )
}
