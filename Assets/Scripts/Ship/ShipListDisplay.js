#pragma strict

public var container : GameObject;
public var autoInstantiate : boolean = true;
public var excludeCurrShip : boolean = true;
public var forTravel : boolean;

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

	Debug.Log("playerShipsLength: " + player.ships.length);

	for(var i = 0; i < player.ships.length; i++){

		if(!forTravel) {
			if((!player.ships[i].traveling && 
				player.ships[i].location == player.location
				&& (player.currShip != i || !excludeCurrShip)) 
				){
				numShips++;
			}
		} else if(forTravel && !player.ships[i].traveling){
			numShips++;
		}
	}

	Debug.Log("Ship Num: " + numShips);

	if(numShips > 0){
		container.GetComponent(PrefabListGenerate).numPrefabs = numShips;
		container.GetComponent(PrefabListGenerate).Generate();
		container.GetComponent(ShipDisplay).buttons = container.GetComponent(PrefabListGenerate).generatedPrefabs;
		container.GetComponent(ShipDisplay).Instantiate();
	}else {
		this.gameObject.SetActive(false);
	}
}