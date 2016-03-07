#pragma strict

private var player : Player;
private var cargoRef : CargoRefScript;
private var amtPanel : GameObject;
private var itemID : int;
private var maxQty : int;
private var fromShipID : int;
private var toShipID : int;

function Awake () {
	player = GameObject.Find("PlayerStatus")
				.GetComponent(PlayerStatus)
				.player;
	cargoRef = (Resources.Load("Reference/CargoReference") as GameObject)
					.GetComponent(CargoRefScript);
	amtPanel = GameObject.Find("AmountPanel");
}

function ShowAmountPanel(){
	amtPanel.SetActive(true);

	amtPanel.GetComponent(AmtPanelScript).
		SetItem(itemID, maxQty, 0, 0);
}

function SetShipIndex(shipIndex : int){
	fromShipID = shipIndex;
}

function SetIndex(index : int){
	itemID = player.ships[fromShipID].cargo.cargo[index].itemID;
	maxQty = player.ships[fromShipID].cargo.cargo[index].quantity;
}

function SetItem(itemID : int){
	this.itemID = itemID;
}

function SetMaxQty(maxQty : int){
	this.maxQty = maxQty;
}

function Trade(qty : int){
	if(player.ships[toShipID].cargo.AddCargo(itemID, qty)){
		player.ships[fromShipID].cargo.RemoveCargo(itemID, qty);
		AlertHandler.AlertPopup("Trade successful!");
	}
}