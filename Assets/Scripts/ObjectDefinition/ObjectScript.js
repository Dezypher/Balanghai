#pragma strict

class Cargo {
	enum Types{Food, Ore, Weapon, Wood, Art, Textile, Cloths, Misc};
	
	var cargoName : String;
	var sprite : Sprite;
	var sound;
	var weight : int;
	var type : Types;
	var basePrice : int;
	
	function GetCargoType(){
		var typeIndex : int = type;
		return typeIndex;
	}
}

class Ship {
	var shipName : String;
	var sprite : Sprite;
	var icon : Sprite;
	var type : int;
	var speed : float;
	var capacity : int;
	var hullStrength : int;
	var location : int;
	var traveling : boolean = false;
	var cargo : CargoHolder;
	var shipWidth : int;
	var shipHeight : int;
	var destination : int = -1;
	var voyageStartTime :float;
	var voyageEndTime :float;
}

class Settlement {
	var name : String;
	var market : Shop;
	var backgroundID : int;
	var coordX : float;
	var coordY : float;
}

class Player {
	var playerName : String;
	var gold : int;
	var totalCapacity : int;
	var currShip : int = 0;
	var ships : Ship[];
	var cargo : CargoHolder;
	var location : int;
	var quests : Array = new Array();
	var time_start : float;


	function addQuest(newQuest : Quest) {
		quests.Push(newQuest);
	}

	function startTimer(){
		time_start=Time.time;
	}

	function removeQuest(index : int) {
		quests.RemoveAt(index);
	}

	function notifyQuests(cargoID : int, quantity : int) {
		for(var i : int = 0; i < quests.length; i++) {
			(quests[i]as Quest).notify(cargoID,quantity);
		}
	}
}

/*
	Shop price ratio gives us how much more gold he'd sell an item than from buying it.
	It is possible that the ratio is 0 which means an item's buy and sell price is the same
	for a shop. (Use percentage in float like 50% is 0.50f, twice the price would be 2.0f)
	
	Item price ratio gives us how much more he'll add/subtract from the base price of an item.
	Use itemID to specify which item it is. If an item is not part of the list, it will
	simply use the base price and the shop price ratio modifier.
*/

class ItemPrice {
	var ratio : float;
	var itemID : int;
}

class Shop {
	var cargo : CargoHolder;
	var shopPriceRatio : float;
	var itemPriceRatio : ItemPrice[];

	var gold : int; // Decided to add this here since 
					   // it's always used for barter
}

class Shipyard {
	var market : Shop;
}

class InventorySlot {
	var itemID : int;
	var quantity : int;
}


class Quest {
	var requiredCargoID : int;
	var requiredCargoAmount : int;
	var rewardCargoID : int;
	var rewardCargoAmount : int;
	var location : String;
	var accomplished : boolean = false;
	var id : int;

	//Check if a ship of a player is located in the location
	function CheckLocation(player : Player) {
		var flag : boolean = false;
		for(var i : int = 0; i < player.ships.Length; i++) {
			if(player.ships[i].location == location) {
				flag = true;
			}
		}
		return flag;
	}

	function CheckCargo(player : Player) {
		//check if a player has a certain cargo and has the the required amount
		return player.cargo.CheckCargo(requiredCargoID,requiredCargoAmount);
	}

	function RewardPlayer(player : Player) {
		player.ships[player.currShip].cargo.AddCargo(rewardCargoID,rewardCargoAmount); //rewardCargo
	}

	function notify(cargoID : int, amount : int) {
		if(cargoID == requiredCargoID) {
			requiredCargoAmount -= amount;
		}
		if(requiredCargoAmount <= 0) {
			accomplished = true;
		}
	}
}

class TranslationQuest {
	var stringToTranslate : String;
	var playerAnswer : String;
	var rewardCargoID : int;
	var isCorrect : boolean;
}