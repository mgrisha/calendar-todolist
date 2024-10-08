// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';
import StoreContextProvider from './context/StoreContext.jsx';

createRoot(document.getElementById('root')).render(
  <StoreContextProvider>
    <App />
  </StoreContextProvider>,
)
