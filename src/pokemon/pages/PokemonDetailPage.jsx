import { Box, Button, CircularProgress, Grid, Typography, } from "@mui/material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { PokemonLayout } from "../layout/PokemonLayout";
import { useApiData } from "../hooks/useApiData";
import { useModifiedData } from "../hooks/useModifiedData";

export const PokemonDetailPage = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const isModified = location.pathname.includes('/modificado/');
    const {pokemon: apiPokemon, evolutionData: apiEvolutionData} = useApiData(id);

    const {pokemon: modifiedPokemon, evolutionData: modifiedEvolutionData} = isModified
    ? useModifiedData(id)
    : {pokemon: null, evolutionData: {evolutionsOnly: [], involutionsOnly: []}};

    const pokemon = isModified ? modifiedPokemon : apiPokemon;
    const evolutionData = isModified ? modifiedEvolutionData : apiEvolutionData;

    const onNavigateBack = () => {
        if (location.state?.fromPokemon && !location.state?.fromSearch) {
            navigate(-1);
        } else {
            navigate('/pokemones', { replace: true });
        }
    };

    if (!pokemon) return <CircularProgress/>;

    const nameUpperCase = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    
  return (
  <PokemonLayout>
 
    <Box mt={1} sx={{ width: '100%' }}> 
        <Grid container spacing={2} alignItems="flex-start">
            <Grid grid={{xs: 12, md: 4}} sx={{ mx: 'auto', my: 2 }} display="flex" flexDirection="column" alignItems="flex-start">
                <img src={pokemon.photo || pokemon.sprite}  
                     alt={pokemon.name}
                     className="img-thumbail animate__animated animate__zoomInDown w-100 mb-3"
                />
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Button variant="contained" color="info" onClick={onNavigateBack} size="small">
                        Regresar
                    </Button>
                     <Link to={`/modificar/${id}`} state={{ pokemon, ...evolutionData }} className='btn btn-warning'>
                        {isModified ? 'Editar' : 'Modificar'}
                    </Link>
                </Box>
            </Grid>
            <Grid size={{xs: 12, md: 5}}>
                            <Typography variant="h3">Detalle de {nameUpperCase}</Typography>

               <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2, padding: 2 }}>

                    <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
                        <Typography variant="h5" component="li" gutterBottom>
                        <b>Nombre:</b> {nameUpperCase}
                        </Typography>

                        <Typography variant="h6" component="li" gutterBottom>
                        <b>Altura:</b> {pokemon.height}
                        </Typography>

                        <Typography variant="h6" component="li" gutterBottom>
                        <b>Habilidades:</b>
                        <Box component="ul" sx={{ pl: 2 }}>
                            {Array.isArray(pokemon.abilities) ? (
                            isModified ? (
                                pokemon.abilities.map((a, index) => <li key={index}>{a}</li>)
                            ) : (
                                pokemon.abilities.filter(a => !a.is_hidden).map((a, index) => <li key={index}>{a.ability.name}</li>)
                            )
                            ) : (
                            <li>{pokemon.abilities}</li>
                            )}
                        </Box>
                        </Typography>

                        <Typography variant="h6" component="li" gutterBottom>
                        <b>Tipo de Pokemon:</b>
                        <Box component="ul" sx={{ pl: 2 }}>
                            {Array.isArray(pokemon.types) ? (
                            isModified ? (
                                pokemon.types.map((t, index) => <li key={index}>{t}</li>)
                            ) : (
                                pokemon.types.map((t, index) => <li key={index}>{t.type.name}</li>)
                            )
                            ) : (
                            <li>{pokemon.types}</li>
                            )}
                        </Box>
                        </Typography>

                        {evolutionData.evolutionsOnly.length > 0 && (
                        <Typography variant="h6" component="li" gutterBottom>
                            <b>Evoluciones:</b>
                            <Box component="ul" sx={{ pl: 2 }}>
                            {evolutionData.evolutionsOnly.map((e, i) => (
                                <li key={i}>
                                {!isModified ? (
                                    <Link to={`/pokemon/${e}`} state={{ fromPokemon: true }}>
                                    {e.charAt(0).toUpperCase() + e.slice(1)}
                                    </Link>
                                ) : (
                                    <span>{e.charAt(0).toUpperCase() + e.slice(1)}</span>
                                )}
                                </li>
                            ))}
                            </Box>
                        </Typography>
                        )}

                        {evolutionData.involutionsOnly.length > 0 && (
                        <Typography variant="h6" component="li" gutterBottom>
                            <b>Involuciones:</b>
                            <Box component="ul" sx={{ pl: 2 }}>
                            {evolutionData.involutionsOnly.map((e, i) => (
                                <li key={i}>
                                {!isModified ? (
                                    <Link to={`/pokemon/${e}`} state={{ fromPokemon: true }}>
                                    {e.charAt(0).toUpperCase() + e.slice(1)}
                                    </Link>
                                ) : (
                                    <span>{e.charAt(0).toUpperCase() + e.slice(1)}</span>
                                )}
                                </li>
                            ))}
                            </Box>
                        </Typography>
                        )}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </Box>
  </PokemonLayout>
 )
}