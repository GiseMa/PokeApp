import { Navigate, Route, Routes } from 'react-router-dom';
import { PokemonRoutes } from '../pokemon/routes/PokemonRoutes';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useCheckAuth } from '../hooks/useCheckAuth';

export const AppRouter = () => {

  const status = useCheckAuth();
  return (
    <>
      <Routes>
        {
          (status === 'authenticated') ?
          <Route path='/*' element={<PokemonRoutes/>}/> :
          <Route path='/auth/*' element={<AuthRoutes/>}/> 
        }
        <Route path="/*" element={<Navigate to='/auth/login'/>}/>
      </Routes>
    </>
  )
}
