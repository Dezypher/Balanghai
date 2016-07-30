#pragma strict


 import System.Data;
 import Mono.Data.Sqlite;
 import System.Collections.Generic;

function Awake () {
     var db:DBAccess;
     db = new DBAccess();

     var playerStatus : PlayerStatus = GetComponent(PlayerStatus);
     var settlements : Trader = GameObject.Find("Settlements").GetComponent(Trader);

     db.connectDB();
     db.InitializeData(playerStatus, settlements);
     db.closeDB();

     playerStatus.Instantiate();
 }

 public class DBAccess{

    private var conn : String = "URI=file:" + Application.dataPath + "/Database/balanghai.s3db"; //Path to database.
    private var reader : IDataReader;
    private var dbconn : IDbConnection;
    private var dbcmd : IDbCommand;

    function InitializeData (playerStatus : PlayerStatus, settlements : Trader) {

    //Check if there is already a player

	dbcmd=dbconn.CreateCommand();
	dbcmd.CommandText = "SELECT* From playerdata";
	reader = dbcmd.ExecuteReader();

	var player : Player = new Player();
	var instantiateDB : boolean = false;

	if(!reader.Read()){
		Debug.Log("DB is Empty, making new Player");

		instantiateDB = true;

		//Insert Base Player (500 Gold)
		InsertPlayer (0, 500, "Player", 0);
	}

	/*
		Load all player data from DB 
	*/

	//Load player name and gold

	dbcmd=dbconn.CreateCommand();
	dbcmd.CommandText = "SELECT* From playerdata";
	reader = dbcmd.ExecuteReader();

	while (reader.Read())
	{	
		player.playerID = reader.GetInt32(0);
	    player.playerName = reader.GetString(1);
	    player.gold =reader.GetFloat(2);
	}

	if(instantiateDB){
		//Insert Balanghai Ship
		InsertShip (0,"Balanghai",player.playerID, 2, 1, -1, "", "");
	}


    //Instantiate Settlements Table if empty

    Debug.Log("PlayerID : " + player.playerID);

	dbcmd=dbconn.CreateCommand();
	dbcmd.CommandText = "SELECT * From Settlements where playerID = " + player.playerID;
	reader = dbcmd.ExecuteReader();

	if(!reader.Read()){
		Debug.Log("Settlements is Empty, filling table. #Settlements: " + settlements.settlements.length);

		for(var i = 0; i < settlements.settlements.length; i++){
			if(i == 0 || i == 1)
				InsertSettlement(i, player.playerID, 1, 0);
			else
				InsertSettlement(i, player.playerID, 0, 0);

		}
	}
    
	dbcmd=dbconn.CreateCommand();
	dbcmd.CommandText = "SELECT unlocked From Settlements where playerID = " + player.playerID;
	reader = dbcmd.ExecuteReader();


	var j = 0;

	while (reader.Read())
	{	
		var result : int = reader.GetInt32(0);

		//Debug.Log("j = " + j + " result = " + result);

		if(result == 0)
			settlements.settlements[j].unlocked = false;
		else 
			settlements.settlements[j].unlocked = true;

		j++;
	}

	//Load player ships

	dbcmd=dbconn.CreateCommand();
	dbcmd.CommandText = "SELECT COUNT(*) from ships WHERE playerID = " + player.playerID;
	reader = dbcmd.ExecuteReader();

	reader.Read();

    // Set to num of results
	var numShips = reader.GetInt32(0);	
	player.ships = new Ship[numShips];

	var shipRef : ShipReference = (Resources.Load("Reference/ShipReference") as GameObject)
										.GetComponent(ShipReference);

	dbcmd=dbconn.CreateCommand();
	dbcmd.CommandText = "SELECT* From ships where playerID = " + player.playerID;
	reader = dbcmd.ExecuteReader();

	var shipIndex = 0;

	while (reader.Read())
	{	
		
	    var shipType = reader.GetInt32(3); // set 0 to ship type
	    player.ships[shipIndex] = new Ship();

	    player.ships[shipIndex].location = reader.GetInt32(4);
	    player.ships[shipIndex].destination = reader.GetInt32(5);

	    var timeStart : String = reader.GetString(6);
	    var timeEnd : String = reader.GetString(7);

	    /* 
	    	Date and Time format to String
	    	yyyy-MM-dd-HH-mm-SS-sss
	    */

	    var partsStartTime 	: String[] = timeStart.Split("-"[0]);
	    var partsEndTime 	: String[] = timeEnd.Split("-"[0]);
	    var voyageStartTime : System.DateTime;
	    var voyageEndTime : System.DateTime;

	    Debug.Log("pst: " + partsStartTime.Length + " pet: " + partsEndTime.Length);

	    if(partsStartTime.Length == 7 && partsEndTime.Length == 7) {

		    voyageStartTime = new System.DateTime(
		    								int.Parse(partsStartTime[0]),
		    								int.Parse(partsStartTime[1]),
		    								int.Parse(partsStartTime[2]),
		    								int.Parse(partsStartTime[3]),
		    								int.Parse(partsStartTime[4]),
		    								int.Parse(partsStartTime[5]),
		    								int.Parse(partsStartTime[6]));

		    voyageEndTime = new System.DateTime(
		    								int.Parse(partsEndTime[0]),
		    								int.Parse(partsEndTime[1]),
		    								int.Parse(partsEndTime[2]),
		    								int.Parse(partsEndTime[3]),
		    								int.Parse(partsEndTime[4]),
		    								int.Parse(partsEndTime[5]),
		    								int.Parse(partsEndTime[6]));

		} else {
			voyageStartTime = System.DateTime.Now;
			voyageEndTime = System.DateTime.Now;
		}

	    player.ships[shipIndex].voyageStartTime = voyageStartTime;
	    player.ships[shipIndex].voyageEndTime = voyageEndTime;

	    player.ships[shipIndex].shipName = reader.GetString(2); // get shipName from result
	    player.ships[shipIndex].type = shipRef.ships[shipType].type;
	    player.ships[shipIndex].sprite = shipRef.ships[shipType].sprite;
	    player.ships[shipIndex].icon = shipRef.ships[shipType].icon;
	    player.ships[shipIndex].speed = shipRef.ships[shipType].speed;
	    player.ships[shipIndex].capacity = shipRef.ships[shipType].capacity;
	    player.ships[shipIndex].hullStrength = shipRef.ships[shipType].hullStrength;
	    player.ships[shipIndex].shipWidth = shipRef.ships[shipType].shipWidth;
	    player.ships[shipIndex].shipHeight = shipRef.ships[shipType].shipHeight;

	    if(player.ships[shipIndex].location == -1) {
	    	player.ships[shipIndex].traveling = true;
	    }

	    player.ships[shipIndex].cargo = new CargoHolder();
	    player.ships[shipIndex].cargo.capacity = player.ships[shipIndex].capacity;
	    player.ships[shipIndex].cargo.Start();

	    //Get below from resultset
	    shipIndex++;
	}


	dbcmd=dbconn.CreateCommand();
	dbcmd.CommandText = "SELECT * From Cargo where playerID = " + player.playerID;
	reader = dbcmd.ExecuteReader();

	while (reader.Read()){
	    var shipID =  reader.GetInt32(0); 
	    var itemID = reader.GetInt32(2); 
	    var qty = reader.GetInt32(3); 

	    player.ships[shipID].cargo.AddCargoNoDB(itemID, qty);
	}
    
	dbcmd=dbconn.CreateCommand();
	dbcmd.CommandText = "SELECT* From TradeQuest where playerID = " + player.playerID;
	reader = dbcmd.ExecuteReader();

	while (reader.Read()){
	    var tradeQuest : TradeQuest;

	    tradeQuest.rewardCargoID = reader.GetInt32(2);
	    tradeQuest.rewardCargoAmount = reader.GetInt32(3);
	    tradeQuest.requiredCargoID = reader.GetInt32(4);
	    tradeQuest.requiredCargoAmount = reader.GetInt32(5);
	    //tradeQuest.location = 0;

	    player.quests.Add(tradeQuest);
    }

	dbcmd=dbconn.CreateCommand();
	dbcmd.CommandText = "SELECT* From TranslationQuest where playerID = " + player.playerID;
	reader = dbcmd.ExecuteReader();

	while (reader.Read()){
	
			var translationQuest : TranslationQuest;

			var toBeTranslated = reader.GetString(4);
		//var rewardCargoID = 0;
		//var rewardCargoAmt = 0;

		player.quests.Add(translationQuest);
	}

	playerStatus.player = player;
}

//CREATE PLAYER



	function connectDB(){  
	    dbconn = new SqliteConnection(conn);
	    dbconn.Open();
    }

    function closeDB(){
        reader.Close();
        reader = null;
        dbcmd.Dispose();
        dbcmd = null;
        dbconn.Close();
        dbconn = null;
    }


	function InsertPlayer (playerID : int, gold: int, playerName : String, totalCapacity) {
	    dbcmd = dbconn.CreateCommand();
	    dbcmd.CommandText = "INSERT INTO playerdata(name,gold) VALUES ('"+playerName+"',"+gold+")";
	    reader = dbcmd.ExecuteReader();
	}

//CREATE SETTLEMENT

	function InsertSettlement(settlementID : int, playerID : int, unlocked : int, influence : float) {
	    dbcmd = dbconn.CreateCommand();
	    dbcmd.CommandText = "INSERT INTO Settlements(settlementID,playerID,unlocked,influence) VALUES ("+settlementID+","+playerID+","+unlocked+","+influence+")";
	    reader = dbcmd.ExecuteReader();
	}

//CREATE SHIP

	function InsertShip (shipID : int,shipName : String,playerID : int, type : int, location : int, destination : int, voyageStartTime : String, voyageEndTime : String) {
	    //Should call InsertCargoHolder 

	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "INSERT INTO ships(id,shipName,playerID,type,location,destination,voyageStartTime,voyageEndTime) VALUES ("+shipID+",'"+shipName+"',"+playerID+","+type+","+location+","+destination+",'"+voyageStartTime+"','"+voyageEndTime+"')";
	     reader = dbcmd.ExecuteReader();
	}

//CREATE CARGO

	function InsertCargo (playerID : int, shipID : int, cargoID : int, qty : int) {

	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "INSERT INTO Cargo(playerID, shipID,cargoID,qty) VALUES ("+playerID+","+shipID+","+cargoID+","+qty+")";
	     reader = dbcmd.ExecuteReader();
	}

//CREATE TRADE QUEST

	function InsertTradeQuest (playerID : int, rewardCargoID : int, 
					rewardCargoAmt : int, requiredCargoID : int, 
					requiredCargoAmt : int, location : int) {

	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "INSERT INTO TradeQuest(playerID,rewardCargoID,rewardCargoAmt,requiredCargoID,requiredCargoAmt,location) " +
	     					 "VALUES ("+playerID+","+rewardCargoID+","+rewardCargoAmt+","+requiredCargoID+","+requiredCargoAmt+","+location+")";
	     reader = dbcmd.ExecuteReader();

	}

//UPDATE PLAYER

	function UpdateGold (playerID : int, gold : int) {
		
	    dbcmd = dbconn.CreateCommand();
	    var query : String = "UPDATE playerdata SET gold = "+gold+" WHERE playerID=" + playerID;
	    dbcmd.CommandText = query;
	    reader = dbcmd.ExecuteReader();

	}

//UPDATE SETTLEMENT

	function UpdateSettlementUnlocked(settlementID : int, playerID : int, unlocked : int) {
	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "UPDATE Settlements SET unlocked = "+unlocked+" WHERE settlementID="+settlementID+" AND playerID="+playerID;
	     reader = dbcmd.ExecuteReader();
	}

	function UpdateSettlementInfluence(settlementID : int, playerID : int, influence : float) {
	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "UPDATE Settlements SET influence = "+influence+" WHERE playerID="+playerID+" AND settlementID="+settlementID;
	     reader = dbcmd.ExecuteReader();
	}

//UPDATE SHIP

	function UpdateShipLocation (playerID : int, shipID : int, location : int) {
	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "UPDATE ships SET location = "+location+" WHERE playerID="+playerID+" AND id="+shipID;
	     reader = dbcmd.ExecuteReader();
	}

	function UpdateShipDestination (playerID : int, shipID : int, destination : int) {
	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "UPDATE ships SET destination = "+destination+" WHERE playerID="+playerID+" AND id="+shipID;
	     reader = dbcmd.ExecuteReader();
	}

	function UpdateShipVoyageStartTime (playerID : int, shipID : int, time : System.DateTime) {
		var timeString = time.Year + "-" + 
							time.Month + "-" + time.Day + "-" + 
							time.Hour + "-" + time.Minute + "-" + 
							time.Second + "-" + time.Millisecond;

	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "UPDATE ships SET voyageStartTime = '"+timeString+"' WHERE playerID="+playerID+" AND id="+shipID;
	     reader = dbcmd.ExecuteReader();
	}

	function UpdateShipVoyageEndTime (playerID : int, shipID : int, time : System.DateTime) {
		var timeString = time.Year + "-" + 
							time.Month + "-" + time.Day + "-" + 
							time.Hour + "-" + time.Minute + "-" + 
							time.Second + "-" + time.Millisecond;

	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "UPDATE ships SET voyageEndTime = '"+timeString+"' WHERE playerID="+playerID+" AND id="+shipID;
	     reader = dbcmd.ExecuteReader();
	}

//UPDATE CARGO

	function UpdateCargo (playerID : int, shipID : int, cargoID : int , qty : int) {
	    if(qty>0){
	        dbcmd = dbconn.CreateCommand();
	        dbcmd.CommandText = "UPDATE Cargo SET qty = "+qty+" WHERE playerID="+playerID+" AND cargoID="+cargoID;
	        reader = dbcmd.ExecuteReader();}
	    else{
	        dbcmd = dbconn.CreateCommand();
	        dbcmd.CommandText = "DELETE FROM Cargo WHERE playerID="+playerID+" AND cargoID="+cargoID;
	        reader = dbcmd.ExecuteReader();
	    
	    }

		// IF AMOUNT <= 0 DELETE 🙂 
	}

//UPDATE TRADE QUEST

	function DeleteTradeQuest (playerID : int, questID : int) {
		dbcmd = dbconn.CreateCommand();
	    dbcmd.CommandText = "DELETE FROM TradeQuest WHERE playerID="+playerID+" AND questID="+questID;
	    reader = dbcmd.ExecuteReader();
	}

//UPDATE TRANSLATION QUEST

    function FinishTranslationQuest (playerID : int, translationQuestID : int, playerAnswer : String) {
	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "UPDATE ships SET playerID = "+playerID+" WHERE translationQuestID="+translationQuestID+" AND playerAnswer='"+playerAnswer+"'";
	     reader = dbcmd.ExecuteReader();
    }
}