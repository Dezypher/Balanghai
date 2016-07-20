#pragma strict

class QuestGenerator extends MonoBehaviour {
	var noQuestLabel : GameObject;
	var requiredAmountMax : int = 10;
	var availableQuests : Array = new Array();
	var questList : GameObject;
	var availableButton : UI.Button;
	var currentButton : UI.Button;

	function generateQuest() {
		var cargoTypes = (Resources.Load("Reference/CargoReference") as GameObject).GetComponent(CargoRefScript).cargos.Length;
		var currLocation : int = GameObject.Find("PlayerStatus").GetComponent(PlayerStatus).player.location;
		var requiredCargoID : int = Random.Range(1,3);
		requiredCargoID = GameObject.Find("Settlements").GetComponent(Trader).settlements[currLocation].market.cargo.GetCargoItemID(requiredCargoID);
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
		var locationIndex : int;
		do {
			locationIndex = Random.Range(1,settlementRef.GetComponent(Trader).settlements.length-1);
		}while(currLocation == locationIndex);
		var newQuest = new TradeQuest();
		newQuest.requiredCargoID = requiredCargoID;
		newQuest.requiredCargoAmount = requiredAmount;
		newQuest.rewardCargoID = rewardCargoID;
		newQuest.rewardCargoAmount = rewardAmount;
		newQuest.location = settlementRef.GetComponent(Trader).settlements[locationIndex].name;
		availableQuests.push(newQuest);
	}

	function generateTranslationQuest() {
		var newQuest = new TranslationQuest();
		var cargoTypes = (Resources.Load("Reference/CargoReference") as GameObject).GetComponent(CargoRefScript).cargos.Length;
		var rewardCargoID : int = Random.Range(1,cargoTypes);
		var rewardAmount : int = Random.Range(1,requiredAmountMax);
		var url = "http://127.0.0.1:8081/get_translation_quest";
		var www = new WWW(url);
		yield www;
		if(www.error == null) {
		    newQuest.stringToTranslate = www.text;
		}
		else {
		    Debug.Log("WWW Error: "+ www.error);
		}
		newQuest.rewardCargoID = rewardCargoID;
		newQuest.rewardCargoAmount = rewardAmount;
		availableQuests.push(newQuest);
	}


	function DisplayCurrentQuests() {
		var player : GameObject = GameObject.Find("PlayerStatus"); 
		if(player.GetComponent(PlayerStatus).player.quests.length > 0)
			noQuestLabel.SetActive(false);
		else
			noQuestLabel.SetActive(true);
		questList.GetComponent(PrefabListGenerate).prefabReference.transform.GetChild(0).GetComponent(UI.Image).color = new Color(192/255f,216/255f,125/255f,1f);
		questList.GetComponent(PrefabListGenerate).numPrefabs = player.GetComponent(PlayerStatus).player.quests.length;
		questList.GetComponent(PrefabListGenerate).Generate();
		for(var i : int = 0; i < questList.GetComponent(PrefabListGenerate).generatedPrefabs.length; i++) {
			if(player.GetComponent(PlayerStatus).player.quests[i].GetType() == TradeQuest)
				questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).questModel = player.GetComponent(PlayerStatus).player.quests[i] as TradeQuest;
			else if(player.GetComponent(PlayerStatus).player.quests[i].GetType() == TranslationQuest)
				questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).questModel = player.GetComponent(PlayerStatus).player.quests[i] as TranslationQuest;
			questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).index = i;
			questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).type = 2;
			questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).DisplayQuestDetails();	
		}
		availableButton.interactable = true;
		currentButton.interactable = false;
	}

	function DisplayAvailableQuests() {
		if(availableQuests.length > 0)
			noQuestLabel.SetActive(false);
		else
			noQuestLabel.SetActive(true);
		questList.GetComponent(PrefabListGenerate).prefabReference.transform.GetChild(0).GetComponent(UI.Image).color = new Color(251/255f,251/255f,157/255f,1f);
		questList.GetComponent(PrefabListGenerate).numPrefabs = availableQuests.length;
		questList.GetComponent(PrefabListGenerate).Generate();
		for(var i : int = 0; i < questList.GetComponent(PrefabListGenerate).generatedPrefabs.length; i++) {
				if(availableQuests[i].GetType() == TradeQuest)
					questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).questModel = availableQuests[i] as TradeQuest;
				else if(availableQuests[i].GetType() == TranslationQuest)
					questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).questModel = availableQuests[i] as TranslationQuest;
				questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).index = i;
				questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).type = 1;
				questList.GetComponent(PrefabListGenerate).generatedPrefabs[i].GetComponent(QuestAdapter).DisplayQuestDetails();	
		}
		availableButton.interactable = false;
		currentButton.interactable = true;
	}

	function Start() {
		if(GameObject.Find("AvailableQuest").GetComponent(PersistentQuests).availableQuests == null) {
			for(var i : int = 1; i < 5; i++) {
				generateQuest();
			}
			generateTranslationQuest();
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