#pragma strict

private var shipPopupCanvas : GameObject;
private var shipButtons : GameObject[];

function Awake () {
	shipPopupCanvas = GameObject.Find("Ship Popup Canvas");
	
	shipButtons = GameObject.FindGameObjectsWithTag("Ships");
}

function OnClick () {
	shipPopupCanvas.SetActive(true);
	
	for(var i = 0; i < shipButtons.Length; i++) {
		shipButtons[i].GetComponent(UI.Button).interactable = false;
	}
}