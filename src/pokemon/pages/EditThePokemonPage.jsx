import { useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"
import { onSetActiveEvent, startSavingPokemon } from "../../store/pokemons";
import { PokemonEditor } from "../components";
import { PokemonLayout } from "../layout/PokemonLayout";

export const EditThePokemonPage = () => {

  const {id, ...rest} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const {pokemon, evolutionsOnly, involutionsOnly, isModified} = location.state || {}; 

  if(!pokemon || evolutionsOnly == null || involutionsOnly == null) {
    return <Navigate to={isModified ? '/modificados' : '/pokemones'}/>
  };

  const onNavigateBack = () => {
    if(location.state?.fromPokemon){
      navigate(-1);
    }else{
      navigate(isModified ? '/modificados' : '/pokemones');
    }
  };

  const onSave = (updated) => {
    dispatch(onSetActiveEvent(updated));
    dispatch(startSavingPokemon(updated));
  }

  return (
    <PokemonLayout>
      <PokemonEditor
        pokemon={pokemon}
        evolutionsOnly={evolutionsOnly}
        involutionsOnly={involutionsOnly}
        onBack={onNavigateBack}
        onSave={onSave}
      />
    </PokemonLayout>
  )
}
