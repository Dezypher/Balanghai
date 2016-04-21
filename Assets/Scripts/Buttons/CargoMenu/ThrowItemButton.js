#pragma strict

private var shipTradeHandler : ShipTradeHandler;

function Start () {
	shipTradeHandler = GameObject.Find("ShipTradeHandler")
		.GetComponent(ShipTradeHandler);
}

function Throw () {
	shipTradeHandler.ShowAmountPanel(3);
}