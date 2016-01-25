#pragma strict
import UnityEngine.SceneManagement;

public var levelId : int;

function ChangeLevel () {
	SceneManager.LoadScene(levelId);
}