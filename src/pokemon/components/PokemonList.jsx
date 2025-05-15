import { Alert, Grid, Pagination, Stack } from "@mui/material";
import { PokemonCard } from "./PokemonCard";

export const PokemonList = ({
  pokemons,
  isModified,
  page,
  totalPages,
  onChangePage,
  emptyMessage = "",
}) => {
    
  const handleChange = (event, value) => {
    if (value !== page) {
      onChangePage(event, value); 
    }
  };

  return (
    <Stack
      direction="column"
      sx={{ justifyContent: "center", alignItems: "center",  width: '100%', padding: 2}}
    >
      {
        pokemons.length === 0 && (
        <Alert severity="error" sx={{ top: '30%', left: '40%', position: "absolute", padding: 7 }}>
          {emptyMessage}
        </Alert>
        )
      }
      {
        pokemons.length > 0 && (
          <Grid container spacing={4}>
            {pokemons.map((p) => (
              <Grid
                key={p.id}
                grid={{ xs: 12, sm: 6, md: 4, lg: 2 }}
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <PokemonCard {...p} isModified={isModified} />
              </Grid>
            ))}
         </Grid>
      )}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        sx={{ mt: 8 }}
      />
    </Stack>
  );
};