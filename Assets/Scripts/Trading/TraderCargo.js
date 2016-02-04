#pragma strict

public var container : GameObject;
public var autoInstantiate : boolean = true;

private var cargoReference : GameObject;
private var player : Player;
private var settlement : Settlement;

function Awake () {
	player = GameObject.Find("PlayerStatus").GetComponent(PlayerStatus).player;
	settlement = GameObject.Find("Settlements").GetComponent(Trader).settlements[player.location];
	cargoReference = Resources.Load("Reference/CargoReference") as GameObject;

	if(autoInstantiate)
		Instantiate();
}

function Instantiate() {
	var numItems = 0;

	container.GetComponent(CargoDisplayButton).cargo = settlement.market.cargo;
	container.GetComponent(CargoDisplayButton).filter = 8;
	container.GetComponent(CargoDisplayButton).Instantiate();
}