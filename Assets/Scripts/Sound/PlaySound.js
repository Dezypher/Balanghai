#pragma strict

public var audioClips : AudioClip[];

private var audioSource : AudioSource;

function Awake(){
	audioSource = GameObject.Find("SoundPlayer")
				.GetComponent(AudioSource);
}

function PlaySound(index : int){
	audioSource.PlayOneShot(audioClips[index]);
}