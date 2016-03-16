#pragma strict

private var player : Player;
private var destination : int;

function Start () {
	player = GameObject.Find("PlayerStatus")
				.GetComponent(PlayerStatus).player;
}

function SetDestination(destinationID : int){
	destination = destinationID;
}

function Send(shipIndex : int){
	player.ships[shipIndex].destination = destination;
}