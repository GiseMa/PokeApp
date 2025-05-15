import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { firebaseAuth } from "../db/config";
import { login, logout } from "../store/auth/authSlice";


export const useCheckAuth = () => {

  const {status} = useSelector(state => state.auth);
  const dispatch =  useDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async(user) => {
      if(!user) return dispatch(logout());
      const {uid, email, displayName} = user;
      dispatch(login({uid, email, displayName}));
    })
  }, [])
  
  return status;
}
