#pragma strict

public static var instanced = false;

function Awake(){
	if(!instanced){
		instanced = true;
		DontDestroyOnLoad(this.gameObject);
	}else Destroy(this.gameObject);
}