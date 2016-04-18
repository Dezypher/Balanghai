#pragma strict

private var player : Player;
public var destination : int;

function Start () {
	player = GameObject.Find("PlayerStatus")
				.GetComponent(PlayerStatus).player;
}

function SetDestination(destinationID : int){
	destination = destinationID;
}

function Send(shipIndex : int){
	var difference : float;
	player.ships[shipIndex].destination = destination;


	difference=10;
	player.ships[shipIndex].voyageStartTime=Time.time;
	player.ships[shipIndex].voyageEndTime=Time.time+difference;
	Debug.Log("start:"+player.ships[shipIndex].voyageStartTime);
	Debug.Log("end:"+player.ships[shipIndex].voyageEndTime);

}