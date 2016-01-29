#pragma strict

private var text : UI.Text;
private var player : Player;

function Start () {
	text = GetComponent(UI.Text);
	player = GameObject.Find("PlayerStatus").GetComponent(PlayerStatus)
				.player;
}

function Update () {
	text.text = player.ships[player.currShip].cargo.currWeight + "/" + 
				player.ships[player.currShip].cargo.capacity;
}