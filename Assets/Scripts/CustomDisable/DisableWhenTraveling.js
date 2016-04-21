#pragma strict

private var player : Player;
private var button : UI.Button;

function Start () {
	player = GameObject.Find("PlayerStatus")
				.GetComponent(PlayerStatus).player;
	button = GetComponent(UI.Button);
}

function Update () {
	if(player.ships[player.currShip].traveling){
		button.interactable = false;
	} else {
		button.interactable = true;
	}
}