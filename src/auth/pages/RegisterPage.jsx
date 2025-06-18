import { Alert, Box, Button, CircularProgress, Grid, Link, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import { useEffect, useMemo, useState } from "react";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { createUser } from "../../store/auth/thunks";
import { clearErrorMessage } from "../../store/auth/authSlice";

const formData = {
    displayName: '',
    email: '',
    password: '',
}

const formValidations = {
    displayName: [(value) => value.length >= 3, 'El nombre debe de tener al menos tres caracteres'],
    email: [(value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value), 'El correo debe incluir el @ y su dominio'],
    password: [(value) => value.length >= 6, 'La contraseña debe de tener seis o mas caracteres'],
}

export const RegisterPage = () => {

  const {status, errorMessage} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const isAuthenticated = useMemo(() => status === 'checking', [status]);

  const {
    displayName, displayNameValid,
    email, emailValid,
    password, passwordValid,
    isFormValid, onInputChange, formState,
  } = useForm(formData, formValidations);

  useEffect(() => {
  if (formSubmitted && status === 'not-authenticated') return;
  if (formSubmitted && status === "registering") {
    console.log("Primero ", status)
      navigate('/auth/login');
      console.log("Segundo ", status)
    }
  }, [status, formSubmitted, navigate]);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if(!isFormValid) return;
    dispatch(clearErrorMessage());
    console.log("Tercero  ", status)
    dispatch(createUser(formState));
    console.log("Cuarto ", status)
  };


  if ( status === 'registering'  ) {
    return (
      <AuthLayout title="Cargando...">
        <Box  display="flex" justifyContent="center" alignItems="center" sx={{ height: "60vh", width: "100%" }}>
          <CircularProgress size={80}/>
        </Box>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Registro">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn">
        <Grid container direction='column' spacing={1} alignItems='center'>
        <Grid size={{xs: 10}} sx={{mt: 3.5}}>
            <TextField
              label="Nombre completo"
              type="displayName"
              placeholder="Nombre completo"
              fullWidth
              name="displayName"
              value={displayName}
              error={!!displayNameValid && formSubmitted}
              onChange={onInputChange}
              helperText={formSubmitted ? displayNameValid : ''}
            />
          </Grid>
          <Grid size={{xs: 10}} sx={{mt: 1}}>
            <TextField
              label="Correo"
              type="text"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              error={!!emailValid && formSubmitted}
              onChange={onInputChange}
              helperText={formSubmitted ? emailValid : ''}
            />
          </Grid>
          <Grid size={{xs: 10}} sx={{mt: 1}}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              error={!!passwordValid && formSubmitted}
              onChange={onInputChange}
              helperText={formSubmitted ? passwordValid : ''}
              />
          </Grid>
          <Grid container spacing={2} sx={{mb: 2, mt: 1}} display={!!errorMessage ? '' : 'none'}>
            <Grid size={{xs: 12}}>
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{mb: 2, mt:1, display: "flex", justifyContent: "space-between" }}>
            <Grid size={{xs: 12, sm: 5}}>
              <Button 
                variant="contained"
                fullWidth
                sx={{py:1.5, minWidth: '200px', display: "flex", alignItems: "center", justifyContent: "center"}}
                type="submit"
                disabled={isAuthenticated}
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end' size={12}>
            <Typography sx={{mr: 1}}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
              ¡Logueate!
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
