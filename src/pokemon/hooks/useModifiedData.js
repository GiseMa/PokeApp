import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const useModifiedData = (id) => {
    const [pokemon, setPokemon] = useState(null);
    const [evolutionData, setEvolutionData] = useState({ evolutionsOnly: [], involutionsOnly: [] });
    const { modifiedPokemons } = useSelector(state => state.pokemons);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchModifiedData = () => {
            console.log('Buscando pokemon modificado');
            const modifiedPokemon = modifiedPokemons.find(p => p.id === id);
            if (modifiedPokemon) {
                setPokemon(modifiedPokemon);
                setEvolutionData({
                    evolutionsOnly: location.state?.evolutionsOnly || [],
                    involutionsOnly: location.state?.involutionsOnly || []
                });
            } else {
                console.error('Pokémon modificado no encontrado');
            }
        };

        fetchModifiedData();
    }, [id, modifiedPokemons, navigate, location.state]);

    return { pokemon, evolutionData };
};