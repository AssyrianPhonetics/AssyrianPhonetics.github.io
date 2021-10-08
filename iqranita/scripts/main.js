const Btn = {
	A: "ButtonA",
	B: "ButtonB",
	C: "ButtonC",
	D: "ButtonD",
}

// globals
var ThisCorrectEntry = null;
var ThisCorrectBtn = null;

var score = 0;
var firstTry = true;

var rootsData = null;

function UpdateScore(scoreDiff) {
    score += scoreDiff;
    document.getElementById('UIScoreLabel').innerText = 'Score: ' + score.toString()
}

function Reset() {
    document.getElementById("UIRootWordDisplayID").innerText = '';
    document.getElementById("UIRootWordTransliterationID").innerText = '';
    document.getElementById('AnswerState').innerText = ''
    list = document.getElementById("UIDerivedWordsList");
    deflist = document.getElementById("UIDerivedWordsListDefinitions");
    list.innerHTML = '';
    deflist.innerHTML = '';

    document.getElementById('DerivedWordsTitleLabel').hidden = true;
    document.getElementById('NextButton').hidden = true;
    document.getElementById("UIRootWordDefinition").hidden = true;
    document.getElementById("UIRootWordDefinitionID").hidden = true;
    document.getElementById("DerivedWordsTitleLabel").hidden = true;

    document.getElementById("UIAnswerButtonGroup").hidden = false;
    document.getElementById("ButtonA").hidden = false;
    document.getElementById("ButtonB").hidden = false;
    document.getElementById("ButtonC").hidden = false;
    document.getElementById("ButtonD").hidden = false;
}

function RandomRoot() {
    // Create array of object keys, ["311", "310", ...]
    const keys = Object.keys(rootsData)

    // Generate random index based on number of keys
    const randIndex = Math.floor(Math.random() * keys.length)

    // Select a key from the array of keys using the random index
    const randKey = keys[randIndex]

    // Use the key to get the corresponding name from the "names" object
    return (rootsData[randKey]);
}

function RandomRootButExludeArray(arr) {
    var found = false;
    while(!found) {
        var ent = RandomRoot();
        for (i = 0; i < arr.length; i++) {
            if (ent['simple_def'] == arr[i]['simple_def']) {
                continue;
            }
        }
        found = true;
    }

    return ent;
}

function SetFont(scriptselected) {
    switch (scriptselected) {
        case "east":
            fontfamily = "EastSyriacAdiabene"
            fontlink = "../fonts/syrcomadiabene.woff"
            break;

        case "classical":
            fontfamily = "EstrangeloNisibin"
            fontlink = "../fonts/syrcomnisibin.woff"
            break;

        case "west":
            fontfamily = "SertoJerusalem"
            fontlink = "../fonts/syrcomjerusalem.woff"
            break;
        
        default:
            break;
    }

    document.getElementById("UIRootWordDisplayID").style.fontFamily = fontfamily;
    document.getElementById("UIDerivedWordsList").style.fontFamily = fontfamily;
    document.getElementById("UIDerivedWordListDefs").style.fontFamily = fontfamily;
    document.getElementById("UIDerivedWordListID").style.fontSize = "xx-large";    
    var newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode("\
            @font-face {\
            font-family: " + fontfamily + ";\
            src: url('" + fontlink + "');\
            }\
    "));
    document.head.appendChild(newStyle);
}

function StoreRoundState(CorrectEntry, CorrectBtn) {
    ThisCorrectEntry = CorrectEntry;
    ThisCorrectBtn = CorrectBtn;
}

function GetCorrectBtn() {
    return ThisCorrectBtn;
}

function GetCorrectEntry() {
    return ThisCorrectEntry;
}

function NewRound() {
    Reset()

    const AnswerRoot = RandomRoot();
    const WrongRootOne = RandomRootButExludeArray([AnswerRoot]);
    const WrongRootTwo = RandomRootButExludeArray([AnswerRoot, WrongRootOne]);
    const WrongRootThree = RandomRootButExludeArray([AnswerRoot, WrongRootOne, WrongRootTwo]);

    document.getElementById("UIRootWordDisplayID").innerHTML = AnswerRoot["word"];
    document.getElementById("UIRootWordTransliterationID").innerHTML = InputToIPA(AnswerRoot["word"])[1].toUpperCase();

    var Btns = [Btn.A, Btn.B, Btn.C, Btn.D];
    var CorrectBtn = Btns[Math.floor(Math.random() * Btns.length)];
    var incorrectArr = [WrongRootOne, WrongRootTwo, WrongRootThree];

    for (i = 0; i < Btns.length; i++) {
        if (Btns[i] == CorrectBtn) {
            var thisDef = AnswerRoot['simple_def'];
        } else {
            var thisDef = incorrectArr.pop()['simple_def'];
        }

        document.getElementById(Btns[i]).innerText = thisDef;
    }
    
    StoreRoundState(AnswerRoot, CorrectBtn)
}

