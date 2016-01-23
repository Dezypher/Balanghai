#pragma strict

public var player : Player;
public static var playerInstanced = false;

function Awake(){
	if(!playerInstanced){
		playerInstanced = true;
		player.cargo.Start();
		DontDestroyOnLoad(this.gameObject);
	}else Destroy(this.gameObject);
}