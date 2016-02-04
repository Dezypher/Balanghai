#pragma strict

class QuestAdapter extends MonoBehaviour {

	var questModel : Quest;
	var questView : GameObject;
	var index : int;
	var type : int;

	function AddQuest(newQuest : Quest) {
		questModel = newQuest;
		DisplayQuestDetails();
	}

	function DisplayQuestDetails() {
		//update the View with the data from the Model
		var demandCargo : Cargo = (Resources.Load("Reference/CargoReference") as GameObject).GetComponent(CargoRefScript).cargos[questModel.requiredCargoID];
		var rewardCargo : Cargo = (Resources.Load("Reference/CargoReference") as GameObject).GetComponent(CargoRefScript).cargos[questModel.rewardCargoID];
		questView.transform.GetChild(1).transform.GetChild(0).GetComponent(UI.Image).sprite = demandCargo.sprite; //Demand Cargo Image
		questView.transform.GetChild(1).transform.GetChild(1).GetComponent(UI.Text).text = "x " + questModel.requiredCargoAmount; //update the Quantity Text to the amount
		questView.transform.GetChild(2).transform.GetChild(0).GetComponent(UI.Image).sprite = rewardCargo.sprite; //Reward Cargo Image
		questView.transform.GetChild(2).transform.GetChild(1).GetComponent(UI.Text).text = "x " + questModel.rewardCargoAmount;
		questView.transform.GetChild(0).GetComponent(UI.Text).text = questModel.location;
		if(type == 2) {
			questView.transform.GetChild(3).transform.GetChild(0).GetComponent(UI.Text).fontSize = 14;
			questView.transform.GetChild(3).transform.GetChild(0).GetComponent(UI.Text).text = "Abandon";
		}
	}

	function ClaimQuest() {
		var player : GameObject = GameObject.Find("PlayerStatus");
		if(player != null) {
			
				player.GetComponent(PlayerStatus).player.addQuest(questModel);
				if(type == 1) {
					GameObject.Find("QuestUI").GetComponent(QuestGenerator).RemoveQuest(index);
				}
				GameObject.Destroy(this.gameObject);
			
		}
	}

}