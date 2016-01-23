#pragma strict

class ShipButton extends MonoBehaviour {
	var popup : GameObject;

	function Start() {
		popup.SetActive(false);
	}

	function OnClick() {
		popup.SetActive(!popup.activeSelf);
		if(popup.activeSelf == true) {
			//get ship information
		}
	}
}