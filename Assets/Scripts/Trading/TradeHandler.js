﻿#pragma strict

public var playerRef : GameObject;
public var settlementsRef : GameObject;

public var playerCargoList : GameObject;
public var traderCargoList : GameObject;

public var shopIndex : int;
public var amountPanel : GameObject;

private var cargoReference : GameObject;
private var player : Player;
private var trader : Shop;

function Start () {
	playerRef = GameObject.Find("PlayerStatus");
	settlementsRef = GameObject.Find("Settlements");
	cargoReference = Resources.Load("Reference/CargoReference");

	player = playerRef.GetComponent(PlayerStatus).player;
	trader = settlementsRef.GetComponent(Trader).settlements[player.location].market;
	shopIndex = player.location;
	cargoReference = Resources.Load ("Reference/CargoReference");
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

		price = cargoReference.GetComponent(CargoRefScript).cargos[itemID].basePrice * priceRatio * itemPriceRatio;
		price *= qty;
		
		//trader.cargo.AddCargo(itemID, qty);
		player.cargo.RemoveCargo(itemID, qty);
				
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
			player.cargo.AddCargo(itemID, qty);
			//trader.cargo.RemoveCargo(itemID, qty);
					
			player.gold -= price;
			//trader.gold -= price;
			
			//amtPanel.GetComponent(AmtPanelScript).Refresh();

			UpdateElements();
		}
	}
}

function ActivateAmountPanel(character : int, index : int){
	var itemID;
	var maxQty;

	if(character == 0){
		itemID = player.cargo.cargo[index].itemID;
		maxQty = player.cargo.cargo[index].quantity;
	}else {
		itemID = trader.cargo.cargo[index].itemID;
		maxQty = trader.cargo.cargo[index].quantity;
	}

	var shopRatio = settlementsRef.GetComponent(Trader).settlements[shopIndex].market.shopPriceRatio;
	var shopPrices = settlementsRef.GetComponent(Trader).settlements[shopIndex].market.itemPriceRatio;
	var itemPriceRatio : float = 1.0f;
	var priceRatio = shopRatio;
	var pricePerQty = 0;

	if(character == 0)
		pricePerQty = cargoReference.GetComponent(CargoRefScript).cargos[itemID].basePrice * priceRatio * itemPriceRatio;
	else pricePerQty = cargoReference.GetComponent(CargoRefScript).cargos[itemID].basePrice * itemPriceRatio;

	amountPanel.SetActive(true);
	amountPanel.GetComponent(AmtPanelScript).SetItem(itemID, maxQty, pricePerQty, character);
}

function UpdateElements() {
	playerCargoList.GetComponent(PlayerCargo).Instantiate();
}