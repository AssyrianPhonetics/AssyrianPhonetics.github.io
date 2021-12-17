/**!
 * @file scripts.js
 * @brief Assyrian Phonetics Tool main scripts file. 
 *        This js file will handle all string --> IPA conversion and speech synthesis
 *
 * @author Sargis S Yonan (sargis@yonan.org)
 * @date 1 March 2021
 */

var westernMode = false;

var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return keys[ keys.length * Math.random() << 0];
};

function processLiveText() {
    $("#input-text").attr("placeholder", '')
    var text = $('#input-text').val();
    let ipaout = InputToIPA(text)
    syripa = ipaout[0]
    syrlatin = ipaout[1]

    if (syripa.length > 0)
    {
        $('.error').hide()

        $('.ipaout').text(syripa).show()
        $('.latinlabel').text("").show()
        $('.latinout').text(syrlatin).show()
    }
    else
    {
        $('.ipaout').hide()
        $('.latinout').hide()
        $('.ipalabel').hide()
        $('.latinlabel').hide()
        $('.error').text("Please enter valid Syriac text").show()
    }

    if (westernMode) {
        def = WesternWordDictionary[text]
    } else {
        def = wordDictionary[text]
    }

    if (def != undefined)
    {
        $('.definition').text(def).show()
    }
    else
    {
        $('.definition').hide()
    }
}

function RandomizeTextBox(placeholder) {
    if (westernMode) {
        var randomElement = randomProperty(WesternWordDictionary)
    } else {
        var randomElement = randomProperty(wordDictionary)
    }

    if (placeholder) {
        $("#input-text").attr("placeholder", randomElement)
    } else {
        $("#input-text").val(randomElement)
        processLiveText()
    }
}

function DropdownSelect() {
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
    document.getElementById("input-text").style.fontFamily = fontfamily;
    $('.scriptex')[0].style.fontFamily = fontfamily;
    var newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode("\
            @font-face {\
            font-family: " + fontfamily + ";\
            src: url('" + fontlink + "');\
            }\
    "));
    document.getElementById("iqralink").style.fontFamily = fontfamily;
    document.getElementById("lexolink").style.fontFamily = fontfamily;
    
    document.head.appendChild(newStyle);
}

$(document).ready(function() {
    $('.scriptex').text("ܐܒܓ").show();

    // set up asides
    setUpInfoAsides();
    setUpSettingAsides();
    DropdownSelect();
    RandomizeTextBox(true);

    loadUrlParams();
    
    $('.talkspeed').text('Talk speed: 100').show()
    $('.talkpitch').text('Talk pitch: 50').show()
    
    var speedslider = document.getElementById("speedslider");
    var pitchslider = document.getElementById("pitchslider");

    speedslider.oninput = function() {
        $('.talkspeed').text('Talk speed: ' + speedslider.value).show()
    }

    pitchslider.oninput = function() {
        $('.talkpitch').text('Talk pitch: ' + pitchslider.value).show()
    }

    $('#random').on('click', function(e) {
        if (westernMode) {
            var randomElement = WesternWordDictionary[Math.floor(Math.random() * WesternWordDictionary.length)];
        } else {
            var randomElement = wordDictionary[Math.floor(Math.random() * wordDictionary.length)];
        }
        
        $("#input-text").val(randomElement)
        processLiveText()
    });

    $('#submit').on('click', function(e) {
        e.preventDefault();

        var text = $('#input-text').val();
        let ipaout = InputToIPA(text)
        syripa = ipaout[0]
        syrlatin = ipaout[1]
        
        if (syripa.length > 0)
        {
            process(syripa, speedslider.value, pitchslider.value)
            $('.error').hide()
            $('.ipalabel').text("IPA:").show()
            $('.ipaout').text(syripa).show()
            $('.latinout').text(syrlatin).show()
        }
        else
        {
            $('.ipaout').hide()
            $('.latinout').hide()
            $('.ipalabel').hide()
            $('.latinlabel').hide()
            $('.error').text("Please enter valid Syriac text").show()
        }
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