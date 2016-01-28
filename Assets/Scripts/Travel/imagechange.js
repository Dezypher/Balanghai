#pragma strict

public var placetolken : UI.Image[];
public var lockimage : Sprite;
public var placeimage: Sprite;

function Start () {

}

function Update () {

}


function changeimage(){

//placetolken[5].sprite=placetolken[0].sprite;
placetolken[5].sprite = placeimage;
}