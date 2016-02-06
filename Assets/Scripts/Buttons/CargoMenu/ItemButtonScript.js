#pragma strict

public var amtName : UI.Text;
public var price : UI.Text;
public var typeSprite : UI.RawImage;
public var index : int;

private var cargoReference : GameObject;
private var UIReference : GameObject;
private var tradeHandler : TradeHandler;

function Awake () { 
	cargoReference = Resources.Load("Reference/CargoReference", GameObject);
	UIReference  = Resources.Load("Reference/UIReference", GameObject);
	tradeHandler = GameObject.Find("TradingHandler").GetComponent(TradeHandler);
}

function SetItem (itemID : int, quantity : int) {
	ChangeText(cargoReference.GetComponent(CargoRefScript).cargos[itemID].cargoName);
	var type : int = cargoReference.GetComponent(CargoRefScript).cargos[itemID].type;
	ChangeTypeSprite(UIReference.GetComponent(UIReferenceScript).typeIcons[type]);
	ChangeSprite(cargoReference.GetComponent(CargoRefScript).cargos[itemID].sprite);
	ChangePrice(tradeHandler.GetPrice(itemID, 1, true) + " each");
}

function ChangeText(text : String){
	amtName.text = text;
}

function ChangeTypeSprite(sprite : Texture){
	typeSprite.texture = sprite;
}

function ChangePrice(text : String){
	price.text = text;
}

function ChangeSprite(sprite : Sprite){
	GetComponent(UI.Image).sprite = sprite;
}

function ChangeIndex(index : int){
	this.index = index;
}