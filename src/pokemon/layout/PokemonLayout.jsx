import { Grid, Typography } from "@mui/material";
import backgroundHome from '../../assets/backgroundHome2.jpg'

export const PokemonLayout = ({children, title = ''}) => {

    return (
        <Grid
            container
            spacing={0}
            sx={{
                minHeight: '100vh',
                backgroundImage: `url(${backgroundHome})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                padding: 5,
                width: '100%',
                position: 'relative',
        
            }}
        >
            <Typography variant="h4" sx={{mb: 0, borderRadius: 2, textAlign: 'center'}}>
                {title}
            </Typography>
            {children}
        </Grid>
    );
};