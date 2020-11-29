import random from "./random.js";

function generateLog(firstPlayer, secondPlayer, attackDamage) {
    const {name } = firstPlayer;
    const {name: enemyName} = secondPlayer;

    const logs = [
    `${name} вспомнил что-то важное, но неожиданно ${enemyName}, не помня себя от испуга, ударил в предплечье врага. ${name} получил -${attackDamage} урона`,
    `${name} поперхнулся, и за это ${enemyName} с испугу приложил прямой удар коленом в лоб врага. ${name} получил -${attackDamage} урона`,
    `${name} забылся, но в это время наглый ${enemyName}, приняв волевое решение, неслышно подойдя сзади, ударил. ${name} получил -${attackDamage} урона`,
    `${name} пришел в себя, но неожиданно ${enemyName} случайно нанес мощнейший удар. ${name} получил -${attackDamage} урона`,
    `${name} поперхнулся, но в это время ${enemyName} нехотя раздробил кулаком \<вырезанно цензурой\> противника. ${name} получил -${attackDamage} урона`,
    `${name} удивился, а ${enemyName} пошатнувшись влепил подлый удар. ${name} получил -${attackDamage} урона`,
    `${name} высморкался, но неожиданно ${enemyName} провел дробящий удар. ${name} получил -${attackDamage} урона`,
    `${name} расстроился, как вдруг, неожиданно ${enemyName} случайно влепил стопой в живот соперника. ${name} получил -${attackDamage} урона`,
    `${name} пошатнулся, и внезапно наглый ${enemyName} беспричинно ударил в ногу противника. ${name} получил -${attackDamage} урона`,
    `${name} пытался что-то сказать, но вдруг, неожиданно ${enemyName} со скуки, разбил бровь сопернику. ${name} получил -${attackDamage} урона`
    ];

    return logs[random(0, (logs.length) - 1) ];
}

export default generateLog;