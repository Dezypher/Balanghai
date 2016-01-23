#pragma strict

public var filterButton : UI.Button[];

function ToggleEnabled () {
	for(var i = 0; i < filterButton.length; i++){
		filterButton[i].interactable = true;
	}
}

function ToggleExcept (index : int) {
	for(var i = 0; i < filterButton.length; i++){
		filterButton[i].interactable = true;
	}

	filterButton[index].interactable = false;
}