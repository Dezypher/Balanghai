#pragma strict

public var panAmount : float;
public var texts : GameObject[];
public var touchControls : boolean;

private var lastX : float;
private var	lastY : float;

function Start () {
	lastX = Input.mousePosition.x;
	lastY = Input.mousePosition.y;

	for(var i = 0; i < texts.length; i++){
		texts[i].transform.localScale.x = Camera.main.orthographicSize * 3 / 1000;
		texts[i].transform.localScale.y = Camera.main.orthographicSize * 3/ 1000;
	}
}

function Update () {
	if(touchControls){
		if(Input.touchCount > 0){
			lastX = Input.GetTouch(0).deltaPosition.x;
			lastY = Input.GetTouch(0).deltaPosition.y;
		}
	}else if(Input.GetMouseButtonDown(0)){
			lastX = Input.mousePosition.x;
			lastY = Input.mousePosition.y;
	}
	var deltaX : float;
	var deltaY : float;

	if(touchControls){
		if(Input.touchCount > 0){
			deltaX = lastX - Input.GetTouch(0).deltaPosition.x;
			deltaY = lastY - Input.GetTouch(0).deltaPosition.y;
			lastX = Input.GetTouch(0).deltaPosition.x;
			lastY = Input.GetTouch(0).deltaPosition.y;

			Camera.main.transform.position.x += deltaX * panAmount;
			Camera.main.transform.position.y += deltaY * panAmount;
		}
	}else if(Input.GetMouseButton(0)){
		deltaX = lastX - Input.mousePosition.x;
		deltaY = lastY - Input.mousePosition.y;
		lastX = Input.mousePosition.x;
		lastY = Input.mousePosition.y;

		Camera.main.transform.position.x += deltaX * panAmount;
		Camera.main.transform.position.y += deltaY * panAmount;
	}
}

function Zoom (zoomAmt : int) {
	Camera.main.orthographicSize += zoomAmt;

	for(var i = 0; i < texts.length; i++){
		texts[i].transform.localScale.x = Camera.main.orthographicSize * 2 / 1000;
		texts[i].transform.localScale.y = Camera.main.orthographicSize * 2 / 1000;
	}
}