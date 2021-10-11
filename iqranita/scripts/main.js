const Btn = {
	A: "ButtonA",
	B: "ButtonB",
	C: "ButtonC",
	D: "ButtonD",
}

var Grades = {
    "A+": 0.97,
    "A":  0.93,
    "A-": 0.90,
    "B+": 0.87,
    "B":  0.83,
    "B-": 0.80,
    "C+": 0.77,
    "C":  0.73,
    "C-": 0.70,
    "D+": 0.67,
    "D":  0.63,
    "F":  0.00,
};

// globals
var ThisCorrectEntry = null;
var ThisCorrectBtn = null;

const PreviousAnswers = [];

var score = 0;
var tries = 0;

var rootsData = null;
var keys = null;

const CorrectAnswerScore = 100;

function UpdateTotal() {
    document.getElementById('UIQuestionTracker').innerText = (1 + PreviousAnswers.length).toString() + '/' + keys.length.toString()  
}

function UpdateScore(scoreDiff) {
    score += scoreDiff;
    var gradeStr = ''

    if (PreviousAnswers.length > 0) {    
        var gradePercent = score / PreviousAnswers.length;
        var grade = "F";
    
        for (var key in Grades) {
            if (gradePercent >= 100 * Grades[key]) {
                grade = key;
                break;
            }
        }

        gradeStr = ' - Grade: ' + grade
    }

    document.getElementById('UIScoreLabel').innerText = 'Score: ' + score.toString() + '/' + (PreviousAnswers.length * CorrectAnswerScore).toString() + gradeStr
}

function Reset() {
    document.getElementById("UIRootWordDisplayID").innerText = '';
    document.getElementById("UIRootWordTransliterationID").innerText = '';
    document.getElementById("UIRootWordDefinitionID").innerText = '';
    document.getElementById('AnswerState').innerText = ''
    list = document.getElementById("UIDerivedWordsList");
    deflist = document.getElementById("UIDerivedWordsListDefinitions");
    list.innerHTML = '';
    deflist.innerHTML = '';

    document.getElementById('DerivedWordsSection').hidden = true;
    document.getElementById('NextButton').hidden = true;
    document.getElementById("UIRootWordDefinition").hidden = true;

    document.getElementById("UIAnswerButtonGroup").hidden = false;
    document.getElementById("ButtonA").hidden = false;
    document.getElementById("ButtonB").hidden = false;
    document.getElementById("ButtonC").hidden = false;
    document.getElementById("ButtonD").hidden = false;
}

function RandomRoot() {
    // Generate random index based on number of keys
    const randIndex = Math.floor(Math.random() * keys.length)

    // Select a key from the array of keys using the random index
    const randKey = keys[randIndex]

    // Use the key to get the corresponding name from the "names" object
    return (rootsData[randKey]);
}

function RandomRootButExludeArray(arr) {
    var found = false;

    var ent = RandomRoot();
    while(!found) {
        found = true;

        for (i = 0; i < arr.length; i++) {
            if (ent['word'] == arr[i]['word']) {
                found = false;
                ent = RandomRoot();
                break;
            }
        }
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
    UpdateTotal()

    if (keys.length == PreviousAnswers.length) {
        // game over
        document.getElementById('UIWelcomeText2').innerText = '';
        document.getElementById('UIWelcomeText').innerText = 'Game Over. You scored ' + score.toString() + ' out of a possible score of ' + (CorrectAnswerScore * keys.length).toString()
        document.getElementById('ButtonStartGame').innerText = "ܡܢ݇ܕܪܝܫ݇"
        UISetHidden(true);
    }

    const AnswerRoot = RandomRootButExludeArray(PreviousAnswers);
    PreviousAnswers.push(AnswerRoot)

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

        const nDerivedWords = GetCorrectEntry()["derived_words"].length;

        for (i = 0; i < nDerivedWords; i++) {
            dw = GetCorrectEntry()["derived_words"][i]
            dw_def = GetCorrectEntry()["derived_word_defs"][i]
            
            var defentry = ' [' + InputToIPA(dw)[1] + ']';
            if (dw_def && dw_def.length > 0) {
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

        UpdateScore(CorrectAnswerScore * (4 - tries) / 4);
        
        if (nDerivedWords == 0) {
            document.getElementById('DerivedWordsTitleLabel').innerText = ''
        } else if (nDerivedWords == 1) {
            document.getElementById('DerivedWordsTitleLabel').innerText = 'Derived Word:'
        } else {
            document.getElementById('DerivedWordsTitleLabel').innerText = 'Derived Words:'
        }
        
        document.getElementById('DerivedWordsSection').hidden = false;        
        document.getElementById('NextButton').hidden = false;
        
        tries = 0;
    } else {
        document.getElementById('AnswerState').style.color = 'red';
        document.getElementById('AnswerState').innerText = 'Incorrect, try again.'

        tries++;
    }
}

function UISetHidden(hidden) {
    document.getElementById("UIScoreLabel").hidden = hidden;
    document.getElementById("UIRootWordDisplayID").hidden = hidden;
    document.getElementById("UIRootWordTransliterationID").hidden = hidden;
    document.getElementById("AnswerState").hidden = hidden;
    
    document.getElementById("UIWelcomeWindow").hidden = !hidden;
    // document.getElementById("ButtonStartGame").hidden = !hidden;

    document.getElementById("NextButton").hidden = hidden;
    document.getElementById("ButtonA").hidden = hidden;
    document.getElementById("ButtonB").hidden = hidden;
    document.getElementById("ButtonC").hidden = hidden;
    document.getElementById("ButtonD").hidden = hidden;
}

async function InitData() {
    let response = await fetch('../data/roots.json');
    rootsData = await response.json()
    keys = Object.keys(rootsData)
}

async function NewGame() {
    await InitData();
    InitUI();
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

$(document).ready(function(){
    InitUI();
});