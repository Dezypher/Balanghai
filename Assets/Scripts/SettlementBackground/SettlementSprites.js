#pragma strict

public var backgroundHolder : Transform;
public var currentBackground : GameObject;
public var instantiated = false;
public var minNumHumans : int;
public var maxNumHumans : int;

private var player : Player;
private var backgroundReference : SettlementSpriteRef;
private var settlements : Trader;

function Start () {
	player = GameObject.Find("PlayerStatus")
				.GetComponent(PlayerStatus).player;
	var backgroundPrefab : GameObject = Resources.Load("Reference/SettlementSpriteRef") as GameObject;
	backgroundReference = backgroundPrefab.GetComponent(SettlementSpriteRef);
	settlements = GameObject.Find("Settlements")
					.GetComponent(Trader);

	ChangeSprite(settlements.settlements[player.location].backgroundID);
}

function ChangeSprite (settlementID : int) {
	if(!player.ships[player.currShip].traveling){
		var backgroundID = settlements.settlements[settlementID].backgroundID;

		if(instantiated){
			Destroy(currentBackground);
		} else instantiated = true;

		var background : GameObject = 
				Instantiate(backgroundReference.backgrounds[backgroundID]);

		background.transform.SetParent(backgroundHolder);
		background.transform.localScale.x = 1;
		background.transform.localScale.y = 1;
		background.transform.localScale.z = 1;
		background.GetComponent(RectTransform).anchoredPosition = 
			new Vector2 (0, 0);

		currentBackground = background;
		SpawnHumans(backgroundID, currentBackground.transform);
	} else {
		if(instantiated){
			Destroy(currentBackground);
		} else instantiated = true;
	}
}

function SpawnHumans(backgroundID : int, background: Transform){
	var humanRef : GameObject[] = (Resources.Load("Reference/HumanSpriteList") as GameObject)
								.GetComponent(HumanSpriteList).humanSprites;
	var humanLayer : Transform;
	humanLayer = background.GetChild(2);

	var numHumans = Random.Range(minNumHumans, maxNumHumans);

	Debug.Log("HUMENS: " + numHumans);

	for(var i = 0; i < numHumans; i++){
		var ranHuman : int = Random.Range(0, (humanRef.length - 1));
		var human : GameObject = Instantiate(humanRef[ranHuman]) as GameObject;

		Debug.Log("Human: " + i);

		human.transform.SetParent(humanLayer);
		human.transform.localScale.x = 1;
		human.transform.localScale.y = 1;
		human.transform.localScale.z = 1;

		var randomPos = Random.Range(backgroundReference.leftLimit[backgroundID],
									 backgroundReference.rightLimit[backgroundID]);

		human.GetComponent(RectTransform).anchoredPosition = 
			new Vector2 (randomPos,
					backgroundReference.locationY[backgroundID]);
	}
}