#pragma strict

public var acceleration : float;
public var bound : boolean;
public var maxY : float;
public var minY : float;

private var lastMousePosY : float;
private var rect : Rect;
private var active : boolean;
private var inBounds : boolean;

function Start () {
	active = false;
	inBounds = false;

	minY = GetComponent(RectTransform).anchoredPosition.y;
}

function Update () {
	if(Input.GetMouseButton(0) && inBounds){
		active = true;
	}

	if(Input.GetMouseButtonUp(0)){
		active = false;
	}

	if(active){
		var deltaY = lastMousePosY - Input.mousePosition.y;
		lastMousePosY = Input.mousePosition.y;
			
		transform.position.y -= deltaY * acceleration; 

		var currY = GetComponent(RectTransform).anchoredPosition.y;

		if(currY < minY){
			GetComponent(RectTransform).anchoredPosition.y = minY;
		}else if(currY > maxY){
			GetComponent(RectTransform).anchoredPosition.y = maxY;
		}
	}else {
		lastMousePosY = Input.mousePosition.y;
	}
}

function InBounds(inBounds : boolean){
	this.inBounds = inBounds;
}