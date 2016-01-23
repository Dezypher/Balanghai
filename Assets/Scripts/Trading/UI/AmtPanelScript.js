#pragma strict

public var amtText : UI.Text;
public var goldText : UI.Text;
public var itemID : int;
public var character : int; //0 - Player 1 - Shop

private var qty : int;
private var maxQty : int;
private var pricePerQty : int;
private var tradeHandler : GameObject;

function Start(){
	tradeHandler = GameObject.Find("TradingHandler");
}

function SetItem(itemID : int, maxQty : int, pricePerQty : int, character : int){
	this.maxQty = maxQty;
	this.pricePerQty = pricePerQty;
	this.itemID = itemID;
	this.character = character;
	qty = 0;

	Refresh();
}

function Refresh(){
	amtText.text = "Amount: " + qty + "/" + maxQty;
	goldText.text = "Gold: " + (pricePerQty * qty);
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
	else tradeHandler.GetComponent(TradeHandler).Buy(itemID, qty);
	
	gameObject.SetActive(false);
}

function SubQty(amt : int){
	if((qty - amt) > 0)
		qty -= amt;
	else qty = 0;
	
	Refresh();
}