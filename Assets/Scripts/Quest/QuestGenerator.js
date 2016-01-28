#pragma strict

class QuestGenerator {

	var requiredAmountMax : int = 10;

	function generateQuest() {
		var cargoTypes = (Resources.Load("Reference/CargoReference") as GameObject).GetComponent(CargoRefScript).cargos.Length;
		var requiredCargoID : int = Random.Range(1,cargoTypes);
		var rewardCargoID : int = Random.Range(1,cargoTypes);
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
		newQuest.location = Random.Range(1,5);
		return newQuest;
	}

}