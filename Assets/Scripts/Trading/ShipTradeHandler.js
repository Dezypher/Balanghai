#pragma strict

public var shipCargoDisplay : ShipCargoDisplay;

private var player : Player;
private var cargoRef : CargoRefScript;
private var amtPanel : GameObject;
private var itemID : int;
private var maxQty : int;
public var fromShipID : int;
public var toShipID : int;

function Awake () {
	player = GameObject.Find("PlayerStatus")
				.GetComponent(PlayerStatus)
				.player;
	cargoRef = (Resources.Load("Reference/CargoReference") as GameObject)
					.GetComponent(CargoRefScript);
	amtPanel = GameObject.Find("AmountPanel");
	fromShipID = player.currShip;
}

function ShowAmountPanel(character : int){
	amtPanel.SetActive(true);

	amtPanel.GetComponent(AmtPanelScript).
		SetItem(itemID, maxQty, 0, character);
}

function Throw(itemID : int, qty : int){
	player.ships[player.currShip].cargo.RemoveCargo(itemID, qty);
	AlertHandler.AlertPopup("Item/s thrown!");
	shipCargoDisplay.Instantiate();
}

function SetShipIndex(shipIndex : int){
	fromShipID = player.currShip;
	toShipID = shipIndex;
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
		shipCargoDisplay.Instantiate();
	}
}