#pragma strict

private var shipTradeHandler : ShipTradeHandler;
private var shipTradeButton : ShipListButton;
private var shipTrade : GameObject;
private var shipIndex : int;

function Awake () {
	shipTradeHandler = GameObject.Find("ShipTradeHandler")
		.GetComponent(ShipTradeHandler);
	shipTradeButton = GetComponent(ShipListButton);
	shipTrade = GameObject.Find("ShipTradeUI");
	shipIndex = GetComponent(ShipListButton).shipIndex;
}

function Trade () {
	shipTradeHandler.SetShipIndex(shipIndex);
	shipTradeHandler.ShowAmountPanel();
	shipTrade.SetActive(false);
}