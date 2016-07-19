#pragma strict

public var player : Player;
public static var playerInstanced = false;

function Instantiate(){
	if(!playerInstanced){
		playerInstanced = true;

		for(var i = 0; i < player.ships.length; i++) {
			player.ships[i].cargo.playerID = player.playerID;
			player.ships[i].cargo.shipID = i;

			player.ships[i].cargo.Start();
		}

		DontDestroyOnLoad(this.gameObject);
	}else Destroy(this.gameObject);
	player.startTimer();
}