import { createSlice } from "@reduxjs/toolkit";

export const pokemonSlice = createSlice({
    name: 'pokemons',
    initialState: {
        page: 1,
        isLoading: false,
        active: null,
        isSaving: false,
        messageSaved: null,
        pokemons: [],
        modifiedPokemons: [],
        preloadPokemons: [],
    },
    reducers: {
        startLoadingPokemons: (state) => {
            state.isLoading = true;  
        },
        setPokemons: (state, {payload}) => {
            state.isLoading = false;
            state.page = payload.page;
            state.pokemons = payload.pokemons;
        },
        onSetActiveEvent: (state, {payload}) => {
            state.activeEvent = payload;
        },
        onUpdatePokemon: (state, {payload}) => {
            state.pokemons = state.pokemons.map(event => {
                if(event.id === payload.id) {
                    return payload;
                }
                return event;
            })
        },
        setSaving: (state) => {
            state.isSaving = true,
            state.messageSaved = ''
        },
        setMessagedSaved: (state, {payload}) => {
            state.isSaving = false;
            state.messageSaved = payload;
        },
        clearMessageSaved: (state) => {
            state.messageSaved = null
        },
        setAllPokemonNames: (state, {payload}) => {
            state.preloadPokemons = payload;
        },
        setModifiedPokemons: (state, {payload}) => {
            state.modifiedPokemons = payload;
        },
        setPreloaded: (state) => {
            state.isPreloaded = true;
        },
        
    }
});

export const {
    startLoadingPokemons,
    setPokemons,
    onSetActiveEvent,
    onUpdatePokemon,
    setSaving,
    setMessagedSaved,
    clearMessageSaved,
    setAllPokemonNames,
    setModifiedPokemons,
    setPreloaded,
} = pokemonSlice.actions;