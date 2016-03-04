#pragma strict

private var player : Player;
private var cargoRef : CargoRefScript;
private var amtPanel : GameObject;
private var itemID : int;
private var fromShip : int;
private var toShip : int;

function Awake () {
	player = GameObject.Find("PlayerStatus")
				.GetComponent(PlayerStatus)
				.player;
	cargoRef = (Resources.Load("Reference/CargoReference") as GameObject)
					.GetComponent(CargoRefScript);
	amtPanel = GameObject.Find("AmountPanel");
}

function ShowAmountPanel(shipIndex : int){
	amtPanel.SetActive(true);
}

function SetItem(itemID : int){
	this.itemID = itemID;
}

function Trade(qty : int){
	if(player.ships[toShipID].cargo.AddCargo(itemID, qty)){
		player.ships[fromShipID].cargo.RemoveCargo(itemID, qty);
		AlertHandler.AlertPopup("Trade successful!");
	}
}