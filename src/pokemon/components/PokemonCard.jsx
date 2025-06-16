import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"

export const PokemonCard = ({id, name, isModified, sprite, ...rest}) => {

    const navigate = useNavigate();
    const nameUpperCase = name.charAt(0).toUpperCase() + name.slice(1);

    const handleNavigate = () => {
        const path = isModified ? `/modificado/${id}` : `/pokemon/${id}`;

        navigate(path, {
            state: {
                pokemon: {id, name, sprite, ...rest},
                evolutionsOnly: rest.evolutions || [],
                involutionsOnly: rest.involutions || [],
                fromPokemon: true,
                isModified: isModified,
                fromSearch: location.search.includes('q=')
            }
        })
        if (location.search.includes('q=')) {
            navigate('/pokemones', { replace: true });
        }
    }

  return (
    <Card
        onClick={handleNavigate}
        sx={{width: 180,
             height: 250,
             display: "flex",
             flexDirection: "column",
             justifyContent: "space-between",
             ":hover": {backgroundColor: '#fda3a3'},
             padding: 2,
        }}
        >
        <Grid container>
            <CardContent size={{sm: 6, md: 6, lg: 3}} sx={{mt: 2, display: "flex", flexDirection: "column", alignItems: "center"}}>
                <img src={sprite} alt={name} className="card-img" style={{width: "100px", height: "100px", objectFit: "contain"}} />
                <Typography variant="h6" align="center">{nameUpperCase}</Typography>
                <Typography align="center">#{id}</Typography>
            </CardContent>
        </Grid>
    </Card>
  )
}
