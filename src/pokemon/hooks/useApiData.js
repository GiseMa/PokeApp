import { useState, useEffect } from 'react';
import { pokeApi } from '../../api/pokeApi';
import { allTheEvolutions, getEvolutionsAndInvolutions } from '../utils/pokemonUtils';

export const useApiData = (id) => {
    const [pokemon, setPokemon] = useState(null);
    const [evolutionData, setEvolutionData] = useState({ evolutionsOnly: [], involutionsOnly: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await pokeApi.get(`pokemon/${id}`);
                setPokemon({
                    id,
                    name: data.name,
                    photo: data.sprites.other['official-artwork'].front_default,
                    abilities: data.abilities,
                    height: data.height,
                    types: data.types,
                });

                const { data: speciesData } = await pokeApi.get(`pokemon-species/${id}`);
                const evolutionUrl = speciesData.evolution_chain.url;
                const { data: evolutionChainData } = await pokeApi.get(evolutionUrl);
                const evolutionNames = allTheEvolutions(evolutionChainData.chain);
                setEvolutionData(getEvolutionsAndInvolutions(evolutionNames, data.name));
            } catch (error) {
                console.error('Error obteniendo datos del Pokémon de la API', error);
                setPokemon(null);
            }
        };
        fetchData();
    }, [id]);

    return { pokemon, evolutionData };
};