import { Alert, Box, Typography } from "@mui/material";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { PokemonList, Search } from "../components";
import { PokemonLayout } from "../layout/PokemonLayout";
import { getPokemonsByName, startGettingPokemons } from "../../store/pokemons";

export const PokemonsPage = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading, pokemons, preloadPokemons } = useSelector((state) => state.pokemons);
  const { q = "" } = queryString.parse(location.search);
  const [localPage, setLocalPage] = useState(1); 

  const cardsPerPage = 20;
  const totalPages = Math.ceil(preloadPokemons.length / cardsPerPage) || 1;

  useEffect(() => {
    if (q.length > 0) {
      dispatch(getPokemonsByName(q));
      window.scrollTo(0, 0);
    } else {
      dispatch(startGettingPokemons(localPage));
    }
  }, [dispatch, q, localPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [localPage]);

  const handleChangePage = useCallback((event, value) => {
    if (value) setLocalPage(value);
  }, []);

  return (
    <PokemonLayout title="Pokemones">
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: '100%', mb: 2,}}>
        <Typography variant="h6"></Typography>
        <Search />
      </Box>
      {q.length === 0 ? (
        <PokemonList
          pokemons={pokemons}
          isLoading={isLoading}
          page={localPage}
          onChangePage={handleChangePage}
          totalPages={totalPages}
        />
      ) : pokemons.length === 0 ? (
        <Alert severity="error" sx={{ top: '30%', left: '37%', position: "absolute", padding: 7 }}>
          No se encontró ningún Pokémon llamado <b>{q}</b>
        </Alert>
      ) : (
        <PokemonList
          pokemons={pokemons}
          isLoading={isLoading}
          page={1}
          onChangePage={() => {}}
          totalPages={1}
        />
      )}
    </PokemonLayout>
  );
};