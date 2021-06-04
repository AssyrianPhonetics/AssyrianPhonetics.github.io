var IPA_API_ENDPOINT = "https://63gnhg91ph.execute-api.us-west-1.amazonaws.com/production/SyriacToIPA"

$(document).ready(function() {
    // set up voice select

    // setUpVoiceSelect();

    // set up info asides

    setUpInfoAsides();

    // load from url params

    loadUrlParams();

    $('#submit').on('click', function(e) {
        e.preventDefault();

        var text = $('#ipa-text').val();
        
        sendToIPAConverter(text)
    });

    // hide share link until something to share
    // $('.ipaout').text("IPA: ʃlɑmɑ").show()
    // $('#share').show();

});

function process(uipa) {
    // uipa = document.getElementById("ipa-input").value;

    // document.getElementById("download-button").disabled = true;

    // nothing to process      
    if (uipa == null || uipa.length == 0) {
        return;
    }

    //translate
    var mappings = [
        { 'src': /^\s*\//g, 'dest': '' },
        { 'src': /\/\s*$/g, 'dest': '' },

        { 'src': /(\.)/g, 'dest': '%' },
        { 'src': /(\u02c8)/g, 'dest': '\'' },
        { 'src': /(\u02cc)/g, 'dest': ',' },
        { 'src': /(\u02d0)/g, 'dest': ':' },
        { 'src': /(\u0251\u02d0)/g, 'dest': 'A' },
        { 'src': /(\u0251\u0279)/g, 'dest': 'A' },
        { 'src': /(a\u02d0)/g, 'dest': 'A' },

        // feedback from formantzero via r/linguistics
        { 'src': /(\u0329)/g, 'dest': 'r' },  

        // feedback from scharfes_s via r/linguistics
        { 'src': /(\u027e)/g, 'dest': 't' },  
        { 'src': /(\xe6)/g, 'dest': 'a' },
        { 'src': /(a)/g, 'dest': 'a' },
        { 'src': /(\u028c)/g, 'dest': 'V' },
        { 'src': /(\u0252)/g, 'dest': '0' },
        { 'src': /(\u0254)/g, 'dest': '0' },
        { 'src': /(a\u028a)/g, 'dest': 'aU' },
        { 'src': /(\xe6\u0254)/g, 'dest': 'aU' },
        { 'src': /(\u0259)/g, 'dest': '@' },
        { 'src': /(\u025a)/g, 'dest': '3' },
        { 'src': /(\u0259\u02d0)/g, 'dest': '3:' },
        { 'src': /(a\u026a)/g, 'dest': 'aI' },
        { 'src': /(\u028c\u026a)/g, 'dest': 'aI' },
        { 'src': /(\u0251e)/g, 'dest': 'aI' },
        { 'src': /(b)/g, 'dest': 'b' },
        { 'src': /(t\u0283)/g, 'dest': 'tS' },
        { 'src': /(\u02a7)/g, 'dest': 'tS' },
        { 'src': /(d)/g, 'dest': 'd' },
        { 'src': /(\xf0)/g, 'dest': 'D' },
        { 'src': /(\u025b)/g, 'dest': 'E' },
        { 'src': /(e)/g, 'dest': 'E' },
        { 'src': /(\u025d)/g, 'dest': '3:' },
        { 'src': /(\u025c\u02d0)/g, 'dest': '3:' },
        { 'src': /(\u025b\u0259)/g, 'dest': 'e@' },
        { 'src': /(e)/g, 'dest': 'E' },
        { 'src': /(\u025d)/g, 'dest': '3:' },
        { 'src': /(\u025c\u02d0)/g, 'dest': '3:' },
        { 'src': /(e\u026a)/g, 'dest': 'eI' },
        { 'src': /(\xe6\u026a)/g, 'dest': 'eI' },
        { 'src': /(f)/g, 'dest': 'f' },
        { 'src': /(\u0261)/g, 'dest': 'g' },
        { 'src': /(g)/g, 'dest': 'g' },
        { 'src': /(h)/g, 'dest': 'h' },
        { 'src': /(\u026a)/g, 'dest': 'I' },
        { 'src': /(\u0268)/g, 'dest': 'I' },
        { 'src': /(\u026a\u0259)/g, 'dest': 'i@' },
        { 'src': /(\u026a\u0279)/g, 'dest': 'i@' },
        { 'src': /(\u026a\u0279\u0259)/g, 'dest': 'i@3' },
        { 'src': /(i)/g, 'dest': 'i:' },
        { 'src': /(i\u02d0)/g, 'dest': 'i:' },
        { 'src': /(d\u0292)/g, 'dest': 'dZ' },
        { 'src': /(\u02a4)/g, 'dest': 'dZ' },
        { 'src': /(k)/g, 'dest': 'k' },
        { 'src': /(x)/g, 'dest': 'x' },
        { 'src': /(l)/g, 'dest': 'l' },
        { 'src': /(d\u026b)/g, 'dest': 'l' }, 
        { 'src': /(m)/g, 'dest': 'm' },
        { 'src': /(n)/g, 'dest': 'n' },
        { 'src': /(\u014b)/g, 'dest': 'N' },
        { 'src': /(\u0259\u028a)/g, 'dest': 'oU' },
        { 'src': /(o)/g, 'dest': 'oU' },
        { 'src': /(o\u028a)/g, 'dest': 'oU' },
        { 'src': /(\u0259\u0289)/g, 'dest': 'V' },
        { 'src': /(\u0254\u026a)/g, 'dest': 'OI' },
        { 'src': /(o\u026a)/g, 'dest': 'OI' },
        { 'src': /(p)/g, 'dest': 'p' },
        { 'src': /(\u0279)/g, 'dest': 'r' },
        { 'src': /(s)/g, 'dest': 's' },
        { 'src': /(\u0283)/g, 'dest': 'S' },
        { 'src': /(t)/g, 'dest': 't' },
        { 'src': /(\u027e)/g, 'dest': 't' },
        { 'src': /(\u03b8)/g, 'dest': 'T' },
        { 'src': /(\u028a\u0259)/g, 'dest': 'U@' },
        { 'src': /(\u028a\u0279)/g, 'dest': 'U@' },
        { 'src': /(\u028a)/g, 'dest': 'U' },
        { 'src': /(\u0289\u02d0)/g, 'dest': 'u:' },
        { 'src': /(u\u02d0)/g, 'dest': 'u:' },
        { 'src': /(u)/g, 'dest': 'u:' },
        { 'src': /(\u0254\u02d0)/g, 'dest': 'O:' },
        { 'src': /(o\u02d0)/g, 'dest': 'O:' },
        { 'src': /(v)/g, 'dest': 'v' },
        { 'src': /(w)/g, 'dest': 'w' },
        { 'src': /(\u028d)/g, 'dest': 'w' },
        { 'src': /(j)/g, 'dest': 'j' },
        { 'src': /(z)/g, 'dest': 'z' },
        { 'src': /(\u0292)/g, 'dest': 'Z' },
        { 'src': /(\u0294)/g, 'dest': '?' },

        // special edits
        { 'src': /(k\'a2n)/g, 'dest': 'k\'@n' },
        { 'src': /(ka2n)/g, 'dest': 'k@n' },
        { 'src': /(gg)/g, 'dest': 'g' },
        { 'src': /(@U)/g, 'dest': 'oU' },
        { 'src': /rr$/g, 'dest': 'r' },
        { 'src': /3r$/g, 'dest': '3:' },
        { 'src': /([iU]|([AO]:))@r$/g, 'dest': '$1@' },
        { 'src': /([^e])@r/g, 'dest': '$1:3' },
        { 'src': /e@r$/g, 'dest': 'e@' },
        { 'src': /e@r([bdDfghklmnNprsStTvwjzZ])/g, 'dest': 'e@$1' },

        { 'src': /(r)/g, 'dest': 'rR' }, // Resh
        { 'src': /(\u0251)/g, 'dest': 'A:' }, //'A:' }, // Zqappa
        { 'src': /(t\u02e4)/g, 'dest': 't[:' }, // Theth
        { 'src': /(s\u02e4)/g, 'dest': 's' }, // Sadeh
        { 'src': /(\u0295)/g, 'dest': 'a' }, // Eh - ʕ --> a
        
        // edits arising from testing
        { 'src': /(\'k)+/g, 'dest': 'k\'' },  
        { 'src': /(\ː)+/g, 'dest': ':' },
        { 'src': /(\:)+/g, 'dest': ':' },      
        { 'src': /(ᵻ)/g, 'dest': 'I' },
        { 'src': /(ɜ)/g, 'dest': '3' },  
        { 'src': /(ɔ)/g, 'dest': 'O' },  

        // feedback from formantzero via r/linguistics
        { 'src': /\u0361(.)/g, 'dest': '$1\'' },  
        { 'src': /3$/g, 'dest': 'R' }
    ];


    console.log("Passed in UIPA: " + uipa);
    console.log("'" + uipa  + "'");

    unicodeString = "";
    for (var i = 0; i < uipa.length; i++)
    {
        var thisChar = uipa[i];

        // Unicode character
        if (uipa[i] == '\\' && i + 1< uipa.length && uipa[i + 1] == 'u')
        {
            if (i + 5 < uipa.length)
            {
                hexString = uipa[i + 2] + uipa[i + 3] + uipa[i + 4] + uipa[i + 5];                
                thisChar = String.fromCharCode(parseInt(hexString, 16));

                i += 5;
            }
        }

        unicodeString += thisChar;
    }
    
    console.log("Converted: " + unicodeString);

    // ipaString = "";
    // for (var l = 0; i < unicodeString.length; l++)
    // {
    //     console.log(unicodeString[l])
    //     thisChar = unicodeString[i]
    //     for (var j = 0; i < mappings.length; i++)
    //     {            
    //         if (mappings[j].src == unicodeString[l])
    //         {
    //             thisChar = mappings[l].dest
    //         }
    //     }

    //     ipaString += thisChar
    // }
    
    // console.log("Converted UIPA: " + ipaString);

    // for (var i = 0; i < uipa.length; i++)
    // {
    //     console.log(uipa.charAt(i))
    // }

    for (var i = 0; i < mappings.length; i++) {
        unicodeString = unicodeString.replace(mappings[i].src, mappings[i].dest);
        // console.log(mappings[i].src + uipa);
    }
    console.log("Converted UIPA: " + unicodeString);

    spoken = meSpeak.speak('[['+unicodeString+']]', { 'rawdata': 'mime', 'speed': '100' });

    if (spoken == null) {
        alert("An error occurred: speaking failed.");
    }

    // document.getElementById("download-button").disabled = false;
    console.log(spoken)
    meSpeak.play(spoken);
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
        $('#ipa-text').val(text);
    }

    setShareUrl();

}

function setShareUrl() {

    var text = $('#ipa-text').val();

    var baseUrl = window.location.protocol + "//" +
                  window.location.host + "/" +
                  window.location.pathname.split('/')[1];

    var params = { text: text };

    $('#share').prop('href', baseUrl + '?' + $.param(params));

}

function sendToIPAConverter(text) {
    $('.ipaout').hide()
    $('.error').hide()

    // get selected values
    var data = {
        text: text,
    };

    if (data.text == '') {
        $('.error').text('Please enter text.').show();
        return;
    }

    // prevent multiple submissions
    $('#submit').prop('disabled', 'disabled');

    // submit request
    $.ajax({
        url: IPA_API_ENDPOINT,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: convertResponse,
        error: convertErrorResponse,
    });
}

function convertResponse(response) {

    if (response == '') {
        $('.error').text('Please enter an Assyrian word or sentence.').show();
        return;
    }

    console.log("'" + response + "'")
    // Remove wrapping quotation marks
    response = response.replace(/"/g, '')
    response = response.replace(/'/g, '')
    // response = response.replace(/\\/g, '\')

    unicodeString = "";
    for (var i = 0; i < response.length; i++)
    {
        var thisChar = response[i];

        // Unicode character
        if (response[i] == '\\' && i + 1< response.length && response[i + 1] == 'u')
        {
            if (i + 5 < response.length)
            {
                hexString = response[i + 2] + response[i + 3] + response[i + 4] + response[i + 5];                
                thisChar = String.fromCharCode(parseInt(hexString, 16));

                i += 5;
            }
        }

        unicodeString += thisChar;
    }
    
    console.log("IPA String: " + unicodeString)
    $('.ipaout').text("IPA: " + unicodeString).show()

    process(unicodeString)
    reset();
}

function convertErrorResponse(response) {
    console.log(response);
    alert('There was an error processing your request.');
    $('.ipaout').hide()
    reset();
}

function readResponse(response) {
    var source = '<source src="data:audio/mpeg;base64,' + response + '" type="audio/mpeg"></source>';
    var audio = '<audio autoplay="true" controls>' + source + '</audio>';
    $('.audio').prepend(audio);

    // setShareUrl();
    // $('#share').show();

    reset();
}

function errorResponse(response) {
    console.log(response);
    alert('There was an error processing your request.');
    reset();
}

function reset() {
    $('#submit').prop('disabled', false);
}