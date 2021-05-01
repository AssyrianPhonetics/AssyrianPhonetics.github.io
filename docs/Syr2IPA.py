import json
from itertools import tee, islice, chain

class SyrChar:
    def __init__(self, 
                character,
                name,
                latin='',
                ipa='',
                isVowel=False, 
                isModifier=False, 
                isPunctuation=False,
                majleanaLatin='',
                majleanaIPA='',
                matresLatin='',
                matresIPA='',
                isRukakha=False,
                rukakhaLatin='',
                rukakhaIPA='',
                isRwakha=False, 
                rwakhaLatin='',
                rwakhaIPA='',
                isKhwasa=False,
                khwasaLatin='',
                khwasaIPA='',
                khwasaSecondaryLatin='',
                khwasaSecondaryIPA=''):


        self.character = character
        self.name = name
        self.latin = latin
        self.ipa = ipa
        self.isVowel = isVowel
        self.isModifier = isModifier
        self.majleanaLatin = majleanaLatin
        self.majleanaIPA = majleanaIPA
        self.matresLatin = matresLatin
        self.matresIPA = matresIPA
        self.isPunctuation = isPunctuation
        self.isRukakha = isRukakha
        self.rukakhaLatin = rukakhaLatin
        self.rukakhaIPA = rukakhaIPA
        self.isRwakha = isRwakha
        self.rwakhaLatin = rwakhaLatin
        self.rwakhaIPA = rwakhaIPA
        self.isKhwasa = isKhwasa
        self.khwasaLatin = khwasaLatin
        self.khwasaIPA = khwasaIPA
        self.khwasaSecondaryLatin = khwasaSecondaryLatin
        self.khwasaSecondaryIPA = khwasaSecondaryIPA

