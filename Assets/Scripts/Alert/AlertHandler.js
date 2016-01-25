#pragma strict

static function AlertPopup (alert : String){
	var alertBox : GameObject = 
		Instantiate(Resources.Load("Alert/AlertBox") as GameObject);

	alertBox.GetComponent(AlertText).SetText(alert);
}