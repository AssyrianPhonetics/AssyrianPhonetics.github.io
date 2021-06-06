/**!
 * @file scripts.js
 * @brief Assyrian Phonetics Tool main scripts file. 
 *        This js file will handle all string --> IPA conversion and speech synthesis
 *
 * @author Sargis S Yonan (sargis@yonan.org)
 * @date 1 March 2021
 * 
 * Some test strings:
 * ܣܵܪܓܝܼܣ
 * ܓܵܘ ܠܸܠܝܵܐ ܓܵܘ ܐܝܼܡܵܡܵܐ
 * ܓ̰ܵܝܡܝܼ
 * ܣܵܒ݂ܵܐ
 * ܐ݇ܢܵܫܵܐ
 * ܐܵܢܵܐ ܓ݂ܵܙܵܠܵܐ
 * ܚܹܪܸܘܠܵܗ̇
 * ܨܵܒܪܝܼܵܐ
 * ܒܝܼܬ ܢܵܗܖ̈ܵܝܢ
 * ܡܝܼܟ݂ܵܐܝܼܠ
 * ܪܵܡܐܝܼܠ
 * ܒܵܗ݇ܣܹܗ ܕ
 * ܒܵܗ݇ܣܹܗ̇ ܕ
 * 
 */


const wordlist = ["ܣܘܼܪܝܼܬ݂" ,"ܡܵܐܬܵܐ" ,"ܡܵܐܬ݂̈ܘܵܬ݂ܵܐ" ,"ܟ̰ܘܼ ܡܸܢܕܝܼ" ,"ܒܲܪ ܐ݇ܢܵܫܵܐ" ,"ܒܝܼܬ ܢܵܗܖ̈ܵܝܢ" ,"ܓܵܘ ܠܸܠܝܵܐ ܘܓܵܘ ܐܝܼܡܵܡܵܐ"]

class SyrChar {
    constructor({character,
                charname,
                latin='',
                ipa='',
                isVowel=false, 
                isModifier=false, 
                isSiyameh=false,
                isPunctuation=false,
                majleanaLatin='',
                majleanaIPA='',
                matresLatin='',
                matresIPA='',
                isRukakha=false,
                rukakhaLatin='',
                rukakhaIPA='',
                isRwakha=false, 
                rwakhaLatin='',
                rwakhaIPA='',
                isKhwasa=false,
                khwasaLatin='',
                khwasaIPA='',
                khwasaSecondaryLatin='',
                khwasaSecondaryIPA=''})
    {
        this.character = character
        this.charname = charname
        this.latin = latin
        this.ipa = ipa
        this.isVowel = isVowel
        this.isModifier = isModifier
        this.isSiyameh = isSiyameh
        this.majleanaLatin = majleanaLatin
        this.majleanaIPA = majleanaIPA
        this.matresLatin = matresLatin
        this.matresIPA = matresIPA
        this.isPunctuation = isPunctuation
        this.isRukakha = isRukakha
        this.rukakhaLatin = rukakhaLatin
        this.rukakhaIPA = rukakhaIPA
        this.isRwakha = isRwakha
        this.rwakhaLatin = rwakhaLatin
        this.rwakhaIPA = rwakhaIPA
        this.isKhwasa = isKhwasa
        this.khwasaLatin = khwasaLatin
        this.khwasaIPA = khwasaIPA
        this.khwasaSecondaryLatin = khwasaSecondaryLatin
        this.khwasaSecondaryIPA = khwasaSecondaryIPA
    }
}

