export class Task {
}


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Aufgabe {
	func: string;
	first: number | null;
	second: number | null;
	result: number | null;

	_initPlus() {
		this.func = '+';
		this.result = getRandomInt(0, this.maxNumber);
		this.first = getRandomInt(0, this.result);
		this.second = this.result - this.first;
	}

	_initMinus() {
		this.func = '-';
		this.first = getRandomInt(0, this.maxNumber);
		this.result = getRandomInt(0, this.first);
		this.second = this.first - this.result;
	}

	constructor(type: string, private readonly maxNumber: number) {
		this.maxNumber = maxNumber;
		switch (type) {
			case 'plus-first':
				this._initPlus();
				this.first = null;
				break;
			case 'plus-second':
				this._initPlus();
				this.second = null;
				break;
			case 'plus-result':
				this._initPlus();
				this.result = null;
				break;
			case 'minus-first':
				this._initMinus();
				this.first = null;
				break;
			case 'minus-second':
				this._initMinus();
				this.second = null;
				break;
			case 'minus-result':
				this._initMinus();
				this.result = null;
				break;
		}
	}
}
