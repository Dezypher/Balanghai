#pragma strict

private var cargoButton : CargoButton;
private var shipTradeHandler : ShipTradeHandler;

function Start(){
	cargoButton = GetComponent(CargoButton);
	shipTradeHandler = GameObject.Find("ShipTradeHandler")
						.GetComponent(ShipTradeHandler);
}

function OnClick(){
	var index = cargoButton.index;

	shipTradeHandler.SetIndex(index);
}