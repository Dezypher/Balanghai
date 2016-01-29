#pragma strict

public var player : Player;
public static var playerInstanced = false;

function Awake(){
	if(!playerInstanced){
		playerInstanced = true;
		player.cargo.Start();

		for(var i = 0; i < player.ships.length; i++)
			player.ships[i].cargo.Start();

		DontDestroyOnLoad(this.gameObject);
	}else Destroy(this.gameObject);
}