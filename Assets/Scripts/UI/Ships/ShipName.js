#pragma strict

/*
	Script assumes that the object this is assigned to
	has a UI.Text component.
*/

private var player : Player;
private var shipHandler : ShipHandler;

function Start () {
	player = GameObject.Find("PlayerStatus").GetComponent(PlayerStatus).player;
	shipHandler = GameObject.Find("ShipHandler").GetComponent(ShipHandler);
}

function Update () {
	GetComponent(UI.Text).text = player.ships[shipHandler.currShip].shipName;
}