#pragma strict


 import System.Data;
 import Mono.Data.Sqlite;
 import System.Collections.Generic;

static function InitializeData () {
	/*
		Load all player data from DB 
	*/
}

//CREATE PLAYER


class dbaccess{






static function InsertPlayer (playerID : int, gold: int, playerName : String, totalCapacity) {

    var conn : String = "URI=file:" + Application.dataPath + "/Database/balanghai.s3db"; //Path to database.
    var reader : IDataReader;
    var dbconn : IDbConnection;
    var dbcmd : IDbCommand;
    dbconn = new SqliteConnection(conn);
    dbconn.Open();


    //wtf do i do with player ID?(auto increment derr);
    dbcmd = dbconn.CreateCommand();
    dbcmd.CommandText = "INSERT INTO playerdata(name,gold) VALUES ("+playerName+","+gold+")";
    reader = dbcmd.ExecuteReader();


    reader.Close();
    reader = null;
    dbcmd.Dispose();
    dbcmd = null;
    dbconn.Close();
    dbconn = null;

}

//CREATE SHIP

static function InsertShip (playerID : int, type : int, location : int, destination : int, voyageStartTime : int, voyageEndTime : int) {
    //Should call InsertCargoHolder 

}

//CREATE CARGO

static function InsertCargo (shipID : int, cargoID : int, qty : int) {

}

//CREATE TRADE QUEST

static function InsertTradeQuest (playerID : int, rewardCargoID : int, 
				rewardCargoAmt : int, requiredCargoID : int, 
				requiredCargoAmt : int, location : int) {


}

//CREATE TRANSLATION QUEST

static function LoadTranslationQuest () {


}

//UPDATE PLAYER

static function UpdateGold (playerID : int, gold : int) {

}

static function UpdateTotalCapacity (playerID : int, totalCapacity : int) {

}	

//UPDATE SHIP

static function UpdateShipLocation (playerID : int, shipID : int, location : int) {
	
}

static function UpdateShipDestination (playerID : int, shipID : int, destination : int) {
	
}

static function UpdateShipVoyageStartTime (playerID : int, shipID : int, time : int) {
	
}

static function UpdateShipVoyageEndTime (playerID : int, shipID : int, time : int) {
	
}

//UPDATE CARGO

static function UpdateCargo (shipID : int, cargoID : int , qty : int) {


	// IF AMOUNT <= 0 DELETE :)
}

//UPDATE TRADE QUEST

static function InsertTradeQuest (playerID : int, questID : int, amtGiven : int) {
	
}

static function DeleteTradeQuest (playerID : int, questID : int) {
	
}

//UPDATE TRANSLATION QUEST

    static function FinishTranslationQuest (translationQuestID : int) {
        //DELETE QUEST
    }

}