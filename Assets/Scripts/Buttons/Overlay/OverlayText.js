﻿#pragma strict

public var villageName : UI.Text;
public var playerName : UI.Text;
public var goldAmt : UI.Text;
public var shipScreen : boolean;

private var player : Player;
private var settlements : Settlement[];
private var settlementsSpriteHandler : SettlementSprites;

function Awake () {
	player = GameObject.Find("PlayerStatus").GetComponent(PlayerStatus).player;
	settlements = GameObject.Find("Settlements").GetComponent(Trader).settlements;
	if(shipScreen)
		settlementsSpriteHandler = GameObject.Find("SettlementSpritesHandler").GetComponent(SettlementSprites);
}

function Update () {
	var total_time  : System.TimeSpan;
	var voyage_time : System.TimeSpan;
	total_time = player.ships[player.currShip].voyageEndTime - player.ships[player.currShip].voyageStartTime;
	voyage_time = System.DateTime.Now - player.ships[player.currShip].voyageStartTime;

	if(!player.ships[player.currShip].traveling){
		villageName.fontSize = 50;
		villageName.text = settlements[player.location].name;
	} else {
		var diff : System.TimeSpan = total_time - voyage_time;
		var time : int = diff.TotalSeconds;
		villageName.fontSize = 30;
		villageName.text = "Arriving at " 
			+ settlements[player.ships[player.currShip].destination].name
			+ " in " + time + " seconds";
		if(time <= 0){
			player.ships[player.currShip].traveling = false;
			player.ships[player.currShip].location = player.ships[player.currShip].destination;
			player.ships[player.currShip].destination = -1;

			var dbaccess : DBAccess = new DBAccess();

			dbaccess.connectDB();
			var playerID = player.playerID;

			dbaccess.UpdateShipLocation(playerID, player.currShip, player.ships[player.currShip].location);
			dbaccess.UpdateShipDestination(playerID, player.currShip, -1);

			dbaccess.closeDB();

			player.location = player.ships[player.currShip].location;
			settlementsSpriteHandler.ChangeSprite(player.ships[player.currShip].location);
		}
	}

	if(playerName != null)
		playerName.text = player.playerName;

	if(playerName != null)
		goldAmt.text = "" + player.gold;
}