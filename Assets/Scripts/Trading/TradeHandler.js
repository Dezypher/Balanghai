#pragma strict

public var playerRef : GameObject;
public var settlementsRef : GameObject;

public var playerCargoList : GameObject;
public var traderCargoList : GameObject;

public var shopIndex : int;
public var amountPanel : GameObject;

private var cargoReference : GameObject;
private var player : Player;
private var trader : Shop;

function Awake () {
	playerRef = GameObject.Find("PlayerStatus");
	settlementsRef = GameObject.Find("Settlements");
	cargoReference = Resources.Load("Reference/CargoReference") as GameObject;

	player = playerRef.GetComponent(PlayerStatus).player;
	trader = settlementsRef.GetComponent(Trader).settlements[player.location].market;
	shopIndex = player.location;
}

function Sell (itemID : int, qty : int) {
	if(qty > 0){
		var shopRatio = settlementsRef.GetComponent(Trader).settlements[shopIndex].market.shopPriceRatio;
		var shopPrices = settlementsRef.GetComponent(Trader).settlements[shopIndex].market.itemPriceRatio;
		var itemPriceRatio : float = 1.0f;
		var priceRatio = shopRatio;
		var price = 0;
		
		for(var i = 0; i < shopPrices.length; i++)
			if(shopPrices[i].itemID == itemID){
				itemPriceRatio = shopPrices[i].ratio;
				break;
			}

		player.notifyQuests(itemID,qty);

		price = cargoReference.GetComponent(CargoRefScript).cargos[itemID].basePrice * priceRatio * itemPriceRatio;
		price *= qty;
		
		//trader.cargo.AddCargo(itemID, qty);
		player.ships[player.currShip].cargo.RemoveCargo(itemID, qty);
				
		playerRef.GetComponent(PlayerStatus).player.gold += price;
		//settlementsRef.GetComponent(Trader).settlements[shopIndex].market.gold -= price;
		
		//amtPanel.GetComponent(AmtPanelScript).Refresh();

		UpdateElements();
	}
}

function Buy (itemID : int, qty : int) {

	if(qty > 0){
		var shopRatio = settlementsRef.GetComponent(Trader).settlements[shopIndex].market.shopPriceRatio;
		var shopPrices = settlementsRef.GetComponent(Trader).settlements[shopIndex].market.itemPriceRatio;
		var itemPriceRatio : float = 1.0f;
		var price = 0;

		for(var i = 0; i < shopPrices.length; i++)
			if(shopPrices[i].itemID == itemID){
				itemPriceRatio = shopPrices[i].ratio;
				break;
			}

		price = cargoReference.GetComponent(CargoRefScript).cargos[itemID].basePrice * itemPriceRatio;
		
		price *= qty;

		if(price <= player.gold){
			var result : boolean = player.ships[player.currShip].cargo.AddCargo(itemID, qty);
			//trader.cargo.RemoveCargo(itemID, qty);

			if(result)	
				player.gold -= price;
			//trader.gold -= price;
			
			//amtPanel.GetComponent(AmtPanelScript).Refresh();

			AlertHandler.AlertPopup("Transaction successful!");

			UpdateElements();
		} else {
			AlertHandler.AlertPopup("Insufficient funds!");
		}
	}
}

function GetPrice (itemID : int, qty : int, isTrader : boolean){
	var shopRatio = settlementsRef.GetComponent(Trader).settlements[shopIndex].market.shopPriceRatio;
	var shopPrices = settlementsRef.GetComponent(Trader).settlements[shopIndex].market.itemPriceRatio;
	var itemPriceRatio : float = 1.0f;
	var priceRatio = shopRatio;
	var price = 0;

	if(isTrader)
		priceRatio = 1;

	for(var i = 0; i < shopPrices.length; i++)
		if(shopPrices[i].itemID == itemID){
			itemPriceRatio = shopPrices[i].ratio;
			break;
		}

	price = cargoReference.GetComponent(CargoRefScript).cargos[itemID].basePrice * priceRatio * itemPriceRatio;
	price *= qty;

	return price;
}

function ActivateAmountPanel(character : int, index : int){
	var itemID : int;
	var maxQty : int;

	if(character == 0){
		itemID = player.ships[player.currShip].cargo.GetItem(index).itemID;
		maxQty = player.ships[player.currShip].cargo.GetItem(index).quantity;
	}else {
		itemID = trader.cargo.GetItem(index).itemID;
		maxQty = trader.cargo.GetItem(index).quantity;
	}

	var shopRatio = settlementsRef.GetComponent(Trader).settlements[shopIndex].market.shopPriceRatio;
	var shopPrices = settlementsRef.GetComponent(Trader).settlements[shopIndex].market.itemPriceRatio;
	var itemPriceRatio : float = 1.0f;
	var priceRatio : float = shopRatio;
	var pricePerQty : int = 0;

	if(character == 0)
		pricePerQty = cargoReference.GetComponent(CargoRefScript).cargos[itemID].basePrice * priceRatio * itemPriceRatio;
	else pricePerQty = cargoReference.GetComponent(CargoRefScript).cargos[itemID].basePrice * itemPriceRatio;

	amountPanel.SetActive(true);
	amountPanel.GetComponent(AmtPanelScript).SetItem(itemID, maxQty, pricePerQty, character);
}

function UpdateElements() {
	playerCargoList.GetComponent(ShipCargoDisplay).Instantiate();
}