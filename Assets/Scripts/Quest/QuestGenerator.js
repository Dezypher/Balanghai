#pragma strict

class QuestGenerator extends MonoBehaviour {

	var requiredAmountMax : int = 10;
	var availableQuests : Array = new Array();
	var questList : GameObject;

	function generateQuest() {
		var cargoTypes = (Resources.Load("Reference/CargoReference") as GameObject).GetComponent(CargoRefScript).cargos.Length;
		var requiredCargoID : int = Random.Range(1,cargoTypes);
		var rewardCargoID : int = Random.Range(1,cargoTypes);
		var settlementRef = GameObject.Find("Settlements");
		while(requiredCargoID == rewardCargoID) {
			rewardCargoID = Random.Range(1,cargoTypes);
		}
		var requiredAmount : int = Random.Range(1,requiredAmountMax);
		var rewardAmount : int = Random.Range(1,requiredAmountMax);
		while(rewardAmount < requiredAmount) {
			rewardAmount = Random.Range(1,requiredAmountMax);
		}
		var locationIndex = Random.Range(1,settlementRef.GetComponent(Trader).settlements.length-1);
		var newQuest = new Quest();
		newQuest.requiredCargoID = requiredCargoID;
		newQuest.requiredCargoAmount = requiredAmount;
		newQuest.rewardCargoID = rewardCargoID;
		newQuest.rewardCargoAmount = rewardAmount;
		newQuest.location = settlementRef.GetComponent(Trader).settlements[locationIndex].name;
		availableQuests.push(newQuest);
	}

	function DisplayCurrentQuests() {
		var player : GameObject = GameObject.Find("PlayerStatus"); 
		if(player.GetComponent(PlayerStatus).player.quests.length > 0) {
			questList.GetComponent(PrefabListGenerate).numPrefabs = player.GetComponent(PlayerStatus).player.quests.length;
			questList.GetComponent(PrefabListGenerate).Generate();
			for(var i : int = 0; i < questList.GetComponent(PrefabListGenerate).generatedPrefabs.length; i++) {
				questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).questModel = player.GetComponent(PlayerStatus).player.quests[i] as Quest;
				questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).index = i;
				questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).type = 2;
				questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).DisplayQuestDetails();	
			}
		}
	}

	function DisplayAvailableQuests() {
		if(availableQuests.length > 0) {
			questList.GetComponent(PrefabListGenerate).numPrefabs = availableQuests.length;
			questList.GetComponent(PrefabListGenerate).Generate();
			for(var i : int = 0; i < questList.GetComponent(PrefabListGenerate).generatedPrefabs.length; i++) {
				questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).questModel = availableQuests[i] as Quest;
				questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).index = i;
				questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).type = 1;
				questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).DisplayQuestDetails();	
			}
		}
	}

	function Start() {
		if(GameObject.Find("AvailableQuest").GetComponent(PersistentQuests).availableQuests == null) {
			for(var i : int = 1; i < 5; i++) {
				generateQuest();
			}
			GameObject.Find("AvailableQuest").GetComponent(PersistentQuests).availableQuests = this.availableQuests;
		}
		else {
			availableQuests = GameObject.Find("AvailableQuest").GetComponent(PersistentQuests).availableQuests;
		}
		DisplayAvailableQuests();
	}

	function AvailableButtonClick() {
		DisplayAvailableQuests();
	}

	function CurrentButtonClick() {
		DisplayCurrentQuests();
	}

	function RemoveQuest(index : int) {
		availableQuests.RemoveAt(index);
	}
}