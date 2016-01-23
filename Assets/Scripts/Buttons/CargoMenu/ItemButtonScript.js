#pragma strict

public var amtName : UI.Text;
public var typeSprite : UI.RawImage;
public var index : int;

public var cargoReference : GameObject;
private var UIReference : GameObject;

function Awake () { 
	cargoReference = Resources.Load("Reference/CargoReference", GameObject);
	UIReference  = Resources.Load("Reference/UIReference", GameObject);
}

function SetItem (itemID : int, quantity : int) {
	ChangeText(quantity + " " + cargoReference.GetComponent(CargoRefScript).cargos[itemID].cargoName);
	var type : int = cargoReference.GetComponent(CargoRefScript).cargos[itemID].type;
	ChangeTypeSprite(UIReference.GetComponent(UIReferenceScript).typeIcons[type]);
	ChangeSprite(cargoReference.GetComponent(CargoRefScript).cargos[itemID].sprite);
}

function ChangeText(text : String){
	amtName.GetComponent(UI.Text).text = text;
}

function ChangeTypeSprite(sprite : Texture){
	typeSprite.GetComponent(UI.RawImage).texture = sprite;
}

function ChangeSprite(sprite : Sprite){
	GetComponent(UI.Image).sprite = sprite;
}

function ChangeIndex(index : int){
	this.index = index;
}