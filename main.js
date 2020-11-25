/*buttons on control field*/
const $kick = $getElById('btn-kick');
const $punch = $getElById('btn-punch');
const $start = $getElById('btn-start');
const $fatality = $getElById('btn-fatality');

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


const character = {
    name: 'Pikachu',
    defaultHP: 150,
    damageHP: 150,
    elHP: $getElById('health-character'),
    elProgressbar: $getElById('progressbar-character'),
    changeHP,
    renewHP,
    renderHP,
    renderTextHP,
    renderProgressbar,
    showLog,
}

const enemy = {
    name: 'Charmander',
    defaultHP: 150,
    damageHP: 150,
    elHP: $getElById('health-enemy'),
    elProgressbar: $getElById('progressbar-enemy'),
    changeHP,
    renewHP,
    renderHP,
    renderTextHP,
    renderProgressbar,
    finalAttack,
    showLog,
}

function $getElById(id) {
    return document.getElementById(id);
}

$kick.addEventListener('click', function() {
    console.log('Kick');
    changeKickInner(this, kickButtonInner);
    characterDamage = random(15);
    enemyDamage = random(15);
    character.changeHP(enemyDamage);
    enemy.changeHP(characterDamage);
    if((character.damageHP > enemy.damageHP) && (enemy.damageHP <= 10 && enemy.damageHP > 0)) {
        showButton($fatality);
    }
});

$punch.addEventListener('click', function() {
    console.log('Punch');
    changePunchInner(this, punchButtonInner);
    characterDamage = random(25);
    enemyDamage = random(25);
    character.changeHP(enemyDamage);
    enemy.changeHP(characterDamage);
    if((character.damageHP > enemy.damageHP) && (enemy.damageHP <= 10 && enemy.damageHP > 0)) {
        showButton($fatality);
    }
});

$fatality.addEventListener('click', function() {
    enemy.finalAttack();
});

$start.addEventListener('click', function() {
    showButton($kick);
    changeKickInner($kick, kickButtonInner);
    showButton($punch);
    changePunchInner($punch, punchButtonInner);
    hideButton($start);
    enemy.renewHP();
    character.renewHP();
    $logs.innerHTML = '';
    renewClickLimits();
});

function createButtonWithCounter(counter, maxCounter) {
    return function(btn, constInner) {
        if(counter == 0){
            btn.innerText = `${constInner} ${counter--} / ${maxCounter}`;
            btn.disabled = true;     
        }
        else {
            btn.innerText = `${constInner} ${counter--} / ${maxCounter}`;
        }
    }
}

function showButton(button) {
    button.style.removeProperty('display');
}

function renewClickLimits() {
    $punch.disabled = false;
    changePunchInner = createButtonWithCounter(maxPunchClicks, maxPunchClicks);
    changePunchInner($punch, punchButtonInner);
    $kick.disabled = false;
    changeKickInner = createButtonWithCounter(maxKickClicks, maxKickClicks);
    changeKickInner($kick, kickButtonInner);
}

function hideButton(button) {
    button.style.display = "none";
}

function random(num) {
     return Math.ceil(Math.random() * num );
}

function renewHP() {
    this.damageHP = this.defaultHP;
    this.renderHP();
}

function renderHP() {
    this.renderTextHP();
    this.renderProgressbar();
}

function renderTextHP() {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
}

function renderProgressbar() {
    const health = Math.ceil((this.damageHP * 100) / this.defaultHP);
    this.elProgressbar.style.width = health + '%';
}

function finalAttack() {
    this.changeHP(this.damageHP);
}

function changeHP(attack, player) {
    this.damageHP -= attack;    
    
    if(this.damageHP <= 0) {
        this.damageHP = 0;
        alert(`${this.name} проиграл.` );
        hideButton($kick);
        hideButton($fatality);
        hideButton($punch);
        showButton($start);
    }

    this.renderHP();
    this.showLog();
}

function generateLog(firstPlayer, secondPlayer, attackDamage) {
    const {name, elHP } = firstPlayer;
    const {name: enemyName} = secondPlayer;

    const logs = [
    `${name} вспомнил что-то важное, но неожиданно ${enemyName}, не помня себя от испуга, ударил в предплечье врага. ${name} получил -${attackDamage} урона, [${elHP.innerText}]`,
    `${name} поперхнулся, и за это ${enemyName} с испугу приложил прямой удар коленом в лоб врага. ${name} получил -${attackDamage} урона, [${elHP.innerText}]`,
    `${name} забылся, но в это время наглый ${enemyName}, приняв волевое решение, неслышно подойдя сзади, ударил. ${name} получил -${attackDamage} урона, [${elHP.innerText}]`,
    `${name} пришел в себя, но неожиданно ${enemyName} случайно нанес мощнейший удар. ${name} получил -${attackDamage} урона, [${elHP.innerText}]`,
    `${name} поперхнулся, но в это время ${enemyName} нехотя раздробил кулаком \<вырезанно цензурой\> противника. ${name} получил -${attackDamage} урона, [${elHP.innerText}]`,
    `${name} удивился, а ${enemyName} пошатнувшись влепил подлый удар. ${name} получил -${attackDamage} урона, [${elHP.innerText}]`,
    `${name} высморкался, но неожиданно ${enemyName} провел дробящий удар. ${name} получил -${attackDamage} урона, [${elHP.innerText}]`,
    `${name} расстроился, как вдруг, неожиданно ${enemyName} случайно влепил стопой в живот соперника. ${name} получил -${attackDamage} урона, [${elHP.innerText}]`,
    `${name} пошатнулся, и внезапно наглый ${enemyName} беспричинно ударил в ногу противника. ${name} получил -${attackDamage} урона, [${elHP.innerText}]`,
    `${name} пытался что-то сказать, но вдруг, неожиданно ${enemyName} со скуки, разбил бровь сопернику. ${name} получил -${attackDamage} урона, [${elHP.innerText}]`
    ];

    return logs[random(logs.length) - 1];
}

function showLog (firstPlayer, secondPlayer, attackDamage) {
  const log = this === enemy ? generateLog(this, character, characterDamage) : generateLog(this, enemy, enemyDamage);
  const $p = document.createElement('p');

  $p.innerText = log;
  $logs.insertBefore($p, $logs.children[0]);
}

function init() {
    character.renderHP();
    enemy.renderHP(); 
    hideButton($kick);
    hideButton($punch);
    hideButton($fatality);
}

init();
