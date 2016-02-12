#pragma strict

public var amtText : UI.InputField;
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
	amtText.text = "" + qty;
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