SyrCharacters = {
    "ALAP": SyrChar(character = 'ܐ', name = 'ALAP', latin = 'a', ipa = 'ʔ', matresLatin = 'a', matresIPA = 'ɑ'),
    "BETH": SyrChar(character = 'ܒ', name = 'BETH', latin = 'b', ipa = 'b', matresLatin = 'b\'', matresIPA = 'b', isRukakha = True, rukakhaLatin = 'w', rukakhaIPA = 'w'),
    "GAMMAL": SyrChar(character = 'ܓ', name = 'GAMMAL', latin = 'g', ipa = 'g', majleanaLatin = 'j', majleanaIPA = 'dʒ', isRukakha = True, rukakhaLatin = 'gh', rukakhaIPA = 'ɣ'),
    "DALATH": SyrChar(character = 'ܕ', name = 'DALATH', latin = 'd', ipa = 'd', isRukakha = True, rukakhaLatin = 'dh', rukakhaIPA = 'ð'),
    "HEH": SyrChar(character = 'ܗ', name = 'HEH', latin = 'h', ipa = 'h'),
    "WAW": SyrChar(character = 'ܘ', name = 'WAW', latin = 'w', ipa = 'w', matresLatin = 'o\'', matresIPA = 'o', isRwakha = True, rwakhaLatin = 'o', rwakhaIPA = 'o', isKhwasa = True, khwasaLatin = 'u', khwasaIPA = 'u'),
    "ZAIN": SyrChar(character = 'ܙ', name = 'ZAIN', latin = 'z', ipa = 'z', majleanaLatin = 'zh', majleanaIPA = 'ʒ'),
    "KHETH": SyrChar(character = 'ܚ', name = 'KHETH', latin = 'kh', ipa = 'x'),
    "THETH": SyrChar(character = 'ܛ', name = 'THETH', latin = 'ṭ', ipa = 'tˤ'),
    "YODH": SyrChar(character = 'ܝ', name = 'YODH', latin = 'y', ipa = 'j', isKhwasa = True, khwasaLatin = 'ee', khwasaIPA = 'i', khwasaSecondaryLatin = 'i', khwasaSecondaryIPA = 'ɪ'),
    "KAP": SyrChar(character = 'ܟ', name = 'KAP', latin = 'k', ipa = 'k', majleanaLatin = 'ch', majleanaIPA = 'tʃ', isRukakha = True, rukakhaLatin = 'kh', rukakhaIPA = 'x'),
    "LAMMAD": SyrChar(character = 'ܠ', name = 'LAMMAD', latin = 'l', ipa = 'l'),
    "MEEM": SyrChar(character = 'ܡ', name = 'MEEM', latin = 'm', ipa = 'm'),
    "NUN": SyrChar(character = 'ܢ', name = 'NUN', latin = 'n', ipa = 'n'),
    "SIMKAT": SyrChar(character = 'ܣ', name = 'SIMKAT', latin = 's', ipa = 's'),
    "SIMKAT_FINAL": SyrChar(character = 'ܣ', name = 'SIMKAT_FINAL', latin = 's', ipa = 's'),
    "AIN": SyrChar(character = 'ܥ', name = 'AIN', latin = 'ʿ', ipa = 'ʕ'),
    "PEH": SyrChar(character = 'ܦ', name = 'PEH', latin = 'p', ipa = 'p', isRukakha = True, rukakhaLatin = 'f', rukakhaIPA = 'f'),
    "SADEH": SyrChar(character = 'ܨ', name = 'SADEH', latin = 'ṣ', ipa = 'sˤ'),
    "QOP": SyrChar(character = 'ܩ', name = 'QOP', latin = 'q', ipa = 'q'),
    "RESH": SyrChar(character = 'ܪ', name = 'RESH', latin = 'r', ipa = 'r'),
    "SHIN": SyrChar(character = 'ܫ', name = 'SHIN', latin = 'š', ipa = 'ʃ', majleanaLatin = 'zh', majleanaIPA = 'ʒ'),
    "TAW": SyrChar(character = 'ܬ', name = 'TAW', latin = 't', ipa = 't', isRukakha = True, rukakhaLatin = 'th', rukakhaIPA = 'θ'),
    "PTAKHA": SyrChar(character = 'ܲ', name = 'PTAKHA', latin = 'a', ipa = 'a', isVowel = True),
    "ZQAPPA": SyrChar(character = 'ܵ', name = 'ZQAPPA', latin = 'a', ipa = 'ɑ', isVowel = True),
    "ZLAMA_KIRYA": SyrChar(character = 'ܸ', name = 'ZLAMA_KIRYA', latin = 'i', ipa = 'ɪ', isVowel = True),
    "ZLAMA_YARIKHA": SyrChar(character = 'ܹ', name = 'ZLAMA_YARIKHA', latin = 'eh', ipa = 'e', isVowel = True),
    "KHWASA": SyrChar(character = 'ܼ', name = 'KHWASA', isVowel = True),
    "RWAKHA": SyrChar(character = 'ܿ', name = 'RWAKHA', isVowel = True),
    "RUKAKHA": SyrChar(character = '݂', name = 'RUKAKHA', isModifier = True),
    "MAJLEANA": SyrChar(character = '̰', name = 'MAJLEANA', isModifier = True),
    "TALQANA": SyrChar(character = '݇', name = 'TALQANA', isModifier = True),
    "SIYAMEH": SyrChar(character = '̈', name = 'SIYAMEH', isModifier = True),
    "RUKAKHA_PEH": SyrChar(character = '̮', name = 'RUKAKHA_PEH', isModifier = True),
}

EmptySyrChar = SyrChar(character = '', name = 'EMPTY')

class Word:
    def __init__(self):
        self.word = []
        self.isPlural = False
        self.ipaStr = ''
        self.latinStr = ''

    def MarkPlural(self, isPlural=True):
        self.isPlural = plural

    def AddAtoota(self, atoota):
        self.word.append(atoota)

    def SetIPA(self, ipaStr):
        self.ipaStr = ipaStr

    def SetLatin(self, latinStr):
        self.latinStr = latinStr
    
class Atoota:
    def __init__(self, letter, vowel=EmptySyrChar, modifier=EmptySyrChar):
        self.letter = letter
        self.vowel = vowel
        self.modifier = modifier

