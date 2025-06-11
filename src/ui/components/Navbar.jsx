import { useDispatch } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom";
import { beginLogout } from "../../store/auth/thunks";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onLogout = () => {
      dispatch(beginLogout());
      navigate('/auth/login', {
          replace: true,
      });
  };

  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{justifyContent: "space-between", alignItems: "center"}}>
          <Box sx={{display: "flex", alignItems: "center", gap: 5}}>
            <Typography variant="h5">PokeApp</Typography>
            <NavLink
                className={({isActive}) =>`nav-item nav-link ${isActive ? 'active' : ''}`}
                to="/"
              > 
                Pokemones
            </NavLink>
              <NavLink 
                className={({isActive}) =>`nav-item nav-link ${isActive ? 'active' : ''}`}
                to="/modificados"
              > 
                Pokemones Modificados
              </NavLink>
          </Box>
            <Button color="inherit" onClick={onLogout}>Salir</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
