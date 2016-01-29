﻿#pragma strict

class CargoHolder {
	public var capacity : int;
	public var amtInCargo : int;
	public var currWeight : int;
	public var cargo = new InventorySlot[capacity];

	private var cargoReference : CargoRefScript;

	function Start(){
		var cargoPrefab : GameObject = Resources.Load("Reference/CargoReference") as GameObject;
		cargoReference = cargoPrefab.GetComponent(CargoRefScript);
		currWeight = 0;
		CalculateWeight();
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
			
			if(!hasCargo){
				var newCargo = new InventorySlot();
				newCargo.itemID = itemID;
				newCargo.quantity = qty;
				
				cargo[amtInCargo] = newCargo;
				amtInCargo++;
			}
		}else {
			// SEND BACK A MESSAGE THAT CAPACITY IS FULL
			Debug.Log("Cargo is full!");
		}
	}

	function RemoveCargo(itemID : int, qty : int){
		var hasCargo = false;

		for(var i = 0; i < amtInCargo; i++){
			if(itemID == cargo[i].itemID){
				hasCargo = true;
				cargo[i].quantity -= qty;
					
				if(cargo[i].quantity <= 0){
					for(var j = i; j < amtInCargo; j++){
						cargo[j] = cargo[j + 1];
					}
					
					cargo[amtInCargo].itemID = 0;
					cargo[amtInCargo].quantity = 0;
					amtInCargo--;
				}
				
				break;
			}
		}
		
		if(!hasCargo){
			//Send error that cargo has not been found
			Debug.Log("ERROR: Tried to remove non existent cargo");
		}
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
}