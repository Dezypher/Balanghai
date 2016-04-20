#pragma strict

class QuestAdapter extends MonoBehaviour {

	var questModel : Quest;
	var questView : GameObject;
	var index : int;
	var type : int;
	var questUI : QuestGenerator;

	function Awake(){
		questUI = GameObject.Find("QuestUI")
					.GetComponent(QuestGenerator);
	}

	function AddQuest(newQuest : Quest) {
		if(newQuest.GetType() == TradeQuest) {
			questModel = newQuest as TradeQuest;
		}
		else if(newQuest.GetType() == TranslationQuest) {
			questModel = newQuest as TranslationQuest;
		}
		DisplayQuestDetails();
	}

	function DisplayQuestDetails() {
		//update the View with the data from the Model
		if(questModel.GetType() == TradeQuest) {
			var demandCargo : Cargo = (Resources.Load("Reference/CargoReference") as GameObject).GetComponent(CargoRefScript).cargos[(questModel as TradeQuest).requiredCargoID];
			var rewardCargo : Cargo = (Resources.Load("Reference/CargoReference") as GameObject).GetComponent(CargoRefScript).cargos[questModel.rewardCargoID];
			questView.transform.GetChild(2).transform.GetChild(0).GetComponent(UI.Image).sprite = demandCargo.sprite; //Demand Cargo Image
			if((questModel as TradeQuest).requiredCargoAmount > 0)
				questView.transform.GetChild(2).transform.GetChild(1).GetComponent(UI.Text).text = "x " + (questModel as TradeQuest).requiredCargoAmount; //update the Quantity Text to the amount
			else
				questView.transform.GetChild(2).transform.GetChild(1).GetComponent(UI.Text).text = "Complete!";
			questView.transform.GetChild(3).transform.GetChild(0).GetComponent(UI.Image).sprite = rewardCargo.sprite; //Reward Cargo Image
			questView.transform.GetChild(3).transform.GetChild(1).GetComponent(UI.Text).text = "x " + questModel.rewardCargoAmount;
				
			questView.transform.GetChild(1).GetComponent(UI.Text).text = (questModel as TradeQuest).location;
			if(type == 2) {
				//questView.transform.GetChild(4).transform.GetChild(0).GetComponent(UI.Text).fontSize = 50;
				//if(!questModel.accomplished)
					//questView.transform.GetChild(4).transform.GetChild(0).GetComponent(UI.Text).text = "Abandon";
				//else
					//questView.transform.GetChild(4).transform.GetChild(0).GetComponent(UI.Text).text = "Claim";
			}
		}
		else if(questModel.GetType() == TranslationQuest) {
			questView.transform.GetChild(2).GetComponent(UI.Text).text = (questModel as TranslationQuest).stringToTranslate;
		}
	}

	function onButtonClick() {
		var questLists : GameObject = GameObject.Find("Quest List");
		for(var i : int = 0; i < questLists.transform.childCount; i++) {
			questLists.transform.GetChild(i).gameObject.GetComponent(QuestAdapter).index = i;
		}
		if(type == 1) {
			ClaimQuest();
		}
		else if(type == 2) {
			if(!questModel.accomplished)
				AbandonQuest();
			else
				RewardQuest();
		}
	}

	function ClaimQuest() {
		var player : GameObject = GameObject.Find("PlayerStatus");
		if(player != null) {
			player.GetComponent(PlayerStatus).player.addQuest(questModel);
			GameObject.Find("QuestUI").GetComponent(QuestGenerator).RemoveQuest(index);
			questUI.DisplayAvailableQuests();
			GameObject.Destroy(this.gameObject);
		}
	}

	function AbandonQuest() {
		var player : GameObject = GameObject.Find("PlayerStatus");
		if(player != null) {
			player.GetComponent(PlayerStatus).player.removeQuest(index);
			questUI.DisplayCurrentQuests();
			GameObject.Destroy(this.gameObject);
		}
	}

	function RewardQuest() {
		var player : GameObject = GameObject.Find("PlayerStatus");
		if(player != null) {
			questModel.RewardPlayer(player.GetComponent(PlayerStatus).player);
			player.GetComponent(PlayerStatus).player.removeQuest(index);
			var temp : GameObject = Instantiate(Resources.Load("Prefabs/QuestScreen/QuestCompleted")) as GameObject;
			var rewardCargo : Cargo = (Resources.Load("Reference/CargoReference") as GameObject).GetComponent(CargoRefScript).cargos[questModel.rewardCargoID];
			temp.transform.SetParent(GameObject.Find("Canvas").transform,false);
			temp.transform.GetChild(2).GetComponent(UI.Image).sprite = rewardCargo.sprite;
			temp.transform.GetChild(3).GetComponent(UI.Text).text = "x " + questModel.rewardCargoAmount + " added";
			GameObject.Destroy(this.gameObject);
		}
	}

}