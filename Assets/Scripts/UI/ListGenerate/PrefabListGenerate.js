#pragma strict

public var numPrefabs : int;
public var autoGenerate : boolean;
public var prefabReference : GameObject;
public var spacing : int;
public var panelHeight : int;
public var panelWidth : int;
public var leftPadding : int;
public var topPadding : int;
public var bottomPadding: int;
public var numColumns : int;
public var reposition : boolean;

public var cornerX : float;
public var cornerY : float;
public var visibleHeight : float;

public var generatedPrefabs : GameObject[];

function Start () {
	if(autoGenerate)
		Generate();
}

function Generate () {
	for(var z = 0; z < generatedPrefabs.length; z++)
		Destroy(generatedPrefabs[z]);

	generatedPrefabs = new GameObject[numPrefabs];
	var rowNum = 1;
	var columnIndex = 1;
	var width : float;
	var height : float;
	var rows = Mathf.CeilToInt((numPrefabs* (1.0f)) / numColumns);

	for(var i = 0; i < numPrefabs; i++){
		var newPrefab = Instantiate(prefabReference) as GameObject;

		newPrefab.transform.SetParent(transform);
		newPrefab.transform.localScale.x = 1;
		newPrefab.transform.localScale.y = 1;
		newPrefab.transform.localScale.z = 1;

		generatedPrefabs[i] = newPrefab;

		width = newPrefab.GetComponent(RectTransform).rect.width;
		height = newPrefab.GetComponent(RectTransform).rect.height;

		newPrefab.GetComponent(RectTransform).anchoredPosition = 
			new Vector2 (((spacing * columnIndex) + (width * (columnIndex - 1))) + width/2,
						-(((spacing * rowNum) + (height * (rowNum - 1))) + height/2));

		columnIndex++;
		if(columnIndex > numColumns){
			columnIndex = 1;
			rowNum++;
		}
	}
	panelHeight = ((height + spacing) * (rows)) + spacing;

	GetComponent(RectTransform).sizeDelta = 
		new Vector2 (panelWidth, panelHeight);

	var rect : Rect = GetComponent(RectTransform).rect;
	if(panelHeight < visibleHeight)
		panelHeight = visibleHeight;

	GetComponent(RectTransform).sizeDelta.y = panelHeight;

	GetComponent(RectTransform).anchoredPosition = 
		new Vector2 (cornerX, cornerY - panelHeight);
}