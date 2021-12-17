/**!
 * @file scripts.js
 * @brief Assyrian Phonetics Tool main scripts file. 
 *        This js file will handle all string --> IPA conversion and speech synthesis
 *
 * @author Sargis S Yonan (sargis@yonan.org)
 * @date 1 March 2021
 */

var westernMode = false;
var fontfamily = "EastSyriacAdiabene"
var fontlink = "../fonts/syrcomadiabene.woff"

SyrCharDict = {
    'ZQAPPA': 'ܵ',
    'PTAKHA': 'ܲ',
    'ZLAMA_KIRYA': 'ܸ',
    'ZLAMA_YAREKHA': 'ܹ',
    'RWAKHA': 'ܿ',
    'KHWASA': 'ܼ',
    'MAJLEANA_BOT': '̰',
    'TALQANA': '݇'
}

function CountSylls(word) {
    vowels = ['ܵ', 'ܲ', 'ܸ', 'ܹ', 'ܿ', 'ܼ']
    syllcount = 0
    for (let i = 0; i < word.length; i++) {
        for (let v = 0; v < vowels.length; v++) {
            if (word[i] == vowels[v]) {
                syllcount++
            }
        }
    } 
    return syllcount;
}

function ContainsSyrChar(word, vowel_list) {
    vl = []
    vowels_found = []
    for (let i = 0; i < vowel_list.length; i++) {
        vl.push(SyrCharDict[vowel_list[i]])
        vowels_found.push(false)
    }
    
    for (let i = 0; i < word.length; i++) {
        for (let j = 0; j < vowel_list.length; j++) {
            if (word[i] == vl[j]) {
                vowels_found[j] = true
            }
        }
    }

    for (let i = 0; i < vowels_found.length; i++) {
        if (vowels_found[i] == false) {
            return false;
        }
    }

    return true;
}

var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return keys[ keys.length * Math.random() << 0];
};


function DropdownSelect(init) {
    var scriptnamelist = document.getElementById("scriptname");  
    var scriptselected = scriptnamelist.options[scriptnamelist.selectedIndex].value;

    westernMode = false;
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
            westernMode = true;
            break;
        
        default:
            break;
    }
    $('.scriptex')[0].style.fontFamily = fontfamily;
    var newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode("\
            @font-face {\
            font-family: " + fontfamily + ";\
            src: url('" + fontlink + "');\
            }\
    "));
    document.head.appendChild(newStyle);

    var but = document.createElement('search');
    but.style.fontFamily = fontfamily;
    
    // re-run search with new font
    if (!init)
    {
        FilterLexSearch();
    }
}

function FilterLexSearch() {
    filterlist = []
    var filterkeys = Object.keys(SyrCharDict);
    for (var k = 0; k < filterkeys.length; k++) {
        var check = document.getElementById(filterkeys[k]);
        if (check.checked) {
            filterlist.push(filterkeys[k])
        }
    }
    
    list = document.getElementById("UIFoundWords");
    // deflist = document.getElementById("UIDerivedWordsListDefinitions");

    list.innerHTML = '';
    // deflist.innerHTML = '';

    for (const [key, value] of Object.entries(wordDictionary)) {
        word = wordDictionary[key]['word']
        if (ContainsSyrChar(word, filterlist)) {
            definition = wordDictionary[key]['def']

            var defentry = '[' + InputToIPA(word)[1] + ']';
            wordid = wordDictionary[key]['id']
            link = 'http://assyrianlanguages.org/sureth/dosearch.php?searchkey=' + wordid.toString() + '&language=id'

            li = document.createElement("li");
            li.innerHTML = '<a href="' + link + '">' + word + '</a>';
            li.style.listStyleType = "disc";
            li.style.fontFamily = fontfamily;
            li.style.fontSize = "1.5em";
            li.style.textAlign = "right";
            li.style.direction = "rtl";
            li.style.listStyleType = "none"
            list.appendChild(li);
    
            li = document.createElement("li");
            li.innerText = defentry;
            li.style.listStyleType = "none"
            li.style.textAlign = "right";
            li.style.fontSize = ".75em";
            li.style.fontFamily = "Verdana,sans-serif";
            list.appendChild(li);

            if (definition && definition.length > 0) {
                li = document.createElement("li");
                li.innerText = definition;
                li.style.listStyleType = "none"
                li.style.textAlign = "right";
                li.style.fontSize = ".75em";
                li.style.fontFamily = "Verdana,sans-serif";
                list.appendChild(li);
            }

            li = document.createElement("li");
            li.innerText = '\n';
            li.style.listStyleType = "none"
            li.style.textAlign = "right";
            li.style.fontSize = ".75em";
            li.style.fontFamily = "Verdana,sans-serif";
            list.appendChild(li);
        }
    }
}

$(document).ready(function() {
    $('.scriptex').text("ܐܒܓ").show();

    // set up asides
    setUpInfoAsides();
    setUpSettingAsides();
    DropdownSelect(true);

    loadUrlParams();

    $('#search').on('click', function(e) {
        FilterLexSearch()
    });
});

function setUpSettingAsides() {

    // initially hide all asides

    closeSettingAsides();

    // add close to each aside
    $('aside.settings').each(function(idx, $aside) {
        $('<span />', {
            class: 'close',
            text: '×',
        }).appendTo($aside);
    });

    // open corresponding aside based on a[href]

    $('a.settings').on('click', function(e) {
        e.stopPropagation();
        closeSettingAsides();

        $($(this).attr('href')).show();
    });

    // close when click close

    $('aside.settings .close').on('click', function(e) {
        e.stopPropagation();
        closeSettingAsides();
    });

    // close when click off
    $('body').on('click', function(e) {
        e.stopPropagation();
        if ($(e.target).parents('.box').length == 0) {
            closeSettingAsides();
        }
    });

    function closeSettingAsides() {
        $('aside.settings').hide();
    }
}

function setUpInfoAsides() {

    // initially hide all asides

    closeInfoAsides();

    // add close to each aside
    $('aside.info').each(function(idx, $aside) {
        $('<span />', {
            class: 'close',
            text: '×',
        }).appendTo($aside);
    });

    // open corresponding aside based on a[href]

    $('a.info').on('click', function(e) {
        e.stopPropagation();
        closeInfoAsides();

        $($(this).attr('href')).show();
    });

    // close when click close

    $('aside.info .close').on('click', function(e) {
        e.stopPropagation();
        closeInfoAsides();
    });

    // close when click off
    $('body').on('click', function(e) {
        e.stopPropagation();
        if ($(e.target).parents('.box').length == 0) {
            closeInfoAsides();
        }
    });

    function closeInfoAsides() {
        $('aside.info').hide();
    }
}

function loadUrlParams() {
    // grab url params
    var params = new URLSearchParams(window.location.search);

    // parse/load params
    if (params.has('text')) {
        var text = decodeURIComponent(params.get('text'));
        $('#input-text').val(text);
    }
}

function reset() {
    $('#submit').prop('disabled', false);
}