const SyrCharacters = {
    // consonants
    "ALAP": new SyrChar({character: 'ܐ', charname: 'ALAP', latin:'a', ipa: 'ʔ', matresLatin: 'a', matresIPA: 'ɑ'}),
    "BETH": new SyrChar({character: 'ܒ', charname: 'BETH', latin: 'b', ipa: 'b', matresLatin: 'b\'', matresIPA: 'b', isRukakha: true, rukakhaLatin: 'w', rukakhaIPA: 'w'}),
    "GAMMAL": new SyrChar({character: 'ܓ', charname: 'GAMMAL', latin: 'g', ipa: 'g', majleanaLatin: 'j', majleanaIPA: 'dʒ', isRukakha: true, rukakhaLatin: 'gh', rukakhaIPA: 'ɣ'}),
    "DALATH": new SyrChar({character: 'ܕ', charname: 'DALATH', latin: 'd', ipa: 'd', isRukakha: true, rukakhaLatin: 'dh', rukakhaIPA: 'ð'}),
    "HEH": new SyrChar({character: 'ܗ', charname: 'HEH', latin: 'h', ipa: 'h'}),
    "WAW": new SyrChar({character: 'ܘ', charname: 'WAW', latin: 'w', ipa: 'w', matresLatin: 'o\'', matresIPA: 'o', isRwakha: true, rwakhaLatin: 'o', rwakhaIPA: 'o', isKhwasa: true, khwasaLatin: 'u', khwasaIPA: 'u'}),
    "ZAIN": new SyrChar({character: 'ܙ', charname: 'ZAIN', latin: 'z', ipa: 'z', majleanaLatin: 'zh', majleanaIPA: 'ʒ'}),
    "KHETH": new SyrChar({character: 'ܚ', charname: 'KHETH', latin: 'kh', ipa: 'x'}),
    "THETH": new SyrChar({character: 'ܛ', charname: 'THETH', latin: 'ṭ', ipa: 'tˤ'}),
    "YODH": new SyrChar({character: 'ܝ', charname: 'YODH', latin: 'y', ipa: 'j', isKhwasa: true, khwasaLatin: 'ee', khwasaIPA: 'i', khwasaSecondaryLatin: 'i', khwasaSecondaryIPA: 'ɪ'}),
    "KAP": new SyrChar({character: 'ܟ', charname: 'KAP', latin: 'k', ipa: 'k', majleanaLatin: 'ch', majleanaIPA: 'tʃ', isRukakha: true, rukakhaLatin: 'kh', rukakhaIPA: 'x'}),
    "LAMMAD": new SyrChar({character: 'ܠ', charname: 'LAMMAD', latin: 'l', ipa: 'l'}),
    "MEEM": new SyrChar({character: 'ܡ', charname: 'MEEM', latin: 'm', ipa: 'm'}),
    "NUN": new SyrChar({character: 'ܢ', charname: 'NUN', latin: 'n', ipa: 'n'}),
    "SIMKAT": new SyrChar({character: 'ܣ', charname: 'SIMKAT', latin: 's', ipa: 's'}),
    "SIMKAT_FINAL": new SyrChar({character: 'ܣ', charname: 'SIMKAT_FINAL', latin: 's', ipa: 's'}),
    "AIN": new SyrChar({character: 'ܥ', charname: 'AIN', latin: 'ʿ', ipa: 'ʕ'}),
    "PEH": new SyrChar({character: 'ܦ', charname: 'PEH', latin: 'p', ipa: 'p', isRukakha: true, rukakhaLatin: 'f', rukakhaIPA: 'f'}),
    "SADEH": new SyrChar({character: 'ܨ', charname: 'SADEH', latin: 'ṣ', ipa: 'sˤ'}),
    "QOP": new SyrChar({character: 'ܩ', charname: 'QOP', latin: 'q', ipa: 'q'}),
    "RESH": new SyrChar({character: 'ܪ', charname: 'RESH', latin: 'r', ipa: 'r'}),
    "DOTLESS_RESH_DALATH": new SyrChar({character: 'ܖ', charname: 'DOTLESS_RESH_DALATH'}),
    "SHIN": new SyrChar({character: 'ܫ', charname: 'SHIN', latin: 'š', ipa: 'ʃ', majleanaLatin: 'zh', majleanaIPA: 'ʒ'}),
    "TAW": new SyrChar({character: 'ܬ', charname: 'TAW', latin: 't', ipa: 't', isRukakha: true, rukakhaLatin: 'th', rukakhaIPA: 'θ'}),
    // vowels
    "PTAKHA": new SyrChar({character: 'ܲ', charname: 'PTAKHA', latin: 'a', ipa: 'a', isVowel: true}),
    "ZQAPPA": new SyrChar({character: 'ܵ', charname: 'ZQAPPA', latin: 'a', ipa: 'ɑ', isVowel: true}),
    "ZLAMA_KIRYA": new SyrChar({character: 'ܸ', charname: 'ZLAMA_KIRYA', latin: 'i', ipa: 'ɪ', isVowel: true}),
    "ZLAMA_YARIKHA": new SyrChar({character: 'ܹ', charname: 'ZLAMA_YARIKHA', latin: 'eh', ipa: 'e', isVowel: true}),
    "KHWASA": new SyrChar({character: 'ܼ', charname: 'KHWASA', isVowel: true}),
    "RWAKHA": new SyrChar({character: 'ܿ', charname: 'RWAKHA', isVowel: true}),
    // modifiers
    "RUKAKHA": new SyrChar({character: '݂', charname: 'RUKAKHA', isModifier: true}),
    "MAJLEANA": new SyrChar({character: '̰', charname: 'MAJLEANA', isModifier: true}),
    "TALQANA": new SyrChar({character: '݇', charname: 'TALQANA', isModifier: true}),
    "SIYAMEH": new SyrChar({character: '̈', charname: 'SIYAMEH', isSiyameh: true}),
    "RUKAKHA_PEH": new SyrChar({character: '̮', charname: 'RUKAKHA_PEH', isModifier: true}),
    "FEM_DOT": new SyrChar({character: '̇', charname: 'FEM_DOT', isModifier: true}),
    // Turoyo/Garshuni
    "GAMMAL_GARSHUNI": new SyrChar({character: 'ܔ', charname: 'GAMMAL_GARSHUNI', latin: 'j', ipa: 'dʒ'}),
}

