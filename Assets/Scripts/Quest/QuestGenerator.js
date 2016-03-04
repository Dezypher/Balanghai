#pragma strict

class QuestGenerator extends MonoBehaviour {

	var requiredAmountMax : int = 10;
	var spacing : int = 0;
	var questViewRef : GameObject;
	var availableQuests : Array = new Array();

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
			for(var i : int = 0; i < player.GetComponent(PlayerStatus).player.quests.length; i++) {
				var newQuest : GameObject = Instantiate(questViewRef);
				newQuest.transform.SetParent(GameObject.Find("Quest List").transform,false);
				newQuest.transform.position.y += ((i*spacing));
				newQuest.GetComponent(QuestAdapter).index = i;
				newQuest.GetComponent(QuestAdapter).type = 2;
				newQuest.GetComponent(QuestAdapter).AddQuest(player.GetComponent(PlayerStatus).player.quests[i]);
				newQuest.GetComponent(QuestAdapter).questView = newQuest;
			}
		}
	}

	function DisplayAvailableQuests() {
		if(availableQuests.length > 0) {
			for(var i : int = 0; i < availableQuests.length; i++) {
				var newQuest : GameObject = Instantiate(questViewRef);
				newQuest.transform.SetParent(GameObject.Find("Quest List").transform,false);
				newQuest.transform.position.y += ((i*spacing));
				newQuest.GetComponent(QuestAdapter).AddQuest(availableQuests[i]);
				newQuest.GetComponent(QuestAdapter).questView = newQuest;
				newQuest.GetComponent(QuestAdapter).index = i;
				newQuest.GetComponent(QuestAdapter).type = 1;
			}
		}
	}

	function DeleteQuestViews() {
		var questLists : GameObject = GameObject.Find("Quest List");
		for(var i : int = 0; i < questLists.transform.childCount; i++) {
			GameObject.Destroy(questLists.transform.GetChild(i).gameObject);
		}
	}

	function Start() {
		for(var i : int = 1; i < 5; i++) {
			generateQuest();
		}
		DisplayAvailableQuests();
	}

	function AvailableButtonClick() {
		DeleteQuestViews();
		DisplayAvailableQuests();
	}

	function CurrentButtonClick() {
		DeleteQuestViews();
		DisplayCurrentQuests();
	}

	function RemoveQuest(index : int) {
		availableQuests.RemoveAt(index);
	}
}