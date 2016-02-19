#pragma strict
/*
public var buttons : GameObject[];
public var ship : Ship;
public var autoInstantiate : boolean;
public var filter : int = 8;

public var instantiated : boolean;
public var shipReference : GameObject;

function Awake () {
	shipReference = Resources.Load("Reference/ShipReference") as GameObject;

	if(autoInstantiate)
		Instantiate();
}

function Instantiate () {
	shipReference = Resources.Load("Reference/ShipReference") as GameObject;
	/*
		This script assumes that the number of buttons is equal to the number of
		cargo in cargo. If the number of cargo is less than the buttons it won't
		work. If the number of cargo is more than the buttons it will display
		until the index of the number of buttons.
	*/
	/*
	var shipIndex = 0;

	for(var i = 0; i < buttons.length; i++){
		var shipType = cargo.GetItem(shipIndex).shipType;
		var quantity = cargo.GetItem(shipIndex).quantity;
		var type : int = cargoReference.GetComponent(CargoRefScript).cargos[shipType].type;

		if(filter == 8 || filter == type){
			buttons[i].GetComponent(ShipButton).SetItem(shipType, quantity);
			buttons[i].GetComponent(ShipButton).index = shipIndex;
		}else i--;

		shipIndex++;
	}
}
*/