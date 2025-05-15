import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { firebaseAuth } from "./config"


export const registerUserDB = async({displayName, email, password}) => {

    try{
        const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const {uid} = resp.user;

        await updateProfile(firebaseAuth.currentUser, {displayName});

        return {
            ok: true,
            uid, email, displayName
        }

    }catch(error) {
        console.log(error.code, error.message);
        let msg = error.message;
        if(error.code === 'auth/email-already-in-use'){
            msg = 'El correo ya esta registrado'
        }
        return {
            ok: false,
            errorMessage: msg
        }
    }
};

export const loginDB = async ({email, password}) => {

    try{
        const resp = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const {uid, displayName} = resp.user;

        await updateProfile(firebaseAuth.currentUser, {displayName});

        return {
            ok: true,
            uid, email, displayName
        }

    }catch(error) {
        console.log(error.code, error.message);
        return {
            ok: false,
            errorMessage: error.message
        }
    }
};

export const logoutDB = async () => {
    return await firebaseAuth.signOut();
};