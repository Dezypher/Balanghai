#pragma strict

public var numberText : UI.Text;
public var maxNumber : int;
public var currNumber : int = 0;

function Start () {
	UpdateDisplay();
}

function AddNumber (number : int) {
	var digits : int = (currNumber + "").length;

	if(currNumber == 0)
		currNumber = number;
	else {
		currNumber = (currNumber * 10) + number;
	}

	if(maxNumber != 0 && currNumber > maxNumber)
		currNumber = maxNumber;

	UpdateDisplay();
}

function Delete () {
	currNumber /= 10;
	UpdateDisplay();
}

function Clear() {
	currNumber = 0;
	UpdateDisplay();
}

function UpdateDisplay () {
	numberText.text = "" + currNumber;
}