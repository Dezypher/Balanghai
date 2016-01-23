#pragma strict

/*
	This script assumes that it is inside an object
	with a PlayerStatus script.
*/



private var player : Player;

function Start () {
	player = GetComponent(PlayerStatus).player;
}

function SetShipTravel (shipIndex : int, destination : int) {
	player.ships[shipIndex].destination = destination;

}