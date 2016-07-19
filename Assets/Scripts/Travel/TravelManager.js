#pragma strict

private var player : Player;
private var settlements : Settlement[];

public var weight : float;
public var destination : int;

function Start () {
	player = GameObject.Find("PlayerStatus")
				.GetComponent(PlayerStatus).player;
	settlements = GameObject.Find("Settlements")
				.GetComponent(Trader).settlements;
}

function SetDestination(destinationID : int){
	destination = destinationID;
	Send(player.currShip);
}

function Send(shipIndex : int){

	if(settlements[destination].unlocked){
		if(!(player.ships[shipIndex].location == destination)){
			player.ships[shipIndex].destination = destination;

			var difference = weight/player.ships[shipIndex].speed;
			player.ships[shipIndex].voyageStartTime=Time.time;
			player.ships[shipIndex].voyageEndTime=Time.time+difference;
			player.ships[shipIndex].traveling = true;

			var dbaccess : DBAccess = new DBAccess();

			dbaccess.connectDB();
			var playerID = player.playerID;

			dbaccess.UpdateShipLocation(playerID, shipIndex, -1);
			dbaccess.UpdateShipDestination(playerID, shipIndex, destination);
			dbaccess.UpdateShipVoyageStartTime(playerID, shipIndex, player.ships[shipIndex].voyageStartTime);
			dbaccess.UpdateShipVoyageEndTime(playerID, shipIndex, player.ships[shipIndex].voyageEndTime);

			dbaccess.closeDB();

			SceneManager.LoadScene(0);
		} else {
			AlertHandler.AlertPopup("Your ship is already in " + settlements[destination].name + "!");
		}
	} else {
		AlertHandler.AlertPopup("This settlement is still locked. Unlock it using the map!");
	}
	//Debug.Log("starts at:"+player.ships[shipIndex].voyageStartTime);
	//Debug.Log("ends at:"+player.ships[shipIndex].voyageEndTime);
	//player.ships[shipIndex].traveling=true;
}