#pragma strict

public var amtName : UI.Text;
public var weightText : UI.Text;
public var typeText : UI.Text;
public var coinText : UI.Text;
public var itemImage : UI.Image;
public var typeSprite : UI.RawImage;
public var index : int;
public var hasPrice : boolean;

private var cargoReference : CargoRefScript;
private var UIReference : UIReferenceScript;
private var tradeHandler : TradeHandler;

function Awake () { 
	cargoReference = Resources.Load("Reference/CargoReference", GameObject)
						.GetComponent(CargoRefScript);
	UIReference  = Resources.Load("Reference/UIReference", GameObject)
						.GetComponent(UIReferenceScript);
	if(hasPrice)
		tradeHandler = GameObject.Find("TradingHandler")
						.GetComponent(TradeHandler);
}

function SetItem (itemID : int, quantity : int) {
	ChangeText(quantity + " " + cargoReference.cargos[itemID].cargoName);
	var type : int = cargoReference.GetComponent(CargoRefScript).cargos[itemID].type;
	var weightText : String;
	weightText = cargoReference.cargos[itemID].weight * quantity + " (" 
				+ cargoReference.cargos[itemID].weight + " each)";
	if(hasPrice)
		ChangePrice(tradeHandler.GetPrice(itemID, 1, false) + " each");
	ChangeWeightText(weightText);
	ChangeTypeText(UIReference.typeName[type]);
	ChangeTypeSprite(UIReference.typeIcons[type]);
	ChangeSprite(cargoReference.cargos[itemID].sprite);
}

function ChangeText(text : String){
	amtName.text = text;
}

function ChangeWeightText(text : String){
	weightText.text = text;
}

function ChangeTypeText(text : String){
	typeText.text = text;
}

function ChangePrice(text : String){
	coinText.text = text;
}

function ChangeTypeSprite(sprite : Texture){
	typeSprite.texture = sprite;
}

function ChangeSprite(sprite : Sprite){
	itemImage.sprite = sprite;
}

function ChangeIndex(index : int){
	this.index = index;
}