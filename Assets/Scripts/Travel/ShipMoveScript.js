#pragma strict

public var locationList : RectTransform[];
public var map : RectTransform;
public var boatHolder : Ship;
public var boats : RectTransform[];
public var boatimages: Sprite[];
public var shipReference : ShipReference;

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
}


function settoplace(){
	for(var i=0;i<boats.length;i++){
		boats[i].position.x=GetVector3(player.ships[i].location-1).x;
		boats[i].position.y=GetVector3(player.ships[i].location-1).y;
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
	
	return corners[0];
}	

function Distance (x1:float,y1:float,x2:float,y2:float) {
	var d : float;
	d=0;

	

	return d;
}
var dink  : float;
dink=0;
function move(i: int,j: int,boatindex:int){
var dx :float;
var	dy :float;
var d :float;
var cx :float;
var cy :float;

//i= source area
//j= destination
			dx=(GetVector3(i).x-GetVector3(j).x);
			dy=(GetVector3(i).y-GetVector3(j).y);
			
			d=Mathf.Sqrt((dx*dx)+(dy*dy)); 
			cx=dx/d;
			cy=dy/d;
			
			//Debug.Log("THE VALUE_d_"+d);

			if(d>=0){
	 boats[boatindex].position.x=GetVector3(i).x-cx*(dink);
	 boats[boatindex].position.y=GetVector3(i).y-cy*(dink);
	 }
	
}






function Update(){

<<<<<<< Updated upstream

<<<<<<< HEAD
//move(player.ships[0].location+1,2,0);
//move(player.ships[1].location+1,3,1);
=======
move(player.ships[0].location,2,0);
move(player.ships[1].location,3,1);
=======
/*
move(0,1,0);
move(0,2,1);
*/
>>>>>>> Stashed changes
>>>>>>> origin/master
dink=dink+.1;

}