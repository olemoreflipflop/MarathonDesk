import { pokemons } from "./pokemonBase.js";
import random from "./random.js";

function generatePlayers () {
    
    let i = random(0, (pokemons.length) - 1);
    let player = pokemons[i];

  return player;
}
export default generatePlayers;