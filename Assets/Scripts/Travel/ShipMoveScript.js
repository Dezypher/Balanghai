#pragma strict

public var locationList : RectTransform[];
public var map : RectTransform;
private var player : Player;

public var boat : RectTransform[];

function Start () {
	settoplace();
	player = GameObject.Find("PlayerStatus").GetComponent(PlayerStatus).player;

}


function settoplace(){
	for(var i=0;i<boat.length;i++){
		boat[i].position.x=GetVector3(0).x;
		boat[i].position.y=GetVector3(0).y;
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
			
			Debug.Log("THE VALUE_d_"+d);

			if(d>=0){
	 boat[boatindex].position.x=GetVector3(i).x-cx*(dink);
	 boat[boatindex].position.y=GetVector3(i).y-cy*(dink);
	 }
	
}






function Update(){


move(0,1,0);
move(0,2,1);
dink=dink+1;

}