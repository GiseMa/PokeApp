import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { PokemonLayout } from "../layout/PokemonLayout";
import { useForm } from "../../hooks/useForm";

const formValidations = {
    name: [(value) => value.length > 0, 'El nombre es obligatorio'],
    height: [(value) => !isNaN(value) && value > 0, 'La altura debe ser un numero positivo'],
    abilities: [(value) => value.length > 0, 'Debe tener al menos una habilidad'],
    types: [(value) => value.length > 0, 'Debe tener al menos un tipo']
};

export const PokemonEditor = ({pokemon, evolutionsOnly = [], involutionsOnly = [], onSave,  onBack}) => {
 
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [confirmationForm, setConfirmationForm] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const {messageSaved} = useSelector(state => state.pokemons);

  const initialForm = useMemo(() => ({
    name: pokemon.name,
    height: pokemon.height,
    abilities: pokemon.abilities.map(a => (typeof a === 'string' ? a : a.ability?.name)).join(','),
    types: pokemon.types.map(t => (typeof t === 'string' ? t : t.type?.name)).join(','),
    evolutions: evolutionsOnly?.join(',') || '',
    involutions: involutionsOnly?.join(',') || '',
  }),  [pokemon]);

  const {
    name, nameValid,
    height, heightValid,
    abilities, abilitiesValid,
    types, typesValid,
    evolutions, involutions,
    onInputChange, formState, isFormValid,
  } = useForm(initialForm, formValidations);

  useEffect(() => {
    if(messageSaved) setOpenSnackBar(true);
  }, [messageSaved, setOpenSnackBar]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!isFormValid) return;
    setConfirmationForm(true);
  };

  const handleConfirmSave = () => {
    setConfirmationForm(false);
    setFormSubmitted(true);
    console.log('Guardando cambios', formState);

    const updatedPokemon = {
      ...pokemon,
      name, 
      height,
      abilities: abilities.split(',').map(a => a.trim()), 
      types: types.split(',').map(t => t.trim()), 
      evolutions: evolutions.split(',').map(e => e.trim()), 
      involutions: involutions.split(',').map(i => i.trim()), 
    }
    onSave(updatedPokemon);
  };

  const handleCancelSave = () => {
    setConfirmationForm(false);
  };

  const handleCloseSnackbar = ( reason) => {
    if(reason === 'clickaway') return;
    setOpenSnackBar(false);
  };

  return (
    <PokemonLayout>
      <Box mt={1} sx={{ width: '100%' }}> 
        <Grid container spacing={2} alignItems="flex-start">
          <Grid grid={{xs: 12, md: 4}} sx={{ mx: 'auto', my: 2 }} display="flex" flexDirection="column" alignItems="flex-start">
            <img src={pokemon.photo} alt={pokemon.name} 
                className="img-thumbail animate__animated animate__zoomInDown"
                style={{width: '100%'}}
            />
            <Button variant="contained" color="info" onClick={onBack} size="small">
              Regresar
            </Button>
          </Grid>
          <Grid size={{xs: 12, md: 5}}>
            <Typography variant="h3">Editar Pokemon</Typography>
              <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2, padding: 2 }}>
                <form onSubmit={handleSubmit}>
                  {[
                    {label: 'Nombre', name: 'name', value: name, valid: nameValid},
                    {label: 'Altura', name: 'height', value: height, valid: heightValid},
                    {label: 'Habilidades', name: 'abilities', value: abilities, valid: abilitiesValid},
                    {label: 'Tipos', name: 'types', value: types, valid: typesValid},
                    {label: 'Evoluciones', name: 'evolutions', value: evolutions},
                    {label: 'Involuciones', name: 'involutions', value: involutions},
                  ].map(({label, name, value, valid}) => (
                    <Box mb={2} key={name}>
                      <TextField
                        label={label} 
                        type="text" 
                        fullWidth
                        name={name}
                        value={value}
                        onChange={onInputChange}
                        error={!!valid && formSubmitted}
                        helperText={valid}
                    />
                    </Box>
                  ))}
                  <Button type='submit' variant="contained" color="primary" className='mt-2'>
                    Guardar Cambios
                  </Button>
                </form>
              </Box>
              <Dialog
                open={confirmationForm}
                onClose={handleCancelSave}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{"¿Estás seguro de guardar los cambios?"}</DialogTitle> 
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">Los cambios se podran visualizar en la pagina de Pokemones Modificados</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCancelSave} color="primary">Cancelar</Button>
                  <Button onClick={handleConfirmSave} color="primary">Guardar</Button>
                </DialogActions> 
              </Dialog>
              <Snackbar
                open={openSnackBar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{widht: "100%"}}>
                  ¡Cambios guardados correctamente!
                </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Box>    
    </PokemonLayout>
  )
}
