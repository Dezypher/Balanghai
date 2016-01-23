#pragma strict

public var levelId : int;

function ChangeLevel () {
	Application.LoadLevel(levelId);
}