function SelectAnswer(selection) {
    switch (selection) {
        case Btn.A:
        case Btn.B:
        case Btn.C:
        case Btn.D:
            // valid
            break;

        default:
            // not valid
            return;
    }

    if (selection == GetCorrectBtn()) {
        document.getElementById("UIRootWordDefinition").hidden = false;
        document.getElementById("UIRootWordDefinitionID").hidden = false;
        document.getElementById("UIRootWordDefinitionID").innerHTML = GetCorrectEntry()['simple_def'];

        document.getElementById('AnswerState').innerText = 'Correct!'
        document.getElementById('AnswerState').style.color = 'green';

        document.getElementById("UIAnswerButtonGroup").hidden = true;
        document.getElementById("ButtonA").hidden = true;
        document.getElementById("ButtonB").hidden = true;
        document.getElementById("ButtonC").hidden = true;
        document.getElementById("ButtonD").hidden = true;
        
        list = document.getElementById("UIDerivedWordsList");
        deflist = document.getElementById("UIDerivedWordsListDefinitions");

        list.innerHTML = '';
        deflist.innerHTML = '';

        for (i = 0; i < GetCorrectEntry()["derived_words"].length; i++) {
            dw = GetCorrectEntry()["derived_words"][i]
            dw_def = GetCorrectEntry()["derived_word_defs"][i]
            
            var defentry = ' [' + InputToIPA(dw)[1] + ']';
            if (dw_def) {
                defentry += ' - ' + dw_def;
            }

            li = document.createElement("li");
            li.innerText = dw;
            li.style.listStyleType = "disc";
            li.style.fontSize = "1.5em";
            list.appendChild(li);

            li = document.createElement("li");
            li.innerText = defentry;
            li.style.fontSize = ".75em";
            li.style.fontFamily = "Verdana,sans-serif";
            list.appendChild(li);
        }

        if (firstTry) {
            UpdateScore(150);
        } else {
            UpdateScore(100);
        }

        document.getElementById('DerivedWordsTitleLabel').hidden = false;
        document.getElementById('NextButton').hidden = false;

        document.getElementById("DerivedWordsTitleLabel").hidden = false;
        firstTry = true;
    } else {
        document.getElementById('AnswerState').style.color = 'red';
        document.getElementById('AnswerState').innerText = 'Incorrect, try again.'

        UpdateScore(-10);
        firstTry = false;
    }
}

function UISetHidden(hidden) {
    document.getElementById("UIScoreLabel").hidden = hidden;
    document.getElementById("UIRootWordDisplayID").hidden = hidden;
    document.getElementById("UIRootWordTransliterationID").hidden = hidden;
    document.getElementById("AnswerState").hidden = hidden;
    document.getElementById("DerivedWordsTitleLabel").hidden = hidden;
    
    document.getElementById("UIWelcomeWindow").hidden = !hidden;
    document.getElementById("ButtonStartGame").hidden = !hidden;

    document.getElementById("NextButton").hidden = hidden;
    document.getElementById("ButtonA").hidden = hidden;
    document.getElementById("ButtonB").hidden = hidden;
    document.getElementById("ButtonC").hidden = hidden;
    document.getElementById("ButtonD").hidden = hidden;
}

function NewGame() {
    UISetHidden(false);
    NewRound();
}

function InitUI() {
    fontfamily = "EstrangeloNisibin"
    fontlink = "../fonts/syrcomnisibin.woff"
    document.getElementById("Header1").style.fontFamily = fontfamily;
    document.getElementById("Header2").style.fontFamily = fontfamily;
    document.getElementById("ButtonStartGame").style.fontFamily = fontfamily;

    var newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode("\
            @font-face {\
            font-family: " + fontfamily + ";\
            src: url('" + fontlink + "');\
            }\
    "));
    document.head.appendChild(newStyle);

    SetFont("east");

    UISetHidden(true);

    document.getElementById("ButtonStartGame").onclick = function() {NewGame();};

    document.getElementById("ButtonA").onclick = function() {SelectAnswer(Btn.A);};
    document.getElementById("ButtonB").onclick = function() {SelectAnswer(Btn.B);};
    document.getElementById("ButtonC").onclick = function() {SelectAnswer(Btn.C);};
    document.getElementById("ButtonD").onclick = function() {SelectAnswer(Btn.D);};

    document.getElementById('NextButton').onclick = function() {NewRound();};
    UpdateScore(0);
}

function InitData() {
    $.getJSON("../data/roots.json", function(json){
        rootsData = json;
        InitUI();
    });
}

$(document).ready(function(){
    InitData();
});