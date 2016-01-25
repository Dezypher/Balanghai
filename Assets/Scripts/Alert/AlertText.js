#pragma strict

public var textUI : UI.Text;

function Start () {
	var canvas : GameObject = GameObject.Find("Canvas");
	transform.SetParent(canvas.transform, false);
}

function SetText (alertText : String) {
	textUI.text = alertText;
}