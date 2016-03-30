#pragma strict

public var buttons : GameObject[];
public var autoInstantiate : boolean;
public var filter : int = 8;
public var excludeCurrShip : boolean = true;

private var player : Player;
private var instantiated : boolean;
private var shipReference : GameObject;

function Awake () {
	shipReference = Resources.Load("Reference/ShipReference") as GameObject;
	player = GameObject.Find("PlayerStatus").GetComponent(PlayerStatus).player;

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

	var shipIndex = 0;

	for(var i = 0; i < buttons.length; i++){
		var shipType = player.ships[shipIndex].type;
		var location = player.ships[shipIndex].location;

		if((!player.ships[i].traveling && location == player.location && player.currShip != shipIndex)
			|| !excludeCurrShip){
			buttons[i].GetComponent(ShipListButton).SetShip(shipIndex);
		}else i--;

		shipIndex++;
	}
}
