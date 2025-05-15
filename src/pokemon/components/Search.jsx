import {  Box, Button, TextField } from "@mui/material";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom"
import { useMemo } from "react";
import { useForm } from "../../hooks/useForm";

export const Search = () => {
   
    const navigate = useNavigate();
    const location = useLocation();
    const {q = ''} = queryString.parse(location.search);

    const initialForm = useMemo(() => ({
        searchText: q
    }), [q]);

    const {searchText, onInputChange} = useForm(initialForm);

    const onSearchSubmit = (event) => {
        event.preventDefault();
        if(searchText.trim().length <= 1) return;
        navigate(`?q=${searchText}`);
    };
    
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: 1, borderRadius: 2,  backgroundColor: 'rgba(2000, 255, 255, 0.8)'  }}>
      <form onSubmit={onSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <TextField
          type="text"
          size="small"
          label="Buscar un API Pokémon"
          name="searchText"
          color="white"
          value={searchText}
          onChange={onInputChange}
        />
        <Button type="submit" variant="contained" size="small" >
          Buscar
        </Button>
      </form>
    </Box>
  )
}