const EmptySyrChar = new SyrChar({character: '', charname: 'EMPTY'})

class Word {
    constructor() {
        this.word = []
        this.isPlural = false
        this.ipaStr = ''
        this.latinStr = ''
    }
    
    SetPlural({isPlural=true})
    {
        this.isPlural = isPlural
    }

    AddAtoota(atoota)
    {
        this.word.push(atoota)
    }

    SetIPA(ipaStr)
    {
        this.ipaStr = ipaStr
    }

    SetLatin(latinStr)
    {
        this.latinStr = latinStr
    }
}

class Atoota
{
    constructor ({letter, vowel=EmptySyrChar, modifier=EmptySyrChar, diphthong=EmptySyrChar, siyameh=EmptySyrChar})
    {
        this.letter = letter
        this.vowel = vowel
        this.modifier = modifier
        this.diphthong = diphthong
        this.siyameh = siyameh
    }
}

function GetEntry(character)
{
    for (const [ key, value ] of Object.entries(SyrCharacters)) {
        if (character == value.character)
        {
            return value
        }
    }
    return EmptySyrChar
}


function ProcessSyriacWord(milta)
{
    var ipaString = ''
    var latinString = ''

    for (var i = 0; i < milta.word.length; i++) {
        var previous = null
        var atoota = milta.word[i]
        var nxt = null
        // console.log(atoota)

        if (i > 0)
        {
            previous = milta.word[i - 1]
        }
        if (i < milta.word.length - 1)
        {
            nxt = milta.word[i + 1]
        }

        // silence the letter if it has a Talqana
        if (atoota.modifier.charname == 'TALQANA')
        {
            continue
        }

        if (atoota.siyameh.charname == 'SIYAMEH')
        {
            milta.SetPlural({isPlural: true})
        }

        /*
         * Decide Base Letter Sound
         */
        if ((atoota.modifier.charname == 'RUKAKHA' || atoota.modifier.charname == 'RUKAKHA_PEH') && atoota.letter.isRukakha)
        {
            ipaString += atoota.letter.rukakhaIPA
            latinString += atoota.letter.rukakhaLatin
        }

        // Dotless Resh + Siyameh case
        else if (atoota.letter.charname == 'DOTLESS_RESH_DALATH' && atoota.siyameh.charname == 'SIYAMEH')
        {
            ipaString += SyrCharacters["RESH"].ipa
            latinString += SyrCharacters["RESH"].latin
        }

        else if (atoota.modifier.charname == 'MAJLEANA')
        {
            ipaString += atoota.letter.majleanaIPA
            latinString += atoota.letter.majleanaLatin
        }

        // Heh at the end of a word
        else if (atoota.letter.charname == 'HEH' && nxt == null)
        {
            if (!atoota.vowel.isVowel && previous != null && previous.vowel.isVowel && (previous.vowel.charname == "PTAKHA" || previous.vowel.charname == "ZQAPPA" || previous.vowel.charname == "ZLAMA_KIRYA" || previous.vowel.charname == "ZLAMA_YARIKHA"))
            {
            }
        }

        else if (atoota.letter.charname == 'ALAP')
        {
            // Alap with a vowel at the beginning of the word
            if (atoota.vowel.isVowel)
            {
                ipaString += atoota.vowel.ipa
                latinString += atoota.vowel.latin
            }

            // Alap shleeta with a Yodh/Waw Khwasa or Waw Rwakha following it
            else if (!atoota.vowel.isVowel && nxt != null && (nxt.vowel.charname == 'KHWASA' || nxt.vowel.charname == 'RWAKHA'))
            {
                if (nxt.vowel.charname == 'KHWASA' && nxt.letter.isKhwasa)
                {
                    ipaString += nxt.letter.khwasaIPA
                    latinString += nxt.letter.khwasaLatin
                }
                else if (nxt.vowel.charname == 'RWAKHA' && nxt.letter.isRwakha)
                {
                    ipaString += nxt.letter.rwakhaIPA
                    latinString += nxt.letter.rwakhaLatin
                }
            }

            // Alap at the beginning of a word - use special case IPA
            else if (previous == null)
            {
                ipaString += atoota.letter.matresIPA
                latinString += atoota.letter.matresLatin
            }

            // Alap is preceded by a Ptakha, Zqappa, or either Zlama - take vocalization from previous atoota zowa
            else if (nxt == null && (previous.vowel.charname == "PTAKHA" || previous.vowel.charname == "ZQAPPA" || previous.vowel.charname == "ZLAMA_KIRYA" || previous.vowel.charname == "ZLAMA_YARIKHA"))
            {
                continue
            }

            // Alap is preceded by a Ptakha, Zqappa, or either Zlama on a diphthong - take vocalization from previous atoota zowa
            else if (nxt == null && previous.vowel.charname == 'KHWASA' && previous.letter.charname == 'YODH' && (previous.diphthong.charname == "PTAKHA" || previous.diphthong.charname == "ZQAPPA" || previous.diphthong.charname == "ZLAMA_KIRYA" || previous.diphthong.charname == "ZLAMA_YARIKHA"))
            {
                continue
            }

            // This is just an Alap
            else
            {
                ipaString += atoota.letter.ipa
                latinString += atoota.letter.latin
            }
        }

        // khwasa/rwakha case
        else if (previous != null && previous.letter.charname == 'ALAP' && (atoota.vowel.charname == "KHWASA" || atoota.vowel.charname == "RWAKHA"))
        {
            continue
        }
        else if (previous != null && previous.letter.charname != 'ALAP' && (atoota.vowel.charname == "KHWASA" || atoota.vowel.charname == "RWAKHA"))
        {
            // special case for Yodh when surrounded by two atwateh shleeteh
            if (atoota.letter.charname == 'YODH' && previous != null && nxt != null && !previous.vowel.isVowel && !nxt.vowel.isVowel)
            {
                ipaString += atoota.letter.khwasaSecondaryIPA
                latinString += atoota.letter.khwasaSecondaryLatin
            }
            // standard rwakha/khwasa case
            else
            {
                if (atoota.vowel.charname == 'KHWASA' && atoota.letter.isKhwasa)
                {
                    ipaString += atoota.letter.khwasaIPA
                    latinString += atoota.letter.khwasaLatin
                }
                else if (atoota.vowel.charname == 'RWAKHA' && atoota.letter.isRwakha)
                {
                    ipaString += atoota.letter.rwakhaIPA
                    latinString += atoota.letter.rwakhaLatin
                }
            }
        }

        // no special case
        else
        {
            ipaString += atoota.letter.ipa
            latinString += atoota.letter.latin
        }

        /*
         * Adjust for vowel if present
         */
        if (atoota.vowel.isVowel)
        {
            if (atoota.vowel.charname == "KHWASA" || atoota.vowel.charname == "RWAKHA")
            {
                // diphthong case
                if (atoota.letter.charname == 'YODH' && atoota.diphthong != EmptySyrChar)
                {
                    ipaString += atoota.diphthong.ipa
                    latinString += atoota.diphthong.latin
                }
                else
                {
                    // already handled in above cases
                    continue
                }
            }
            if (atoota.letter.charname == "ALAP")
            {
                continue
            }
            // standard vowel case
            else
            {
                ipaString += atoota.vowel.ipa
                latinString += atoota.vowel.latin
            }
        }

    }

    milta.SetIPA(ipaString)
    milta.SetLatin(latinString)

    return milta
}

