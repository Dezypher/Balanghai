#pragma strict

public var itemPanel : GameObject;
public var itemIndex : int;

function Activate(itemIndex : int){
	itemPanel.SetActive(true);
	this.itemIndex = itemIndex;
}