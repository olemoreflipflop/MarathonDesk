class Selectors {
	constructor(name) {
	  this.elHP = document.getElementById(`health-${name}`);
	  this.elProgressbar = document.getElementById(`progressbar-${name}`);
	}
  }

class Pokemon extends Selectors {
constructor({ name, hp, type, selectors }) {
	super(selectors);

	this.name = name;
	this.type = type;
	this.hp = {
		current: hp,
		total: hp,
	}
	
	this.renderHP(); 
}

changeHP = (attack, cb) => {
	this.hp.current -= attack;    
	
	if(this.hp.current <= 0) {
		this.hp.current = 0;
		alert(`${this.name} проиграл.` );
	}

	this.renderHP();
	cb && cb(attack);
}

renewHP = () => {
	this.hp.current = this.hp.total;
	this.renderHP();
}

renderHP = () => {
	this.renderTextHP();
	this.renderProgressbar();
}

renderTextHP = () => {
	const { elHP, hp: { current, total } } = this;
	elHP.innerText = current + ' / ' + total;
}

renderProgressbar = () => {
	const { hp: { current, total }, elProgressbar } = this;
	const healthPercent = current / (total / 100);
	elProgressbar.style.width = healthPercent + '%';
}

}

export default Pokemon;