	#pragma strict

public var container : GameObject;
public var autoInstantiate : boolean = true;
public var filter : int = 8;

private var cargoReference : GameObject;
private var player : Player;

function Start () {
	player = GameObject.Find("PlayerStatus").GetComponent(PlayerStatus).player;
	cargoReference = Resources.Load("Reference/CargoReference") as GameObject;

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
		numItems = player.ships[player.currShip].cargo.amtInCargo;
	else for(var i = 0; i < player.ships[player.currShip].cargo.amtInCargo; i++){
			var itemID = player.ships[player.currShip].cargo.GetItem(i).itemID;
			if(cargoReference.GetComponent(CargoRefScript).cargos[itemID].type == filter)
				numItems++;
		}

	container.GetComponent(CargoDisplay).cargo = player.ships[player.currShip].cargo;
	container.GetComponent(CargoDisplay).filter = filter;
	container.GetComponent(PrefabListGenerate).numPrefabs = numItems;
	container.GetComponent(PrefabListGenerate).Generate();
	container.GetComponent(CargoDisplay).buttons = container.GetComponent(PrefabListGenerate).generatedPrefabs;
	container.GetComponent(CargoDisplay).Instantiate();
}