def GetEntry(character):
    for _ch in SyrCharacters.keys():
        if SyrCharacters[_ch].character == character:
            return SyrCharacters[_ch]
    return EmptySyrChar

def previous_and_next(some_iterable):
    prevs, items, nexts = tee(some_iterable, 3)
    prevs = chain([None], prevs)
    nexts = chain(islice(nexts, 1, None), [None])
    return zip(prevs, items, nexts)

def ProcessSyriacWord(milta):
    ipaString = ''
    latinString = ''
    
    # TODO: Add diphtong case for Yodh Khwasa + vowel

    for previous, atoota, nxt in previous_and_next(milta.word):
        # silence the letter if it has a Talqana
        if atoota.modifier.name == 'TALQANA':
            continue

        if atoota.modifier.name == 'SIYAMEH':
            milta.SetPlural()

        ###
        # Decide Base Letter Sound
        ###
        if (atoota.modifier.name == 'RUKAKHA' or atoota.modifier.name == 'RUKAKHA_PEH') and atoota.letter.isRukakha:
            ipaString += atoota.letter.rukakhaIPA
            latinString += atoota.letter.rukakhaLatin
            
        elif atoota.modifier.name == 'MAJLEANA':
            ipaString += atoota.letter.majleanaIPA
            latinString += atoota.letter.majleanaLatin

        elif atoota.letter.name == 'ALAP':
            # Alap with a vowel at the beginning of the word
            if atoota.vowel.isVowel and previous == None:
                ipaString += atoota.vowel.ipa
                latinString += atoota.vowel.latin
            
            # Alap shleeta with a Yodh/Waw Khwasa or Waw Rwakha following it
            elif not atoota.vowel.isVowel and previous == None and nxt != None and (nxt.vowel.name == 'KHWASA' or nxt.vowel.name == 'RWAKHA'):
                if nxt.vowel.name == 'KHWASA' and nxt.letter.isKhwasa:
                    ipaString += nxt.letter.khwasaIPA
                    latinString += nxt.letter.khwasaLatin
                elif nxt.vowel.name == 'RWAKHA' and nxt.letter.isRwakha:
                    ipaString += nxt.letter.rwakhaIPA
                    latinString += nxt.letter.rwakhaLatin
            
            # Alap at the beginning of a word - use special case IPA
            elif previous == None:
                ipaString += atoota.letter.matresIPA
                latinString += atoota.letter.matresLatin

            # Alap is preceded by a Ptakha, Zqappa, or either Zlama - take vocalization from previous atoota zowa
            elif nxt == None and (previous.vowel.name == "PTAKHA" or previous.vowel.name == "ZQAPPA" or previous.vowel.name == "ZLAMA_KIRYA" or previous.vowel.name == "ZLAMA_YARIKHA"):
                continue

            # This is just an Alap
            else:
                ipaString += atoota.letter.ipa
                latinString += atoota.letter.latin

        # khwasa/rwakha case
        elif previous != None and previous.letter.name == 'ALAP' and (atoota.vowel.name == "KHWASA" or atoota.vowel.name == "RWAKHA"):
            continue
        
        elif previous != None and previous.letter.name != 'ALAP' and (atoota.vowel.name == "KHWASA" or atoota.vowel.name == "RWAKHA"):
            # special case for Yodh when surrounded by two atwateh shleeteh
            if atoota.letter.name == 'YODH' \
                and previous != None \
                and nxt != None \
                and not previous.vowel.isVowel \
                and not nxt.vowel.isVowel:
                    ipaString += atoota.letter.khwasaSecondaryIPA
                    latinString += atoota.letter.khwasaSecondaryLatin
            # standard rwakha/khwasa case
            else:
                if atoota.vowel.name == 'KHWASA' and atoota.letter.isKhwasa:
                    ipaString += atoota.letter.khwasaIPA
                    latinString += atoota.letter.khwasaLatin
                elif atoota.vowel.name == 'RWAKHA' and atoota.letter.isRwakha:
                    ipaString += atoota.letter.rwakhaIPA
                    latinString += atoota.letter.rwakhaLatin
            
        # no special case
        else:
            ipaString += atoota.letter.ipa
            latinString += atoota.letter.latin

        ###
        # Adjust for vowel if present
        ###
        if atoota.vowel.isVowel:
            if atoota.vowel.name == "KHWASA" or atoota.vowel.name == "RWAKHA":
                # already handled in above cases
                continue
            
            if atoota.letter.name == "ALAP":
                continue

            # standard vowel case
            else:
                ipaString += atoota.vowel.ipa
                latinString += atoota.vowel.latin

    milta.SetIPA(ipaString)
    milta.SetLatin(latinString)

    return milta

