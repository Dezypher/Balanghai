#pragma strict

private var shipText : UI.Text;
private var player : Player;

function Start () {
	shipText = GetComponent(UI.Text);
	player = GameObject.Find("PlayerStatus").GetComponent(PlayerStatus)
				.player;
}

function Update () {
	shipText.text = "" + player.ships[player.currShip].shipName;
}