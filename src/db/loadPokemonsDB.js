import { collection, doc, getDocs } from "firebase/firestore/lite";
import { firebaseDB } from "./config";

export const loadPokemonsDB = async(uid = '') => {

    const userDocRef = doc(firebaseDB, 'usuarios', uid);
    const collectionRef = collection(userDocRef, 'pokemons');

    const snapshot = await getDocs(collectionRef);

    const pokemons = [];
    snapshot.docs.forEach(doc => {
        pokemons.push({id: doc.id, ...doc.data()})
    });
    return pokemons;
};