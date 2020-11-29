import Pokemon from "./pokemon.js";
import generateLog from "./generateLog.js";
import random from "./random.js";

/*buttons on control field*/
const $kick = $getElById('btn-kick');
const $punch = $getElById('btn-punch');
const $start = $getElById('btn-start');

/* Damage from players*/
let characterDamage = 0;
let enemyDamage = 0;

const $logs = document.querySelector('#logs');

/*Default values of button's counters and const part of their names*/
const maxPunchClicks = 5;
const maxKickClicks = 20;
const kickButtonInner = $kick.innerText;
const punchButtonInner = $punch.innerText;
let changePunchInner = createButtonWithCounter(maxPunchClicks, maxPunchClicks);
let changeKickInner = createButtonWithCounter(maxKickClicks, maxKickClicks);
changeKickInner($kick, kickButtonInner);
changePunchInner($punch, punchButtonInner);


const player1 = new Pokemon({
    name: 'Pikachu',
    hp: 150,
    type: 'electric',
    selectors: 'character',
})

const player2 = new Pokemon({
    name: 'Charmander',
    type: 'fire',
    hp: 142,
    selectors: 'enemy',
})

console.log(player1);

function $getElById(id) {
    return document.getElementById(id);
}

$kick.addEventListener('click', function() {
    characterDamage = random(0, 10);
    enemyDamage = random(0, 10);

    console.log('Kick');
    changeKickInner(this, kickButtonInner);

    player1.changeHP(enemyDamage, function(attack) {
        showLog(player2, player1, attack);
    });
    player2.changeHP(characterDamage, function(attack) {
        showLog(player1, player2, attack);
    });

});

$punch.addEventListener('click', function() {
    characterDamage = random(5, 20);
    enemyDamage = random(5, 20);

    console.log('Punch');
    changePunchInner(this, punchButtonInner);

    player1.changeHP(enemyDamage, function(attack) {
        showLog(player2, player1, attack);
    });

    player2.changeHP(characterDamage, function(attack) {
        showLog(player1, player2, attack);
    });

});

$start.addEventListener('click', function() {
    showButton($kick);
    changeKickInner($kick, kickButtonInner);
    showButton($punch);
    changePunchInner($punch, punchButtonInner);
    hideButton($start);
    player1.renewHP();
    player2.renewHP();
    $logs.innerHTML = '';
    renewClickLimits();
});

function createButtonWithCounter(counter, maxCounter) {
    return function(btn, constInner) {
        if(counter == 0){
            btn.disabled = true;     
        }
            btn.innerText = `${constInner} ${counter--} / ${maxCounter}`;
    }
}

function showButton(button) {
    button.style.removeProperty('display');
}

function hideButton(button) {
    button.style.display = "none";
}

function renewClickLimits() {
    $punch.disabled = false;
    changePunchInner = createButtonWithCounter(maxPunchClicks, maxPunchClicks);
    changePunchInner($punch, punchButtonInner);
    $kick.disabled = false;
    changeKickInner = createButtonWithCounter(maxKickClicks, maxKickClicks);
    changeKickInner($kick, kickButtonInner);
}

function showLog (firstPlayer, secondPlayer, attackDamage) {
    const $p = document.createElement('p');
    $p.innerText = generateLog(secondPlayer, firstPlayer, attackDamage);
    $logs.insertBefore($p, $logs.children[0]);
}

function init() {
    hideButton($kick);
    hideButton($punch);
}

init();