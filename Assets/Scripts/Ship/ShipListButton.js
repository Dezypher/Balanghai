#pragma strict

public var shipName : UI.Text;
public var capacity : UI.Text;
public var shipIcon : UI.Image;

private var shipReference : ShipReference;
private var player : Player;

function Awake () {
	shipReference = (Resources.Load("Reference/ShipReference") as GameObject)
						.GetComponent(ShipReference);
	player = GameObject.Find("PlayerStatus")
						.GetComponent(PlayerStatus).player;
}

function SetShip (shipIndex : int) {
	shipName.text = player.ships[shipIndex].shipName;
	capacity.text = player.ships[shipIndex].cargo.currWeight
						+ " / " +
						player.ships[shipIndex].capacity;
	shipIcon.sprite = player.ships[shipIndex].icon;
}