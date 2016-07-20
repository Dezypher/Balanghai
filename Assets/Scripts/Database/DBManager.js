#pragma strict


 import System.Data;
 import Mono.Data.Sqlite;
 import System.Collections.Generic;

function Awake () {
     var db:DBAccess;
     db = new DBAccess();

     var playerStatus : PlayerStatus = GetComponent(PlayerStatus);

     db.connectDB();
     db.InitializeData(playerStatus);
     db.closeDB();

     playerStatus.Instantiate();
 }

 public class DBAccess{

    private var conn : String = "URI=file:" + Application.dataPath + "/Database/balanghai.s3db"; //Path to database.
    private var reader : IDataReader;
    private var dbconn : IDbConnection;
    private var dbcmd : IDbCommand;

    function InitializeData (playerStatus : PlayerStatus) {
      
    //Check if there is already a player

	dbcmd=dbconn.CreateCommand();
	dbcmd.CommandText = "SELECT* From playerdata";
	reader = dbcmd.ExecuteReader();

	if(!reader.Read()){
		Debug.Log("DB is Empty, making new Player");

		//Insert Base Player (500 Gold)
		InsertPlayer (0, 500, "Player", 0);
		//Insert Balanghai Ship
		InsertShip (0,"Balanghai",0, 2, 1, -1, 0, 0);
	}


	/*
		Load all player data from DB 
	*/

	var player : Player = new Player();

         //Load player name and gold
         
	dbcmd=dbconn.CreateCommand();
	dbcmd.CommandText = "SELECT * From playerdata";
	reader = dbcmd.ExecuteReader();

	while (reader.Read())
	{	
		player.playerID = reader.GetInt32(0);
	    player.playerName = reader.GetString(1);
	    player.gold =reader.GetFloat(2);
	}


	//Load player ships

	dbcmd=dbconn.CreateCommand();
	dbcmd.CommandText = "SELECT COUNT(*) from ships";
	reader = dbcmd.ExecuteReader();

	reader.Read();

    // Set to num of results
	var numShips = reader.GetInt32(0);	
	player.ships = new Ship[numShips];

	var shipRef : ShipReference = (Resources.Load("Reference/ShipReference") as GameObject)
										.GetComponent(ShipReference);

	dbcmd=dbconn.CreateCommand();
	dbcmd.CommandText = "SELECT* From ships";
	reader = dbcmd.ExecuteReader();

	var shipIndex = 0;

	while (reader.Read())
	{	

	    var shipType = reader.GetInt32(3); // set 0 to ship type
	    player.ships[shipIndex] = new Ship();

	    player.ships[shipIndex].location = reader.GetInt32(4);
	    player.ships[shipIndex].destination = reader.GetInt32(5);
	    player.ships[shipIndex].voyageStartTime = reader.GetFloat(6);
	    player.ships[shipIndex].voyageEndTime = reader.GetFloat(7);

	    

	    player.ships[shipIndex].shipName = reader.GetString(2); // get shipName from result
	    player.ships[shipIndex].type = shipRef.ships[shipType].type;
	    player.ships[shipIndex].sprite = shipRef.ships[shipType].sprite;
	    player.ships[shipIndex].icon = shipRef.ships[shipType].icon;
	    player.ships[shipIndex].speed = shipRef.ships[shipType].speed;
	    player.ships[shipIndex].capacity = shipRef.ships[shipType].capacity;
	    player.ships[shipIndex].hullStrength = shipRef.ships[shipType].hullStrength;
	    player.ships[shipIndex].shipWidth = shipRef.ships[shipType].shipWidth;
	    player.ships[shipIndex].shipHeight = shipRef.ships[shipType].shipHeight;

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
	dbcmd.CommandText = "SELECT* From TradeQuest";
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
	dbcmd.CommandText = "SELECT* From TranslationQuest";
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

//CREATE SHIP

	function InsertShip (shipID : int,shipName : String,playerID : int, type : int, location : int, destination : int, voyageStartTime : int, voyageEndTime : int) {
	    //Should call InsertCargoHolder 

	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "INSERT INTO ships(id,shipName,playerID,type,location,destination,voyageStartTime,voyageEndTime) VALUES ("+shipID+",'"+shipName+"',"+playerID+","+type+","+location+","+destination+","+voyageStartTime+","+voyageEndTime+")";
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

	function UpdateShipVoyageStartTime (playerID : int, shipID : int, time : float) {
	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "UPDATE ships SET voyageStartTime = "+time+" WHERE playerID="+playerID+" AND id="+shipID;
	     reader = dbcmd.ExecuteReader();
	}

	function UpdateShipVoyageEndTime (playerID : int, shipID : int, time : float) {
	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "UPDATE ships SET voyageEndTime = "+time+" WHERE playerID="+playerID+" AND id="+shipID;
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