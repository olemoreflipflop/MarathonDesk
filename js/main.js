import Pokemon from "./pokemon.js";
import generatePlayers from "./generatePlayers.js";
import { showAttacks, updatePlayersCards, $control, $logs } from "./utils.js";

function startGame () {
    const allButtons = document.querySelectorAll('.control .button');
    allButtons.forEach($item => $item.remove());
    
    let player1 = new Pokemon({
        ...generatePlayers(),
        selectors: 'player1'
    });
    
    let player2 = new Pokemon({
        ...generatePlayers(),
        selectors: 'player2'
    });

    const $startBtn = document.createElement('button');
    $startBtn.className = "button";
    $startBtn.innerHTML = "Start";
    $control.appendChild($startBtn);
  
    $startBtn.onclick = function() {
      player1 = new Pokemon({
        ...generatePlayers(),
        selectors: 'player1'
      });

      do {
          player2 = new Pokemon({
              ...generatePlayers(),
              selectors: 'player2'
          });
      } while(player1.name === player2.name);

      updatePlayersCards(player1, player2);
      showAttacks(player1,player2);
      $logs.innerText = '';
      $startBtn.style.display = "none";
    };
}
  
startGame();

export {startGame};