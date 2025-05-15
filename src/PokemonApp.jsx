import { useDispatch } from 'react-redux';
import { AppRouter } from './router/AppRouter'
import { useEffect } from 'react';
import { preloadPokemonNames } from './store/pokemons/thunks';
import { beginLogout, checkingAuthentication, listenToAuthChanges } from './store/auth/thunks';

export const PokemonApp = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkingAuthentication());

    const checkAuthToken = setInterval(() => {
      const token = localStorage.getItem('token');
      const authState = localStorage.getItem('authState');
      if (!token && authState !== 'checking' && authState !== 'not-authenticated') {
        dispatch(beginLogout());
      }
    }, 5000)
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

