#pragma strict

public var limitLeft : int;
public var limitRight : int;
public var walkSpeed : int;
public var stopDistance : int;
public var maxIdleTime : int;

private var destination : int;
private var walking : boolean;
public var idleTime : int;
public var tick : float;
private var rect : RectTransform;
private var animator : Animator;

function Start () {
	rect = GetComponent(RectTransform);
	animator = GetComponent(Animator);
	tick = 0;
	idleTime = 0;
}

function Update () {
	if(walking){
		var distance : int = destination - rect.anchoredPosition.x;
		if(distance > -stopDistance && distance < stopDistance){
			tick = 0;
			idleTime = Random.Range(0, maxIdleTime);
			walking = false;
		} else {
			if(destination > rect.anchoredPosition.x){
				rect.anchoredPosition.x += walkSpeed * Time.deltaTime;
				rect.localScale = new Vector3(-1, 1, 1);
			} else {
				rect.anchoredPosition.x -= walkSpeed * Time.deltaTime;
				rect.localScale = new Vector3(1, 1, 1);
			}

			animator.SetBool("Walking", true);
		}
	} else {
		if(tick >= idleTime){
			tick = 0;
			animator.SetBool("Idle", false);
			CreateDestination();
		}else{
			animator.SetBool("Walking", false);
			animator.SetBool("Idle", true);
			tick += Time.deltaTime;
		}
	}
}

function CreateDestination () {
	destination = Random.Range(limitLeft, limitRight);
	walking = true;
}