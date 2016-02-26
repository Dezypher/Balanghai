#pragma strict

public var amtText : UI.InputField;
public var goldText : UI.Text;
public var itemIcon : UI.Image;
public var itemText : UI.Text;
public var itemID : int;
public var character : int; //0 - Player 1 - Shop 2 - Ship to Ship
public var trading : boolean;

private var qty : int;
private var maxQty : int;
private var pricePerQty : int;
private var tradeHandler : GameObject;
private var shipTrader : ShipTradeHandler;
private var toShipID : int;
private var fromShipID : int;
private var cargoRef : CargoRefScript;

function Start(){
	if(trading){
		tradeHandler = GameObject.Find("TradingHandler");
	}else { 
		shipTrader = GameObject.Find("ShipTradeHandler")
						.GetComponent(ShipTradeHandler);
	}

	cargoRef = (Resources.Load("Reference/CargoReference") as GameObject)
					.GetComponent(CargoRefScript);
}

function SetItem(itemID : int, maxQty : int, pricePerQty : int, character : int){
	this.maxQty = maxQty;
	this.pricePerQty = pricePerQty;
	this.itemID = itemID;
	this.character = character;
	qty = 0;

	Refresh();
}

function SetItem(fromShipID : int, toShipID : int, itemID : int, maxQty : int, pricePerQty : int, character : int){
	this.maxQty = maxQty;
	this.pricePerQty = pricePerQty;
	this.itemID = itemID;
	this.character = character;
	this.toShipID = toShipID;
	this.fromShipID = fromShipID;
	qty = 0;

	Refresh();
}

function Refresh(){
	amtText.text = "" + qty;
	goldText.text = "Gold: " + (pricePerQty * qty);
	itemText.text = cargoRef.cargos[itemID].cargoName + " (" + pricePerQty + " each)";
	itemIcon.sprite = cargoRef.cargos[itemID].sprite;
}

function AddQty(amt : int){
	if((qty + amt) <= maxQty)
		qty += amt;
	else qty = maxQty;
	
	Refresh();
}

function Accept(){
	if(character == 0)
		tradeHandler.GetComponent(TradeHandler).Sell(itemID, qty);
	else if(character == 1) 
		tradeHandler.GetComponent(TradeHandler).Buy(itemID, qty);
	else if(character == 2)
		shipTrader.Trade(fromShipID, toShipID, itemID, qty);
	
	gameObject.SetActive(false);
}

function InputChanged(){	
	var text : String = amtText.text;
	var amt : int = 0;
	if(text != ""){
		amt = parseInt(text);
		ChangeQty(amt);
	}else { 
		ChangeQty(0);
	}
}

function ChangeQty(amt : int){
	if(amt < 0)
		qty = 0;
	if(amt > maxQty)
		qty = maxQty;
	else qty = amt;

	Refresh();
}

function SubQty(amt : int){
	if((qty - amt) > 0)
		qty -= amt;
	else qty = 0;
	
	Refresh();
}