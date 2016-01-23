#pragma strict

public var settlements : Settlement[];
public static var tradersInstanced = false;

function Awake(){
	if(!tradersInstanced){
		tradersInstanced = true;
		DontDestroyOnLoad(this.gameObject);
	}else Destroy(this.gameObject);
}