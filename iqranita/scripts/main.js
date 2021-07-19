const Btn = {
	A: "ButtonA",
	B: "ButtonB",
	C: "ButtonC",
	D: "ButtonD",
}

// globals
var ThisCorrectEntry = null;
var ThisCorrectBtn = null;

var rootsData = null;

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

    document.getElementById("ButtonA").hidden = false;
    document.getElementById("ButtonB").hidden = false;
    document.getElementById("ButtonC").hidden = false;
    document.getElementById("ButtonD").hidden = false;

    document.getElementById("UIRootWordDefinitionID").hidden = true;
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
    document.getElementById("UIDerivedWordListID").style.fontFamily = fontfamily;
    document.getElementById("UIDerivedWordListID").style.fontSize = "xx-large";
    
    var newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode("\
            @font-face {\
            font-family: " + fontfamily + ";\
            src: url('" + fontlink + "');\
            }\
    "));
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
        document.getElementById("UIRootWordDefinitionID").hidden = false;
        document.getElementById("UIRootWordDefinitionID").innerHTML = GetCorrectEntry()['simple_def'];

        document.getElementById('AnswerState').innerText = 'Correct!'
        document.getElementById('AnswerState').style.color = 'green';

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
            list.appendChild(li);
        }

        document.getElementById('DerivedWordsTitleLabel').hidden = false;
        document.getElementById('NextButton').hidden = false;

    } else {
        document.getElementById('AnswerState').style.color = 'red';
        document.getElementById('AnswerState').innerText = 'Incorrect, try again.'
    }
}

function InitUI() {
    SetFont("east");

    document.getElementById("ButtonA").onclick = function() {SelectAnswer(Btn.A);};
    document.getElementById("ButtonB").onclick = function() {SelectAnswer(Btn.B);};
    document.getElementById("ButtonC").onclick = function() {SelectAnswer(Btn.C);};
    document.getElementById("ButtonD").onclick = function() {SelectAnswer(Btn.D);};

    document.getElementById('NextButton').onclick = function() {NewRound();};

    NewRound();
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