import { Alert } from "@mui/material";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
import { PokemonList } from "../components";
import { PokemonLayout } from "../layout/PokemonLayout";
import { getPokemonsByName, startLoadingPokemonsByUser } from "../../store/pokemons";

export const ModifiedPokemonsPage = () => {
  
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading, modifiedPokemons, pokemons: searchResults } = useSelector((state) => state.pokemons);
  const { q = "" } = queryString.parse(location.search);

  const { uid } = useSelector((state) => state.auth);

  const [localPage, setLocalPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const cardsPerPage = 20;

  useEffect(() => {
    if (uid && q.length === 0) {
      dispatch(startLoadingPokemonsByUser());
    }
  }, [uid, dispatch, q]);

  useEffect(() => {
    if (q.length > 0) {
      dispatch(getPokemonsByName(q));
    }
  }, [dispatch, q]);

  useEffect(() => {
    const newTotalPages = Math.ceil(modifiedPokemons.length / cardsPerPage) || 1;
    if (newTotalPages !== totalPages) setTotalPages(newTotalPages);
    if (localPage > newTotalPages && newTotalPages > 0) setLocalPage(1);
  }, [modifiedPokemons, cardsPerPage, localPage, totalPages]);

  const handleChangePage = useCallback((event, value) => {
    if (value) setLocalPage(value);
  }, []);

  const paginatedPokemons = useMemo(() => {
    const startIndex = (localPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return modifiedPokemons.slice(startIndex, endIndex);
  }, [modifiedPokemons, localPage, cardsPerPage]);

  return (
    <PokemonLayout title="Pokemones modificados">
      {q.length > 0 ? (
        searchResults.length === 0 ? (
          <Alert severity="error" sx={{ top: '30%', left: '37%', position: "absolute", padding: 7 }}>
            No se encontró ningún Pokémon llamado <b>{q}</b>
          </Alert>
        ) : (
          <PokemonList
            pokemons={searchResults}
            isLoading={isLoading}
            page={1}
            onChangePage={() => {}}
            totalPages={1}
          />
        )
      ) : (
        <PokemonList
          pokemons={paginatedPokemons}
          isLoading={isLoading}
          page={localPage}
          onChangePage={handleChangePage}
          isModified={true}
          totalPages={totalPages}
          emptyMessage="No hay pokemones guardados"
        />
      )}
    </PokemonLayout>
  )
};
