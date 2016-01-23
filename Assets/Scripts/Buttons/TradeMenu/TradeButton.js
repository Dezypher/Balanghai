#pragma strict

enum Character{Player, Shop};

public var inventoryOf : Character;

private var tradeHandler : GameObject;

function Start(){
	tradeHandler = GameObject.Find("TradingHandler");
}

function OnClick(){
	var inventory : int = inventoryOf;
	var itemIndex = GetComponent(ItemButtonScript).index;
	
	tradeHandler.GetComponent(TradeHandler).ActivateAmountPanel(inventory, itemIndex);
}