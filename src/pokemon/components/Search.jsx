import {  Box, Button, TextField } from "@mui/material";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom"
import { useMemo, useState } from "react";
import { useForm } from "../../hooks/useForm";

const formValidation = {
    pokemonSearch: [(value) => (value ?? '').length >= 2, 'El nombre debe tener al menos dos caracteres'],
}

export const Search = () => {
   
  const navigate = useNavigate();
  const location = useLocation();
  const {q = ''} = queryString.parse(location.search);

  const [formSubmitted, setFormSubmitted] = useState(false);
      const initialForm = useMemo(() => ({
      pokemonSearch: q
  }), [q]);

    
  const {
    pokemonSearch, pokemonSearchValid,
    onInputChange, formState, 
    isFormValid
  } = useForm(initialForm, formValidation);

 
  const onSearchSubmit = (event) => {
      event.preventDefault();
      setFormSubmitted(true);
      if(!isFormValid) return;
      navigate(`?q=${pokemonSearch}`);
  };
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex', padding: 1, borderRadius: 2,  backgroundColor: 'rgba(2000, 255, 255, 0.8)'  }}>
      <form onSubmit={onSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 55 }}>
          <TextField
            label="Buscar un API Pokémon"
            type="text"
            size="small" 
            name="pokemonSearch"
            color="white"
            value={pokemonSearch}
            error={!!pokemonSearchValid && formSubmitted}
            onChange={onInputChange}
            helperText={formSubmitted ? pokemonSearchValid : ''}
            sx={{ width: { xs: '100%', sm: 300 } }} 
          />
        </Box>
        <Button type="submit" variant="contained" size="small" sx={{ height: 40 }} >
          Buscar
        </Button>
      </form>
    </Box>
  )
}
