#pragma strict

private var travelManager :TravelManager;
private var shipListButton : ShipListButton;

function Awake(){
	travelManager = GameObject.Find("ShipTravelManager")
				.GetComponent(TravelManager);
	shipListButton = GetComponent(ShipListButton);
}

function OnClick(){
	travelManager.Send(shipListButton.shipIndex);
}