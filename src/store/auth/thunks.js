import { onAuthStateChanged } from "firebase/auth";
import { loginDB, logoutDB, registerUserDB } from "../../db/provider";
import { checkingCredentials, login, logout, setIsRegistering } from "./authSlice"
import { firebaseAuth } from "../../db/config";
import { resetPokemons } from "../pokemons";

export const checkingAuthentication = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
    }
};

export const createUser = ({displayName, email, password}) => {
    return async(dispatch) => {
        dispatch(setIsRegistering('registering'));
        const result = await registerUserDB({displayName, email, password});
        
        if(!result.ok) {
          dispatch(setIsRegistering('not-authenticated'));
          return dispatch(logout({errorMessage: result.errorMessage}));  
        } 
        await logoutDB();
        dispatch(logout());
    }
};

export const beginLogin = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const resp = await loginDB({email, password});

        if(!resp.ok) return dispatch(logout(resp));

        dispatch(login(resp));
    }
};

export const beginLogout = () => {
    return async(dispatch) => {
        await logoutDB();
        dispatch(logout());
        localStorage.removeItem('token');
        dispatch(resetPokemons());
    }
};

export const listenToAuthChanges = () => {
    return async(dispatch) => {
        onAuthStateChanged(firebaseAuth, async (user) => {
            if(user){
                try {
                    const {uid, displayName, email } = user;
                    const idToken = await user.getIdToken();
                    dispatch(login({uid, displayName, email}));
                    localStorage.setItem('token', idToken)
                } catch (error) {
                    console.log("Error obteniendo el ID del token", error);
                    dispatch(logout({ errorMessage: "Error al obtener el token de autenticacion" }));
                }   
            } else {
                dispatch(logout());
                localStorage.removeItem('token');
            }
        })
    }
};

