#pragma strict

public var btnStart : GameObject;
public var renStart : GameObject;
public var renMenu  : GameObject;

function Start () {
	btnStart = GameObject.Find("start_BTN");
	renStart = GameObject.Find("loading_SCR");
	renMenu  = GameObject.Find("start_SCR");
	renMenu.SetActive(false);
}

function OnClick () {
	renMenu.SetActive(true);
	renStart.SetActive(false);
}