function ProcessSyriacString(syrStr)
{
    var syrSentence = []
    var ipaString = ""

    var word = new Word()
    var sentence = []

    var thisAtoota = EmptySyrChar
    var thisVowel = EmptySyrChar
    var thisModifier = EmptySyrChar
    var thisDiphthong = EmptySyrChar
    var thisSiyameh = EmptySyrChar
    
    for (var i = 0; i < syrStr.length; i++)
    {
        const ch = syrStr[i]
        const e = GetEntry(ch)

        // non-pronouncable or non-Syriac character found
        if (e == EmptySyrChar)
        {
            // new word at space
            if (ch == ' ')
            {
                if (thisAtoota != EmptySyrChar)
                {
                    a = new Atoota({letter: thisAtoota, vowel: thisVowel, modifier: thisModifier, diphthong: thisDiphthong, siyameh: thisSiyameh})
                    word.AddAtoota(a)

                    // reset parsing state
                    thisAtoota = EmptySyrChar
                    thisVowel = EmptySyrChar
                    thisModifier = EmptySyrChar
                    thisDiphthong = EmptySyrChar
                    thisSiyameh = EmptySyrChar
                }
                // convert word to IPA string
                sentence.push(ProcessSyriacWord(word))
                // reset word
                word = new Word()
            }
            // unrecognized or unsupported character
            else
            {
                continue
            }
        }

        // this is a valid Syriac character in the table
        else
        {
            if (e.isModifier)
            {
                // Talqanas should always take precedent
                if (thisModifier.charname != 'TALQANA')
                {
                    thisModifier = e
                }
            }
            else if (e.isVowel)
            {
                if (thisAtoota.charname == 'YODH' && thisVowel != EmptySyrChar && thisVowel.charname == 'KHWASA')
                {
                    thisDiphthong = e
                }
                else
                {
                    thisVowel = e
                }
            }
            else if (e.isSiyameh)
            {
                thisSiyameh = e
            }
            else
            {
                // this is a new letter/vowel/modifier combo - reset letter state
                if (thisAtoota != EmptySyrChar)
                {
                    a = new Atoota({letter: thisAtoota, vowel: thisVowel, modifier: thisModifier, diphthong: thisDiphthong, siyameh: thisSiyameh})
                    word.AddAtoota(a)

                    // reset parsing state
                    thisAtoota = EmptySyrChar
                    thisVowel = EmptySyrChar
                    thisModifier = EmptySyrChar
                    thisDiphthong = EmptySyrChar
                    thisSiyameh = EmptySyrChar
                }
                thisAtoota = e
            }
        }
    }
    // process last word in sentence (or only word)
    if (thisAtoota != EmptySyrChar)
    {
        a = new Atoota({letter: thisAtoota, vowel: thisVowel, modifier: thisModifier, diphthong: thisDiphthong, siyameh: thisSiyameh})
        word.AddAtoota(a)

        sentence.push(ProcessSyriacWord(word))
    }

    ipaStr = ''
    latinStr = ''

    for (var i = 0; i < sentence.length; i++)
    {
        ipaStr += sentence[i].ipaStr + ' '
        latinStr += sentence[i].latinStr + ' '
    }

    ipaStr = ipaStr.slice(0, -1)
    latinStr = latinStr.slice(0, -1)

    // console.log(ipaStr)
    // console.log(latinStr)

    return [ipaStr, latinStr]
}

