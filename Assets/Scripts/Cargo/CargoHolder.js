﻿#pragma strict

import System.Collections.Generic;

class CargoHolder {
	public var capacity : int;
	public var amtInCargo : int;
	public var currWeight : int;

	public var playerID : int;
	public var shipID : int;

	public var cargo : List.<InventorySlot> = new List.<InventorySlot>();
	private var cargoReference : CargoRefScript;

	function Start(){
		var cargoPrefab : GameObject = Resources.Load("Reference/CargoReference") as GameObject;
		cargoReference = cargoPrefab.GetComponent(CargoRefScript);
		currWeight = 0;
		CalculateWeight();
	}

	function AddCargoNoDB(itemID : int, qty : int){
		var hasCargo = false;
		var itemWeight = cargoReference.cargos[itemID].weight * qty; 

		if(currWeight + itemWeight < capacity){
			for(var i = 0; i < amtInCargo; i++){
				if(itemID == cargo[i].itemID){
					hasCargo = true;
					cargo[i].quantity += qty;
					
					break;
				}
			}

			if(!hasCargo){
				var newCargo : InventorySlot = new InventorySlot();
				newCargo.itemID = itemID;
				newCargo.quantity = qty;
				cargo.Add(newCargo);
				amtInCargo++;

				Debug.Log("Adding itemID: " + itemID + " with the qty: " + qty + ".");
				Debug.Log("Cargo ID:  " + cargo[0].itemID);
			}

			CalculateWeight();
			return true;
		}else {
			// SEND BACK A MESSAGE THAT CAPACITY IS FULL
			Debug.Log("Cargo is full!");
			AlertHandler.AlertPopup("Your cargo cannot hold that much!");
			return false;
		}
	}

	function AddCargo(itemID : int, qty : int){
		var hasCargo = false;
		var itemWeight = cargoReference.cargos[itemID].weight * qty; 

		if(currWeight + itemWeight < capacity){
			for(var i = 0; i < amtInCargo; i++){
				if(itemID == cargo[i].itemID){
					hasCargo = true;
					cargo[i].quantity += qty;
					
					break;
				}
			}

			var dbaccess : DBAccess = new DBAccess();

			dbaccess.connectDB();

			if(!hasCargo){
				var newCargo : InventorySlot = new InventorySlot();
				newCargo.itemID = itemID;
				newCargo.quantity = qty;
				cargo.Add(newCargo);
				amtInCargo++;

				dbaccess.InsertCargo(playerID, shipID, itemID, GetCargoQuantityByID(itemID));
			} else { 
				dbaccess.UpdateCargo(playerID, shipID, itemID, GetCargoQuantityByID(itemID));
			}

			dbaccess.closeDB();

			CalculateWeight();
			return true;
		}else {
			// SEND BACK A MESSAGE THAT CAPACITY IS FULL
			Debug.Log("Cargo is full!");
			AlertHandler.AlertPopup("Your cargo cannot hold that much!");
			return false;
		}
	}

	function RemoveCargo(itemID : int, qty : int){
		var hasCargo = false;

		for(var i = 0; i < amtInCargo; i++){
			if(itemID == cargo[i].itemID){
				hasCargo = true;
				cargo[i].quantity -= qty;
					
				if(cargo[i].quantity <= 0){
					cargo.RemoveAt(i);
					amtInCargo--;
				}

				var dbaccess : DBAccess = new DBAccess();

				dbaccess.connectDB();
				dbaccess.UpdateCargo(playerID, shipID, itemID, GetCargoQuantityByID(itemID));
				dbaccess.closeDB();


				break;
			}
		}
		
		if(!hasCargo){
			//Send error that cargo has not been found
			Debug.Log("ERROR: Tried to remove non existent cargo");
		}

		CalculateWeight();
	}

	function CheckCargo(itemID : int, qty : int){
		var hasCargo = false;

		for(var i = 0; i < amtInCargo; i++){
				if(itemID == cargo[i].itemID){
					if(qty <= cargo[i].quantity)
						hasCargo = true;
					break;
				}
			}

		return hasCargo;
	}

	function GetItem(index : int){
		return cargo[index];
	}	

	function CalculateWeight(){
		currWeight = 0;

		for(var i = 0; i < amtInCargo; i++){
			currWeight += cargo[i].quantity * 
							cargoReference.cargos[cargo[i].itemID].weight;
		}
	}

	function GetCargoItemID(index : int){
		return cargo[index].itemID;
	}

	function GetCargoQuantity(index : int){
		return cargo[index].quantity;
	}

	function GetCargoQuantityByID(itemID : int){
		for(var i = 0; i < amtInCargo; i++){
			if(itemID == cargo[i].itemID){
				return cargo[i].quantity;
			}
		}

		return 0;
	}
}