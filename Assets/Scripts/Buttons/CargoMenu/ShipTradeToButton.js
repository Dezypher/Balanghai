#pragma strict

private var shipTradeHandler : ShipTradeHandler;
private var shipTradeButton : ShipListButton;
private var shipTrade : GameObject;

function Awake () {
	shipTradeHandler = GameObject.Find("ShipTradeHandler")
		.GetComponent(ShipTradeHandler);
	shipTradeButton = GetComponent(ShipListButton);
	shipTrade = GameObject.Find("ShipTradeUI");
}

function Trade () {
	shipTradeHandler.ShowAmountPanel(shipTradeButton.shipIndex);
	shipTrade.SetActive(false);
}