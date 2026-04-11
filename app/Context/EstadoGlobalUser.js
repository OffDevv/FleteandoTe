import React, { createContext, useState } from 'react'
export const EstadoGlobalContext = createContext();

export default function EstadoGlobalUser({ children }) {
  const [login, setLogin] = useState(false);
  const [usuario, setUsuario] = useState(null); 
  const [transportista, setTransportista] = useState(false);
  const [authReady] = useState(true);

  return (
    <EstadoGlobalContext.Provider value={{ login, setLogin, usuario, setUsuario, transportista, setTransportista, authReady }}>
      {children}
    </EstadoGlobalContext.Provider>
  )
}