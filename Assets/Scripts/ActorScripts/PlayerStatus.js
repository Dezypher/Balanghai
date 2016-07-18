#pragma strict

public var player : Player;
public static var playerInstanced = false;

function Awake(){
	if(!playerInstanced){
		playerInstanced = true;
		player.cargo.Start();
		player.playerID = 2;

		for(var i = 0; i < player.ships.length; i++) {
			player.ships[i].cargo.playerID = player.playerID;
			player.ships[i].cargo.shipID = i;

			player.ships[i].cargo.Start();
		}

		DontDestroyOnLoad(this.gameObject);
	}else Destroy(this.gameObject);
	player.startTimer();
}