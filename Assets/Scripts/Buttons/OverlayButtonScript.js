#pragma strict

public var menuID : int;

private var overlay : GameObject;

function Start () {
	overlay = GameObject.Find("Overlay");
}

function OnClick(){
	overlay.GetComponent(OverlayScript).MenuVisible(menuID);
}