#pragma strict

public var backgroundHolder : Transform;
public var wavesHolder : Transform;
public var currentBackground : GameObject;
public var instantiated = false;
public var minNumHumans : int;
public var maxNumHumans : int;

private var shipDocked : boolean;
private var ship : GameObject;
private var water : GameObject;
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
	ship = GameObject.Find("Ship");
	water = GameObject.Find("Water");

	shipDocked = true;

	ChangeSprite(settlements.settlements[player.location].backgroundID);
}

function ChangeSprite (settlementID : int) {
	if(!player.ships[player.currShip].traveling){
		if(ship.GetComponent(Animator).GetBool("Traveling"))
			ship.GetComponent(Animator).SetBool("Traveling", false);

		if(!shipDocked){
			ship.GetComponent(Animator).SetTrigger("Docking");
			shipDocked = true;
		}

		water.SetActive(true);

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

		shipDocked = false;

		if(!ship.GetComponent(Animator).GetBool("Traveling"))
			ship.GetComponent(Animator).SetBool("Traveling", true);

		water.SetActive(false);

		var waves : GameObject = 
				Instantiate(backgroundReference.waves);

		waves.transform.SetParent(wavesHolder);
		waves.transform.localScale.x = 1;
		waves.transform.localScale.y = 1;
		waves.transform.localScale.z = 1;
		waves.GetComponent(RectTransform).anchoredPosition = 
			new Vector2 (0, 0);

		currentBackground = waves;
	}
}

function SpawnHumans(backgroundID : int, background: Transform){
	var humanRef : GameObject[] = (Resources.Load("Reference/HumanSpriteList") as GameObject)
								.GetComponent(HumanSpriteList).humanSprites;
	var humanLayer : Transform;
	humanLayer = background.GetChild(2);

	var numHumans = Random.Range(minNumHumans, maxNumHumans);

	for(var i = 0; i < numHumans; i++){
		var ranHuman : int = Random.Range(0, (humanRef.length - 1));
		var human : GameObject = Instantiate(humanRef[ranHuman]) as GameObject;

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