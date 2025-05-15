import axios from "axios"

export const pokeApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });