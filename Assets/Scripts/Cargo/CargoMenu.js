#pragma strict

public var itemButtons : GameObject[];
public var traderID : int;

public var cargoReference : GameObject;
public var UIReference : GameObject;
public var numButtons : int;
public var forTrader : boolean;

//UI Components
public var cargoName : UI.Text;
public var singleWeight : UI.Text;
public var amtInCargo : UI.Text;
public var totalWeight : UI.Text;	
public var itemType : UI.RawImage;
public var cargoImage : UI.Image;

public var infoPanel : GameObject;
public var itemOffset : int;

public var hasPages : boolean;
public var pageNumText : UI.Text;	

private var cargo : CargoHolder;
private var filter : int;
private var displayList : int[];
private var cargoIndex : int[];
private var amtDisplayList : int[];

private var instantiated : boolean;

function Start () {	
	itemOffset = 0;
	
	instantiated = true;
	
	if(!forTrader){
		cargo = GameObject.Find("PlayerStatus").GetComponent(PlayerStatus).player.cargo;
	}else {
		cargo = GameObject.Find("Traders").GetComponent(Trader).settlements[traderID].market.cargo;
	}
	
	displayList = new int[cargo.capacity];
	cargoIndex = new int[cargo.capacity];
	amtDisplayList = new int[cargo.capacity];
	
	if(infoPanel != null)
		infoPanel.SetActive(false);
	filter = 7;
	
	UpdateDisplay();
}

function isInstantiated(){
	return instantiated;
}

function SetSettlementID(settlementID : int){
	traderID = settlementID;
}

function UpdateDisplay() {
	for(var i = 0; i < displayList.length; i++){
		if(i < cargo.capacity){
			displayList[i] = cargo.cargo[i].itemID;
			amtDisplayList[i] = cargo.cargo[i].quantity;
		}else {
			displayList[i] = 0;
			amtDisplayList[i] = 0;
		}
	}
	
	var index = 0;
	
	for(i = 0; i < numButtons; i++){
		if((i + itemOffset) < displayList.length &&displayList[i + itemOffset] != 0 && 
			(cargoReference.GetComponent(CargoRefScript).cargos[cargo.cargo[i + itemOffset].itemID].type == filter || filter == 7)){
			itemButtons[index].SetActive(true);
			itemButtons[index].GetComponent(UI.Image).sprite = cargoReference.GetComponent(CargoRefScript).cargos[displayList[i + itemOffset]].sprite;
			itemButtons[index].GetComponent(ItemButtonScript).ChangeText(amtDisplayList[i + itemOffset] + " " + cargoReference.GetComponent(CargoRefScript).cargos[displayList[i + itemOffset]].cargoName);
			itemButtons[index].GetComponent(ItemButtonScript).ChangeIndex(i + itemOffset);
			var temp : int = cargoReference.GetComponent(CargoRefScript).cargos[displayList[i + itemOffset]].type;
			var newSprite = UIReference.GetComponent(UIReferenceScript).typeMiniIcon[temp];
			itemButtons[index].GetComponent(ItemButtonScript).ChangeTypeSprite(newSprite);
			cargoIndex[index] = i + itemOffset;
			
			index++;
		}
	}
	
	while(index < numButtons){
		itemButtons[index].SetActive(false);
		index++;
	}
	
	if(hasPages){
		var pageNo : int = (itemOffset / numButtons) + 1;
		var maxPage : int = (cargo.capacity / numButtons) + 1;
		
		pageNumText.text = pageNo + "\n----\n" + maxPage; 
	}
}

function UpdateInfo(buttonID : int){
	infoPanel.SetActive(true);
	
	var itemID = cargo.cargo[cargoIndex[buttonID]].itemID;	
	if(itemID != 0){
		cargoName.text = cargoReference.GetComponent(CargoRefScript).cargos[itemID].cargoName;
		singleWeight.text = "" + cargoReference.GetComponent(CargoRefScript).cargos[itemID].weight;
		amtInCargo.text = "" + cargo.cargo[cargoIndex[buttonID]].quantity;
		totalWeight.text = "" + cargo.cargo[cargoIndex[buttonID]].quantity * cargoReference.GetComponent(CargoRefScript).cargos[itemID].weight;
		itemType.texture = UIReference.GetComponent(UIReferenceScript).typeIcons[cargoReference.GetComponent(CargoRefScript).cargos[itemID].type];
		cargoImage.sprite = cargoReference.GetComponent(CargoRefScript).cargos[itemID].sprite;
	}
}

function Reset(){
	infoPanel.SetActive(false);
	filter = 7;
}

function ItemOffsetUp(){
	if((itemOffset + numButtons) < cargo.capacity)
		itemOffset += numButtons;
		
	UpdateDisplay();
}

function ItemOffsetDown(){
	if(itemOffset > 0)
		itemOffset -= numButtons;
		
	UpdateDisplay();
}

function Filter (filter : int){
	this.filter = filter;
	
	UpdateDisplay();
}