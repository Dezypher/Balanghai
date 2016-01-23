#pragma strict

public var currShip : int;
public var baseCapacity : int;
public var shipSprite : UI.Image;
public var shipPopup : GameObject;
public var shipType : UI.Text;
public var shipCapacity : UI.Text;
public var hullStrength : UI.Text;

public var settlementSprites : SettlementSprites;
private var player : Player;
private var shipReference : ShipReference;
private var settlements : Trader;

function Start () {
	player = GameObject.Find("PlayerStatus").GetComponent(PlayerStatus).player;
	var shipPrefab : GameObject = Resources.Load("Reference/ShipReference");
	shipReference = shipPrefab.GetComponent(ShipReference);
	player.location = player.ships[currShip].location;
	SwitchShip(player.currShip);
	currShip = player.currShip;
	settlementSprites = GameObject.Find("SettlementSpritesHandler")
							.GetComponent(SettlementSprites);
}

function SwitchShip (index : int){
	currShip = index;
	if(currShip < 0)
		currShip = player.ships.length - 1;
	else if(currShip >= player.ships.length)
		currShip = 0;

	shipPopup.SetActive(true);
	shipType.text = shipReference.ships[player.ships[currShip].type].shipName;
	shipCapacity.text = "" + shipReference.ships[player.ships[currShip].type].capacity;
	hullStrength.text = "" + shipReference.ships[player.ships[currShip].type].hullStrength;
	shipPopup.SetActive(false);

	shipSprite.sprite = player.ships[currShip].sprite;
	shipSprite.GetComponent(RectTransform).sizeDelta.x = 
					player.ships[currShip].shipWidth;
	shipSprite.GetComponent(RectTransform).sizeDelta.y = 
					player.ships[currShip].shipHeight;

	player.location = player.ships[currShip].location;
	player.currShip = currShip;
	
	settlementSprites.ChangeSprite(player.location);
}

function ShiftShipIndex(num : int){
	SwitchShip(currShip + num);
}

function AddShip(shipID : int, shipName : String){
	var ship : Ship = new Ship();
	ship.shipName = shipName;
	ship.sprite = shipReference.ships[shipID].sprite;
	ship.type = shipReference.ships[shipID].type;
	ship.speed = shipReference.ships[shipID].speed;
	ship.capacity = shipReference.ships[shipID].capacity;
	ship.hullStrength = shipReference.ships[shipID].hullStrength;
	ship.location = 0;
	ship.traveling = false;
	ship.destination = -1;
}