#pragma strict

public var backgroundHolder : Transform;
public var currentBackground : GameObject;

public var instantiated = false;
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
	} else {
		if(instantiated){
			Destroy(currentBackground);
		} else instantiated = true;
	}
}