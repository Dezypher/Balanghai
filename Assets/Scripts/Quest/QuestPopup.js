#pragma strict

function OnClick(){
    SubmitAnswer();
    Destroy(this.gameObject);
}

function CloseOnClick() {
    Destroy(this.gameObject);
}

function SubmitAnswer() {
    var url = "http://127.0.0.1:8081/post_answer";
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
}