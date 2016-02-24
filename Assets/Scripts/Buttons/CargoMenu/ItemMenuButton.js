#pragma strict

private var itemMenuHandler : OpenItemMenu;

function Start () {
	itemMenuHandler = GameObject.Find("ItemMenuHandler")
						.GetComponent(OpenItemMenu);
}

function Activate() {
	var itemIndex = GetComponent(CargoButton).index;
	itemMenuHandler.Activate(itemIndex);
}