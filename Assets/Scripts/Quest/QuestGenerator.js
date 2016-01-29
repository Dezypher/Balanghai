#pragma strict

class QuestGenerator extends MonoBehaviour {

	var requiredAmountMax : int = 10;
	var questViewRef : GameObject;

	function generateQuestModel() {
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
		var newQuest = new Quest();
		newQuest.requiredCargoID = requiredCargoID;
		newQuest.requiredCargoAmount = requiredAmount;
		newQuest.rewardCargoID = rewardCargoID;
		newQuest.rewardCargoAmount = rewardAmount;
		newQuest.location = settlementRef.GetComponent(Trader).settlements[1].name;
		return newQuest;
	}

	function generateQuest() {
		var newQuest : GameObject = Instantiate(questViewRef);
		newQuest.transform.SetParent(GameObject.Find("Quest List").transform,false);
		newQuest.GetComponent(QuestAdapter).AddQuest(generateQuestModel());
	}

	function Start() {
		generateQuest();
	}

}