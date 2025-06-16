import { doc, setDoc } from "firebase/firestore/lite";
import { pokeApi } from "../../api/pokeApi";
import { firebaseDB } from "../../db/config";
import { loadPokemonsDB } from "../../db/loadPokemonsDB";
import { onUpdatePokemon, setAllPokemonNames, setIsLoading, setMessagedSaved, setModifiedPokemons, setPokemons, setPreloaded, setSaving, startLoadingPokemons } from "./pokemonSlice"

export const startGettingPokemons = (page = 0) => {
    return async (dispatch) => {
        dispatch(startLoadingPokemons());
        
        if(page < 0 ) page = 0;

        const {data} = await pokeApi.get(`/pokemon?limit=20&offset=${(page - 1) * 20}`);
        const pokemons = getPokemonsInfo(data.results);

        dispatch(setPokemons({pokemons, page}));
    }
};

export const preloadPokemonNames = () => {
    return async(dispatch) => {
        
        try {
            const {data} = await pokeApi.get(`/pokemon?limit=300`);
            const pokemons = getPokemonsInfoPreloaded(data.results);
            dispatch(setAllPokemonNames(pokemons));
            dispatch(setPreloaded());
        } catch (error) {
            console.error('Error atrapando pokemones', error);
        }
    }
};

export const getPokemonsByName = (name = '') => {
    return async(dispatch, getState) => {
        const {preloadPokemons} = getState().pokemons;
        name = name.toLowerCase().trim();

        if(name.length === 0) return [];

   
        const filtered = preloadPokemons
            .filter(p => p.name.toLowerCase().includes(name))
            .map(p => ({
                ...p,
                sprite: `${import.meta.env.VITE_SPRITE_URL}${p.id}.png`
            }));
       
        dispatch(setPokemons({pokemons: filtered, page: 1}));
    }
};

export const getPokemonsInfo = (pokemons = []) => {
    return pokemons.map(pokemon => {
        const urlDivided = pokemon.url.split('/');
        const id = urlDivided[urlDivided.length -2];
        const sprite = `${import.meta.env.VITE_SPRITE_URL}${id}.png`;

        return {id, name: pokemon.name, sprite};
    })
};

export const getPokemonsInfoPreloaded = (pokemons = []) => {
    return pokemons.map(pokemon => {
        const urlDivided = pokemon.url.split('/');
        const id = urlDivided[urlDivided.length -2];
        
        return {id, name: pokemon.name};
    })
};

export const startSavingPokemon = (updatedPokemon) => {
    return async(dispatch, getState) => {
        dispatch(setSaving());
        const {uid} = getState().auth;

        if(!updatedPokemon?.id) throw new Error('Falta el ID del pokemon');

        const pokemonToDB = {...updatedPokemon, sprite: `${import.meta.env.VITE_SPRITE_URL}${updatedPokemon.id}.png`};
        delete pokemonToDB.id;

        const docRef = doc(firebaseDB, `usuarios/${uid}/pokemons/${updatedPokemon.id}`);
        try {
            await setDoc(docRef, pokemonToDB, {merge: true});
            dispatch(onUpdatePokemon(updatedPokemon));
            dispatch(setMessagedSaved('Pokemon guardado correctamente!'))
        } catch(error) {
            console.log('Error al guardar el pokemon', error);
            throw error;
        }
    }
};

export const startLoadingPokemonsByUser = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        dispatch(setIsLoading(true));
         if(!uid) {
            console.error('El UID del usuario no existe');
            return;
        }
        const pokemons = await loadPokemonsDB(uid);
        dispatch(setModifiedPokemons(pokemons));
        dispatch(setIsLoading(false));
    }
}