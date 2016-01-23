#pragma strict

public var mapRect : RectTransform;

private var rect : RectTransform;

function Start () {
	rect = GetComponent(RectTransform);
}

function Update () {
	var corners : Vector3[] = new Vector3[4];
	rect.GetWorldCorners(corners);
	var mapCorners : Vector3[] = new Vector3[4];
	mapRect.GetWorldCorners(mapCorners);

	var x = corners[0].x - mapCorners[0].x;
	var y = corners[0].y - mapCorners[0].y;

	Debug.Log("Anchored Pos X: " + x + " Y: " + y);
}