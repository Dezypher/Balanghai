#pragma strict

class Menu {
	var MenuUI : GameObject;
	var Button : GameObject;
	var noButton : boolean;
}

public var Menus : Menu[];
public var playerNameText : UI.Text;
public var goldText : UI.Text;

function Update() {
	var player = GameObject.Find("PlayerStatus").GetComponent(PlayerStatus).player;
	
	playerNameText.text = player.playerName;
	goldText.text = "" + player.gold;
}

function Start() {
	//First in the array is always enabled
	
	DisableAll();
	
	Menus[0].MenuUI.SetActive(true);
	Menus[0].Button.GetComponent(UI.Button).interactable = false;
}

function MenuVisible(menu : int){
	DisableAll();
	
	Menus[menu].MenuUI.SetActive(true);
	
	if(!Menus[menu].noButton)
		Menus[menu].Button.GetComponent(UI.Button).interactable = false;
}

function DisableAll(){
	for(var i = 0; i < Menus.length; i++){
		Menus[i].MenuUI.SetActive(false);
		
		if(!Menus[i].noButton)
			Menus[i].Button.GetComponent(UI.Button).interactable = true;
	}
}