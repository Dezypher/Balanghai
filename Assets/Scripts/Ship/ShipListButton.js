#pragma strict

public var shipName : UI.Text;
public var capacity : UI.Text;
public var shipIcon : UI.Image;
public var shipIndex : int;
public var settlements : Trader;
public var includeSettlement : boolean;

private var shipReference : ShipReference;
private var player : Player;

function Awake () {
	shipReference = (Resources.Load("Reference/ShipReference") as GameObject)
						.GetComponent(ShipReference);
	player = GameObject.Find("PlayerStatus")
						.GetComponent(PlayerStatus).player;
	settlements = GameObject.Find("Settlements")
						.GetComponent(Trader);
}

function SetShip (shipIndex : int) {
	this.shipIndex = shipIndex;
	shipName.text = player.ships[shipIndex].shipName;
	if(includeSettlement)
		shipName.text += " at " + settlements.settlements[player.ships[shipIndex].location].name;

	capacity.text = player.ships[shipIndex].cargo.currWeight
						+ " / " +
						player.ships[shipIndex].capacity;
	shipIcon.sprite = player.ships[shipIndex].icon;
}