def ProcessSyriacString(syrStr):
    syrSentence = []
    ipaString = ""

    word = Word()
    sentence = []

    thisAtoota = EmptySyrChar
    thisVowel = EmptySyrChar
    thisModifier = EmptySyrChar
    
    for ch in syrStr:
        e = GetEntry(ch)

        # non-pronouncable or non-Syriac character found
        if e == EmptySyrChar:
            # new word at space
            if ch == ' ':
                if (thisAtoota != EmptySyrChar):
                    a = Atoota(thisAtoota, vowel=thisVowel, modifier=thisModifier)
                    word.AddAtoota(a)

                    # reset parsing state
                    thisAtoota = EmptySyrChar
                    thisVowel = EmptySyrChar
                    thisModifier = EmptySyrChar
                
                # convert word to IPA string
                sentence.append(ProcessSyriacWord(word))
                # reset word
                word = Word()
            # unrecognized or unsupported character
            else:
                continue

        # this is a valid Syriac character in the table
        else:
            if e.isModifier:
                # Talqanas should always take precedent
                if (thisModifier.name != 'TALQANA'):
                    thisModifier = e
            elif e.isVowel:
                thisVowel = e
            else:
                # this is a new letter/vowel/modifier combo - reset letter state
                if (thisAtoota != EmptySyrChar):
                    a = Atoota(thisAtoota, vowel=thisVowel, modifier=thisModifier)
                    word.AddAtoota(a)

                    # reset parsing state
                    thisAtoota = EmptySyrChar
                    thisVowel = EmptySyrChar
                    thisModifier = EmptySyrChar
                    
                thisAtoota = e
    
    # process last word in sentence (or only word)
    if thisAtoota != EmptySyrChar:
        a = Atoota(thisAtoota, vowel=thisVowel, modifier=thisModifier)
        word.AddAtoota(a)

        sentence.append(ProcessSyriacWord(word))

    ipaStr = ''
    latinStr = ''

    for w in sentence:
        ipaStr += w.ipaStr + ' '
        latinStr += w.latinStr + ' '
    
    ipaStr = ipaStr[:-1]
    latinStr = latinStr[:-1]

    # print(ipaStr)
    # print(latinStr)

    return ipaStr

def lambda_handler(event, context):
    # try:
    syrString = event["text"]
    returnIPA = ProcessSyriacString(syrString);
    # except:
    #     returnIPA = 'error'
    ret = {
        'statusCode': 200,
        'body': json.dumps(returnIPA)
    }

    print(ret)
    return ret


ev = {"text": "ܣܵܪܓܝܼܣ"}
context = None
lambda_handler(ev, context)

ev = {"text": "ܓܵܘ ܠܸܠܝܵܐ ܓܵܘ ܐܝܼܡܵܡܵܐ"}
context = None
lambda_handler(ev, context)

ev = {"text": "ܓ̰ܵܝܡܝܼ"}
context = None
lambda_handler(ev, context)

ev = {"text": "ܣܵܒ݂ܵܐ"}
context = None
lambda_handler(ev, context)

ev = {"text": "ܐ݇ܢܵܫܵܐ"}
context = None
lambda_handler(ev, context)

ev = {"text": "ܐܵܢܵܐ ܓ݂ܵܙܵܠܵܐ"}
context = None
lambda_handler(ev, context)

ev = {"text": "ܚܹܪܸܘܠܵܗ̇"}
context = None
lambda_handler(ev, context)