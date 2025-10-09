

import React, { createContext, useState, useEffect, useContext } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 

// 1. Definição do Contexto
export const MapContext = createContext(null);

// 2. Definição do Hook Customizado (Que você usa como `useMap`)
export const useMap = () => {
    const context = useContext(MapContext);
    
    if (!context) {
        // Isso pode acontecer se você tentar usar o hook antes do Provider carregar
        console.error("useMap deve ser usado dentro de um MapProvider.");
        return { map: null }; // Retorna null ou um objeto padrão
    }
    
    return context;
};

// 3. O Componente Provider principal
export default MapProviderContent = ({ children }) => {
  // ... (toda a sua lógica de inicialização do mapa, useEffect e useState aqui) ...
  
  // Exemplo de estado de inicialização
  const [mapInstance, setMapInstance] = useState(null); 
  
  // ... useEffect para iniciar o mapa ...

  return (
    <MapContext.Provider value={{ map: mapInstance /* , outras funções */ }}>
      <div id="map-container" style={{ height: '500px', width: '100%' }} />
      {children}
    </MapContext.Provider>
  );
};