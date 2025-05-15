import { createRoot } from 'react-dom/client'
import { store } from './store/store.js'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { PokemonApp } from './PokemonApp.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PokemonApp/>
      </BrowserRouter>
    </Provider>      
  </StrictMode>
)
