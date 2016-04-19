#pragma strict

private var travelManager :TravelManager;
private var shipListButton : ShipListButton;
private var shipSendScreen : GameObject;

function Awake(){
	travelManager = GameObject.Find("ShipTravelManager")
				.GetComponent(TravelManager);
	shipListButton = GetComponent(ShipListButton);
	shipSendScreen = GameObject.Find("SendShipUI");
}

function OnClick(){
	travelManager.Send(shipListButton.shipIndex);
	shipSendScreen.SetActive(false);
}