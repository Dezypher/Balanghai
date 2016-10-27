#pragma strict

function OnClick(){
    SubmitAnswer();
}

function CloseOnClick() {
    this.gameObject.SetActive(false);
}

function SubmitAnswer() {
    var url = "http://10.100.202.5:8081/post_answer";
    var answer = GameObject.Find("InputField").GetComponent(UnityEngine.UI.InputField).text;
    var form = new WWWForm();
    form.AddField("answer",answer);
    var www = new WWW(url,form);
    yield www;
    if(www.error == null) {
        Debug.Log(www.text);
    }
    else {
        Debug.Log("WWW Error: "+ www.error);
    }
    Destroy(this.gameObject);
}