// stubbed out so that we can process further if needed
function InputToIPA(syr) {
    ipaout = ProcessSyriacString(syr)
    
    // ipaout[0] --> syripa
    // ipaout[1] --> syrlatin
    
    return ipaout
}

function process(uipa, speed, pitch) {
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


    // console.log("Passed in UIPA: " + uipa);
    // console.log("'" + uipa  + "'");

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
    
    // console.log("Converted: " + unicodeString);

    for (var i = 0; i < mappings.length; i++) {
        unicodeString = unicodeString.replace(mappings[i].src, mappings[i].dest);
        // console.log(mappings[i].src + uipa);
    }
    // console.log("Converted UIPA: " + unicodeString);

    spoken = meSpeak.speak('[['+unicodeString+']]', { 'rawdata': 'mime', 'speed': speed, 'pitch': pitch });

    if (spoken == null) {
        alert("An error occurred: speaking failed.");
    }

    // document.getElementById("download-button").disabled = false;
    // console.log(spoken)
    meSpeak.play(spoken, function() {
        console.log('sdsdsds')
    });
}

function meSpeakCallback(success, id) {
    console.log('here')
    var speedslider = document.getElementById("speedslider")
    speedslider.disabled = false

    var pitchslider = document.getElementById("pitchslider")
    pitchslider.disabled = false

}

