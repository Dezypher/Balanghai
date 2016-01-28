#pragma strict

class QuestAdapter extends MonoBehaviour {

	var questModel : Quest;
	var questView : GameObject;

	function DisplayQuestDetails() {
		//update the View with the data from the Model
		var demandCargo : Cargo = (Resources.Load("Reference/CargoReference") as GameObject).GetComponent(CargoRefScript).cargos[questModel.requiredCargoID];
		var rewardCargo : Cargo = (Resources.Load("Reference/CargoReference") as GameObject).GetComponent(CargoRefScript).cargos[questModel.rewardCargoID];
		questView.transform.GetChild(1).transform.GetChild(0).GetComponent(UI.Image).sprite = demandCargo.sprite; //Demand Cargo Image
		questView.transform.GetChild(1).transform.GetChild(1).GetComponent(UI.Text).text = "x " + questModel.requiredCargoAmount; //update the Quantity Text to the amount
		questView.transform.GetChild(2).transform.GetChild(0).GetComponent(UI.Image).sprite = rewardCargo.sprite; //Reward Cargo Image
		questView.transform.GetChild(2).transform.GetChild(1).GetComponent(UI.Text).text = "x " + questModel.rewardCargoAmount;
	}

	function ClaimQuest() {
		var player : GameObject = GameObject.Find("PlayerStatus");
		if(player != null) {
			player.GetComponent(PlayerStatus).player.addQuest(questModel);
		}
	}

}