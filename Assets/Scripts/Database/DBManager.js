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
    private var conn : String = "URI=file:" + Application.dataPath + "/Database/balanghai.s3db"; //Path to database.
    private var reader : IDataReader;
    private var dbconn : IDbConnection;
    private var dbcmd : IDbCommand;

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


    //wtf do i do with player ID?(auto increment duhrr);
    dbcmd = dbconn.CreateCommand();
    dbcmd.CommandText = "INSERT INTO playerdata(name,gold) VALUES ("+playerName+","+gold+")";
    reader = dbcmd.ExecuteReader();


}

//CREATE SHIP

 function InsertShip (playerID : int, type : int, location : int, destination : int, voyageStartTime : int, voyageEndTime : int) {
    //Should call InsertCargoHolder 

     dbcmd = dbconn.CreateCommand();
     dbcmd.CommandText = "INSERT INTO ships(playerID,type,location,destination,voyageStartTime,voyageEndTime) VALUES ("+playerID+","+type+","+location+","+destination+","+voyageStartTime+","+voyageEndTime+")";
     reader = dbcmd.ExecuteReader();


}

//CREATE CARGO

 function InsertCargo (shipID : int, cargoID : int, qty : int) {

     dbcmd = dbconn.CreateCommand();
     dbcmd.CommandText = "INSERT INTO playerdata(shipID,cargoID,qty) VALUES ("+shipID+","+cargoID+","+qty+")";
     reader = dbcmd.ExecuteReader();

}

//CREATE TRADE QUEST

 function InsertTradeQuest (playerID : int, rewardCargoID : int, 
				rewardCargoAmt : int, requiredCargoID : int, 
				requiredCargoAmt : int, location : int) {


}

//CREATE TRANSLATION QUEST

 function LoadTranslationQuest (playerID : int) {


}

//UPDATE PLAYER

 function UpdateGold (playerID : int, gold : int) {

     dbcmd = dbconn.CreateCommand();
     dbcmd.CommandText = "UPDATE playerdata SET gold = "+gold+" WHERE playerID="+playerID;
     reader = dbcmd.ExecuteReader();

}

 function UpdateTotalCapacity (playerID : int, totalCapacity : int) {

}	

//UPDATE SHIP

 function UpdateShipLocation (playerID : int, shipID : int, location : int) {
     dbcmd = dbconn.CreateCommand();
     dbcmd.CommandText = "UPDATE ships SET location = "+location+" WHERE playerID="+playerID+"AND shipID="+shipID;
     reader = dbcmd.ExecuteReader();
}

 function UpdateShipDestination (playerID : int, shipID : int, destination : int) {
     dbcmd = dbconn.CreateCommand();
     dbcmd.CommandText = "UPDATE ships SET destination = "+destination+" WHERE playerID="+playerID+"AND shipID="+shipID;
     reader = dbcmd.ExecuteReader();
}

 function UpdateShipVoyageStartTime (playerID : int, shipID : int, time : int) {
     dbcmd = dbconn.CreateCommand();
     dbcmd.CommandText = "UPDATE ships SET voyageStartTime = "+time+" WHERE playerID="+playerID+"AND shipID="+shipID;
     reader = dbcmd.ExecuteReader();
}

 function UpdateShipVoyageEndTime (playerID : int, shipID : int, time : int) {
     dbcmd = dbconn.CreateCommand();
     dbcmd.CommandText = "UPDATE ships SET voyageEndTime = "+time+" WHERE playerID="+playerID+"AND shipID="+shipID;
     reader = dbcmd.ExecuteReader();
}

//UPDATE CARGO

function UpdateCargo (playerID : int, shipID : int, cargoID : int , qty : int) {
    if(qty>0){
        dbcmd = dbconn.CreateCommand();
        dbcmd.CommandText = "UPDATE Cargo SET qty = "+qty+" WHERE cargoHolderID="+playerID+"AND cargoID="+cargoID;
        reader = dbcmd.ExecuteReader();}
    else{
        dbcmd = dbconn.CreateCommand();
        dbcmd.CommandText = "DELETE FROM Cargo WHERE cargoHolderID="+playerID+"AND cargoID="+cargoID;
        reader = dbcmd.ExecuteReader();
    
    }



	// IF AMOUNT <= 0 DELETE :)
}

//UPDATE TRADE QUEST

 function InsertTradeQuest (playerID : int, questID : int, amtGiven : int) {
	
}

 function DeleteTradeQuest (playerID : int, questID : int) {
	
}

//UPDATE TRANSLATION QUEST

     function FinishTranslationQuest (translationQuestID : int) {
        //DELETE QUEST
    }

}