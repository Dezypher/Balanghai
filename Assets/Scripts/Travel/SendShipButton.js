#pragma strict

private var travelManager :TravelManager;
private var shipListButton : ShipListButton;
private var shipSendScreen : GameObject;
private var player : Player;

function Awake(){
	travelManager = GameObject.Find("ShipTravelManager")
				.GetComponent(TravelManager);
	shipListButton = GetComponent(ShipListButton);
	shipSendScreen = GameObject.Find("SendShipUI");
	player = GameObject.Find("PlayerStatus").GetComponent(PlayerStatus).player;
}

function OnClick(){
	player.currShip = shipListButton.shipIndex;
	travelManager.Send(shipListButton.shipIndex);
	shipSendScreen.SetActive(false);
}