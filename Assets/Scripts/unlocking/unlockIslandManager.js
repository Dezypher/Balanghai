#pragma strict

public var location : int;
public var locationName : UI.Text;
public var costText : UI.Text;

public var player : Player;
public var settlements : Settlement[];
public var lockimage : Sprite;
public var placeimage: Sprite;
public var currentimage : UI.Image[];
public var unlockPanel : GameObject;

function Start () {
	player = GameObject.Find("PlayerStatus")
				.GetComponent(PlayerStatus).player;
	settlements = GameObject.Find("Settlements").GetComponent(Trader).settlements;
	setactiveimages();
}

function SetLocation(location : int) {
	if(!settlements[location].unlocked)	{
		this.location = location;
		locationName.text = settlements[location].name;
		costText.text =settlements[location].price+"";
	} else {
		unlockPanel.SetActive(false);
		AlertHandler.AlertPopup("You have already unlocked " + settlements[location].name + "!");
	}
}

function Unlock(){
	if(settlements[location].price<=player.gold){
		player.gold=player.gold-settlements[location].price;
		currentimage[location].sprite = placeimage;
		settlements[location].unlocked= true;
		settlements[location].price=0;

		var dbaccess : DBAccess = new DBAccess();

		dbaccess.connectDB();

		dbaccess.UpdateGold(player.playerID, player.gold);
		dbaccess.UpdateSettlementUnlocked(location,player.playerID, 1);

		dbaccess.closeDB();
		
		//Debug.Log("BAUGHT");
		AlertHandler.AlertPopup("You have unlocked " + settlements[location].name + "!");
	} else {
		AlertHandler.AlertPopup("You don't have enough money to unlock " + settlements[location].name + "!");
	}
}

function setactiveimages(){
		//Debug.Log(settlements.length);
		for(var i=1 ; i < settlements.length ; i++){
			//Debug.Log("i: " + i);
			if(settlements[i].unlocked){
				currentimage[i].sprite = placeimage;
			}else{
				currentimage[i].sprite = lockimage;
			}
		}
}