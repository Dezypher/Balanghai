#pragma strict

public var villageName : UI.Text;
public var playerName : UI.Text;
public var goldAmt : UI.Text;

private var player : Player;
private var settlements : Settlement[];

function Awake () {
	player = GameObject.Find("PlayerStatus").GetComponent(PlayerStatus).player;
	settlements = GameObject.Find("Settlements").GetComponent(Trader).settlements;
}

function Update () {
	villageName.text = settlements[player.location].name;
	playerName.text = player.playerName;
	goldAmt.text = "" + player.gold;
}