#pragma strict

private var shipTradeHandler : ShipTradeHandler;
private var shipTradeButton : ShipListButton;
private var shipTrade : GameObject;

function Start () {
	shipTradeHandler = GameObject.Find("ShipTradeHandler")
		.GetComponent(ShipTradeHandler);
	shipTradeButton = GetComponent(ShipListButton);
	shipTrade = GameObject.Find("ShipTradeUI");
}

function Trade () {
	shipTradeHandler.SetShipIndex(GetComponent(ShipListButton).shipIndex);
	shipTradeHandler.ShowAmountPanel();
	shipTrade.SetActive(false);
}