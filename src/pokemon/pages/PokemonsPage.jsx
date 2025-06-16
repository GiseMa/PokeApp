import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PokemonList, Search } from "../components";
import { PokemonLayout } from "../layout/PokemonLayout";
import { getPokemonsByName, startGettingPokemons, startLoadingPokemonsByUser } from "../../store/pokemons";

export const PokemonsPage = () => {

  const location = useLocation();
  const {pathname} = location;
  const isModifiedPage = pathname.includes("modificados");
  const dispatch = useDispatch();
  const { isLoading, pokemons, preloadPokemons,  modifiedPokemons, pokemons: searchResults } = useSelector((state) => state.pokemons);
  const { q = "" } = queryString.parse(location.search);
  const [localPage, setLocalPage] = useState(1); 
  const { uid } = useSelector((state) => state.auth);

  const cardsPerPage = 20;

  useEffect(() => {
    if (q.length > 0) {
      dispatch(getPokemonsByName(q));
    } else if (isModifiedPage && uid ) {
        dispatch(startLoadingPokemonsByUser());
    } else {
        dispatch(startGettingPokemons(localPage));
    }
  }, [dispatch, q, localPage, uid, isModifiedPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [localPage]);

  const handleChangePage = useCallback((event, value) => {
    if (value) setLocalPage(value);
  }, []);

  const paginatedPokemons = useMemo(() => {
    const startIndex = (localPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    if (q.length > 0) return searchResults;
    return isModifiedPage ? modifiedPokemons.slice(startIndex, endIndex) : pokemons;
  }, [searchResults, modifiedPokemons, pokemons, q, isModifiedPage]);


  const totalPages = useMemo(() => {
    return Math.ceil((isModifiedPage ? modifiedPokemons.length : preloadPokemons.length) / cardsPerPage) || 1;
  }, [modifiedPokemons, pokemons, cardsPerPage, isModifiedPage]);

  useEffect(() => {
    if (localPage > totalPages && totalPages > 0) {
      setLocalPage(1);
    }
  }, [totalPages, localPage])


  if (isLoading) {
    return (
      <PokemonLayout title="Cargando pokemones...">
        <Box  display="flex" justifyContent="center" alignItems="center" sx={{ height: "60vh", width: "100%" }}>
          <CircularProgress size={80}/>
        </Box>
      </PokemonLayout>
    );
  }

  return (
    <PokemonLayout title={isModifiedPage ? "Pokemones modificados" : ""}>
        {
         !isModifiedPage && 
          <Box display="flex" justifyContent="space-between" alignItems="center" 
          sx={{ width: '100%', mt: 1, mb: 2, zIndex: 10, paddingY: 2,}}>
            <Typography variant="h4">Pokemones</Typography>
            <Search />
          </Box>
        }
      <Box sx={{width: '100%',
          minHeight: 'calc(100vh - 200px)', 
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'flex-start', 
          flexWrap: 'wrap', 
          p: 2,
        }}>
        {
          q.length > 0 && searchResults.length === 0 ? (
            <Alert severity="error" sx={{padding: 7,  mt: 5, mx: 'auto', width: 'fit-content'}}>
              No se encontró ningún Pokémon llamado <b>{q}</b>
            </Alert>)
            : (
          <PokemonList
                pokemons={paginatedPokemons}
                isLoading={isLoading}
                page={q.length > 0 ? 1 : localPage}
                onChangePage={q.length > 0 ? () => {} : handleChangePage}
                totalPages={totalPages}
                isModified={isModifiedPage}
                emptyMessage={isModifiedPage ? "No hay pokemones guardados" : ""}
              />
              )
        }
      </Box>
    </PokemonLayout>
  );
};