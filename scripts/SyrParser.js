/**!
 * @file SyrParser.js
 * @brief This script converts Syriac text (Assyrian phonetics) to latin and IPA strings
 *
 * @author Sargis S Yonan (sargis@yonan.org)
 * @date 1 March 2021
 */

 class SyrChar {
    constructor({character,
                charname,
                latin='',
                ipa='',
                westlatin='',
                westipa='',
                isVowel=false, 
                isModifier=false, 
                isSiyameh=false,
                isPunctuation=false,
                majleanaLatin='',
                majleanaIPA='',
                matresLatin='',
                matresIPA='',
                westmatresLatin='',
                westmatresIPA='',
                isRukakha=false,
                rukakhaLatin='',
                rukakhaIPA='',
                isRwakha=false, 
                rwakhaLatin='',
                rwakhaIPA='',
                isKhwasa=false,
                khwasaLatin='',
                khwasaIPA='',
                isWestern=false,
                khwasaSecondaryLatin='',
                khwasaSecondaryIPA=''})
    {
        this.character = character
        this.charname = charname
        this.latin = latin
        this.ipa = ipa
        this.westlatin = westlatin
        this.westipa = westipa
        this.isVowel = isVowel
        this.isModifier = isModifier
        this.isSiyameh = isSiyameh
        this.majleanaLatin = majleanaLatin
        this.majleanaIPA = majleanaIPA
        this.matresLatin = matresLatin
        this.matresIPA = matresIPA
        this.westmatresLatin = westmatresLatin
        this.westmatresIPA = westmatresIPA
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
        this.isWestern = isWestern
        this.khwasaSecondaryLatin = khwasaSecondaryLatin
        this.khwasaSecondaryIPA = khwasaSecondaryIPA
    }
}

const SyrCharacters = {
    // consonants
    "ALAP": new SyrChar({character: 'ܐ', charname: 'ALAP', latin:'a', ipa: 'ʔ', matresLatin: 'a', matresIPA: 'ɑ', westlatin:'o', westipa: 'ʔ', westmatresLatin: 'o', westmatresIPA: 'o'}),
    "BETH": new SyrChar({character: 'ܒ', charname: 'BETH', latin: 'b', ipa: 'b', matresLatin: 'b\'', matresIPA: 'b', isRukakha: true, rukakhaLatin: 'w', rukakhaIPA: 'w'}),
    "GAMMAL": new SyrChar({character: 'ܓ', charname: 'GAMMAL', latin: 'g', ipa: 'g', majleanaLatin: 'j', majleanaIPA: 'dʒ', isRukakha: true, rukakhaLatin: 'gh', rukakhaIPA: 'ɣ'}),
    "DALATH": new SyrChar({character: 'ܕ', charname: 'DALATH', latin: 'd', ipa: 'd', isRukakha: true, rukakhaLatin: 'dh', rukakhaIPA: 'ð'}),
    "HEH": new SyrChar({character: 'ܗ', charname: 'HEH', latin: 'h', ipa: 'h'}),
    "WAW": new SyrChar({character: 'ܘ', charname: 'WAW', latin: 'w', ipa: 'w', matresLatin: 'o\'', matresIPA: 'o', westlatin: 'u', westipa: 'u', westmatresLatin: 'w', westmatresIPA: 'w', isRwakha: true, rwakhaLatin: 'o', rwakhaIPA: 'o', isKhwasa: true, khwasaLatin: 'u', khwasaIPA: 'u',}),
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
    "PTHAHA_ABOVE": new SyrChar({character: 'ܰ', charname: 'PTHAHA', latin: 'a', ipa: 'a', isWestern: true, isVowel: true}),
    "PTHAHA_BELOW": new SyrChar({character: 'ܱ', charname: 'PTHAHA', latin: 'a', ipa: 'a', isWestern: true, isVowel: true}),
    "ZQAPHA_ABOVE": new SyrChar({character: 'ܳ', charname: 'ZQAPHA', latin: 'o', ipa: 'o', isWestern: true, isVowel: true}),
    "ZQAPHA_BELOW": new SyrChar({character: 'ܴ', charname: 'ZQAPHA', latin: 'o', ipa: 'o', isWestern: true, isVowel: true}),
    "RWASA_ABOVE": new SyrChar({character: 'ܶ', charname: 'RWASA', latin: 'e', ipa: 'e', isWestern: true, isVowel: true}),
    "RWASA_BELOW": new SyrChar({character: 'ܷ', charname: 'RWASA', latin: 'e', ipa: 'e', isWestern: true, isVowel: true}),
    "HWASA_ABOVE": new SyrChar({character: 'ܺ', charname: 'HWASA', latin: 'i', ipa: 'ɪ', isWestern: true, isVowel: true}),
    "HWASA_BELOW": new SyrChar({character: 'ܻ', charname: 'HWASA', latin: 'i', ipa: 'ɪ', isWestern: true, isVowel: true}),
    "ESASA_ABOVE": new SyrChar({character: 'ܽ', charname: 'ESASA', latin: 'u', ipa: 'u', isWestern: true, isVowel: true}),
    "ESASA_BELOW": new SyrChar({character: 'ܾ', charname: 'ESASA', latin: 'u', ipa: 'u', isWestern: true, isVowel: true}),
    // modifiers
    "RUKAKHA": new SyrChar({character: '݂', charname: 'RUKAKHA', isModifier: true}),
    "MAJLEANA": new SyrChar({character: '̰', charname: 'MAJLEANA', isModifier: true}),
    "MAJLEANA_ABOVE": new SyrChar({character: '̃', charname: 'MAJLEANA', isModifier: true}),
    "TALQANA": new SyrChar({character: '݇', charname: 'TALQANA', isModifier: true}),
    "TALQANA_BELOW": new SyrChar({character: '݈', charname: 'TALQANA', isModifier: true}),
    "SIYAMEH": new SyrChar({character: '̈', charname: 'SIYAMEH', isSiyameh: true}),
    "RUKAKHA_PEH": new SyrChar({character: '̮', charname: 'RUKAKHA_PEH', isModifier: true}),
    "FEM_DOT": new SyrChar({character: '̇', charname: 'FEM_DOT', isModifier: true}),
    // Turoyo/Garshuni
    "GAMMAL_GARSHUNI": new SyrChar({character: 'ܔ', charname: 'GAMMAL_GARSHUNI', latin: 'j', ipa: 'dʒ', isWestern: true}),
}

