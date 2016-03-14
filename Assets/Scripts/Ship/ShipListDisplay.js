#pragma strict

public var container : GameObject;
public var autoInstantiate : boolean = true;
public var excludeCurrShip : boolean = true;

private var shipReference : ShipReference;
private var player : Player;

function Start () {
	player = GameObject.Find("PlayerStatus")
				.GetComponent(PlayerStatus).player;
	shipReference = (Resources.Load("Reference/ShipReference") as GameObject)
						.GetComponent(ShipReference);

	if(autoInstantiate)
		Instantiate();
}

function Instantiate () {
	var numShips : int = 0;

	for(var i = 0; i < player.ships.length; i++){
		if((player.ships[i].location == player.location
			&& player.currShip != i) || !excludeCurrShip)
			numShips++;
	}

	if(numShips > 0){
		container.GetComponent(PrefabListGenerate).numPrefabs = numShips;
		container.GetComponent(PrefabListGenerate).Generate();
		container.GetComponent(ShipDisplay).buttons = container.GetComponent(PrefabListGenerate).generatedPrefabs;
		container.GetComponent(ShipDisplay).Instantiate();
	}else {
		AlertHandler.AlertPopup("You have no other ships in the village to trade with.");
		this.gameObject.SetActive(false);
	}
}