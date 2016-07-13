﻿#pragma strict

 import System.Data;
 import Mono.Data.Sqlite;
 import System.Collections.Generic;

 
 function Start () {
     var conn : String = "URI=file:" + Application.dataPath + "/DataLite.s3db"; //Path to database.
     
     var dbconn : IDbConnection;
     dbconn = new SqliteConnection(conn);
     dbconn.Open(); //Open connection to the database.
     var dbcmd : IDbCommand = dbconn.CreateCommand();
 
     var sqlQuery : String = "SELECT* From playerdata";
     dbcmd.CommandText = sqlQuery;
     var reader : IDataReader = dbcmd.ExecuteReader();
    
      
     while (reader.Read())
     {
         var name : String = reader.GetString(0);
         var gold : float =reader.GetFloat(1);
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
 
 function Update () {
 
 }