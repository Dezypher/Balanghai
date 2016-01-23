#pragma strict

public var heightRatio : float;

function Start () {
	var text = GetComponent(UI.Text);

	text.fontSize = heightRatio * GetComponent(RectTransform).sizeDelta.y;
}