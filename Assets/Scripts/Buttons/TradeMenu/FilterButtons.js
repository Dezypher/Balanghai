#pragma strict

enum Types{Food, Ore, Weapon, Wood, Art, Textile, Cloths, Misc};
enum InventoryOf{Player, Trader};
enum MenuType{TradeHandler, CargoMenu};

public var filterType : Types;
public var inventory : InventoryOf;
public var menu : MenuType;

private var tradeHandler : GameObject;
private var cargoMenu : GameObject;
private var handler : GameObject;

function Start () {
	tradeHandler = GameObject.Find("TradingHandler");
	cargoMenu = GameObject.Find("CargoMenu");
	handler = transform.parent.gameObject;
}

function OnClick() {
	var filter : int = filterType;
	var inventory : int = inventory;
	var menuType : int = menu;
	
	handler.GetComponent(FilterHandler).ToggleEnabled();
	GetComponent(UI.Button).interactable = false;
	
	if(menu != 0)
		cargoMenu.GetComponent(CargoMenu).Filter(filter);
}