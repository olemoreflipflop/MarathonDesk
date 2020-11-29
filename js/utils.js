import random from "./random.js";
import generateLog from "./generateLog.js";

/*queries for elements*/
const $control = document.querySelector('.control');
const $logs = document.querySelector('#logs');

function showLog (firstPlayer, secondPlayer, attackDamage) {
    const $p = document.createElement('p');
    $p.innerText = generateLog(secondPlayer, firstPlayer, attackDamage);
    $logs.insertBefore($p, $logs.children[0]);
}

function showAttacks (player, enemy) {
    player.attacks.forEach(item => {
        const $btn = document.createElement('button');
        $btn.className = "button";
        $btn.innerHTML = item.name;
        const btnCount = createButtonWithCounter(item.maxCount, item.maxCount, $btn);
        $control.appendChild($btn);

        $btn.addEventListener('click', () => {
        btnCount(); 

        enemy.changeHP(random(item.minDamage, item.maxDamage), function(attack) {
        showLog(player, enemy, attack);
        });

        // some random damage from player2 (strike back)
        player.changeHP(random(enemy.attacks[0].minDamage, enemy.attacks[0].maxDamage ), function(attack) {
            showLog(enemy, player, attack);
            });
        });
    });
}

function updatePlayersCards(player1, player2) {
    const $player1Img = document.getElementById('img-player1');
    const $player2Img = document.getElementById('img-player2');
    const $player1Name = document.getElementById('name-player1');
    const $player2Name = document.getElementById('name-player2');
    $player1Img.src = player1.img;
    $player1Name.innerText = player1.name;
    $player2Img.src = player2.img;
    $player2Name.innerText = player2.name;
}

function $getElById(id) {
    return document.getElementById(id);
}

function createButtonWithCounter(counter, maxCounter, button) {
    counter = maxCounter;
    const innerText = button.innerText;
    button.innerText = `${innerText} (${counter} / ${maxCounter})`;
  
    return function () {
        counter--;
        if(counter == 0){
            button.disabled = true;     
        }
            button.innerText = `${innerText} ${counter} / ${maxCounter}`;
    }
}

export { showAttacks, updatePlayersCards, $control, $logs };