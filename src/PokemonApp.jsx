import { useDispatch } from 'react-redux';
import { AppRouter } from './router/AppRouter'
import { useEffect } from 'react';
import { preloadPokemonNames } from './store/pokemons/thunks';
import { beginLogout, checkingAuthentication, listenToAuthChanges } from './store/auth/thunks';

export const PokemonApp = () => {

  const dispatch = useDispatch();


   const checkAuthToken = setInterval(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch(beginLogout());
      }
    }, 5000)

  useEffect(() => {
    dispatch(checkingAuthentication());
    return () => clearInterval(checkAuthToken); 
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(preloadPokemonNames());
    dispatch(listenToAuthChanges());
  }, []);

  return (
      <AppRouter/>
  )
};

 