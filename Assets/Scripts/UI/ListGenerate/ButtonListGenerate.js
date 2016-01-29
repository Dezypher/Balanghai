#pragma strict

public var totalNumButtons : int;
public var buttonReference : GameObject;
public var rows : int;
public var columns : int;
public var panelHeight : int;
public var panelWidth : int;
public var buttonPadding : int;
public var autoGenerate : boolean = false;

enum Orientation{Vertical, Horizontal};
public var orientation : Orientation;

public var cornerX : float;
public var cornerY : float;
public var visibleHeight : float;

public var buttons : GameObject[];

function Start () {
	if(autoGenerate)
		Generate();
}

function Generate () {
	for(var z = 0; z < buttons.length; z++)
		Destroy(buttons[z]);
	
	buttons = new GameObject[totalNumButtons];

	if(columns == 0)
		columns = Mathf.CeilToInt((totalNumButtons* (1.0f)) / rows);
	else if(rows == 0)
		rows = Mathf.CeilToInt((totalNumButtons* (1.0f)) / columns);

	var spacePadding = buttonPadding * (columns + 1);
	var spaceButton = (panelWidth - spacePadding);
	var buttonDimensions = spaceButton/columns;
	var columnIndex = 1;
	var rowNum = 1;
	var numButtons = 0;
	var panelHeight = (rows * (buttonPadding + buttonDimensions)) + buttonPadding;

	GetComponent(RectTransform).sizeDelta = 
		new Vector2 (panelWidth, panelHeight);

	GetComponent(RectTransform).anchoredPosition = 
		new Vector2 (cornerX, (cornerY - (panelHeight - visibleHeight)));

	for(var i = 0; i < totalNumButtons; i++){
		var newButton = Instantiate(buttonReference) as GameObject;

		newButton.transform.SetParent(transform);
		newButton.transform.localScale.x = 1;
		newButton.transform.localScale.y = 1;
		newButton.transform.localScale.z = 1;

		buttons[numButtons] = newButton;
		numButtons++;

		newButton.GetComponent(RectTransform).sizeDelta = 
			new Vector2 (buttonDimensions, buttonDimensions);
		newButton.GetComponent(RectTransform).anchoredPosition = 
			new Vector2 (((buttonPadding * columnIndex) + (buttonDimensions * (columnIndex - 1))) + buttonDimensions/2,
						-(((buttonPadding * rowNum) + (buttonDimensions * (rowNum - 1))) + buttonDimensions/2) + panelHeight);

		columnIndex++;
		if(columnIndex > columns){
			columnIndex = 1;
			rowNum++;
		}
	}

	var rect : Rect = GetComponent(RectTransform).rect;
	rect.height = ((spaceButton + spacePadding) * rowNum) + spacePadding;
}