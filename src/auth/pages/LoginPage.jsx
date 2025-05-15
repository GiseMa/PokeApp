import { Alert, Button, Grid, Link, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import {Link as RouterLink} from 'react-router-dom';
import { useMemo, useState } from "react";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { beginLogin } from "../../store/auth/thunks";

const formData = {
    email: '',
    password: '',
}

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo es obligatorio y debe de tener un @'],
    password: [(value) => value.length >= 6, 'La contraseña debe de tener mas de cinco caracteres'],
}
export const LoginPage = () => {

  const {status, errorMessage} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const isAuthenticated = useMemo(() => status === 'checking', [status]);

  const {
    email, emailValid,
    password, passwordValid,
    isFormValid, onInputChange, formState, 
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if(!isFormValid) return;
    dispatch(beginLogin(formState));
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn">
        <Grid container direction='column' spacing={1.5} alignItems='center'>
          <Grid size={{xs: 10}} sx={{mt: 2}}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              error={!!emailValid && formSubmitted}
              onChange={onInputChange}
              helperText={emailValid}
            />
          </Grid>
          <Grid size={{xs: 10}} sx={{mt: 2}}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              error={!!passwordValid && formSubmitted}
              onChange={onInputChange}
              helperText={passwordValid}
              />
          </Grid>
          <Grid container spacing={2} sx={{mb: 2, mt: 1}} display={!!errorMessage ? '' : 'none'}>
            <Grid size={{xs: 12}}>
              <Alert severity="error">
                El correo y/o la contraseña son incorrectos
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
                Login
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end' size={12}>
            <Link component={RouterLink} color='inherit' to="/auth/registro">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
