console.log("Hello");


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}






class Aufgabe {


	_initPlus() {
		this.func = "+";
		this.first = getRandomInt(0, this.maxNumber);
		do {
			this.second = getRandomInt(0, this.maxNumber);
			this.result = this.first + this.second;
		} while (this.result > this.maxNumber);
	}


	_initMinus() {
		this.func = "-";
		this.first = getRandomInt(0, this.maxNumber);
		do {
			this.second = getRandomInt(0, this.maxNumber);
			this.result = this.first - this.second;
		} while (this.result < 0);
	}



	constructor(type, maxNumber) {
		this.maxNumber = maxNumber;
		switch (type) {
			case "plus-first":
				this._initPlus();
				this.first = null;
				break;
			case "plus-second":
				this._initPlus();
				this.second = null;
				break;
			case "plus-result":
				this._initPlus();
				this.result = null;
				break;
			case "minus-first":
				this._initMinus();
				this.first = null;
				break;
			case "minus-second":
				this._initMinus();
				this.second = null;
				break;
			case "minus-result":
				this._initMinus();
				this.result = null;
				break;
		}
	}
}







class Context {


	initMaxNumber() {
		this._maxNumber = document.getElementById("zahlenbereich");
		this._maxNumber.addEventListener("change", () => {
			this.generateNext();
		});
	}
	getMaxNumber() {
		return parseInt(this._maxNumber.options[this._maxNumber.selectedIndex].value);
	}



	initAufgabenType() {
		this._aufgabenType = document.getElementById("aufgabentype");
		this._aufgabenType.addEventListener("change", () => {
			this.generateNext();
		});
	}
	getAufgabenType() {
		return this._aufgabenType.options[this._aufgabenType.selectedIndex].value;
	}







	initFirstValue() {
		this._firstValue = document.getElementById("first");
		this._firstValue.addEventListener("change", () => {
			this.updateActionButton();
		});
		this._firstValue.addEventListener("keyup", () => {
			this.updateActionButton();
		});

	}
	getFirstValue() {
		return parseInt(this._firstValue.value);
	}
	setFirstValue(n) {
		this._firstValue.value = n;
	}



	initSecondValue() {
		this._secondValue = document.getElementById("second");
		this._secondValue.addEventListener("change", () => {
			this.updateActionButton();
		});
		this._secondValue.addEventListener("keyup", () => {
			this.updateActionButton();
		});
	}
	getSecondValue() {
		return parseInt(this._secondValue.value);
	}
	setSecondValue(n) {
		this._secondValue.value = n;
	}




	initResult() {
		this._result = document.getElementById("result");
		this._result.addEventListener("change", () => {
			this.updateActionButton();
		});
		this._result.addEventListener("keyup", () => {
			this.updateActionButton();
		});
	}
	getResult() {
		return parseInt(this._result.value);
	}
	setResult(n) {
		this._result.value = n;
	}



	initOperator() {
		this._operator = document.getElementById("op");
	}
	getOperator() {
		return this._operator.innerText;
	}
	setOperator(n) {
		this._operator.innerText = n;
	}




	initPopup() {
		this._popup = document.getElementById("popup");
	}
	showPopup(text, isCorrect, time, after) {
		this._showingPopup = true;
		this.enableElement(this._actionButton, false);

		if (isCorrect)
			this._popup.classList.remove("wrong");
		else
			this._popup.classList.add("wrong");

		this._popup.innerText = text;
		this._popup.classList.add("visible");
		window.setTimeout(() => {
			this._popup.classList.remove("visible");
			this.enableElement(this._actionButton, true);
			this._showingPopup = false;
			if (after)
				after();
		}, time);
	}



	initActionButton() {
		this._actionButton = document.getElementById("action");
		this._actionButton.addEventListener("click", () => {
			this.evaluateExpression();
		});
	}
	enableElement(element, enable) {
		if (enable)
			element.removeAttribute("disabled");
		else
			element.setAttribute("disabled", "true");
	}
	updateActionButton() {
		if (isNaN(this.getFirstValue()) || isNaN(this.getSecondValue()) || isNaN(this.getResult()))
			this.enableElement(this._actionButton, false);
		else if (!this._showingPopup)
			this.enableElement(this._actionButton, true);
	}





	evaluateExpression() {
		const v1 = this.getFirstValue();
		const v2 = this.getSecondValue();
		const r = this.getResult();
		const op = this.getOperator();

		let func;

		if (op === "+") {
			func = (_v1, _v2, _r) => {
				return _v1 + _v2 === _r;
			};
		}
		else if (op === "-") {
			func = (_v1, _v2, _r) => {
				return _v1 - _v2 === _r;
			};
		}


		if (func(v1, v2, r)) {
			this.showPopup("Richtig!", true, 500, () => {
				this.generateNext();
			});
		}
		else {
			this.showPopup("Nicht richtig!", false, 1000, () => {
				this._inputField.value = null;
				this.updateActionButton();
			});
		}
	}




	constructor() {

		this.initPopup();
		this.initOperator();

		this.initFirstValue();
		this.initSecondValue();
		this.initResult();

		this.initMaxNumber();
		this.initAufgabenType();
		this.initActionButton();

		this.updateActionButton();
		this.generateNext();
	}


	

	_setAufgabe(aufgabe) {
		this.setFirstValue(aufgabe.first);
		this.setSecondValue(aufgabe.second);
		this.setResult(aufgabe.result);
		this.setOperator(aufgabe.func);
	}


	generateNext() {
		const aufgabeType = this.getAufgabenType();

		switch (aufgabeType) {
		case "plus":
			this._setAufgabe(new Aufgabe("plus-result", this.getMaxNumber()));
			this._inputField = this._result;
			break;
		case "minus":
			this._setAufgabe(new Aufgabe("minus-result", this.getMaxNumber()));
			this._inputField = this._result;
				break;
		case "umkehr-plus":
			//const v = getRandomInt(0, 1);
			switch (getRandomInt(0, 1)) {
			case 0:
				this._setAufgabe(new Aufgabe("plus-first", this.getMaxNumber()));
				this._inputField = this._firstValue;
				break;
			case 1:
				this._setAufgabe(new Aufgabe("plus-second", this.getMaxNumber()));
				this._inputField = this._secondValue;
				break;
			}
			break;
		case "umkehr-minus":
			//const v = getRandomInt(0, 1);
			switch (getRandomInt(0, 1)) {
			case 0:
				this._setAufgabe(new Aufgabe("minus-first", this.getMaxNumber()));
				this._inputField = this._firstValue;
				break;
			case 1:
				this._setAufgabe(new Aufgabe("minus-second", this.getMaxNumber()));
				this._inputField = this._secondValue;
				break;
			}
			break;
		case "umkehr":
			//const v = getRandomInt(0, 3);
			switch (getRandomInt(0, 3)) {
			case 0:
				this._setAufgabe(new Aufgabe("plus-first", this.getMaxNumber()));
				this._inputField = this._firstValue;
				break;
			case 1:
				this._setAufgabe(new Aufgabe("plus-second", this.getMaxNumber()));
				this._inputField = this._secondValue;
				break;
			case 2:
				this._setAufgabe(new Aufgabe("minus-first", this.getMaxNumber()));
				this._inputField = this._firstValue;
				break;
			case 3:
				this._setAufgabe(new Aufgabe("minus-second", this.getMaxNumber()));
				this._inputField = this._secondValue;
				break;
			}
			break;
		}

		this._inputField.focus();
		this.updateActionButton();
	}
}




const context = new Context();