$(document).ready(function() {
    // set up info asides
    setUpInfoAsides();

    // load from url params
    var randomElement = wordlist[Math.floor(Math.random() * wordlist.length)];
    console.log(randomElement)
    $("#input-text").val(randomElement)

    loadUrlParams();
    $('.talkspeed').text('Talk speed: 100').show()
    $('.talkpitch').text('Talk Pitch: 50').show()
    
    var speedslider = document.getElementById("speedslider");
    var pitchslider = document.getElementById("pitchslider");

    speedslider.oninput = function() {
        $('.talkspeed').text('Talk speed: ' + speedslider.value).show()
    }

    pitchslider.oninput = function() {
        $('.talkpitch').text('Talk pitch: ' + pitchslider.value).show()
    }

    $('#submit').on('click', function(e) {
        e.preventDefault();

        $('.ipaout').hide()
        $('.latinout').hide()
        $('.error').hide()

        var text = $('#input-text').val();
        let ipaout = InputToIPA(text)
        syripa = ipaout[0]
        syrlatin = ipaout[1]
        
        if (syripa.length > 0)
        {
            process(syripa, speedslider.value, pitchslider.value)

            $('.ipaout').text("IPA: " + syripa).show()
            $('.latinout').text("Transliterated: " + syrlatin).show()
        }
        else
        {
            $('.error').text("Error: Please enter valid Syriac text").show()
        }

        reset()
    });
});

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