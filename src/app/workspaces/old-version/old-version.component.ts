import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

class MyNumber {
	value: number;
	constructor(readonly nativeElement: HTMLElement) {
	}
	focus() {
		console.log("set focus for:", this);
		setTimeout(() => this.nativeElement.focus());
	}
}


class Aufgabe {
	func: string;
	first: number;
	second: number;
	result: number;

	private initPlus() {
		this.func = '+';
		this.result = getRandomInt(0, this.maxNumber);
		this.first = getRandomInt(0, this.result);
		this.second = this.result - this.first;
	}

	private initMinus() {
		this.func = '-';
		this.first = getRandomInt(0, this.maxNumber);
		this.result = getRandomInt(0, this.first);
		this.second = this.first - this.result;
	}

	constructor(type: string, private maxNumber: number, mal10: boolean) {
		switch (type) {
			case 'plus':
				this.initPlus();
				break;
			case 'minus':
				this.initMinus();
				break;
		}

		if (mal10 === true) {
			if (this.first !== null) this.first *= 10;
			if (this.second !== null) this.second *= 10;
			if (this.result !== null) this.result *= 10;
		}
	}
}


@Component({
	selector: 'dy-old-version',
	templateUrl: './old-version.component.html',
	styleUrls: ['./old-version.component.scss']
})
export class OldVersionComponent implements OnInit {
	constructor() {}

	ngOnInit() {
		this.aufgabenType = "plus";
		this.zahlenBereich = "10";
		this.operator = "+";

		this.first = new MyNumber(this.firstInput.nativeElement);
		this.second = new MyNumber(this.secondInput.nativeElement);
		this.result = new MyNumber(this.resultInput.nativeElement);


		this.currentInput = this.result;


		this.popupVisible = false;

		this.generateAufgabe();
	}


	evaluate() {

		let func;

		if (this.operator === "+") {
			func = (_v1, _v2, _r) => {
				return _v1 + _v2 === _r;
			};
		}
		else if (this.operator === "-") {
			func = (_v1, _v2, _r) => {
				return _v1 - _v2 === _r;
			};
		}


		if (func(this.first.value, this.second.value, this.result.value)) {
			this.showPopup(true, 1000, () => {
				this.generateAufgabe();
			});
		}
		else {
			this.showPopup(false, 1000, () => {
				this.currentInput.value = null;
				this.currentInput.focus();
			});
		}
	}



	aufgabenType: string;
	aufgabenTypeChanged() {
		this.generateAufgabe();
	}

	zahlenBereich: string;
	zahlenBereichChanged() {
		this.generateAufgabe();
	}
	getMaxNumber(): number {
		return parseInt(this.zahlenBereich, 10);
	}


	mal10: boolean;
	mal10Changed() {
		this.generateAufgabe();
	}


	currentInput: MyNumber;

	@ViewChild("firstInput") firstInput: ElementRef;
	first: MyNumber;
	firstDisabledAttribute(): string | null {
		return (this.first === this.currentInput) ? (null) : ("");
	}
	@ViewChild("secondInput") secondInput: ElementRef;
	second: MyNumber;
	secondDisabledAttribute(): string | null {
		return (this.second === this.currentInput) ? (null) : ("");
	}
	@ViewChild("resultInput") resultInput: ElementRef;
	result: MyNumber;
	resultDisabledAttribute(): string | null {
		return (this.result === this.currentInput) ? (null) : ("");
	}
	operator: string;


	getEvaluateButtonDisabledAttribute(): string | null {
		return (this.first.value !== null && this.second.value !== null && this.result.value !== null && this.popupVisible === false) ? (null) : ("");
	}


	popupText: string;
	popupVisible: boolean;
	popupWrong: boolean;



	showPopup(correct: boolean, time: number, after?: () => void) {
		this.popupWrong = !correct;
		this.popupVisible = true;
		this.popupText = ((correct === true) ? "Richtig!" : "Nicht richtig!");
		window.setTimeout(() => {
			this.popupVisible = false;
			if (after)
				after();
		}, time);
	}


	private setAufgabe(aufgabe: Aufgabe) {
		this.first.value = aufgabe.first;
		this.second.value = aufgabe.second;
		this.result.value = aufgabe.result;
		this.operator = aufgabe.func;
	}


	generateAufgabe() {
		switch (this.aufgabenType) {
		case "plus":
			this.setAufgabe(new Aufgabe("plus", this.getMaxNumber(), this.mal10));
			this.currentInput = this.result;
			break;
		case "minus":
			this.setAufgabe(new Aufgabe("minus", this.getMaxNumber(), this.mal10));
			this.currentInput = this.result;
			break;
		case "umkehr-plus":
			this.setAufgabe(new Aufgabe("plus", this.getMaxNumber(), this.mal10));
			switch (getRandomInt(0, 1)) {
			case 0:
				this.currentInput = this.first;
				break;
			case 1:
				this.currentInput = this.second;
				break;
			}
			break;
		case "umkehr-minus":
			this.setAufgabe(new Aufgabe("minus", this.getMaxNumber(), this.mal10));
			switch (getRandomInt(0, 1)) {
			case 0:
				this.currentInput = this.first;
				break;
			case 1:
				this.currentInput = this.second;
				break;
			}
			break;
		case "umkehr-minus-first":
			this.setAufgabe(new Aufgabe("minus", this.getMaxNumber(), this.mal10));
			this.currentInput = this.first;
			break;
		case "umkehr-minus-second":
			this.setAufgabe(new Aufgabe("minus", this.getMaxNumber(), this.mal10));
			this.currentInput = this.second;
			break;
		case "umkehr":
			switch (getRandomInt(0, 3)) {
			case 0:
				this.setAufgabe(new Aufgabe("plus", this.getMaxNumber(), this.mal10));
				this.currentInput = this.first;
				break;
			case 1:
				this.setAufgabe(new Aufgabe("plus", this.getMaxNumber(), this.mal10));
				this.currentInput = this.second;
				break;
			case 2:
				this.setAufgabe(new Aufgabe("minus", this.getMaxNumber(), this.mal10));
				this.currentInput = this.first;
				break;
			case 3:
				this.setAufgabe(new Aufgabe("minus", this.getMaxNumber(), this.mal10));
				this.currentInput = this.second;
				break;
			}
			break;
		}
		this.currentInput.value = null;
		this.currentInput.focus();
	}
}
