#pragma strict

 import System.Data;
 import Mono.Data.Sqlite;
 import System.Collections.Generic;

 
 function Start () {
     var conn : String = "URI=file:" + Application.dataPath + "/Database/balanghai.s3db"; //Path to database.
     var reader : IDataReader;
     var dbconn : IDbConnection;
     dbconn = new SqliteConnection(conn);
     dbconn.Open(); //Open connection to the database.
     var dbcmd : IDbCommand = dbconn.CreateCommand();
 

     //dbcmd.CommandText = "INSERT INTO playerdata(name,gold) VALUES ('dungan',800)";
     //reader = dbcmd.ExecuteReader();

     var query : String;
     query = "DELETE FROM playerdata WHERE name ='dungan' ";
     dbcmd = dbconn.CreateCommand();
     dbcmd.CommandText = query; 
     reader = dbcmd.ExecuteReader();

     var wame : String;

     query = "UPDATE playerdata SET gold = 100 WHERE name="+wame;
     dbcmd = dbconn.CreateCommand();
     dbcmd.CommandText = query; 
     reader = dbcmd.ExecuteReader();



     var sqlQuery : String = "SELECT* From playerdata";
     dbcmd=dbconn.CreateCommand();
     dbcmd.CommandText = sqlQuery;
     reader = dbcmd.ExecuteReader();
    




      
     while (reader.Read())
     {
         reader.GetInt32(0);
         var name : String = reader.GetString(1);
         var gold : float =reader.GetFloat(2);
                  Debug.Log("PUTA"+name+"GOLD:"+gold);
        // Debug.Log( name+"+" +score );
     }
      
     reader.Close();
     reader = null;
     dbcmd.Dispose();
     dbcmd = null;
     dbconn.Close();
     dbconn = null;
      
 }
 

