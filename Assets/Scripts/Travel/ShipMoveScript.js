#pragma strict
//import System;

public var locationList : RectTransform[];
public var map : RectTransform;
public var boatHolder : Ship;
public var boats : RectTransform[];
public var boatimages: Sprite[];
public var shipReference : ShipReference;
private var time_start : float;

//public var boats : Array = new Array();


private var player : Player;

function Start () {
	player = GameObject.Find("PlayerStatus").GetComponent(PlayerStatus).player;
	shipReference = (Resources.Load("Reference/ShipReference") as GameObject)
						.GetComponent(ShipReference);

	//shipReference.ships[1].icon;
	boats = new RectTransform[player.ships.length];
	loadBoats();
	settoplace();

	time_start=Time.time;
	//Debug.Log("time at boats"+time_start);

}


function settoplace(){
	for(var i=0;i<boats.length;i++){
		boats[i].position.x=GetVector3(player.ships[i].location).x;
		boats[i].position.y=GetVector3(player.ships[i].location).y;
	}
}

function loadBoats(){

		for(var i=0;i<boats.length;i++){
			var shipPrefab = Instantiate(Resources.Load("Prefabs/MapScreen/boat")) as GameObject;

			shipPrefab.transform.SetParent(GameObject.Find("BoatLoader").transform);
			shipPrefab.transform.localScale.x = 1;
			shipPrefab.transform.localScale.y = 1;
			shipPrefab.GetComponent(UI.Image).sprite=shipReference.ships[player.ships[i].type].icon;

			//boatHolder = player.ships[0];
			boats[i] = shipPrefab.GetComponent(RectTransform);
		}

}


function GetVector3 (index : int){
	var corners : Vector3[] = new Vector3[4];
 	locationList[index].GetWorldCorners(corners);

 	var x = corners[0].x+locationList[index].sizeDelta.x/2;
 	var y = corners[0].y+locationList[index].sizeDelta.y/2;

 	var vector : Vector3 = new Vector3(x, y, 0);

	return corners[0];


}	

function Distance (x1:float,y1:float,x2:float,y2:float) {
	var d : float;
	d=0;

	

	return d;
}
var dink  : float;
dink=0;





function move(boatindex:int){
	var dx :float;
	var	dy :float;
	var d :float;
	var cx :float;
	var cy :float;
	//var elapsed = Time.time - time_start;
	var elapsed = System.DateTime.Now;

	var total_timeTS 	: System.TimeSpan;
	var voyage_timeTS	: System.TimeSpan;
	var total_time 	: float;
	var voyage_time	: float;
	total_timeTS  = player.ships[boatindex].voyageEndTime-player.ships[boatindex].voyageStartTime;
	voyage_timeTS = elapsed - player.ships[boatindex].voyageStartTime;

	total_time = total_timeTS.TotalSeconds;
	voyage_time = voyage_timeTS.TotalSeconds;


	  //Debug.Log( elapsed + "s have elapsed.");


				dx=(GetVector3(player.ships[boatindex].location).x-GetVector3(player.ships[boatindex].destination).x);
				dy=(GetVector3(player.ships[boatindex].location).y-GetVector3(player.ships[boatindex].destination).y);
				d=Mathf.Sqrt((dx*dx)+(dy*dy)); 
				cx=dx/d;
				cy=dy/d;



				//Debug.DrawLine (GetVector3(player.ships[boatindex].location), GetVector3(player.ships[boatindex].destination), Color.red);




		if(voyage_time<total_time){
			boats[boatindex].position.x=GetVector3(player.ships[boatindex].location).x-cx*((voyage_time/total_time)*d);
			boats[boatindex].position.y=GetVector3(player.ships[boatindex].location).y-cy*((voyage_time/total_time)*d);
			player.ships[boatindex].traveling=true;
			//Debug.Log("moving");
		} else {
			player.ships[boatindex].location=player.ships[boatindex].destination;

			boats[boatindex].position.x=GetVector3(player.ships[boatindex].location).x;
			boats[boatindex].position.y=GetVector3(player.ships[boatindex].location).y;

			//Debug.Log("arrived: at"+player.ships[boatindex].location);
			player.ships[boatindex].destination=-1;

			var dbaccess : DBAccess = new DBAccess();

			dbaccess.connectDB();
			var playerID = player.playerID;

			dbaccess.UpdateShipLocation(playerID, boatindex, player.ships[boatindex].location);
			dbaccess.UpdateShipDestination(playerID, boatindex, -1);

			dbaccess.closeDB();

			player.ships[boatindex].traveling=false;
		}
	}






	function Update(){
	//Debug.DrawLine (Vector3.zero, new Vector3 (500, 500, 0), Color.red);


			for(var i=0;i<boats.length;i++){
				if(player.ships[i].destination>=0){
					move(i);
				}
			}

	//move(player.ships[0].location-1,2,0,3);
	//move(player.ships[1].location-1,4,1,10);


	//dink=dink+.1;

}