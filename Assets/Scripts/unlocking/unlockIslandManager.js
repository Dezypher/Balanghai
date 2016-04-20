#pragma strict

public var location : int;
public var locationName : UI.Text;
public var costText : UI.Text;

public var player : Player;
public var settlements : Settlement[];



public var lockimage : Sprite;
public var placeimage: Sprite;
public var currentimage : UI.Image[];




function Awake () {
	player = GameObject.Find("PlayerStatus")
				.GetComponent(PlayerStatus).player;
	settlements = GameObject.Find("Settlements").GetComponent(Trader).settlements;
	setactiveimages();

}

function SetLocation(location : int) {
	this.location = location;
	locationName.text = settlements[location].name;
	costText.text =settlements[location].price+"";
}

function Unlock(){
	if(settlements[location].price<=player.gold){
	player.gold=player.gold-settlements[location].price;
	currentimage[location].sprite = placeimage;
	settlements[location].unlocked= true;
	settlements[location].price=0;
			Debug.Log("BAUGHT");
	}

}


function setactiveimages(){

Debug.Log(settlements.length);
	for(var i=1;i<settlements.length;i++){
		Debug.Log("i: " + i);
		if(settlements[i].unlocked){
			currentimage[i].sprite = placeimage;
		}else{
			currentimage[i].sprite = lockimage;
		}
	}


}


