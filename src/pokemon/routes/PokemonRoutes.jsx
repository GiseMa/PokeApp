import { Grid } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from '../../ui/components/Navbar'
import { EditThePokemonPage, ModifiedPokemonsPage, PokemonDetailPage, PokemonsPage } from '../pages'

export const PokemonRoutes = () => {
  return (
    <>
      <Navbar/>
      <Grid container>
          <Routes>
              <Route path='pokemones' element={<PokemonsPage />}/>
              <Route path='modificados' element={<ModifiedPokemonsPage/>}/> 

              <Route path='pokemon/:id' element={<PokemonDetailPage/>}/>
              <Route path='modificado/:id' element={<PokemonDetailPage/>}/>
              
              <Route path='modificar/:id' element={<EditThePokemonPage/>}/>
              <Route path='/*' element={<Navigate to="/pokemones"/>}></Route>

          </Routes>
      </Grid>
    </>
  )
}
