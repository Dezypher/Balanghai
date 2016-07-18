#pragma strict


 import System.Data;
 import Mono.Data.Sqlite;
 import System.Collections.Generic;



 function Start () {
     Debug.Log("hahahha");
     var db:DBAccess;
     db = new DBAccess();

     db.connectDB();
     //db.InsertShip ("barbara",2, 1 , 1, -1, 0, 0);
     db.InitializeData();

     db.closeDB();
 }


 public class DBAccess{

    private var conn : String = "URI=file:" + Application.dataPath + "/Database/balanghai.s3db"; //Path to database.
    private var reader : IDataReader;
    private var dbconn : IDbConnection;
    private var dbcmd : IDbCommand;

     function InitializeData () {
      
         


	/*
		Load all player data from DB 
	*/

	var player : Player = new Player();

         //Load player name and gold
         
	dbcmd=dbconn.CreateCommand();
	dbcmd.CommandText = "SELECT* From playerdata";
	reader = dbcmd.ExecuteReader();

      
	while (reader.Read())
	{

	    player.playerName = reader.GetString(1);
	    player.gold =reader.GetFloat(2);
	}


	Debug.Log(player.gold);


	//Load player ships


	dbcmd=dbconn.CreateCommand();
	dbcmd.CommandText = "SELECT* From ships";
	reader = dbcmd.ExecuteReader();


    // Set to num of results
      var numShips = 0;
	while (reader.Read())
	{
	    numShips++;
	    Debug.Log(reader.GetString(2));


	    var shipType = reader.GetInt32(3); // set 0 to ship type
	    var shipIndex = reader.GetInt32(0);; // set 0 to shipIndex

	    player.ships[shipIndex].location = reader.GetInt32(4);
	    player.ships[shipIndex].destination = reader.GetInt32(5);
	    player.ships[shipIndex].voyageStartTime = reader.GetFloat(6);
	    player.ships[shipIndex].voyageEndTime = reader.GetFloat(7);

	    player.ships[shipIndex] = new Ship();

	    player.ships[shipIndex].shipName = reader.GetString(2); // get shipName from result
	    player.ships[shipIndex].sprite = shipRef.ships[shipType].sprite;
	    player.ships[shipIndex].icon = shipRef.ships[shipType].icon;
	    player.ships[shipIndex].type = shipRef.ships[shipType].type;
	    player.ships[shipIndex].speed = shipRef.ships[shipType].speed;
	    player.ships[shipIndex].capacity = shipRef.ships[shipType].capacity;
	    player.ships[shipIndex].hullStrength = shipRef.ships[shipType].hullStrength;
	    player.ships[shipIndex].shipWidth = shipRef.ships[shipType].shipWidth;
	    player.ships[shipIndex].shipHeight = shipRef.ships[shipType].shipHeight;

	    //Get below from resultset



	}



	 

	player.ships = new Ship[numShips];

	var shipRef : ShipReference = (Resources.Load("Reference/ShipReference") as GameObject)
										.GetComponent(ShipReference);

	//WHILE LOOP ( there is still ships )
	//{
		var shipType = 0; // set 0 to ship type
		var shipIndex = 0; // set 0 to shipIndex

		player.ships[shipIndex] = new Ship();

		player.ships[shipIndex].shipName = ""; // get shipName from result
		player.ships[shipIndex].sprite = shipRef.ships[shipType].sprite;
		player.ships[shipIndex].icon = shipRef.ships[shipType].icon;
		player.ships[shipIndex].type = shipRef.ships[shipType].type;
		player.ships[shipIndex].speed = shipRef.ships[shipType].speed;
		player.ships[shipIndex].capacity = shipRef.ships[shipType].capacity;
		player.ships[shipIndex].hullStrength = shipRef.ships[shipType].hullStrength;
		player.ships[shipIndex].shipWidth = shipRef.ships[shipType].shipWidth;
		player.ships[shipIndex].shipHeight = shipRef.ships[shipType].shipHeight;

		//Get below from resultset
		player.ships[shipIndex].location = 0;
		player.ships[shipIndex].destination = 0;
		player.ships[shipIndex].voyageStartTime = 0;
		player.ships[shipIndex].voyageEndTime = 0;
	//}

	//WHILE LOOP ( there is still cargo where playerID = 0 or wtvr )
	//{
		var shipID = 0; // SHIP ID from table

		var itemID = 0; // ITEM ID
		var qty = 0; // QTY

		player.ships[shipID].cargo.AddCargo(itemID, qty);
	//}

	//TradeQuest Load

	//WHILE LOOP ( there is still trade quest where playerID = 0 or wtvr )
	//{
		var tradeQuest : TradeQuest;

		tradeQuest.rewardCargoID = 0;
		tradeQuest.rewardCargoAmount = 0;
		tradeQuest.requiredCargoID = 0;
		tradeQuest.requiredCargoAmount = 0;
		//tradeQuest.location = 0;

		player.quests.Add(tradeQuest);
	//}

	//WHILE LOOP ( there is still translation quest where playerID = 0 or wtvr )
	//{
		var translationQuest : TranslationQuest;

		var toBeTranslated = "";
		//var rewardCargoID = 0;
		//var rewardCargoAmt = 0;

		player.quests.Add(translationQuest);
	//}
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

	    function InsertShip (shipName : String,playerID : int, type : int, location : int, destination : int, voyageStartTime : int, voyageEndTime : int) {
	    //Should call InsertCargoHolder 

	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "INSERT INTO ships(shipName,playerID,type,location,destination,voyageStartTime,voyageEndTime) VALUES ("+shipName+","+playerID+","+type+","+location+","+destination+","+voyageStartTime+","+voyageEndTime+")";
	     reader = dbcmd.ExecuteReader();
	}

//CREATE CARGO

	function InsertCargo (playerID : int, shipID : int, cargoID : int, qty : int) {

	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "INSERT INTO Cargo(playerID,shipID,cargoID,qty) VALUES ("+playerID+","+shipID+","+cargoID+","+qty+")";
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
	     dbcmd.CommandText = "UPDATE playerdata SET gold = "+gold+" WHERE playerID="+playerID;
	     reader = dbcmd.ExecuteReader();

	}

//UPDATE SHIP

	function UpdateShipLocation (playerID : int, shipID : int, location : int) {
	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "UPDATE ships SET location = "+location+" WHERE playerID="+playerID+" AND shipID="+shipID;
	     reader = dbcmd.ExecuteReader();
	}

	function UpdateShipDestination (playerID : int, shipID : int, destination : int) {
	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "UPDATE ships SET destination = "+destination+" WHERE playerID="+playerID+" AND shipID="+shipID;
	     reader = dbcmd.ExecuteReader();
	}

	function UpdateShipVoyageStartTime (playerID : int, shipID : int, time : int) {
	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "UPDATE ships SET voyageStartTime = "+time+" WHERE playerID="+playerID+" AND shipID="+shipID;
	     reader = dbcmd.ExecuteReader();
	}

	function UpdateShipVoyageEndTime (playerID : int, shipID : int, time : int) {
	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "UPDATE ships SET voyageEndTime = "+time+" WHERE playerID="+playerID+" AND shipID="+shipID;
	     reader = dbcmd.ExecuteReader();
	}

//UPDATE CARGO

	function UpdateCargo (playerID : int, shipID : int, cargoID : int , qty : int) {
	    if(qty>0){
	        dbcmd = dbconn.CreateCommand();
	        dbcmd.CommandText = "UPDATE Cargo SET qty = "+qty+" WHERE playerID =" + playerID + "shipID="+shipID+" AND cargoID="+cargoID;
	        reader = dbcmd.ExecuteReader();}
	    else{
	        dbcmd = dbconn.CreateCommand();
	        dbcmd.CommandText = "DELETE FROM Cargo WHERE playerID="+playerID+" AND cargoID="+ cargoID + " AND shipID=" + shipID;
	        reader = dbcmd.ExecuteReader();
	    
	    }
	}

//UPDATE TRADE QUEST

	function DeleteTradeQuest (playerID : int, questID : int) {
		dbcmd = dbconn.CreateCommand();
	    dbcmd.CommandText = "DELETE FROM TradeQuest WHERE cargoHolderID="+playerID+" AND questID="+questID;
	    reader = dbcmd.ExecuteReader();
	}

//UPDATE TRANSLATION QUEST

    function FinishTranslationQuest (playerID : int, translationQuestID : int, playerAnswer : String) {
	     dbcmd = dbconn.CreateCommand();
	     dbcmd.CommandText = "UPDATE ships SET playerID = "+playerID+" WHERE translationQuestID="+translationQuestID+" AND playerAnswer='"+playerAnswer+"'";
	     reader = dbcmd.ExecuteReader();
    }
}