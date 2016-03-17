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
	//Debug.Log(Time.time);
	time_start=Time.time;
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

			shipPrefab.transform.SetParent(GameObject.Find("Map").transform);
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





function move(i: int,j: int,boatindex:int,totalTime:float){
	var dx :float;
	var	dy :float;
	var d :float;
	var cx :float;
	var cy :float;
	var elapsed = Time.time - time_start;
	  //Debug.Log( elapsed + "s have elapsed.");


				dx=(GetVector3(i).x-GetVector3(j).x);
				dy=(GetVector3(i).y-GetVector3(j).y);
				
				d=Mathf.Sqrt((dx*dx)+(dy*dy)); 
				cx=dx/d;
				cy=dy/d;
				




		if(elapsed<=totalTime){
		boats[boatindex].position.x=GetVector3(i).x-cx*((elapsed/totalTime)*d);
		boats[boatindex].position.y=GetVector3(i).y-cy*((elapsed/totalTime)*d);
		Debug.Log("moving");
		}else{
		player.ships[boatindex].location=player.ships[boatindex].destination;
		//player.ships[boatindex].destination=-1;


		}
		 
		
	}






	function Update(){



			for(var i=0;i<boats.length;i++){
			if(player.ships[i].destination>0){
				move(player.ships[i].location,player.ships[i].destination,i,30);
			}
			}

	//move(player.ships[0].location-1,2,0,3);
	//move(player.ships[1].location-1,4,1,10);


	//dink=dink+.1;

}