const $kick = document.getElementById('btn-kick');
const $start = document.getElementById('btn-start');
const $fatality = document.getElementById('btn-fatality');

const character = {
	name: 'Pikachu',
	defaultHP: 100,
	damageHP: 100,
	elHP: document.getElementById('health-character'),
	elProgressbar: document.getElementById('progressbar-character'),
}

const enemy = {
	name: 'Charmander',
	defaultHP: 100,
	damageHP: 100,
	elHP: document.getElementById('health-enemy'),
	elProgressbar: document.getElementById('progressbar-enemy'),
}

$kick.addEventListener('click', function() {
	changeHP(random(15), character);
	changeHP(random(15), enemy);
	if((character.damageHP > enemy.damageHP) && (enemy.damageHP <= 10)) {
		showButton($fatality);
	}
});

$fatality.addEventListener('click', function() {
	changeHP(enemy.damageHP, enemy);
});

$start.addEventListener('click', function() {
	showButton($kick);
	hideButton($start);
});

function showButton(button) {
	button.style.removeProperty('display');
}

function hideButton(button) {
	button.style.display = "none";
}

function random(num) {
 	return Math.ceil(Math.random() * num );
}

function init() {
	renderHP(character);
	renderHP(enemy);
	hideButton($kick);
	hideButton($fatality);
}

init();

function renderHP(player) {
	renderTextHP(player);
	renderProgressbar(player);
}

function renderTextHP(player) {
	player.elHP.innerText = player.damageHP + ' / ' + player.defaultHP;
}

function renderProgressbar(player) {
	player.elProgressbar.style.width = player.damageHP + '%';
}

function changeHP(attack, player) {
	if(player.damageHP > attack) {
		player.damageHP -= attack;
	}
	else {
		player.damageHP = 0;
		alert(`${player.name} lost.` );
		hideButton($kick);
		hideButton($fatality);
		showButton($start);
		renewHP(enemy);
		renewHP(character);
	}
	renderHP(player);
}

function renewHP(player) {
	player.damageHP = 100;
	renderHP(player);
}
