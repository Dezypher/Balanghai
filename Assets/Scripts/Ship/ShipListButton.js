#pragma strict

public var shipName : UI.Text;
public var capacity : UI.Text;
public var shipIcon : UI.Image;
public var shipIndex : int;

private var shipReference : ShipReference;
private var shipTradeHandler : ShipTradeHandler;
private var player : Player;

function Awake () {
	shipReference = (Resources.Load("Reference/ShipReference") as GameObject)
						.GetComponent(ShipReference);
	shipTradeHandler = GameObject.Find("ShipTradeHandler")
						.GetComponent(ShipTradeHandler);
	player = GameObject.Find("PlayerStatus")
						.GetComponent(PlayerStatus).player;
}

function SetShip (shipIndex : int) {
	this.shipIndex = shipIndex;
	shipName.text = player.ships[shipIndex].shipName;
	capacity.text = player.ships[shipIndex].cargo.currWeight
						+ " / " +
						player.ships[shipIndex].capacity;
	shipIcon.sprite = player.ships[shipIndex].icon;
}