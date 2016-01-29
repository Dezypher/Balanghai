#pragma strict

private var goldText : UI.Text;
private var player : Player;

function Start () {
	goldText = GetComponent(UI.Text);
	player = GameObject.Find("PlayerStatus").GetComponent(PlayerStatus)
				.player;
}

function Update () {
	goldText.text = "" + player.gold;
}