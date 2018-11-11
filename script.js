console.log("Hello");


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
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
			this.showPopup("Nicht richtig!", false, 800, () => {
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





	generatePlus(maxNumber) {
		console.log("Neue Plusaufgabe: ", maxNumber);


		const first = getRandomInt(0, maxNumber);
		console.log(first);
		let second = 0;
		do {
			second = getRandomInt(0, maxNumber);
		} while (first + second > maxNumber);



		this.setFirstValue(first);
		this.setSecondValue(second);
		this.setOperator("+");
		this.setResult(null);


		this.enableElement(this._firstValue, false);
		this.enableElement(this._secondValue, false);
		this.enableElement(this._result, true);
		this._inputField = this._result;
	}


	generateMinus(maxNumber) {
		console.log("Neue Minusaufgabe: ", maxNumber);

		


		const first = getRandomInt(0, maxNumber);
		console.log(first);
		let second = 0;
		do {
			second = getRandomInt(0, maxNumber);
		} while (first - second < 0);



		this.setFirstValue(first);
		this.setSecondValue(second);
		this.setOperator("-");
		this.setResult(null);


		this.enableElement(this._firstValue, false);
		this.enableElement(this._secondValue, false);
		this.enableElement(this._result, true);
		this._inputField = this._result;


	}
	generateUmkehr(maxNumber) {
		console.log("Neue Umkehraufgabe: ", maxNumber);

		const firstUnknown = getRandomInt(0, 1);
		const plusAufgabe = getRandomInt(0, 1);

		let res = null;
		let first = null;
		let second = null;


		if (firstUnknown === 1) {
			this.enableElement(this._firstValue, true);
			this._inputField = this._firstValue;
			this.enableElement(this._secondValue, false);
			this.enableElement(this._result, false);
			if (plusAufgabe === 1) {
				this.setOperator("+");
				res = getRandomInt(0, maxNumber);
				do {
					second = getRandomInt(0, maxNumber);
				} while (res - second < 0);

			}
			else {
				this.setOperator("-");
				first = getRandomInt(0, maxNumber);
				do {
					second = getRandomInt(0, maxNumber);
					res = first - second;
				} while (res < 0);
				first = null;
			}
		}
		else {
			this.enableElement(this._firstValue, false);
			this.enableElement(this._secondValue, true);
			this._inputField = this._secondValue;
			this.enableElement(this._result, false);
			if (plusAufgabe === 1) {
				this.setOperator("+");
				res = getRandomInt(0, maxNumber);
				do {
					first = getRandomInt(0, maxNumber);
				} while (res - first < 0);
			}
			else {
				this.setOperator("-");
				first = getRandomInt(0, maxNumber);
				do {
					res = getRandomInt(0, maxNumber);
				} while (first - res < 0);
			}
		}

		this.setFirstValue(first);
		this.setSecondValue(second);
		this.setResult(res);
	}


	generateNext() {
		const aufgabeType = this.getAufgabenType();
		const maxNumber = this.getMaxNumber();


		switch (aufgabeType) {
			case "plus":
				this.generatePlus(maxNumber);
				break;
			case "minus":
				this.generateMinus(maxNumber);
				break;
			case "umkehr":
				this.generateUmkehr(maxNumber);
				break;
		}

		this._inputField.focus();
		this.updateActionButton();
	}
}




const context = new Context();