const EmptySyrChar = new SyrChar({character: '', charname: 'EMPTY'})

function IsWordWestern(milta) {
    for (var i = 0; i < milta.word.length; i++) {
        if (milta.word[i].letter.isWestern || milta.word[i].vowel.isWestern ||
            milta.word[i].modifier.isWestern || milta.word[i].diphthong.isWestern) {
            return true;
        }
    }
    return false;
}


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

function ProcessWesternSyriacWord(milta) {
    var ipaString = ''
    var latinString = ''
    for (var i = 0; i < milta.word.length; i++) {
        var previous = null
        var atoota = milta.word[i]
        var nxt = null

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
            if (!atoota.vowel.isVowel && previous != null && previous.vowel.isVowel && previous.vowel.isWestern)
            {
            }
        }

        else if (atoota.letter.charname == 'WAW' && atoota.vowel.isVowel && atoota.vowel.isWestern) {
            if (atoota.vowel.charname == 'ESASA') {
                ipaString += atoota.vowel.ipa
                latinString += atoota.vowel.latin
            } else {
                ipaString += atoota.letter.westmatresIPA
                latinString += atoota.letter.westmatresLatin
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
            else if (!atoota.vowel.isVowel && nxt != null && nxt.letter && (nxt.letter.isKhwasa || nxt.letter.isRwakha))
            {
                if (nxt.letter.isKhwasa || nxt.letter.isRwakha)
                {
                    if (atoota.letter.westipa != '') {
                        ipaString += atoota.letter.westipa
                        latinString += atoota.letter.westlatin
                    } else {
                        ipaString += atoota.letter.ipa
                        latinString += atoota.letter.latin
                    }
                }
            }

            // Alap at the beginning of a word - use special case IPA
            else if (previous == null)
            {
                ipaString += atoota.letter.westmatresIPA
                latinString += atoota.letter.westmatresLatin
            }

            // Alap is preceded by a Ptakha, Zqappa, or either Zlama - take vocalization from previous atoota zowa
            else if (nxt == null && previous.vowel.isWestern)
            {
                continue
            }

            // Alap is preceded by a Ptakha, Zqappa, or either Zlama on a diphthong - take vocalization from previous atoota zowa
            else if (nxt == null && previous.vowel.charname == 'KHWASA' && previous.letter.charname == 'YODH' && previous.diphthong.isWestern)
            {
                continue
            }

            // This is just an Alap
            else
            {
                ipaString += atoota.letter.westipa
                latinString += atoota.letter.westlatin
            }
        }

        // no special case
        else
        {
            if (atoota.letter.westipa != '') {
                ipaString += atoota.letter.westipa
                latinString += atoota.letter.westlatin
            } else {
                ipaString += atoota.letter.ipa
                latinString += atoota.letter.latin
            }
        }

        /*
         * Adjust for vowel if present
         */
        if (atoota.vowel.isVowel)
        {
            if (atoota.letter.charname == "ALAP")
            {
                continue
            }
            if (atoota.letter.charname == "WAW" && atoota.vowel.charname == "ESASA")
            {
                continue
            }
            // standard vowel case
            else
            {
                if (atoota.vowel.westipa != '') {
                    ipaString += atoota.vowel.westipa
                    latinString += atoota.vowel.westlatin
                } else {
                    ipaString += atoota.vowel.ipa
                    latinString += atoota.vowel.latin
                }
            }
        }
        console.log(ipaString)
    }

    milta.SetIPA(ipaString)
    milta.SetLatin(latinString)

    return milta 
}


function ProcessSyriacWord(milta)
{
    var ipaString = ''
    var latinString = ''

    if (IsWordWestern(milta)) {
        return ProcessWesternSyriacWord(milta)
    }

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
                ipaString += atoota.letter.westipa
                latinString += atoota.letter.westlatin
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
