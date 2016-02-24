#pragma strict

private var player : Player;
private var cargoRef : CargoRefScript;

function Start () {
	player = GameObject.Find("PlayerStatus")
				.GetComponent(PlayerStatus)
				.player;
	cargoRef = (Resources.Load("Reference/CargoReference") as GameObject)
					.GetComponent(CargoRefScript);
}

function Trade(fromShipID : int, toShipID : int, itemID : int, qty : int){
	if(player.ships[toShipID].cargo.AddCargo(itemID, qty)){
		player.ships[fromShipID].cargo.RemoveCargo(itemID, qty);
		AlertHandler.AlertPopup("Trade successful!");
	}
}