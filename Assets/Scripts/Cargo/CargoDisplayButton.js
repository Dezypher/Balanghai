#pragma strict

public var buttons : GameObject[];
public var cargo : CargoHolder;
public var autoInstantiate : boolean;
public var filter : int = 8;

private var instantiated : boolean;
private var cargoReference : GameObject;

function Awake () {
	cargoReference = Resources.Load("Reference/CargoReference") as GameObject;

	if(autoInstantiate)
		Instantiate();
}

function Instantiate () {
	/*
		This script assumes that the number of buttons is equal to the number of
		cargo in cargo. If the number of cargo is less than the buttons it won't
		work. If the number of cargo is more than the buttons it will display
		until the index of the number of buttons.
	*/

	var itemIndex = 0;

	for(var i = 0; i < buttons.length; i++){
		var itemID = cargo.GetItem(itemIndex).itemID;
		var quantity = cargo.GetItem(itemIndex).quantity;
		var type : int = cargoReference.GetComponent(CargoRefScript).cargos[itemID].type;

		if(filter == 8 || filter == type){
			buttons[i].GetComponent(ItemButtonScript).SetItem(itemID, quantity);
			buttons[i].GetComponent(ItemButtonScript).index = itemIndex;
		}else i--;

		itemIndex++;
	}
}