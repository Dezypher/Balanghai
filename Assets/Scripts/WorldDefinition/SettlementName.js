#pragma strict

public var textBox : UI.Text;

function Start () {
	textBox.text = GameObject.Find("Traders").GetComponent(Trader).
				   settlements[GameObject.Find("PlayerStatus").GetComponent(PlayerStatus).
				   player.location].name;
}