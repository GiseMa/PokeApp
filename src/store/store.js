import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { pokemonSlice } from "./pokemons/pokemonSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        pokemons: pokemonSlice.reducer,
    }
})