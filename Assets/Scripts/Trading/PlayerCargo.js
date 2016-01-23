#pragma strict

public var container : GameObject;
public var autoInstantiate : boolean = true;
public var filter : int = 8;

private var cargoReference : GameObject;
private var player : Player;

function Awake () {
	player = GameObject.Find("PlayerStatus").GetComponent(PlayerStatus).player;
	cargoReference = Resources.Load("Reference/CargoReference");

	if(autoInstantiate)
		Instantiate();
}

function Filter(filter : int) {
	this.filter = filter;

	Instantiate();
}

function Instantiate() {
	var numItems = 0;

	if(filter == 8)
		numItems = player.cargo.amtInCargo;
	else for(var i = 0; i < player.cargo.amtInCargo; i++){
			var itemID = player.cargo.cargo[i].itemID;
			if(cargoReference.GetComponent(CargoRefScript).cargos[itemID].type == filter)
				numItems++;
		}

	Debug.Log("numItems: " + numItems);

	container.GetComponent(CargoDisplay).cargo = player.cargo;
	container.GetComponent(CargoDisplay).filter = filter;
	container.GetComponent(ButtonListGenerate).totalNumButtons = numItems;
	container.GetComponent(ButtonListGenerate).Generate();
	container.GetComponent(CargoDisplay).buttons = container.GetComponent(ButtonListGenerate).buttons;
	container.GetComponent(CargoDisplay).Instantiate();
}