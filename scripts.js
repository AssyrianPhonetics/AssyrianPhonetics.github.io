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

const wordDictionary = {
    "ܐܸܫܟܲܦܪܘܼ": "a kind of cheese made by heating the first milk given by a buffalo, cow or sheep after giving birth",
	"ܫܲܥܪܵܐ": "down",
	"ܗ݇ܕܵܗܵܐ": "thus",
	"ܡܘܼܡܚܸܠܵܐ": "weakening",
	"ܡܘܼܡܬܵܢܵܐ": "faulty",
	"ܕܠܵܐ ܡܲܪܕܘܼܬܵܐ": "rude",
	"ܢܦܹܐܫܬܵܐ": "breath",
	"ܓܲܙܵܒ": "wrathful",
	"ܡܵܛܹܪ": "to rain",
	"ܗܲܠ ܥܸܕܵܢܵܐ ܕ": "pending an event",
	"ܡܵܥܓ̰ܘܿܢ": "a venereal tonic",
	"ܥܹܩܘܼ": "oppression",
	"ܟܘܼܣܵܦܵܐ": "gain",
	"ܢܵܛܘܪܬܵܐ": "a guardian",
	"ܩܘܼܡ": "arise !",
	"ܨܲܝܵܪܬܵܐ": "a hinge",
	"ܚܵܢܝܼܡ": "a lady",
	"ܕܲܝܠܵܐ": "thinned out",
	"ܐܲܢܵܙܵܐ": "a distaff",
	"ܟܵܦܹܪ": "to purify",
	"ܟܲܗܢܬܵܐ": "a priestess",
	"ܡܝܼܪܲܬܓܵܪ": "an heir",
	"ܢܲܥܘܼܛܘܼܬܐ ܕܛܲܗܪܵܐ": "a siesta",
	"ܠܲܡܲܕ": "the letter Lamad",
	"ܚܲܓ݂ܠܵܐ": "a partridge",
	"ܓܸܠܝܘܿܦܵܐ": "a table",
	"ܚܵܙܘܿܩܵܐ": "a pilgrim",
	"ܓܲܪܓ݂ܘܼܪܹܐ": "to swagger",
	"ܚܲܫܟܸܢ": "to blind",
	"ܡܲܪܒܥܵܝܵܐ": "uterine",
	"ܥܒ݂ܵܕ": "an act",
	"ܠܘܲܥܕܵܐ": "roughly",
	"ܦܹܘܢܝܼܟܣ": "a phoenix",
	"ܢܩܲܡܬ݂ܵܐ": "indignation",
	"ܓ̰ܘܼܘܵܝܵܐ": "mercurial",
	"ܨܲܪܨܲܪܝܼܬܵܐ": "a salamander",
	"ܒ̈ܢܵܬ݂ ܓܲܢܹ̈ܐ": "egg-plant",
	"ܩܪܒ": "to be near",
	"ܚܲܣܝܼܪܵܐ": "lacking in",
	"ܒܸܩܝܵܪܵܐ": "a turban",
	"ܐܘܦܪܐ": "an amphora",
	"ܩܘܼܦܕܵܐ": ": a fish",
	"ܢܦܨ": "to shake",
	"ܒܘܼܝܵܐ": "a hole",
	"ܕܲܪܩܘܼܒ݂ܠܵܝܘܼܬ݂ܵܐ": "enmity",
	"ܣܵܠܕܲܬ": "a knave game of cards",
	"ܐܸܣܬܵܪ ܐܸܣܬܲܡܲܣ": "willy-nilly",
	"ܫܲܬܵܝܵܐ": "drunk",
	"ܫܵܗܣܸܦܪܲܡ": "Basil",
	"ܡܸܕܪܵܢܵܐ": "earthly",
	"ܓܹܙܲܒ݂ܪܵܐ": "a treasurer",
	"ܡܵܘܚܠܘܼܬܵܐ": "despair",
	"ܙܘܐ": "to swell",
	"ܡܸܟ݂ܘܵܬ݂": "like",
	"ܢܟܬ": "to bite",
	"ܩܵܐܕܝܼܢܵܐ": "a watercourse",
	"ܬܝܼܦܬܵܐ": "a cigarette",
	"ܡܵܫܘܿܫܵܐ": "a boar",
	"ܝܘܼܩܪܵܢܵܐ": "masculine",
	"ܡܛܲܥܫܘܼܬܵܐ": "lameness",
	"ܡܪܲܡܛܵܢܵܐ": "an assailant",
	"ܓܲܙܵܪܘܼܬܵܐ": "a butchery",
	"ܡܵܪܵܟܸܫ": "Morocco",
	"ܡܲܐܩܝܪ": "a mace",
	"ܨܘܼ̈ܒܥܵܬ݂ܵܐ": "fingers",
	"ܚܬ݂ܘܿܝܵܐ": "low",
	"ܘܲܨܝܵܬ": "a will (legal document)",
	"ܐܲܪܒ݂ܵܢܵܐ": "wicker",
	"ܕܲܝܕܵܐ": "a hawk",
	"ܡܪܵܘܚܵܢܵܐ": "allowing to breathe",
	"ܫܵܩܹܐ": "to run fast",
	"ܢܲܚܢܸܚ": "to pant",
	"ܐܲܢܢܵܦܘܿܪܵܐ": "a petition",
	"ܬܲܓܒܪܵܢܘܼܬܵܐ": "principality",
	"ܡܸܬܪܵܘܚܵܢܘܼܬܵܐ": "a reach",
	"ܡܵܢ": "what",
	"ܟ̰ܲܪܟ̰ܘܪܹܐ": "to grind",
	"ܩܸܢܹ̈ܐ": "kernels, quarters of walnuts",
	"ܕܠܵܐ ܣܵܟ݂ܵܐ": "enormously",
	"ܗܵܐܠ": "a condition",
	"ܐܲܪܥܵܐ ܢܛܝܼܪܵܐ": "a natural preserve",
	"ܐܵܡܘܿܪܵܐ": "a dweller",
	"ܓܠܝܼܙܘܼܬ ܐܸܢܵܝܘܼܬܵܐ": "selflessness",
	"ܩܵܠܵܢܵܝܘܼܬܵܐ": "vocalization",
	"ܪܸܘܝܵܐ": "drunk",
	"ܗܲܪܵܐܘܵܝܠ": "gee up !",
	"ܣܲܒܠܵܐ": "a straw-mat",
	"ܐܲܚܢܝܼ": "we",
	"ܡܸܬܦܲܩܕܵܢܘܼܬܵܐ": "a review",
	"ܟܵܠܘܿ ܣܘܼܠܵܩܵܐ": "Ascension Day",
	"ܙܵܝܗܢ": "the wit",
	"ܙܲܦܪܘܼܬܵܐ": "rottenness",
	"ܩܒܵܥ": "to fasten",
	"ܡܩܲܛܪܵܢܘܼܬܵܐ": "a dilemma",
	"ܡܨܲܠܠܘܼܬܵܐ": "refinement",
	"ܥܲܝܝܼܛܵܐ": "irritating",
	"ܢܵܪܵܙܝܼ": "unwilling",
	"ܓܒ݂ܝܼܢܹܐ": "eyebrow",
	"ܙܠܝܼܡܘܼܬܵܐ": "obliqueness",
	"ܥܵܢܹܐ": "to answer",
	"ܡܘܼܪܝܸܙܵܐ": "systematic",
	"ܡܐܝܼܡܲܢ": "since when ?",
	"ܟܵܐܸܠܩܵܠܵܐ": "a phonometer",
	"ܡܲܚܠܘܼܛܹܐ": "to seduce",
	"ܝܵܩܘܿܪܵܐ": " heavy",
	"ܡܲܚܢܸܩ": "to strangle",
	"ܒܲܗܒܸܗ": "to overwhelm",
	"ܛܲܝܪܵܐ ܕܫܠܹܝܡܘܿܢ": "a hoopoe",
	"ܡܣܲܕܩܵܢܘܼܬܵܐ": "a tear damage done by tearing",
	"ܕܵܪܹܐ": "to pour",
	"ܒܥܸܠܕܲܪܵܐ": "un guerrier",
	"ܪܦܵܦܵܝܵܐ": "prompt",
	"ܫܵܩܘܿܬܵܐ": "a brook",
	"ܨܵܠܘܿܒ݂ܵܐ": "a crucifier",
	"ܕܲܣܬܸܓ": "shavings",
	"ܣܲܪܟܲܪܕܵܐ": "a commander",
	"ܣܵܦܘܼܩܹܐ": "to empty",
	"ܐܸܟܣܸܪܣܵܝܣ": "physical exercise",
	"ܣܵܦܩܵܐ ܠܡܸܬܒܲܝܢܵܢܘܼܬܵܐ": "remarkable",
	"ܟܵܗܢܵܝܬܵܐ": "sacerdotal",
	"ܩܘܼܫܬܵܐ": "truth",
	"ܦܵܐܬܸܠܓܵܢ": "an egg-plant",
	"ܫܠܝܼܚܘܼܬܵܐ": "nakedness",
	"ܡܵܕܝܼܪܵܐ": "yogurt soup",
	"ܒܲܝܬܸܟܵܐ": "a small house",
	"ܬܲܚܬܝܼܢܵܝܵܐ": "lower",
	"ܦܲܫܡܵܐ": "a pair of red Persian trousers",
	"ܡܓܲܪܓܵܢܵܐ": "the instigator",
	"ܐܲܕܝܼܵܐ": "now",
	"ܛܸܠܵܛܵܐ": "lazy",
	"ܡܟ̰ܲܪܫܸܘ": "to veil",
	"ܓܘܼܕܵܪܵܐ": "a massage",
	"ܡܬܵܪܸܨ": "to make",
	"ܟܸܫܵܐ": "check to the king !",
	"ܦܲܪܬܵܐ": "a female lamb",
	"ܡܲܦܝܸܟܵ": "to cause to insult by a motion of the hands",
	"ܣܘܼܦ": "a papyrus",
	"ܙܵܝܘܿܥܵܐ": "moving",
	"ܪܘܵܐ": "to become drunk",
	"ܢܵܒܘܿܕ": "barren",
	"ܒܚܝܼܫܵܐ": "wanton",
	"ܓܘܼܡܪܘܼܓܚܵܢܵܐ": "a custom-house",
	"ܚܲܝܵܛܵܐ": "a tailor",
	"ܪܵܨܹܢ": "to drip",
	"ܐ݇ܚܹܪ݇ܢܵܐ": "other",
	"ܩܲܪܢܵܒܝܼܛܵܐ": "a cauliflower",
	"ܒܲܝܪܕܵܐ": "a sleeve",
	"ܬܪܲܩܵܝܢܝܼ": "a pop",
	"ܚܵܒ݂ܛܘܼ": "confusion",
	"ܐܲܗܵܝ": "O ! an exclamation of triumph, surprise or contempt",
	"ܡܣܲܡܥܠܵܢܵܐ": "a recluse",
	"ܦܵܠܵܛܝܼܢ": "Palace",
	"ܓܘܼܒܵܐ ܕܙܩܵܪܵܐ": "a weaving atelier",
	"ܩܥܵܪܬܵܐ": "an acorn cup",
	"ܦܸܠܓܵܓܵܐ": "partial",
	"ܢܛܲܪ ܦܲܓܪܵܐ": "a bodyguard",
	"ܣܲܩܸܠ": "to polish",
	"ܟܪܝܼܗܲܬ ܫܘܼܠܵܡܵܐ": "a verb cripple on the third root",
	"ܒܲܣܬܘܼܩܵܐ": "a bottle",
	"ܓܲܠܝܼܵܐ": "a valley (large and affording spring pasture)",
	"ܩܸܩܸܠܬܵܐ": "a garbage heap",
	"ܡܩܲܗܠܵܢܵܐ": "group",
	"ܣܵܣܓܵܘܢܵܐ": "blue",
	"ܟ̰ܘܼܢܒܸܠܵܐ": "suspended",
	"ܫܸܟ݂ܲܠ": "a form",
	"ܚܲܨܵܐ": "the back",
	"ܡܟܲܗܢܵܢܵܐ": "prolific",
	"ܠܘܼܩܕܲܡ": "before",
	"ܐܲܢܕܵܪܘܼܢ": "inner chamber of a woman",
	"ܫܵܘܘܿܪܵܐ": "a dancer",
	"ܓܵܒܵܢܵܐ": "a shepherd",
	"ܡܹܗ݇ܬܵܪ": "a groom",
	"ܙܲܕܘܼܩܵܝܵܐ": "a Sadducee",
	"ܡܲܥܗܘܼܕܹܐ": "to recall",
	"ܣܝܼܩܵܐ": "ascended",
	"ܚܘܿܨܵܦܵܐ": "boldness",
	"ܛܪܵܦܵܐ": "a moment",
	"ܬܲܦܬܘܼܦܹܐ": "rain, hail, hammering ....",
	"ܡܒܲܠܒܹܐ": "to dig",
	"ܐܸܫܟܵܐܵܐ": "a bootmaker",
	"ܫܲܠܒܘܼܛܹܐ": "to whip",
	"ܡܩܲܕܡܵܐܝܼܬ": "before",
	"ܣܲܒ݂ܪܵܐ": "hope",
	"ܦܸܫܟܘܼܙܵܐ": "a clasp",
	"ܙܹܗ݇ܢܵܢܵܐ": "talented",
	"ܡܬܲܠܡܸܕ݂": "to convert",
	"ܡܲܠܝܸܨ": "to torture",
	"ܡܲܥܒ݂ܪܵܢܵܐ": "transparent",
	"ܒܘܼܙܵܐ": "Boza",
	"ܟ̰ܝܼܡܵܐ": "a sod",
	"ܒܵܛܘܵܬܵܐ": "a wine vessel (vat ? barrel ?)",
	"ܚܣܵܕܵܐ": "to scorn",
	"ܬܵܘܩܵܐ": "a necklace",
	"ܕܡܵܟ݂ܵܐ ܡܲܓܢܲܛܝܼܣܵܝܵܐ": "the state of hypnosis",
	"ܚܵܫܚܵܐ": "serviceable",
	"ܝܲܪܝܼܟ݂ܢܵܝܬܵܐ": "somewhat long",
	"ܢܘܼܩܫܵܐ": "embroidery",
	"ܦܲܨܓܪܝܼܒܵܐ": "a viceroy",
	"ܫܟܝܼܢܵܝܵܐ": "perpetual",
	"ܝܲܥܢܝܼ": "that is to say",
	"ܒܲܢܕܵܐ": "a dam",
	"ܝܲܥܩܘܿ": "James",
	"ܝܘܼܪܝܼܫ": "a sally",
	"ܐܘܼܪ̈ܚܵܬ݂ܵܐ": "ways",
	"ܡܓ݂ܵܘܲܢܵܐ": "colored",
	"ܒܲܪܫܵܥܬܹܗ": "right away",
	"ܒܹܐ ܡܹܣܠ": "flawless",
	"ܡܸܬܨܲܠܡܸܢܵܢܵܐ": "conceivable",
	"ܥܵܠܡܵܝܵܐ": "adjective",
	"ܡܦܲܠܦܲܠܬܵܐ": "defiled",
	"ܡܲܥܡܘܼܕܹܐ": "to baptize",
	"ܓܲܕܘܼܕܵܐ": "a youth",
	"ܡܫܲܡܠܲܝܵܐ": "utter",
	"ܒܲܪ ܥܲܡܡܹܐ": "a pagan",
	"ܕܸܪܒܬܵܐ": "a wound",
	"ܛܚܵܪܵܐ": "Tenesmus",
	"ܒܓ݂ܘܼܢܝܵܐ": "a rumble",
	"ܬܲܟ݂ܣܝܼܬܵܐ": "a cover",
	"ܡܟܲܪܬܸܠ": "to intertwine",
	"ܣܸܡ̈ܕܹܐ": "pounded wheat and butter",
	"ܣܪܝܼܚܘܼܬܵܐ": "madness",
	"ܨܲܚܠܲܚܬܵܐ": "a spasm",
	"ܦܘܼܦܝܼܬܵܐ": " an eruption on the body",
	"ܫܩܵܩܵܐ": "a lane",
	"ܡܲܫܡܲܫܬܵܐ": "groping around",
	"ܡܲܣܒ݂ܸܪܵܐ": "planned",
	"ܡܲܝܩܘܿܪܹܐ": "to make heavy",
	"ܓܲܪܘܘܼܣܹܐ": "to grow",
	"ܡܵܘܕܥܵܢܘܼܬ݂ܵܐ": "a preface",
	"ܩܵܨܹܒ݂": "to cut",
	"ܨܦܵܐ": "to clear up",
	"ܚܸܕܒ݂ܵܐ": "endive",
	"ܡܩܲܪܬܸܠ": "to intertwine",
	"ܩܘܼܪܢܝܼܬܵܐ": "oregano",
	"ܡܵܪܝ݇": "Lord",
	"ܒܵܐܸܓ̰": "to be very warm",
	"ܡܲܟ̰ܘܼܥܬܵܐ": "smoothness",
	"ܪܲܡܵܝܵܐ": "a sniper",
	"ܡܸܬܩܲܠܩܠܵܢܘܼܬܵܐ": "negligence",
	"ܠܲܩ": "eggs",
	"ܓ̰ܘܼܪܐܵܬ": " prowess",
	"ܒܹܕܝܘܼܬ݂ܵܐ": "an ink-well",
	"ܡܥܲܡܸܪ": "to cause to dwell",
	"ܚܸܠܬܵܢܬܵܐ": "crafty",
	"ܬܘܼܘܸܒܵܐ": "adjective",
	"ܓܘܼܪܢܝܼܕܵܐ": "a plane a carpenter's tool",
	"ܩܘܵܝܵܐ": "to harden",
	"ܟܪܝܼܗܬܵܐ": "weak letter ...",
	"ܣܵܢܹܩ": "of",
	"ܐܵܪܸܡܢܵܝܬܵܐ": "(an) Armenian",
	"ܦܵܢܣܵܐ": "a lantern",
	"ܡܘܿܝܕܵܐ": "a clown",
	"ܦܸܚܡܵܝܵܐ ܒܫܘܼܘܕܵܥܵܐ": "synonymous",
	"ܫܲܡܘܼܚܵܐ": "smelly",
	"ܬܩܘܿܥܵܝܵܐ": "of Tekoah",
	"ܗܘܼܠܵܠܵܐ": "a hulala",
	"ܟܫܘܼܒ݂ܵܐ": "Cnicus",
	"ܐܲܦܨܵܐ": "gallnut",
	"ܦܲܬܝܵܐ": "open",
	"ܪܝܼܫܘܼܬܵܐ": "primacy",
	"ܩܢܵܢܵܐ": "a poll-tax",
	"ܡܓܲܠܡܸܓ̰": "to mix",
	"ܚܘܼܪܙܵܝܬܵܐ": "a sister's daughter",
	"ܐܵܟܸܠܡܸܫܗ݇ܘܵܐ": "to disappear",
	"ܗܵܡܵܐ": "therefore",
	"ܢܸܩܒܬܵܢܵܝܵܐ": "feminine",
	"ܬܘܼܚܬܵܝܵܐ": "condescension",
	"ܐܘܼܠܹܗ": "here he is",
	"ܛܥܝܼܡܵܐ": "sweet",
	"ܟ̰ܵܢܵܐ": "the shell",
	"ܕܵܐܵܗܵܐ": "this",
	"ܪܹܫܵܝܬܵܐ": "main",
	"ܕܲܟܵܐ": "the fist",
	"ܗܵܢܘܿܢ": "those",
	"ܙܲܗܠܘܼܝܹܐ": "to startle",
	"ܕܘܼܢܒܵܐ": "bobtailed",
	"ܪܵܥܝܼܬ݂ܵܐ": "a shepherdess",
	"ܩܸܦܸܠ": "a padlock",
	"ܝܲܪܝܼܟ݂ܬܵܐ": "long",
	"ܩܲܪܩܲܙܬܵܐ": "the arrangement",
	"ܚܲܣܝܼܪܘܼܬ ܕܸܡܵܐ": "anaemia",
	"ܡܸܠܲܬܫܡܵܐ ܚܵܫܘܿܫܬܵܐ": "a past participle",
	"ܦܵܪܸܡ": "to cut",
	"ܡܩܲܒܠܵܐ": "suitable",
	"ܐܘܼܣܝܼܵܐ ܕܡܲܡܠܠܵܐ": "a recap",
	"ܙܹܠܵܢ": "rubbed smooth",
	"ܒܲܓ݂ܒܸܓ݂": "to twaddle",
	"ܟܬܝܼܒ݂ܵܐ": "written",
	"ܩܝܼܵܪܵܐ": "a pitch well",
	"ܣܸܪܬܵܐ ܬܪܝܼܨܵܐ": "straight",
	"ܡܲܩܬܸܠ": "to fight",
	"ܡܲܚܵܪܵܐ ܕܒܲܢܵܝܘܼܬܵܐ": "an architect",
	"ܐܵܨܘܼܬܵܐ": "a flower-pot",
	"ܫܚܝܼܬܵܐ": "sauce",
	"ܠܸܣܛܵܝܵܐ": "thievish",
	"ܡܲܙܠܘܼܩܹܐ": "to cause to shine with fluctuating light",
	"ܝܘܼܠܦܵܢ ܗܵܘܵܐ ܟܝܵܢܵܝܵܐ": "Meteorology",
	"ܩܸܪܘܼܬܵܐ": "wax",
	"ܪܵܡܵܢܬܵܐ": "proud",
	"ܡܲܟܪܸܒܵܢܵܐ": "hostile",
	"ܕܪܵܫܵܐ": " arguing",
	"ܡܲܗܦܘܼܟܹܐ": "to overthrow",
	"ܒܛܵܢܵܐ": "a) to conceive",
	"ܬܲܥܢܵܐ": "strong-speaking",
	"ܪܸܡܠܕܵܪܘܼܬܵܐ": "sorcery",
	"ܣܲܝܒܘܼܬ݂ܵܐ": "old age",
	"ܫܵܢܝܼܬܵܐ": "rabid",
	"ܐܘܼܡܵܢ ܩܵܝܡܵܬܹ̈ܐ": "a sculptor",
	"ܦܘܼܫܝܼܵܐ": "a turban especially one worn by women",
	"ܡܲܫܝܸܚ": "to gather together",
	"ܩܠܝܼܦܵܐ": "peeled",
	"ܟ̰ܝܼܢܵܟ̰ܝܼ": "a gatherer of cotton",
	"ܣܲܢܣܘܼܠܹܐ": "to descend",
	"ܦܲܪܓܘܼܬܵܐ": "vitality",
	"ܦܝܼܟ̰ܵܐ": "a bastard",
	"ܣܦܝܼܪܵܐܝܼܬ": "literarily",
	"ܫܲܕܵܠܵܐ": "an enticer",
	"ܡܸܬܬܲܣܪܚܵܢܘܼܬܵܐ": "the designation",
	"ܚܸܘܝܵܐ ܨܵܠܘܿܠܵܐ": "a rattlesnake",
	"ܡܸܬܪܲܗܝܵܢܘܼܬܵܐ": "watch",
	"ܫܸܡܲܚܟܵܐ": "the palate",
	"ܡܸܨܛܲܚܝܵܢܘܼܬܵܐ": "an outrage",
	"ܟ̰ܪܵܦܵܐ": "to dash",
	"ܚܘܼܫܵܒ݂ܵܐ": "thought",
	"ܛܲܪܘܼܢܵܐ": "wet",
	"ܙܵܐܠܹܡ": "cruel",
	"ܕܹܝܪ": "good work",
	"ܒܲܪܡܘܼܠܟܵܢܵܐ": "the son of the promise",
	"ܓ݂ܵܒܸܢ": "to be angry",
	"ܕܝܼܢܣܹܙ": "irreligious",
	"ܛܵܦܝܵܢܵܐ": "disease ...",
	"ܢܲܨܝܼܠܘܼܬܵܐ": "percolation",
	"ܪܸܓܝܵܐ": "fatigued",
	"ܐܲܟܵܪܵܐ": "a peasant",
	"ܥܕܵܢܬܵܐ": "time",
	"ܫܬܵܬܲܥܣܲܪ": "sixteen",
	"ܢܸܣܛܘܿܪ": "Nestor",
	"ܕܟܐ": "to cleanse, to purify",
	"ܡܟܲܣܝܘܼܬܵܐ": "covering",
	"ܕܲܝܪܵܢܝܼܬܵܐ": "a nun",
	"ܡܚܲܬܪܵܐ": "tender",
	"ܟܠ ܕܵܐܟ݂ܝܼ ܕܗܵܘܝܵܐ": "nonetheless",
	"ܡܐܲܟ݂ܵܐܠܒܲܬ݇ܪܵܐ": "herafter",
	"ܚܲܫܠܵܢܵܐ": "a pounder",
	"ܛܣܣ": "to beat out metal into foil",
	"ܡܲܚܛܘܿܝܹܐ": "to cause to sin",
	"ܦܩܘܿܕ݂": "to prefer",
	"ܓ̰ܲܢܓ̰ܲܪܬܵܐ": "torment",
	"ܦܸܟ݂ܣܵܐ": "a box",
	"ܐܘܼܣܝܵܝܵܐ": "fundamental",
	"ܡܢܲܣܝܵܢܘܼܬܵܐ": "experience",
	"ܨܵܬܸܠ": "a pail",
	"ܣܲܚܒܘܼܪܘܼܬ݂ܵܐ": "a visitation",
	"ܡܟ̰ܲܡܟ̰ܹܐ": "to make dirty",
	"ܡܲܥܒ݂ܸܕܵܢܵܐ": "an agent",
	"ܡܠܵܚܹܫ": "to conspire",
	"ܕܲܪܡܣܘܿܩܵܝܵܐ": "of Damascus",
	"ܥܲܦܪܵܐ ܣܡܘܼܩܵܐ": "ocher",
	"ܡܲܘܒܫܵܢܘܼܬܵܐ": "desiccation",
	"ܠܸܘܝܼܬܵܐ": "a female comrade",
	"ܓܘܼܡܕܵܢܵܐ": "bold",
	"ܥܸܒ݂ܪܵܝܬܵܐ": "noun",
	"ܚܲܪܝܼܦ ܗܵܘܢܵܐ": "quick",
	"ܡܣܲܠܹܐ": "to comfort",
	"ܩܘܼܪܕܵܥܵܐ": "a cudgel",
	"ܡܲܗܘܘܼܝܹܐ": "to pioneer",
	"ܟܘܼܦܵܐ": "low",
	"ܟܘܼܬܸܠܬ݂ܵܐ": "kibbeh, Lishani: kubba",
	"ܫܘܼܚܬܵܢܵܐ": "rusty",
	"ܐ݇ܢܵܫܵܝܵܐ": "human",
	"ܨܐܵܢܵܐ": "to smell",
	"ܟܲܕܚܘܼܕܵܝܘܼܬ݂ܵܐ": "riches",
	"ܬܲܪܓ̰ܸܡ": "to interpret",
	"ܡܪܵܚܸܨ": "to permit",
	"ܢܝܵܡܵܐ": "to slumber",
	"ܦܸܠܦܸܠܬܵܐ": "a red pepper",
	"ܓܪܸܦܬܵܪ": "down with",
	"ܚܲܙܕܸܓܵܢܵܐ": "harmful",
	"ܒܵܥܵܬ": "stale",
	"ܡܲܙܕܥܵܢܵܐ": "tremendous",
	"ܢܸܨܝܵܢܵܝܵܐ": "opponent",
	"ܠܲܝܘܸܢ": "I am not",
	"ܚܸ̈ܛܹܐ": "wheat",
	"ܪܩܕ": "to dance",
	"ܠܘܼܕܵܪܘܼܬܵܐ": "swordsmanship",
	"ܬܪܝܼܢܓܵܐ": "a spectacle",
	"ܐܵܘܬܵܩ": "a room",
	"ܫܝܼܪ": "enamel",
	"ܥܲܨܝܵܐ": "hard",
	"ܣܘܿܢܓܘܼܦܵܪ": "cinnabar (artificial red mercuric sulphide, used chiefly as a pigment)",
	"ܦܲܪܨܘܼܢܹܐ": "to crisp",
	"ܢܵܐܸܨ": "to sting",
	"ܓ̰ܘܼܠܝܼܓ̰ܵܢܵܐ": "(the name of an edible vegetable used also for making red ink)",
	"ܒܘܼܫ": "more",
	"ܓܵܘܵܐ": "inside",
	"ܛܵܠܵܫܬܵܐ": "a shaving",
	"ܦܸܗܘܵܐ": "a rove",
	"ܥܲܡܬ݂ܵܐ": "a paternel aunt",
	"ܝܵܪܬܵܐ": "a lover",
	"ܣܵܩܘܿܛܵܐ": "crouching",
	"ܣܵܦܩܘܼܬܵܐ": "qualification",
	"ܨܠܵܚܵܐ": "to cleave",
	"ܦܘܼܓܵܝܵܐ": "enjoyment",
	"ܡܬܲܚܬܵܝܘܼܬܵܐ": "inferiority",
	"ܝܲܠܵܠܵܐ": "a hyena",
	"ܣܲܬܸܬ": "a pillar",
	"ܡܫܲܠܡܵܢܵܐ": "entire",
	"ܝܣܲܪܕܝܼܠ": "the seventh day of Pentecost",
	"ܬܟ݂ܝܼܒ݂ܵܐ": "persistent",
	"ܗܸܠܟ݂ܵܐ": "a walk",
	"ܚܸܪܫܵܢܵܐ": "wild",
	"ܐܫܝܼܥܘܼܬܵܐ": "assuagement",
	"ܡܢܲܒ݂ܝܵܢܘܼܬ݂ܵܐ": "seeing the future",
	"ܥܸܙܵܐ": "a goat four years old and over, especially the female",
	"ܚܹܝܬ݂": "\"Kheth\"",
	"ܡܲܦܪܝܵܢܘܼܬܵܐ": "procreation",
	"ܕܵܒ݂ܸܩ ܩܲܕ݇ܡܝܘܼܬܹܗ ܕ": "to be in the way of",
	"ܓ": "third letter of the Sureth alphabet",
	"ܐܸܫܝܼܬܵܐ ܬܲܠܓܵܝܬܵܐ": "a snowslide",
	"ܨܵܘܨܘܼܝܹܐ": "to whine",
	"ܙܵܩܝܼܦܬܵܐ": "a pin",
	"ܪܲܦܘܼܬܘܼܬܵܐ": "an impulse",
	"ܣܲܩܪܝܼܦܘܿܣ": "the outline",
	"ܫܦܵܢܵܐ": "to harrow",
	"ܡܫܵܝܬܵܐ": "wiping",
	"ܦܘܼܡܵܐ ܚܬܵܐ": "face down",
	"ܓܝܵܙܵܐ": "to fail",
	"ܚܲܒ݂ܨܵܐ": "a bean broad, kidney...",
	"ܫܲܪܵܝܵܐ": "an analyst",
	"ܢܘܼܟ݂ܬܵܐ": "a sting",
	"ܗܲܝܸܪܵܢܵܐ": "serviceable",
	"ܢܸܒܬܵܐ": "pitch",
	"ܐܲܓ݂ܠܲܒ": "most of",
	"ܛܘܼܠܩܵܐ": "a military unit",
	"ܦܓܡ": "to decay",
	"ܠܵܒ݂ܸܟ݂": "to hold",
	"ܙܩܘܿܛܵܐ": "a kite",
	"ܫܵܩܹܪ": "to act like a quack",
	"ܬܝܵܪܵܐ": "to regain consciousness",
	"ܣܢܹܐܓ݂ܪܵܐ ܕܣܵܬܹܪ ܕܝܼܢܵܐ": "a defending barrister",
	"ܛܵܣܝܼ": "bright",
	"ܡܵܥܪܦ̮ܵܬ": "ingenuity",
	"ܥܡܝܼܡܵܐ": "bastard",
	"ܢܹܡܵܢܬܵܐ": "moist",
	"ܓܸܕܫܵܢܵܐܝܼܬ": "accidentally",
	"ܕܵܒ݂ܸܩ": "to catch",
	"ܪܵܫܹܡ": "to note",
	"ܕ": "a proclitic particle",
	"ܚܓ݂ܵܪܵܐ": "to cordon",
	"ܡܲܦܣܵܢܘܼܬ݂ܵܐ": "a passport",
	"ܡܸܬܕܲܪܓ݂ܵܢܘܼܬܵܐ": "progress",
	"ܝܼܠܵܗܿ": "she is",
	"ܒܕܘܼܠܝܵܐ": "babbling",
	"ܟܵܒ݂ܘܿܫܵܐ": "a nightmare",
	"ܫܪܵܝ ܕܥܝܼܩܘܼܬܵܐ": "relief",
	"ܪܵܐܸܕ݂": "to darn",
	"ܚܲܕܸܡ": "to serve",
	"ܦܲܣܝܼܢܵܐ": "plowshare",
	"ܚܲܪܸܦ": "to sharpen",
	"ܢܘܼܝܵܚܵܐ": "a respite",
	"ܦܵܟܹܗ": "to pale",
	"ܒܲܠܩܵܐ": "speckled",
	"ܣܛܸܗܐܵܪ": "fat",
	"ܓܲܢܘܼܨܵܐ": "a piglet",
	"ܚܝܵܓ݂ܵܐ": "a revolution",
	"ܪܘܐ": "to inebriate",
	"ܡܲܠܫܵܐ": ": bald",
	"ܟܘܼܬܠܵܐ": "a curl",
	"ܣܹ̈ܟܹܐ": "ploughshares",
	"ܒܹܝܬ ܡܲܚܪܝܵܐ": "restroom",
	"ܚܢܝܼܛܘܼܬܵܐ": "embalming",
	"ܝܲܣܪܵܐ": "a tie to fasten bales of straw",
	"ܐܲܟ݂ܬܵܢܵܐ": "grudgeful",
	"ܫܘܼܠܵܡܵܐ": "the end",
	"ܦܵܨܹܐ": "to escape",
	"ܓܸܣܹ̈ܐ": "fleeces",
	"ܦܸܬܩܵܐ": "a mine",
	"ܡܸܬ݂ܡܲܨܝܵܢܵܐ": "possible",
	"ܦܲܬܵܢܵܐ": "an asp",
	"ܦܵܗܸܡ": "to understand",
	"ܣܘܒ݂ܓܵܐܬ": "a gift",
	"ܩܲܝܢܵܝܘܼܬܵܐ": "forging",
	"ܒܘܼܠܒܘܼܠ": "a nightingale",
	"ܕܵܡܕܘܼܡܸܐ": "to bleed",
	"ܪܘܼܦܣܵܐ ܕܥܲܝܢܵܐ": "a moment",
	"ܚܘܿܪܵܫܵܐ": "bewitching",
	"ܡܸܪܬܵܢܵܐ": "vindictive",
	"ܓܲܒܲܐ ܩܲܕܡܵܝܵܐ": "the fore-part",
	"ܬܲܩܬܘܼܩܹܐ": "to knock",
	"ܫܠܝܼܦܵܐ": "dislocated",
	"ܐܲܢܵܐ": "this (feminine)",
	"ܣܘܣܐ": "to heal",
	"ܚܸܠܡܵܬܟܵܪܘܼܬܵܐ": "the act of serving",
	"ܡܬܲܪܬܪܵܢܵܐ": "a chatterbox",
	"ܟܬܵܡܵܐ": "to mask",
	"ܙܹܐܦܵܢܵܐܝܼܬ": "fraudulently",
	"ܡܣܲܡܥܠܵܐܝܼܬ": "ascetically",
	"ܒܓ݂ܸܠܛܵܐ": "wrongly",
	"ܙܵܠܘܿܒ݂ܵܐ": "a gazelle stag",
	"ܫܵܟܸܪ": "to praise",
	"ܐܲܣܵܢܵܐ": "a heaping up",
	"ܒܲܛܢܵܐ": "pregnant",
	"ܣܦܲܪ̈ܝܵܘܡܹܐ": "newspapers",
	"ܦܩܵܥ": "to crack",
	"ܟܲܘܟ݂ܒ݂ܵܐ ܕܕܸܡܵܐ": "a ruby",
	"ܩܲܪܩܘܼܛܵܐ": "cartilage",
	"ܠܲܡܬܵܐ": "a word",
	"ܟܵܦܸܢ": "to be hungry",
	"ܠܝܵܨܵܐ": "distress",
	"ܕܘܿܡܘܿܣܝܘܿܢ": "tribunal",
	"ܙܘܼܓܵܡܵܐ": "a (locking) bolt",
	"ܝܘܼܠܦܵܢ ܕܘܼܟܬ݂ܵܝܘܼܬ݂ܸܐ": "Ecology",
	"ܬܵܩܘܼܠܬܵܐ": "a trap",
	"ܚܘܼܒܵܐܝܼܬ": "affectionately",
	"ܩܲܡܵܪܵܐ": "a girdle",
	"ܡܗܘܼܝܡܢܵܐ": "believed",
	"ܢܩܵܕܵܐ": "to thin",
	"ܫܘܼܪܩܝܵܐ": "popped",
	"ܡܗܵܕܹܡ": "to raze",
	"ܚܘܼܪܕܘܼܬ݂ܵܐ": "power",
	"ܩܸܢܝܵܢܵܐ ܟܘܼܡܵܐ": "beef",
	"ܡܸܬܬܡܝܩܵܢܵܐ": "the laughing stock",
	"ܡܓܲܠܓܸܠ": "to roll round",
	"ܣܦܝܼܢ݇ܬܵܐ": "a ship",
	"ܐܸܦܬܵܪܐ": "qualm",
	"ܥܲܪܹܐ": "to patch a garment, a tube ...",
	"ܬܲܪܬܲܝܗܹܝܢ": "both of them",
	"ܡܚܲܦܝܵܢܵܐ": "withheld",
	"ܗܵܘܠܗܵܘܠ": "shinty",
	"ܥܸܠܵܐ": "a cause",
	"ܡܘܼܚܟܸܡ": "firm",
	"ܒܢܲܝ ܬܲܪܥܝܼܬܵܐ": "a political party",
	"ܡܸܣܬܲܒ݂ܪܵܢܘܼܬܵܐ": "a surmise",
	"ܝܵܐܵܐ": "fair",
	"ܙܢܩ": "to beat",
	"ܫܵܢܵܝܬܵܐ": "transference",
	"ܬܸܠܘܿܢܬܲܝܗܝ": "them three",
	"ܫܲܦܘܼܦܵܐ": "a cripple",
	"ܢܝܼܵܙ": "a reward for good news ...",
	"ܬܸܢܝܵܢܬܵܐ": "plait",
	"ܩܵܘܟ̰ܵܐ": "",
	"ܥܢܵܩܵܐ ܕܪܘܼܚܵܐ": "an ostrich",
	"ܪܸܒܨܵܐ": "jam",
	"ܬܘܼܕܪܵܐ": "peppergrass",
	"ܥܲܝܢܘܼܒ݂ܹܐ": "spectacles",
	"ܓܵܘܪܵܐ": "according to",
	"ܝܵܗܹܒ݂ ܠܸܒܵܐ": "to comfort",
	"ܒܲܓ̰ܲܪܬܵܐ": "growing seedlings, plants ...",
	"ܒܲܪ ܙܘܼܓܵܐ": "spouse",
	"ܠܦܵܦܵܐ": "the enveloppe",
	"ܡܟܵܟܵܐ": "a rug",
	"ܟܘܼܚܵܕܵܐ": "reverence",
	"ܬܵܟܸܣ": "to thrust",
	"ܚܲܡܫܘܿܢܬܲܝܗܝ": "all five of them",
	"ܡܠܲܒ݂ܠܹܐ": "to carry",
	"ܥܲܙܝܼܙ ܢܲܦ̮ܫܵܐ": "cool",
	"ܫܘܼܕܵܠܵܐ": "courtesy",
	"ܓ݂ܲܪܝܼܒܵܝܵܐ": "a foreigner",
	"ܟܲܠܸܫ": "to whitewash",
	"ܡܚܲܝܬ݂ܐ ܕܠܸܒܵܐ": "a beating of the heart",
	"ܒܵܐܸܙ": "to spill",
	"ܩܘܼܪܘܼܫܬܵܐ": "-milk- cream (especially that which is collected on the surface of the container)",
	"ܕܪܝܼܫܵܐ": "trite",
	"ܡܲܣܝܸܢ": "to cause to stand upright",
	"ܠܩܝܼܫܵܝܵܐ": "latter",
	"ܓܘܼܠܥܵܐ": "a fruitstone",
	"ܡܲܥܒ݂ܲܕܬܵܐ": "effecting",
	"ܡܲܗܡܝܵܢܵܐ": "regardless",
	"ܚܲܒ݂ܪܘܼܬܵܐ": "fellowship",
	"ܓܲܪܡܲܛܝܘܿܢ": "a writ",
	"ܥܲܝܢܵܢܵܐ": "grafting",
	"ܡܲܚܝܵܛܵܢܵܐ": "a tailor ,",
	"ܡܲܥܘܼܠܵܐ": "a tyrant",
	"ܥܲܪܘܼܩܝܵܐ": "a refuge",
	"ܬܠܵܬܝܼܢ": "thirty",
	"ܕܲܥܘܝܼ": "a case",
	"ܨܵܪܵܠܘܿܓ": "a plum",
	"ܐܲܝܟܵܐ ܕ": "the place where",
	"ܡܵܘܓ݂ܠܵܟ̰ܝܼ": "a thief",
	"ܫܘܼܕܵܬܵܐ": "nomination",
	"ܡܛܵܝܵܐ": "to come to ...",
	"ܡܵܐܗܘܿܬ": "woolen cloth",
	"ܐܲܢܘܿܢܵܐ": " rations",
	"ܡܲܛܹܐ ܒ݂ܵܢܵܐ": "a benefactor",
	"ܠܵܐ ܦܲܪܨܘܿܦܵܐ": "none",
	"ܓܢܢ": "to reside",
	"ܡܛܲܚܢܵܢܵܐ": "digestive",
	"ܙܘܼܦܪܵܐ": "a stench",
	"ܡܲܢܫܸܫ": "to paralyze",
	"ܪܲܚܫܵܐ": "a reptile",
	"ܐܵܟ݂ܸܠܩܲܪܨܵܐ": "an accuser",
	"ܕܝܼܠܵܢܵܝܘܼܬܵܐ": "a peculiarity",
	"ܙܒ݂ܵܕܵܐ": "to endow",
	"ܪܵܘܪ̈ܒ݂ܹܐ": "the high and mighty",
	"ܟܲܪܦܝܼܟ̰": "a brick",
	"ܗܘܼܨܠܵܐ": "born",
	"ܩܲܠܥܵܒܲܢܕ": "held prisoner",
	"ܡܲܢܟܸܦܵܢܵܐ": "shameful",
	"ܡܲܣܲܡܬܵܐ ܕܒܵܠܵܐ": "vigilance",
	"ܫܲܠܩܵܢܬܵܐ": "pitted with smallpox",
	"ܩܲܣܝܵܐ": "Cassia bark",
	"ܢܵܐܙܵܐܢܝܼ": "peerless",
	"ܢܹܪܝܼܬܵܐ": "a kind of plant",
	"ܣܢܘܼܢܝܼܬܵܐ": "a swallow (bird)",
	"ܝܲܩܝܼܪ ܕܲܡܝܵܐ": "priceless",
	"ܒܵܕܲܡ": "but",
	"ܩܲܠܝܵܐ ܕܵܐܫ": "an alkali",
	"ܡܟܲܝܢܵܢܵܐܝܼܬ": "naturally",
	"ܪܸܡܣܵܐ": "white secretion in the corner of the eyes",
	"ܡܲܥܠܢܵܐ": "a way of exit or entrance",
	"ܬܸܢܝܵܢܘܼܬ ܡܚܲܝܕܘܼܬܵܐ": "a reconciliation",
	"ܩܵܠܘܼܟ݂": "thee",
	"ܕܪܵܡܘܿܢ": "a yacht",
	"ܠܵܐ ܡܸܙܕܲܟ݂ܝܵܢܘܼܬܵܐ": "invincibility",
	"ܡܲܡܪܲܥܬܵܐ": "offense",
	"ܟ̰ܲܟܟ̰ܘܼܟܹܐ": "to creak",
	"ܟܸܪܟ݂ܵܢܘܼܬܵܐ": "machining",
	"ܕܘܼܟ݂ܪܵܢܵܝܵܐ": "memorial",
	"ܝܲܚܢܵܐ": "a stew",
	"ܚܘܼܕܘܼܪܝܼ": "selfish",
	"ܡܩܲܫ̰ܕܸܪ": "to dare",
	"ܦܲܪܦܥܸܪ": "to snort",
	"ܒܹܝܬ݂ ܓܲܝܣܵܐ": "a camp",
	"ܣܸܪܝܘܼܬܵܐ ܕܫܸܡܵܐ": "notoriety",
	"ܦܪܬ": "to burst",
	"ܡܕܵܒܸܪ": "to govern",
	"ܙܝܼܠ": "a postscript",
	"ܓܐ݇ܙܵܐ": "to shear",
	"ܣܐܝܼ̈ܢ": "bushels",
	"ܢܲܟ݂ܦܘܼܬܵܐ": "bashfulness",
	"ܥܙܵܠܵܐ": "a web",
	"ܡܕܲܪܒܝܵܢܬܵܐ": "a midwife",
	"ܚܲܪܡܲܣܬܵܐ": "a quaff",
	"ܡܲܦܬܘܼܠܹܐ": "to turn",
	"ܕܝܠܹ̈ܐ": "the personnel",
	"ܩܲܒܵܒ݂ܝܼܬܵܐ": "a shudder",
	"ܫܵܦܲܟ݂ܬܵܐ": "shedding",
	"ܚܝܼܪܦܵܐ": "sharp",
	"ܐܲܪܬܵܕܘܼܟܣܵܝܘܼܬܵܐ": "orthodoxy",
	"ܡܢܝܼܚܵܢܘܼܬܵܐ": "service",
	"ܡܲܬܩܢܵܐ ܕܣܸܟܬܵܐ": "a railway station",
	"ܝܵܢܘܿܩܵܐ": "a suckling",
	"ܡܚܵܒܢܹܗ": "Alas !",
	"ܦܲܓܸܚ": "to obstruct",
	"ܕܲܣܵܢ": "The name of the Hakkiari mountains whence the Yezidis derive their name",
	"ܬܲܓܠܝܵܢܵܐ": "a demonstrator",
	"ܦܵܗ݇ܢ": "dried manure for stable litter broken into small pieces",
	"ܩܲܛܝܼܓ݂ܘܿܪܝܼܵܐ": "a category",
	"ܣܝܼܢܵܡܵܐ": "the cinema",
	"ܡܬܲܚܡܵܢܘܼܬܵܐ": "definition",
	"ܣܵܪܸܒ݂": "to deny something to someone",
	"ܣܦܵܪܝܘܿܡܵܬܵܐ": "a chronicle",
	"ܐ݇ܚܵܪܵܝܵܐ": "last",
	"ܠܵܟܵܬܵܐ": "a prostitute",
	"ܛܲܡܵܢܵܝܵܐ": "polluted",
	"ܦܲܠܘܼܥܹܐ": "to part",
	"ܡܕܲܚܠܵܢܵܐ": "frightening",
	"ܦܵܪܹܥ": "to pay",
	"ܒܹܝܬ ܚܘܼܠܵܠܵܐ": "a restroom",
	"ܣܘܵܢܵܐ": "the edge of a terrace",
	"ܒܲܙܸܒ݂ܢܹܐ": "last year",
	"ܥܵܒ݂ܘܿܪܵܐܝܼܬ": "briefly",
	"ܣܘܼܡܦܵܬܝܼܵܝܵܐ": "sympathetic",
	"ܦܲܪܦܲܝܬܵܐ": "rinsing",
	"ܐܕܵܫܵܐ": "to be careless or negligent",
	"ܫܲܝܵܦܵܐ": "a caulker",
	"ܡܐܲܕܪܸܢ": "to be afflicted with the Baghdad sore",
	"ܬܲܪܟ ܥܒ݂ܵܕܵܐ": "to abandon",
	"ܢܵܘܹܪ": "to startle",
	"ܟܵܡܸܫ": "to fade",
	"ܝܲܬܝܼܪ ܡܸܢ": "more ... than",
	"ܫܐܠ": "to ask",
	"ܒܲܪ ܚܸܪܝܵܢܵܐ": "an opponent",
	"ܟܲܦܲܢܬܵܐ": "an arch over a cradle",
	"ܠܸܣܛܪܵܢܘܼܬܵܐ": "neutrality",
	"ܚܸܛܝܵܢܵܐ": "a fault",
	"ܡܲܪܗܒ݂ܵܢܵܐ": "tremendous",
	"ܦܘܿܠܝܼܛܝܼܩܘܿܢ": "politics",
	"ܓܪܸܣܝܼܵܐ": "Greece",
	"ܒܲܥܪܝܼܪܵܐܝܼܬ": "fiercely",
	"ܢܟ݂ܵܐ": "to harm",
	"ܕܥܵܪܬܵܐ": "turning back",
	"ܩܦܵܦܵܐ": "to brood",
	"ܦܲܢܵܐ": "an ossifrage",
	"ܪܲܙܵܠܹܐ": "abuse",
	"ܡܙܵܒܸܠ": "to manure",
	"ܫܲܘܝܘܼܬ ܪܸܗܛܵܐ": "a concourse",
	"ܐܣܵܐ": "to cure",
	"ܠܲܚܬܵܐ": "the palm of the hand",
	"ܦܵܬܵܠܬ݂ܵܐ": "a wandering female",
	"ܚܲܪܓ̰": "expense",
	"ܟܘܿܪܵܐ": "a region",
	"ܫܠܝܼܚܘܼܬ݂ܵܐ": "apostolate",
	"ܨܕܵܪܵܐ": "to reel",
	"ܟ̰ܵܝܸܪ": "weeds",
	"ܬܲܪ": "on account of",
	"ܒܹܨܠܵܐ ܕܝܲܡܵܐ": "Scilla maritima",
	"ܚܘܼܫܵܒ݂": "a thought",
	"ܕܸܟ݂ܪܵܝܵܐ": "male",
	"ܦܣܝܼܣܵܐ": "licensed",
	"ܟܘܼܪܵܢܵܐ": "drought",
	"ܠܘܼܒܵܟ݂ܵܢܵܝܵܐ": "apologetic",
	"ܦܸܬܝܵܐ": "wide",
	"ܫܘܼܟ݂ܬܵܢܵܐ": "sedimentary",
	"ܣܵܗܝܼܢܵܐ": "a basin",
	"ܡܲܟܝܸܠ": "to cause to measure",
	"ܡܘܼܠܬܵܢܝܼ": "a renegade",
	"ܐܲܠܵܗܵܝܘܼܬܵܐ": "divinity",
	"ܬܘܼܠܡܵܕܵܐ": "discipline",
	"ܡܲܦܪܹܐ": "to cause to be abundant",
	"ܐܲܨܵܪܹ̈ܐ": "dressings",
	"ܚܵܢܘܿܩܬܵܐ": "the neck",
	"ܟܲܫܟܘܼܪܵܐ": "roasted meat",
	"ܟܘܼܬܬܵܐ": "short",
	"ܒܠܵܣܵܐ": "to bruise",
	"ܒܹܥܬܵܢܵܐ": "oval",
	"ܦܓܝܼܪܘܼܬܵܐ": "dryness",
	"ܓܸܢܝܼܬܵܐ": "a genie",
	"ܚܒܸܠܒܠܵܐ ܣܡܝܼܡܵܐ": "poison ivy",
	"ܢܘܵܠܵܐ": "to languish",
	"ܠܩܘܼܪܒܵܐ": "roughly",
	"ܚܕܝܼܥܵܐ": "a cabbage",
	"ܫܸܪܝܘܼܬܵܐ": "relaxation",
	"ܒܵܝܫܘܼܬܵܐ": "deficiency",
	"ܒܲܕܓܘܿܢ": "therefore",
	"ܨܲܠܡܵܢܘܼܬܵܐ": "fashioning",
	"ܚܵܣܲܪ ܩܸܢܹ̈ܐ": "the last hatched",
	"ܥܠܵܘܵܬܹ̈ܐ": "sacrifices",
	"ܝܲܟܵܢܵܐ": "only begotten",
	"ܒܵܫܸܠ": "to be cooked",
	"ܡܫܲܡܗܵܐܝܼܬ": "specifically",
	"ܓ̰ܗܵܐ": "to tire",
	"ܕ݂ܵܒܸܬ": "to subdue",
	"ܡܲܣܛܲܪܬܵܐ": "a sample",
	"ܡܲܦܸܓ̰ܵܢܵܐ": "a terrorist",
	"ܥܡܵܠܵܐ": "to labor",
	"ܬܲܛܝܼܪܘܼܬܵܐ": "turbidity",
	"ܛܵܦܹܐ": "to stick",
	"ܡܲܠܝܸܫ": "to cause to knead",
	"ܬܝܵܡܵܐ": "to finish",
	"ܡܲܢܓܘܿ": "a mango",
	"ܒܩܲܕܲܪ": "as much",
	"ܛܘܼܠܫܵܢܵܝܵܐ": "spotty",
	"ܕܚܚ": "to become powder",
	"ܦܘܼܠܓܵܐ": "divided",
	"ܬܒ݂ܝܼܥܬܵܐ": "pursued",
	"ܨܵܘܨܵܝܬܵܐ": "whining",
	"ܣܸܢܸܚ": "a broken limb",
	"ܣܪܵܒ݂ܵܐ": "to deny the existence or truth of something",
	"ܣܥܵܪܬܵܐ": "a barleycorn",
	"ܒܲܥܝܼܟ݂ܘܼܬ ܩܵܠܵܐ": "a hoarse voice",
	"ܡܠܝܼܠܵܐܝܼܬ": "rationally",
	"ܡܣܲܓ݂ܠܵܢܵܐ": "a recorder",
	"ܓܪܵܒ݂ܵܐ": "a leathern bottle",
	"ܫܡܲܪܡܵܪܘܼܬܵܐ": "night blindness",
	"ܡܲܨܝܘܿܕܹܐ": "to cause to hunt",
	"ܠܲܡܛܵܐ": "felt ( a stuff made of wool and fur or hair)",
	"ܡܝܼܣܬ": "to disappear",
	"ܛܵܒ݂ ܚܸܫܘܿܟ݂ܵܐ": "pitch-dark",
	"ܨܝܼܕܵܐ": "hunted",
	"ܒܐܫ": "to do evil",
	"ܥܘܿܡܸܪ": "an omer",
	"ܣܸܦܪܵܝܘܼܬܵܐ": "the written language",
	"ܡܘܲܢܘܸܢ": "to whiz",
	"ܩܘܼܠܵܝܵܐ": "disparagement",
	"ܬܲܪܬܲܪܬܵܐ": "hoarse",
	"ܥܲܕܘܼܕܹܐ": "a lament",
	"ܓܲܙܓܲܙܬܵܐ": "abhorence",
	"ܡܸܛܲܬܣܝܼܣ": "a metathesis",
	"ܫܲܚܬܲܢܬܵܐ": "profanation",
	"ܡܘܿܣܝܼܩܝܼ": "music",
	"ܦܥܠ": "to work",
	"ܐܸܫܬܘܿܢܬܲܝܗܝ": "all six of them",
	"ܩܲܐܪܵܐ": "a pumpkin",
	"ܡܲܣܘܼܡܹܐ ܒܵܠܵܐ": "to mind",
	"ܡܵܘܩܕܵܐ": "a stove",
	"ܒܢܸܣܒܵܬ ܠ": "in proportion to",
	"ܦܵܪܸܕ݂": "to go away",
	"ܪܝܵܦܵܐ": "to roost",
	"ܪܵܘܪܒ݂ܵܢܵܐ": "a noble",
	"ܓܸܠܦܵܐ": "a pen",
	"ܝܲܨܝܼܦܵܐܝܼܬ": "through",
	"ܡܲܝܵܝܬܵܐ": "aquatic",
	"ܫܵܒܘܿܪ": "Sapor",
	"ܟܵܡܘܿܪܹܐ": "to drive",
	"ܡܓܵܠܵܐ": "an area",
	"ܡܲܩܪܲܡܬܵܐ": "a setback",
	"ܡܲܥܗܕܵܢܝܼܬܵܐ": "a diary",
	"ܡܲܕܪ̈ܘܿܢܝܵܬܹܐ": "cylinders",
	"ܐܝܼܢܣܵܢ": "humanity",
	"ܡܬ݂ܘܿܡܵܝܵܐ": "everlasting",
	"ܣܩܝܼܠܵܐܝܼܬ": "beautifully",
	"ܩܵܡܸܚ": "to squeeze",
	"ܢܘܚ": "to rest",
	"ܩܲܫܝܼܫܵܢܵܐ": "a presbyter",
	"ܐܝܼܕܵܐ ܕܐܵܠܸܐ": "a crescent",
	"ܠܸܚܕܵܕܹܐ": "together",
	"ܕܘܼܪܟܬܵܐ": "the pavement",
	"ܙܘܼܟܙܸܟܵܐ": "puffed",
	"ܟܲܠܡܵܗ ܫܵܗܕܲܬ": "profession of faith",
	"ܚܘܼܡܫܵܐ": "one fifth",
	"ܠܵܐ ܚܲܬܝܼܬܵܐ": "irregular",
	"ܩܲܝܒ": "vanishing",
	"ܛܘܼܦܛܵܦܵܐ": "a ripple",
	"ܠܵܐ ܩܛܝܼܥܵܐܝܼܬ": "nonstop",
	"ܫܸܪܘܼܙܵܐ": "the young of locusts",
	"ܢܵܘܓܘܿܠܬܵܐ": "a sweet",
	"ܢܵܩܘܿܠܘܼܬܵܐ": "transit",
	"ܣܲܟ݂ܠܵܐܝܼܬ": "stupidly",
	"ܪܥܝܼܥܵܐ": "shattered",
	"ܦܪܹܣܒܸܬܪܵܝܵܐ": "Presbyterian",
	"ܐܵܝܫܩ": "a mania",
	"ܐܲܪܟܘܿܢܵܐ": "a principality",
	"ܓܵܡܸܫ": "to squeeze",
	"ܪܵܥܙܵܐ": "a high rock",
	"ܦܫܝܼܓ݂ܘܼܬܵܐ": "palsy",
	"ܛܘܼܪܦܵܐ": "an ordeal",
	"ܟܵܠܝܼܕܘܿܢ": "Chalcedony",
	"ܓܲܪܓܲܪܹ̈ܐ": "nobles",
	"ܟܘܿܠܝܼܬܵܢܵܝܵܐ": "renal",
	"ܫܸܛܚܵܐ": "the land between the walls of a city",
	"ܡܗܵܩܹܐ": "to tell",
	"ܣܲܐܬܵܐ": "a bushel",
	"ܡܒܵܚܸܢ ܥܲܡ": "to argue with",
	"ܚܵܝܵܐ": "living",
	"ܡܲܫܗܲܕ": "Meshed",
	"ܩܲܠܵܦܬܵܐ": "the peel",
	"ܦܹܚܵܪܵܐ": "a potsherd",
	"ܐܲܪܢܒ݂ܵܐ": "une tumeur",
	"ܒܸܛܒܵܛܵܐ": "a firefly",
	"ܣܝܩܘܼܡܵܐ": "the amount",
	"ܪܥܵܐ": "to rain",
	"ܬܵܐ ܡܵܐ": "why ?",
	"ܒܝܼܠܵܟܬܵܐ": "the wrist",
	"ܗܸܒ݂ܠܵܢܵܝܵܐ": "vain",
	"ܗܘܵܝܘܼܬܵܐ": "an occurrence",
	"ܟܵܪܟܘܼܡܹܐ": "to char",
	"ܬܲܐܦܵܐ": "an embouchure",
	"ܚܲܡܪܵܢܵܝܵܐ": "vinous",
	"ܐܵܠܨܵܝܵܐ": "adjective",
	"ܥܝܲܕ ܟܲܪܡܵܐ": "vineyard weeding",
	"ܡܫܲܬܐܸܣ": "to lay the foundation of",
	"ܫܓ݂ܵܫܵܐ": "to disturb",
	"ܝܵܕܹܥ ܡܠܝܼܠܘܼܬܵܐ": "a rhetorician",
	"ܒܹܐ ܨܲܒܪ": "impatient",
	"ܪܲܒܵܝ": "an usurer",
	"ܢܲܦ̮ܛܝܼܪܵܐ": "a lantern",
	"ܙܕܵܥܵܐ": "to fear",
	"ܩܵܙܸܕ": "to gaze",
	"ܠܘܿܓ": "a log",
	"ܕܝܼܵܗ": "hers",
	"ܣܲܡܚܲܝܹ̈ܐ": "a panacea",
	"ܚܲܣܵܐ ܠܝܼ": "God forbid us !",
	"ܘܲܣܩܘܼܬܵܐ": "captivity",
	"ܡܲܫܗܘܼܪܘܼܬܵܐ": "reputation",
	"ܛܹܐܟ݂ܣܘܿܢ": "a yew tree",
	"ܡܲܒܸܐܫܵܢܵܐ": "noxious",
	"ܡܲܛܥܝܵܢܘܼܬܵܐ": "misleading",
	"ܡܐܲܠܨܵܢܘܼܬܵܐ": "nuisance",
	"ܡܲܡܚܘܼܬܵܐ": "inhalation",
	"ܦܘܼܠܩܵܐ": "a prison",
	"ܡܲܫܵܚܲܛ": "a sojourner",
	"ܗܝܡܢ": "to believe",
	"ܢܲܛܘܿܠܘܼܬܵܐ": "weight",
	"ܬܵܓ̰ܝܼܪܘܼܬ݂ܵܐ": "merchandise",
	"ܟܹܐܒ݂ ܫܵܪ̈ܝܵܬ": "arthritis",
	"ܩܲܠܬܵܐ": "a small basket usually with a handle",
	"ܡܣܵܐ": "to wash",
	"ܦܲܢܘܼܩܹܐ": "to pet",
	"ܓܲܢܦܘܿܪܹܐ": "to prate",
	"ܡܵܛܸܦܘܼܬ݂ܵܐ": "the how",
	"ܡܲܗܘܘܿܝܹܐ": "to create",
	"ܪܵܘܛܵܐ": "a beam",
	"ܡܲܚܣܢܵܝܵܐ": "pubic",
	"ܡܲܗܓܪܘܼܬܵܐ": "Islam",
	"ܚܲܓܵܝܵܐ": "a religious pilgrim",
	"ܪܵܘܵܝܘܼܬ݂ܵܐ": "drunkenness",
	"ܒܸܝܬ ܡܲܩܪܵܝܬܵܐ": "a school;",
	"ܕܘܼܕܸܟܬ݂ܵܐ": "a fife",
	"ܣܵܠܝܼܩܵܐ": "good management",
	"ܚܟ݂ܵܟ݂ܵܐ": "prurigo",
	"ܣܡܝ": "to be blind",
	"ܦܪܝܼܕܵܐ": "solitary",
	"ܓܘܼܡܵܨܵܐ": "a pit",
	"ܡܲܩܫܵܝܬܵܐ": "thickening",
	"ܩܘܼܥܵܐ": "the septum",
	"ܡܵܙܵܢܕܵܪܵܢ": "Mazandaran a province in the North of Iran",
	"ܡܣܵܦܸܩ": "to empty",
	"ܚܵܣܸܟ݂": "to refrain",
	"ܨܲܢܨܲܠܬܵܐ": "seepage",
	"ܓܘܵܚܬܵܐ": "crushing",
	"ܚܸܫܟܵܢܘܼܬ݂ܵܐ": "ignorance",
	"ܟ̰ܘܼܓ݂ܘܼܠ": "meddlesome",
	"ܐܲܢܒܵܪ": "a granary",
	"ܫܘܼܗܵܪܵܐ": "pride",
	"ܦܘܿܣܬܵܐ": "the postal service",
	"ܚܲܨܝܼܢܵܐ": "an adze",
	"ܣܲܙܓܪܵܢܵܐ": "a peacemaker",
	"ܟܵܘܡܘܼܪ ܕܟܹܐܦܵܐ": " coal",
	"ܣܲܢܓܵܐ": "an orgy",
	"ܢܵܛܹܪ ܫܲܝܢܵܐ": "a policeman",
	"ܒܸܣܬܵܢܵܐ": "a plantation",
	"ܓܲܪܙ": "accidental",
	"ܦܲܠܵܚܘܼܬܵܐ": "husbandry",
	"ܪܹܫ ܟܘܼܡܪܹ̈ܐ": "a pontiff",
	"ܢܵܛܘܿܠܵܐ": "dewy",
	"ܚܲܝܘܵܐ": "an animal",
	"ܙܲܢܒܘܼܪܵܐ": "a wasp",
	"ܫܝܼܬܵܐ": "a mound",
	"ܐܘܿܒܝܵܐ": "Alas ! Woe (to thee ...) !",
	"ܡܫܲܒܚܵܢܘܼܬܵܐ": "recognition",
	"ܡܘܿܬ ܢܲܦ̮ܫܵܐ": "suicide",
	"ܬܲܪܥܵܝܵܐ": "a doorkeeper",
	"ܡܲܢܨܹܠ": "to ooze",
	"ܚܲܦܘܼܬܵܐ": "closeness",
	"ܒܙܲܪܒ": "violently",
	"ܡܲܗܡܸܣ": "to doubt",
	"ܣܘܿܦܝܼܣܛܘܼܬܵܐ": "sophistry",
	"ܡܝܼܛܪܵܦܘܿܠܹܝܛܵܐ": "a metropolitan",
	"ܝܵܕܸܥ": "to know",
	"ܙܘܼܝܵܩܵܐ": "makeup",
	"ܬܲܘܬܵܒ݂ܘܼܬܵܐ": "settling",
	"ܠܲܣܛܝܼܟ": "rubber",
	"ܗܸܕܣܵܐ": " observing",
	"ܓܲ̈ܗܹܐ ܓܲ̈ܗܵܬ݂ܵܐ": "often",
	"ܛܠܵܒܬܵܐ": "asking",
	"ܡܸܬܬܦܝܼܪܵܢܵܐ": "nervous",
	"ܚܪܵܩܬܵܐ ܕܓܵܡܝܼ": "a wreck",
	"ܒܹܝ ܚܵܪܹܐ": "a stable",
	"ܡܸܬܓܲܪܝܵܢܘܼܬܵܐ": "a provocation",
	"ܒܗܸܦܟܵܐ": "to the contrary",
	"ܡܬܲܒ݂ܪܵܢܵܐ": "tangible",
	"ܦܓܵܡܵܐ": "to diminish",
	"ܨܸܨܪܵܐ": "a cricket",
	"ܪܵܢܓܵܐ": "Ashita",
	"ܨܪܝܼܚܵܐ": "mad",
	"ܣܥܵܛܵܐ": "to loathe",
	"ܫܲܦܘܼܦܹܐ": "to creep",
	"ܦܘܼܪܫܵܢܬܵܐ": "unleavened bread put aside for the Eucharist",
	"ܐܲܬܠܲܣ": "an atlas (a collection of maps)",
	"ܡܲܪܙܝܼܒ݂ܵܐ": "a spout",
	"ܒܗܒܗ": "to perplex",
	"ܝܸܩܢܵܐ": "herb",
	"ܓܸܢܝܵܐ": "a fairy",
	"ܛܝܼܛܠܘܿܣ": "a title",
	"ܓܒ݂ܘܼܠܬܵܐ": "plaster",
	"ܐܲܕܸܗܸܢ": "to be fat",
	"ܡܸܨܛܲܪܝܵܢܘܼܬܵܐ": "cleavage",
	"ܥܲܝܵܐܪ": "an assay",
	"ܒܵܠܘܿܥܘܵܢܵܐ": "a glutton",
	"ܡܢܲܝܫܵܢܵܐ": "a striker of football...",
	"ܓ̰ܠܵܐ": "to wear",
	"ܦܘܼܪܛܵܐ": "a gate",
	"ܡܲܫܩܘܼܠܹܐ": "to overlay",
	"ܚܵܠܵܢܵܝܵܐ": "sandy",
	"ܣܵܪܝܼܕܵܐ": "a riddle",
	"ܡܨܲܚܘܸܢ": "to get fine",
	"ܫܵܦܹܢ": "to harrow",
	"ܛܵܠܵܫܹ̈ܐ": "shavings",
	"ܬܸܠܵܐ": "a hill",
	"ܐܵܬܹܠܝܵܐ": "an eclipse of the sun and the moon",
	"ܠܹܐܒܵܢܵܐ": "tricky",
	"ܡܸܬܢܵܡܵܢܸܡܵܢܵܐ": "wettable",
	"ܛܲܚܵܠܵܐ": "the spleen",
	"ܫܸܠܘܿܚܬܵܐ": "a snakeskin",
	"ܡܸܬܕܲܡܣܵܢܘܼܬܵܐ": "organization",
	"ܓܪܵܣܬܵܐ": "grinding",
	"ܠܚܵܒܵܐ": "a bit of a horse",
	"ܒܵܠܲܥܬܵܐ": "Costaz",
	"ܓܕܵܕܵܐ": "a string",
	"ܓܲܢ݇ܒܵܪܹ̈ܐ": "giants",
	"ܐܘܼܟܬܵܐ": "venom",
	"ܡܛܲܢܛܸܠ": "to delay, to cause to be late",
	"ܥܸܠܡ": "science",
	"ܡܲܒ݂ܥܘܼܕܹܐ": "party or government members ....",
	"ܡܥܵܝܬܵܐ": "churning",
	"ܫܲܪܒܘܿܢܵܐ": "a trifle",
	"ܦܲܚܠܵܐ": "a stallion",
	"ܐܲܠܟܘܿܗܘܿܠ": "alcohol",
	"ܚܵܩܪܵܢܬܵܐ": "a commending person",
	"ܡܲܣܛܸܡ": "a) stones",
	"ܫܛܝܼܛܘܼܬܵܐ": "rigidity",
	"ܒܹܐܨܵܒܪ": "impatient",
	"ܚܸܢܟ݂ܵܝܵܐ": "palatal",
	"ܓܵܒܹܪ": "to surmount",
	"ܛܵܪܹܢ": "to overeat",
	"ܦܲܚܡܵܐ": "coal",
	"ܡܩܲܕܡܵܢܵܐ": "a pioneer",
	"ܗܲܠܵܗܲܠ": "a tumult",
	"ܠܘܼܚܵܡܵܐ ܢܵܘܵܝܵܐ": "Nuclear fusion",
	"ܒܢܵܝܢܵܫܵܐ": "the human race",
	"ܣܘܼܪܵܝܵܐ": "an inhabitant of Ancient Mesopotamia (Assyrian, Babylonian and Persian Empires)",
	"ܦܵܦܵܪܘܿܬܵܐ": "awkwardness",
	"ܝܼܫܘܿܥܵܝܵܐ": "a Christian",
	"ܐܲܒܙܵܪܵܐ": "a plough-beam",
	"ܩܲܨܘܼܡܹܐ": "to divine",
	"ܬܘܼܦܘܼܣ": "a catarrh",
	"ܐܸܠܦܵܐ": "a ship",
	"ܐ݇ܚܪܵܢܝܵܐܝܼܬ": "otherwise",
	"ܚܣܝܼܠܵܐ": "abstinence",
	"ܪܵܘܪܒ݂ܵܐܝܼܬ": "such a good teacher ...",
	"ܟܝܼܠܵܐ": "measured",
	"ܡܲܡܸܨܵܢܘܼܬܵܐ": "suckling",
	"ܫܸܢܕܵܐ": "torture experienced",
	"ܥܦܵܦܵܐ": "stuff",
	"ܕܲܠܕܘܼܢܹܐ": "to shield",
	"ܠܲܟܘܼܬܵܐ": "smuttiness",
	"ܒܘܼܕܵܠܵܐ": "a person of weak intellect",
	"ܙܵܲܕܵܝܬܵܐ": "a cotton-cleaner",
	"ܨܢܵܥܵܐ": "to plot",
	"ܦܘܼ̈ܠܸܟܹܐ": "peas",
	"ܫܲܬܐܸܣܵܝܵܐ": "requisite",
	"ܣܓܵܕܬܵܐ": "worshiping",
	"ܦܫܵܪܵܐ": "to melt",
	"ܒܢܵܬ ܙܵܘܓܵܐ": "a wife",
	"ܐܸܠܸܬܡܵܐ": "butter and eggs slightly cooked",
	"ܫܲܠܘܵܐܝܼܬ": "intermittently",
	"ܬܦܵܬܵܐ": "sneezing",
	"ܟܲܟܟ̰ܵܐ": "a mole",
	"ܚܲܕ݂ ܪܹܫܵܐ": "immediately",
	"ܒܥܕܵܢܵܐ ܕ": "once",
	"ܩܝܼܡܵܐ": "standing",
	"ܚܘܼܦܵܛܵܐ": "an exhortation",
	"ܦܘܼܪܝܵܐ": "light",
	"ܦܘܼܪܝܵܐ": "daylight",
	"ܐܸܣܛܘܿܢܵܐ ܟܹܐܦܵܢܵܐ ܡܵܪܹܐ ܢܸܩܪܵܐ ܕܘܼܟ݂ܪܵܢܵܝܵܐ": "a pillar made of stone erected as a memorial",
	"ܐܘܼܪܚܵܐ ܟܹܐܦܵܢܬܵ ": "a rocky road",
	"ܛܲܒܠܵܐ ܕܐܸܕܢܹ̈ܐ": "the eardrums",
	"ܒܵܩܵܐ": "mosquito",
	"ܡܫܵܪܹܝܢ ": "I begin",
	"ܟܵܡܫܵܪܹܝܢ": "I begin",
	"ܡܫܵܪܹܐ": "he begins",
	"ܡܫܵܪܝܵܐ": "she begins",
	"ܡܫܵܪܲܝ": "they begin",
	"ܡܫܘܼܪܹܐ ܠܝܼ": "I began",
	"ܡܫܘܼܪܹܐ ܠܝܼ": "I started",
	"ܡܫܵܪܝܼ": "begin",
	"ܡܫܵܪܵܝ": "begin",
	"ܡܫܵܪܵܘ": "begin",
	"ܡܫܘܼܪܹܝܢ": "I was started",
	"ܡܫܘܼܪܹܐ": "he was started",
	"ܡܫܘܼܪܲܝ": "they were started",
	"ܥܸܣܪܝܼ ܒܢܝܼܣܲܢ ܡܫܘܼܪܹܐ ܠܗ ܩܸܛܡܵܐ ܒܡܵܬ݂ܵܐ ܡܕܘܼܪܹܐ ܠܹܗ": "on the twentieth of Nissan the plague started to spread ashes onto the village",
	"ܦܵܛܹܢ": "to understand",
	"ܡܫܘܼܥܒܸܛ ܠܹܗ ܠܸܒ̈ܵܘܵܬ݂ܵܐ ܕܓ̰ܘܵܢ̈ܩܹܐ ܘܓܲܒ݂ܪܹ̈ܐ ܘܚܵܡ̈ܵܬ݂ܵܐ ܒܛܲܥܢܹ̈ܐ ܡܵܬܝܼ ܗ݇ܘܵܘ ܠܡܵܐܬ݂ܵܐ": "it caused the hearts of the youths, of the men and lasses, because by loads were corpses brought to the village",
	"ܗܲܝܘܵܢ ܕܛܲܥܢܵܐ": "a beast of burden",
	"ܥܗܝܼܕ݂ܬܵܐ": "aforesaid",
	"ܡܲܐܪ̈ܙܵܢܹܐ ܘ ܡܸܬܐܲܪ̈ܙܵܢܹܐ": "the teachers and the taught",
	"ܚܲܪܝܼܦܘܼܬ ܗܲܘܢܵܐ": "ability to make quick and good decisions",
	"ܚܲܪܝܼܦܘܼܬܵܐ ܦܘܿܝܼܛܝܼܩܵܝܬܵܐ": "policy in politics",
	"ܚܲܪܝܼܦ ܗܲܘܢܵܐ": "quick-witted",
	"ܚܲܝܡܵܐ": "warm",
	"ܫܸܪܨܵܐ ܡܢܲܟ݂ܝܵܢܵܐ": "a pest",
	"ܡܵܘܒܕܵܢܵܐ ܕܫܸܪܨܵܐ": "a pesticide",
	"ܐܲܢܹܐ": "these",
	"= ܢܵܓ݇ܗܵܐ": "dawning",
	"ܒܲܕܸܪ": "to pitchfork",
	"ܦܲܠܵܚܵܐ": "the laborers",
	"ܦܵܠܚܹ̈ܐ ܫܒ݂ܘܿܩ ܡܸܢ ܐܲܚ̈ܝܕܹܐ ܘܦܵܩ̈ܘܿܕܹܐ": "soldiers except officers",
	"ܦܵܩܹܕ ܦܵܠܚܹ̈ܐ": "to hold a review of the troops",
	"8": "ܬܡܵܢܝܵܐ",
	"ܫܲܦܘܼܕܵܐ ܚܵܕܘܿܪܵܐ": "a rotisserie",
	"ܡܲܚܕܸܪ ܥܲܦܪܵܐ": "to rake dirt/earth-clods",
	"ܡܲܚܕܸܪ ܪܹܫܵܬ݇ܚܬܵܐ": "to rummage",
	"ܙܹܠ݇ ܠܘܼܟ݂": "off with you!",
	"ܟܸܠܦܵܬ ܕܫܸܡܫܵܐ": "the solar system",
	"ܗܲܕܵܡܹ̈ܐ ܕܟܸܠܦܲܬ": "the members of the family",
	"ܪܹܫܵܐ ܕܟܸܠܦܲܬ": "the head of the family",
	"ܦܘܼܠܚܵܢܵܐ ܟܲܫܝܼܪܵܐ ܠܕܲܪܩܘܼܒ݂ܠܹܐ ܝܲܢ ܠܣܢܵܕܵܐ ܢܝܼܫܵܐ": "a diligent effort against or in support of a cause",
	" ܡܲܕܥܸܟ݂ܵܢܵܐ ܕܫܘܼܩܵܦܵܐ ": "a shock absorber",
	"ܡܲܒܘܼܥܵܐ ܕܫܘܼܩܵܦܹ̈ܐ": "Pandora's box",
	"ܡܲܠܘܼܬܘܼܬܵܐ ܕܡܸܕܸܡ ܠܐ݇ܚܹܪ݇ܢܵܐ": "the relevance of one thing to another",
	"ܫܲܢ݇ܬܵܐ ܐܵܬܘܿܪܵܝܬܵܐ ܚܲܕܬܵܐ ܒܚܵܕܘܼܬܵܐ": "Happy Assyrian New Year",
	"ܢܲܫܬܵܪ ܕܟ̰ܲܢܓܵܠ": "the barb of a fish-hook",
	"ܒܕܵܘܪܵܐ ܕܐܸܡܵܐ": "at the hundredth turn",
	"ܫܵܒܵܫ ܛܵܠܘܼܟ݂": "bravo!",
	"ܡܲܩܸܡ ܡܸܢ ܡܝܼܬܹ̈ܐ": "to raise from the dead",
	"ܙܵܥܝܵܐ ܕܕܹܐܒ݂ܵܐ": "a wolf cub",
	"ܡܦܵܠܸܛ ܙܲܥ̈ܝܹܐ": "to hatch eggs",
	"ܫܲܦܝܼܪܘܼܬ ܟܬܝܼܒ݂ܬܵܐ": "calligraphy",
	"ܗܹܡܸܙܡܲܢ ܝܲܢ ܟܬܝܼܒ݂ܬܵܐ ܠܵܐ ܡܫܘܼܚܬܵܢܵܝܬܵܐ": "non poetic speech or writing",
	"ܟܬܝܼܒ̣ܬܵܐ ܡܸܨܪ̈ܵܝܬܵܐ": "Egyptian writing",
	"ܟܬܝܼܒ݂ܬܵܐ ܗܸܪܵܓܠܝܼܦ̮ܵܝܵܐ": "hieroglyphic writing",
	"ܟܬܝܼܒ݂ܬܵܐ ܟܵܗܢܵܝܬܵܐ": "priestly script",
	"ܟܬܝܼܒ݂ܬܵܐ ܬܲܚܠܘܼܦܘܼܬܵܐ": "a letter of attorney",
	"ܣܝܵܡ ܚܲܝܹ̈ܐ ܦܵܣܝܩܵܝܵܐ": "a summarized biography/a resume",
	"ܡܘܼܫܬܵܪܝܼ ܡܗܘܼܡܢܵܐ": "a regular customer",
	"ܟܠ ܐܲܝܡܵܐ ܕܫܵܡܸܥ ܠܸܗ ܒܸܕ ܚܵܣܸܪ": "whoever listens to him shall suffer damage",
	"ܟܠ ܡܲܢ ܕ ܟܥܵܠܹܐ ܒܸܕ ܢܵܚܸܬ": "whoever rises shall shall get down",
	"ܘܵܪܵܩܵܐ ܠܵܡܨܵܢܵܐ": "blotting paper",
	"ܫܸܬܠܵܐ ܕܠܵܡܹܨ ܬܘܼܵܝܘܼܗܝ ܡܸܢ ܫܸܬ̈ܠܹܐ ܐ݇ܚܹܪ݇ܢܹ̈ܐ": "a plant that derives its food from other plants",
	"ܥܘܼܬܵܕܵܐ ܠܘܿܓ݂ܝܼܩܵܝܵܐ": "a logical basis for a theory",
	"ܚܘܼܫܵܒ݂ܵܐ ܕܦܵܐܹܫ ܕܪܝܼܫܵܐ ܘܗܘܼܓܝܵܐ ܠܸܡܛܵܝܵܐ ܠܩܛܵܥܬܵܐ ܠܘܿܓ݂ܝܼܩܵܝܬܵܐ": "an idea that is debated and taken into consideration with the aim of arriving at a logical conclusion",
	"ܡܲܡܠ݇ܠܵܐ ܫܲܪܝܵܐ": "speech, prose",
	"ܫܲܪܝܵܐ ܒܡܲܡܠܠܹܗ": "forthright",
	"ܫܲܪܝܵܐ ܡܸܢ ܡܸܫܬܲܐܠܵܢܘܼܬܵܐ": "released from obligation",
	"ܕܡܲܥܒܕܵܢܘܼܬܹܗ ܫܲܪܝܵܐ ܒܣܝܼܩܘܿܡܵܐ ܥܒ݂ܝܼܪܵܐ": "retroactive",
	"ܐܲܝܟ݂ ܡܨܵܝܬܝܼ": "as far as I can",
	"ܥܸܠܸܠ ܡܸܢ ܡܨܵܝܬܵܐ ܩܵܢܘܼܢܵܝܬܵܐ": "beyond one's legal power",
	"ܕܡܘܼܡܟܸܢ ܝܼܠܵܗ ܡܲܟܫܲܛܬܘܼܗܝ": "likely to be justified",
	"ܡܲܟܫܲܛܬܵܐ ܕܦܲܪܨܘܿܦܵܐ ܘܡܲܚܫܲܚܬܼܘܼܗܝ ܠܸܡܠܵܝܵܐ ܫܵܘܦܵܐ": "a recommendation for a person",
	"ܡܲܕܡܟ݂ܵܢܘܼܬܵܐ ܡܲܓܢܲܛܝܼܣܵܝܬܵܐ": "hypnotism",
	"ܠܵܐ ܚܦܝܼܛܵܐ": "neglectful",
	"ܣܲܪܓܘܿܢ ܚܵܩܸܪܵܗ ܓܵܢܘܼܗܝ": "Sargon glorifies himself",
	"ܣܢܹܩܬܵܐ ܝ݇ܠܵܗܿ ܐܵܗܐ݇ ܡܸܢܕܝܼ ܚܲܕ݇ܬܵܐ ܓܵܢܘܼܗ ܡܲܚܙܝܼܠܵܗܿ ܚܲܝܠܵܢܵܐ ܚܲܕ݇ ܒܓܲܠܓܵܡܸܫ ܘܚܲܕ݇ ܒܫܸܛܪܵܢܵܐ": "this new thing will have to prove as strong as Gilgamesh and as handsome",
	"ܡܲܪܝܸܟ݂ ܓܵܢܘܼܗܝ ܠܸܢܝܵܚܵܐ": "to stretch oneself to have a rest",
	"ܡܲܠܚܸܡ ܓܵܢܘܼܗܝ ܠܐܗܘܵܠ ܚܕܲܬܵܐ ܕܠܵܐ ܩܒ݂ܵܠܵܐ": "to adapt to a new situation without complaining",
	"ܠܵܐ ܡܲܢܫܝܼ ܩܲܕ ܪܵܥܝܵܐ ܕܘܼܪܘܼܟ ܝܼܠܹܗ ܬܪܹܝ ܒܬܠܵܬ݇ܐ ܐܲܠܵܗܵܝܵܐ": "do not forget that the pastor of Uruk is two-thirds divine",
	"ܚܲܕ ܡܘܼܙܝܸܕܵܐ ܥܲܠ ܬܪܹܝ = ܬܠܵܬܵܐ": "one plus two = three",
	"ܡܦܲܪܢܣܵܢܵܐ ܕܡܲܠܟܘܼܬܵܐ ܒܙܲܒ݂ܢܵܐ ܕܥܠܲܝܡܘܼܬܵܐ ܝܲܢ ܠܵܡܲܨܝܵܢܘܼܬܵܐ ܕܡܲܠܟܵܐ": "someone in charge of a kingdom during the minority or the disability of the king",
	"ܒܹܝܡܵܐ ܕܟܵܪܘܿܙܵܐ": "a pulpit",
	"ܡܣܲܒܪܵܢܹ̈ܐ": "missionaries",
	"ܟܵܪ̈ܘܿܙܹܐ": "the pulpit",
	"ܡܸܢ ܓܸܢܒ݂ܵܐ": "in secrecy",
	"ܟܝܼܡܸܪ": "he says",
	"ܟܸܡܪܵܐ": "she says",
	"ܟܸܡܪܘܼܬܘܼ": "you say",
	"ܟܸܡܪܝܼ": "they say",
	"ܐ݇ܡܘܿܪ ܛܵܠܝܼ": "tell me",
	"ܐܵܡܹܪ ܡܸܢ ܕܪܹܫ": "to say again",
	"ܚܲܕ݇ ܪܸܙܵܐ": "a dish of rice",
	"ܗܵܟ": "hold on!",
	"ܐܝܼܕܹܗ ܦܬ݂ܘܼܚܬܵܐ": "generous",
	"ܕܸܛܠܝܼܒ ܠܘܿܟ݂": "that you asked for",
	" ܘܛܠܵܒܵܐ ܡܸܢ ܐܲܠܵܗܵܐ ܨܵܓ݂ܘܼܬ݂ܘܿܟ݂": "and begged from God your good health",
	"ܛܵܠܹܒ ܐܲܢ݇ܬܬܵܐ ܠܙܘܼܘܵܓ݂ܵܐ": "to propose to a woman",
	"ܡܸܢ ܒܠܲܝ ܟܵܬܘܿܒܹ̈ܐ": "for lack of scribes",
	"ܡܸܢ ܒܠܲܝ ܝܼܕܵܥܬܵܐ": "out of ignorance",
	"ܡܸܢ ܒܠܲܝ": "without",
	"ܡܲܚܪܸܡ ܥܲܠ ܓܵܢܹܗ": "to vow",
	"ܡܲܪܚܲܛܬܵܐ ܕܣܘܼܣܵܘܵܬܹ̈ܐ": "a horse-race",
	"ܡܪܲܟܒ݂ܬܵܐ ܥܸܛܪܹ̈ܐ": "the composition of perfumes",
	"ܒ": "in",
	"ܡܣܝܵܡܐ ܕܓ̰ܘܼ̈ܠܠܹܐ": "washing the clothing",
	"ܣܘܼܣܸܐ ܬܲܥܠܝܼܡ ܐܝܼܬ ܠܹܗ": "the horse is broken in",
	"ܟܵܪܹܟ݂ ܛܲܫܝܐܝܼܬ ܒܸܒܥܵܬܵܐ ܕܕܸܒ݂ܚܵܐ": "to wander stealthily with the aim to find a prey",
	"ܝܘܼܠܦܵܢ ܥܘܼܒܝܵܢܹ̈ܐ": "oncology",
	"ܡܸܬܬܟ݂ܝܼܢܵܢܘܼܬ ܥܘܼܒܝܵܢܹ̈ܐ": "formation of new abnormal growth of tissue",
	"ܫܘܼܠܗܵܒ݂ ܩܹܐܕܵܐ ܐܸܕܢܵܝܬܵܐ": "the mumps",
	"ܥܘܼܒܝܵܵܐ ܒܚܸܠܒܵܐ ܡܚܘܼܛܵܢܵܝܵܐ": "a tumor on the mucous membrane/a polyp",
	"ܥܘܼܒܝܵܢ ܓܲܓܲܪܬܵܐ": "quinsy",
	"ܡܠܘܿܐܹ̈ܐ ܡܥܲܬܕܹ̈ܐ ܠܸܩܪܵܝܵܐ": "material that is to be read",
	"ܡܵܐܐ ܐܢܵܫܹ̈ܐ": "a hundred men",
	"ܒܫܲܝܢܵܐ ܡܵܐܐ ܫܲܝܢܹ̈ܐ": "welcome!",
	"ܡܵܐܐ ܕܹ̈ܐܙܹܐ": "the name of a famous church in Jelu",
	"ܠܵܐ ܚܲܬܝܼܬܘܼܬܵܐ": "uncertainty",
	"ܠܵܐ ܚܲܬܝܼܬܘܼܬܵܐ ܬܹܒ݂ܹܝܠܵܝܬܵܐ": "global uncertainty",
	"ܡܲܓܘܸܪ ܓܵܢܘܼܗܝ": "to boast",
	"ܕܠܵܐ ܚܸܠܛܵܐ": "undiluted",
	"ܡܸܬܪܲܢܝܵܢܘܼܬܵܐ ܒܓܸܕܫܹ̈ܐ ܕܲܥܒܲܪ": "retrospection",
	"ܥܵܒܸܕ ܐܸܣܬܸܥܦܵܐ": "to abdicate",
	"ܡܲܬܸܒ݂ ܐܸܣܬܸܥܦ̮ܘܼܗܝ ܡܸܢ ܫܘܼܓ݂ܠܵܐ ܝܲܢ ܘܵܓ̰ܝܼܒܘܼܬܵܐ": "to resign from a job or a commission",
	"ܡܲܬܪܹܐ ܨܲܗܘܵܐ / ܡܲܣܒܸܥ ܨܲܗܘܵܐ": "to quench one's thirst",
	"ܚܕܝܼܪܘܼܬ ܩܪܵܒ݂ܵܐ": "a siege",
	"ܥܘܼܬܵܕܵܐ ܣܘܼܣܬܝܼܡܵܝܵܐ ܠܸܢܛܵܪܵܐ ܚܘܼܠܡܵܢܵܐ": "a plan to preserve health",
	"ܩܘܿܛܝܼܵܐ ܕܒܲܪܢܘܼܬ": "a snuff-box",
	"ܗܲܠ ܐܝܼܡܵܢ": "until when",
	"ܬܵܦܹܩ ܒܲܬ݇ܪ ܦܪܵܫܬܵܐ": "to reconvene",
	"ܦܪܵܫܬܵܐ ܕܡܝܼܵܢܘܼܬܵܐ ܡܸܢ ܦܸܠܘܼܫ ܝܲܢ ܚܸܠܬ": "separation of impurities from a liquid",
	"ܘܵܓ̰ܸܒ ܝܼܠܵܗܿ ܕܐܵܙܸܠ": "he ought to go",
	"ܘܵܓ̰ܸܒ ܐܝܼܠܹܗ ܕܠܵܐ ܥܨܹܝܬ": "you should not resist",
	"ܘܵܓ̰ܸܒ ܗܘܹܐ ܗ݇ܘܵܐ": "it was proper",
	"ܒܘܼܫ ܓܘܼܪܵܐ ܡܸܢ ܘܵܓ̰ܸܒ": "too great",
	"ܙܵܘܕܵܐ ܡܸܢ ܘܵܓ̰ܸܒ": "too much",
	"ܠܲܝܠܹܗ ܘܵܓ̰ܸܒ": "it is inappropriate",
	"ܚܘܒܵܠ ܡܲܕܥܵܐ": "deterioration of mental faculties",
	"ܡܐܵܢ ܬܪܲܝ ܚܲܒ݂̈ܠܹܐ ܠܗܵܘ ܕܝܼܠܹܗ ܒܝܼܫ ܝܲܪܝܼܟ݂ܵܐ ܗܲܠ ܠܝܼ": "give me the longest of these two ropes",
	"ܡܐܵܢ ܬܪܲܝ ܝܵ̈ܠܹܐ ܗܵܘ ܕܝܼܠܹܗ ܒܝܼܫ ܗܵܘܢܵܢܵܐ ܚܲܠܦܲܝ ܐܝܼܠܹܗ": "the most intelligent of those two children is Alphea",
	"ܟܵܘܣܵܐ ܫܵܠܘܼܦܵܐ": "sleek hair",
	"ܒܸܢܝܵܐ ܥܲܠ ܪܸܫܘܲܬ": "a briber",
	"ܬܘܼܠܡܵܕܵܐ ܒܸܢܝܵܐ ܥܲܠ ܝܘܼܠܦܵܢܹ̈ܐ ܕܡܠܝܼܠܘܼܬܵܐ ܘܬܲܩܢܘܼܬ ܕܘܼܒܵܪܹ̈ܐ ܘܫܲܦܝܼܪܘܼܬܵܐ": "a discipline built on logic, ethics and aesthetics",
	"ܒܸܢܝܵܐ ܥܲܠ ܫܲܬܐܸܣܬܵܐ ܝܘܼܠܦܵܢܵܝܬܵܐ": "having Science as its foundations",
	"ܐܝܼ ܒܘܼܣܹܡ": "Ibiza",
	"ܫܪܵܒ݂ܵܐ ܕܟܘܼܪܗܵܢܵܐ": "an outbreak of a disease",
	"ܪܲܦܹܐ ܐܝܼܕܵܐ": "to recant",
	"ܪܲܦܹܐ ܐܝܼܕܵܐ ܡܸܢ ܗܲܝܡܵܢܘܼܬܵܐ": "to recant one's faith",
	"ܪܲܦܹܐ ܥܲܫܝܼܢܵܐܝܼܬ": "to fling",
	"ܕܵܐܹܨ ܙܵܥܘܿܩܵܐܝܼܬ": "to revel",
	"ܕܵܐܹܨ ܩܲܗܠܵܢܵܐܝܼܬ": "to riot",
	"ܡܸܠܬܐ ܕܣܲܩܘܼܒ݂ܠܵܝܘܼܬܵܐ ܝܵܬܵܢܵܝܵܐ ܒܸܓܠܵܝܵܐ ܝܠܵܗ ܠܛܵܥܝܘܼܬܵܗ": "a paradox",
	"ܒܓ̰ܝܼܪܵܐ ܒܦܸܪܝܘܼܬܵܐ": "abundant",
	"ܬܲܚܬܵܐ ܕܓܕܵܠܵܐ": "a cotton spool",
	"ܕܝܼܠܵܝܬܵܐ ܡܚܲܫܚܵܢܝܼܬܵܐ": "a qualification",
	"ܐܝܼܢܵܐ ܕܵܐܟ݂ܝ݇ ܐܵܗܵܐ ܒܸܕ ܒܲܣܡܵܚܠܵܗ̇ ܒܠܵܐ ܡܲܒܨܵܪܬܵܐ ܕܚܲܝܠܵܐ ܕܓܲܠܓܵܡܸܫ؟ ": "but how (shall we) remedy this without limiting Gilgamesh's power?",
	"conjunct": "ܕܵܐܟ݂ܝܼ ܕ",
	"ܥܒ݂ܝܼܕܵܐ ܡܸܢ ܥܸܩܪܵܐ ܕܢܵܬܵܐ": "without paying attention",
	"ܩܲܗܘܵܝܵܐ ܡܸܚܝܵܐ ܠܣܡܘܼܩܵܐ": "brown verging on red",
	"ܡܲܠܚܸܡ ܓܵܢܘܼܗܝ ܠܐܗܘܵܠ ܚܕܲܬܵܐ ܕܠܵܐ ܩܒ݂ܵܠܵܐ": "to adapt to a new situation without complaining",
	"ܩܒ݂ܵܠܵܐ ܪܘܼܫܡܵܐܝܼܬ ܥܲܠ": "to take someone to court",
	"ܩܵܒܠ ܠܦܘܼܬ ܢܵܡܘܿܣܵܐ": "to prosecute",
	"ܡܲܫܪܝܼܬܵܐ ܓܲܝܣܵܝܬܵܐ": "a military camp",
	"ܬܸܫܡܸܫܬܵܐ ܓܲܝܣܵܝܬܵܐ": "military service",
	"ܡܲܓܒ݂ܠܵܢܵܐ ܕܠܸܒܵܐ": "evil-hearted",
	"ܡܲܓܒ݂ܠܵܢܵܐ ܕܠܸܒܵܐ": "sickening",
	" ܡܛܘܼܡܪܝܼ ܠܹܗ ܙܘܼ̈ܙܗ": "he buried his money",
	"ܗܵܘܦܵܐ ܒܗܝܼܠܵܐ": "an inert gas",
	"ܡܲܟܬܸܒ݂ ܡܲܫܟܚܵܘܼܬܵܐ": "to patent an invention",
	"ܒܲܟ݂ܬܵܐ ܐܲܝܵܐ ܕܝܼܠܵܗܿ ܠܕܸܦܢܲܢ": "the woman who is by our side",
	"ܚܸܙܘܵܐ ܕܕܸܦܢܵܐ": "a sideview",
	"ܐܵܢܵܐ ܥܒ݂݀ܪܠܝ݂ ܡ݂ܢ ܕ݀ܦܢܵܝܗܝ": "I evaded them",
	"ܝܼܕ݂ܘܿܥ ܕܸܒܐܵܢܝܼ ܝܵ̈ܘܡܵܬ݂ܵܐ ܐ݇ܬ݂ܹܐ ܠܹܗ ܚܵܕ݇ ܓܸܕܫܵܐ ܪܵܒܵܐ ܠܪܹܫܵܐ ܕܐܵܫܝܼܬܢܵ̈ܝܹܐ": "know that these days a great misfortune has befallen the people of Ashita",
	"ܪܸܕܝܵܐ ܕܕܸܟ݂ܪܵܐ": "male semen",
	"ܡܲܥܒ݂ܸܪ ܒܢܘܼܪܵܐ": "to cause to pass through fire",
	"ܡܲܥܒ݂ܸܪ ܒܩܲܝܪܲܬ ܕܚܘܼܒܵܐ": "to arouse love",
	"ܡܸܢ ܪܸܚܩܵܐ": "from afar",
	"ܚܸܙܘܵܐ ܥܲܠܕܝܢܵܐ ܕܡܝܼܵܐ ܡܸܢ ܪܸܚܩܵܐ": "a mirage",
	"ܟ̰ܸܡ ܪܸܚܩܵܐ": "the farthest",
	"ܢܦܝܼܠܵܐ ܪܸܚܩܵܐ": "out of the way",
	"ܪܸܚܩܵܐ ܡܸܢ ܗܵܘܢܵܐ": "far removed from common sense",
	"ܡܲܠܚܡܵܢܵܐ ܕܩܸܨܲܬܹ̈ܐ": "a novelist",
	"ܡܲܠܚܡܵܢܵܐ ܕܟܬܵܒܹ̈ܐ": "a writer",
	"ܡܲܠܚܡܵܢܵܐ ܕܫܸܥܪܹ̈ܐ": "one skilled in poems",
	"ܒܘܼܨܡܸܢܵܐ ܡܸܢ ܒܲܬ݇ܪ ܡܵܘܬܵܐ ܕܡܲܠܚܸܡܵܢܹܗ": "printed after the death of its author",
	"ܡܠܚܡܵܐ ܕܓܵܢܘܼܗܝ ܠܫܘܼܚܠܵܦܹ̈ܐ ܒܗܵܣܵܢܵܝܘܼܬܵܐ": "able to adapt self",
	"ܡܸܛܪܐ ܡܘܼܓܕܸܠܬܵܐ": "sleet",
	"ܬܫܹܪܝܼ ܘܚܲܒ݂ܪܹܐ": "October and November",
	"ܩܲܫ̰ܕܲܪ̈ܝܵܬܹܐ ܕܡܵܚܕܘܼܪܵܐ": "environmental challenges",
	"ܬܲܓܵܪܵܐ ܝܲܢ ܙܲܒܢܵܢܵܐ ܚܵܕܘܿܪܵܐ": "a door-to-door salesman",
	"ܡܲܡܠ݇ܠܵܐ ܫܒܝܼܫܵܐ": "smooth talk",
	"ܡܘܼܕܝܼ ܡܚܝܼܬܹܠܵܗ̇ ܒܪܝܼܫܐ݇ ܕܗܿܘ ܚܲܕ݇ܡܢܹܗ؟": "what is the matter with him?",
	"ܡܲܕܲܐܬܵܐ ܕܪܹܝܫܵܐ": "poll tax",
	"ܗܹܡܸܙܡܵܢ ܡܲܓܚܸܟܵܢܬܵܐ": "a joke",
	"ܟܵܦܹܪ ܒܬܵܘܕܝܼܬܵܐ": "to recant one's faith",
	"ܚܵܙܘܿܩܵܐ ܒܝܲܡܵܐ": "a sailor",
	"ܛܵܒ݂ ܚܲܣܝܼܪܵܐ": "rock bottom",
	"ܚܲܣܝܼܪ ܥܝܵܕܹ̈ܐ": "lacking manners",
	"ܚܟܘܼܡܝܵܐ ܚܲܣܝܼܪܵܐ": "interrupted coition",
	"ܡܸܟ݂ܘܵܬ݂ܹܗ ܕܒܵܒܝܼ": "like my father",
	"ܗܲܒ݇ܠ ܠܝܼ ܚܕ݂ܵܐ ܬܝܼܦܬܵܐ": "give me a hand-rolled cigarette",
	"ܘܲܪܩܵܐ ܕܐܲܪܒ݂ܵܢܵܐ": "a scroll of papyrus",
	"ܫܘܼܓ݂ܢܵܝܵܐ ܡܪܵܘܚܵܢܵܐ": "a refreshing change",
	"ܫܲܕܸܪ ܒܒܝܼܠܕܵܪܵܐ": "to send by post",
	"ܫܲܕܸܪ ܠܟܸܣ": "to redirect to",
	"ܫܲܕܸܪ ܒܐܘܼܪܚܵܐ ܪܫܝܼܡܬܵܐ": "to route",
	"ܡܸܬܦܲܩܕܵܢܘܼܬܵܐ ܦܵܠܚܵܝܬܵܐ": "a military review",
	"ܙܠܝܼܡܘܬ ܡܚܲܛܵܐ ܡܲܓܢܲܛܝܼܣܵܝܬܵܐ": "magnetic declination",
	"ܬܪܹ̈ܝܢ ܢܘܼܩܙܹ̈ܐ ܒܙܠܝܼܡܘܼܬܵܐ": "two points placed slanting",
	"ܣܘܼܣܬܝܼܡܵܐ ܡܘܼܪܝܸܙܵܐ ܕܐܟ݂ܵܠܵܐ": "a diet",
	"ܐܝܼܕܵܐ ܝܵܩܘܿܪܬܵܐ": "oppression",
	"ܚܘܼܘܵܐ ܝܲܩܘܼܪܵܐ ܘܝܲܪܝܼܟ݂ܵܐ": "a heavy and long snake",
	"ܝܵܩܘܿܪܵܐ ܕܠܸܒܵܐ": "slow of heart",
	"ܚܸܠܡܵܐ ܝܵܩܘܿܪܵܐ": "a nightmare",
	"ܐܩܠܘܼܗܿ ܝܵܩܘܿܪܬܵܐ": "pregnant",
	"ܐܵܬ݂ܘܿܪ ܕܲܪܓܘܼܫܬܵܐ ܕܡܕܝܼܢܵܝܘܼܬ݂ܵܐ": "Assyria the cradle of civilzation",
	"ܕܵܪܹܐ ܒܥܲܪܒܵܠܵܐ": "to sift",
	"ܕܵܪܹܐ ܒܘܼܕܵܩܵܐ / ܕܵܪܹܐ ܓ̰ܵܐܪ": "to make a public announcement",
	"ܕܪܵܝܵܐ ܒܲܬ݇ܪ ܢܵܬܵܐ": "to omit",
	"ܕܵܪܹܐ ܩܵܠܵܐ": "to cast one's ballot",
	"ܪܵܕܹܐ ܓܵܘ ܕܘܼܣܵܚ": "to put to jail",
	"ܕܵܪܹܐ ܒܘܼܚܬܵܢ": "to slander",
	"ܕܵܪܹܐ ܒܵܬ݇ܪ ܐܲܩܠܵܐ": "to lay by the heels",
	"ܕܵܪܹܐ ܒܵܬ݇ܪ ܢܵܬܵܐ": "to postpone",
	"ܕܵܪܹܐ ܓ̰ܵܪ": "to proclaim",
	"ܕܵܪܹܐ ܓܲܪܕܵܐ": "to cast a net",
	"ܕܵܪܹܐ ܒܬܵܩܘܿܠܬܵܐ": "to catch with a noose",
	"ܕܵܪܹܐ ܗܹܒܝܼ ܥܲܠ": "to trust in",
	"ܕܵܪܹܐ ܗܵܘܵܪ": "to cry for help",
	"ܕܵܪܹܐ ܚܸܢ̈ܓܹܐ": "to startle",
	"ܕܵܪܹܐ ܚܲܢܕܵܩ": "to make a moat",
	"ܕܵܪܹܐ ܠܦܲܐܬ݂ܵܐ ܕ": "to bother",
	"ܕܵܪܹܐ ܢܸܫܒ݂ܵܐ": "to lay a snare",
	"ܕܵܪܹܐ ܦܠܵܫܵܐ": "to give battle",
	"ܕܵܪܹܐ ܩܵܠܵܐ": "to cry out",
	"ܕܵܪܹܐ ܫܸܛܪܹ̈ܐ": "to mock",
	"ܕܵܪܹ ܫܠܵܡܵܐ ܩܵܐ": "to send greetings to",
	"ܕܵܪܹܐ ܬܚܘܬ ܡܲܥܒܕܵܢܘܼܬܵܐ": "to be pushed under an influence",
	"ܟܬܝܼܒ݂ܬܵܐ ܟܵܗܢܵܝܬܵܐ": "sacerdotal script",
	"ܠܵܐ ܙܵܝܘܿܥܵܐ": "motionless",
	"ܨܘܼܪܬܵܐ ܙܵܝܘܿܥܬܵܐ": "a film",
	"ܟܵܪܸܒ ܟܲܪܒܵܐ": "to be angry",
	"ܫܵܩܹܠ ܡܸܢ ܩܲܕ݇ܡ ܐ݇ܚܹܪ݇ܢܹ̈ܐ": "to preempt",
	"ܡܐ݇ܚܸܪ̈݇ܢܹܐ ܡܒܲܩܪܸܢ": "I will ask the others",
	"ܡܸܢܕܝܼ ܡܘܼܚܸܒܵܐ ܙܵܘܕܵܐ ܡܸܢ ܐ݇ܚܹܪ݇ܢܹ̈ܐ": "a prefered thing",
	"ܡܲܚܸܒ ܒܘܼܫ ܚܫܝܼܚܵܐ ܡܸܡ ܐ݇ܚܹܪ݇ܢܹܐ": "to prefer",
	"ܫܸܕܬܵܐ ܝܲܢ ܦܘܼܠܚܵܢܵܐ ܡܸܠܝܵܐ ܒܦܲܪܨܘܿܦܵܐ ܐ݇ܚܹܪ݇ܢܵܐ": "a position or job held by someone else",
	"ܚܝܼܪ݇ܢܵܐ ܢܲܙܢܲܙܬܵܚ ܩܵܛܸܥܠܵܗ": "put an end to your whimpering",
	"ܝܘܿܡܵܐ ܐܚܹܪ݇ܢܵܐ": "the day before yesterday , the day after tomorrow",
	"ܟܡܲܚܒܲܝ ܚܵܕ݇ ܠܸܚܕܵܕܹܐ": "they love each other",
	"ܐ݇ܡܝܼܪܲܝ ܚܵܕ݇ ܬܵܐ ܚܕ݂ܵܕ݂ܹܐ": "they said to each other",
	"ܐܵܘܵܐ ܘܗܲܡ ܗܵܘ ܐ݇ܚܸܪ݇ܢܵܐ ܠܲܝܠܲܝ ܒܟܝܼܦܝܼ": "I like neither of them",
	"ܪܐܹܪܲܬ݂ ܝܵܘܡܵܐ ܦܝܼܫ ܠܹܗ ܚܸܙܝܵܐ ܒܲܝܢܵܬ݂ܲܝܗܝܼ ܟܘܼܕ ܐܵܢܗܝܼ ܡܓܸܚܘܿܕܹܐ ܚܵܕ݇ ܥܸܡܹܗ ܕܐ݇ܚܸܪ݇ܢܵܐ": "the next day he found himself in their midst while they were arguing with each other",
	"ܣܲܩܸܠ ܒܠܘܼܚܹ̈ܐ": "to cover with panelling",
	"ܣܲܩܸܠ ܒܸܢܒ݂ܵܪܹ̈ܐ": "to adorn with ribbons",
	"ܬܲܦܬܘܼܦܹܐ ܢܝܼܚܵܝܼܬ": "to pat",
	"ܕܲܓܸܠ ܡܸܢ ܣܲܒ݂ܪܵܐ": "to be disappointed",
	"ܠܵܐ ܡܲܥܒ݂ܪܵܢܵܐ": "impossible to cross",
	"ܠܵܐ ܡܲܥܒ݂ܪܵܢܵܐ ܕܒܲܗܪܵܐ": "opaque",
	"ܝܲܥܢܝܼ، ܗܿܘܵܐ ܝܼܠܹܗ ܒܲܪ ܐ݇ܢܵܫܵܐ؟ ܠܵܐ!": "So he is a human isn't he? No!",
	"ܐܘܼܪ̈ܚܵܬܹܐ ܘܦܵܣܘܿܥܝܵܬܹ̈ܐ ܕܥܵܒ݂ܘܿܕܘܼܬܵܐ": "a procedure",
	"ܡܕܲܒܪܵܢܘܼܬܵܐ ܡܣܲܬܪܵܢܝܼܬܵܐ ܠܘܼܩܒܲܠ ܟܘܼܪܗܵܢܵܐ ܘܐܘܼܪܚܵܬܘܿܗ": "measures helping against disease and its spreading",
	"ܨܘܼܪܬܵܐ ܡܓ݂ܵܘܲܢܬܵܐ": "a painted work of art",
	"ܐܵܢܵܐ ܕܝܼܘܸܢ  ܗܘ݂ܵܐ  ܡܦܲܠܦܲܠܬܵܐ ܒܚܛܝܼܬܵܐ ܦܝܼܫ ܠܝܼ ܢܩܝܼܕܵܐ": "I who was defiled by sin was purified",
	"ܬܲܟ݂ܣܝܼܬܵܐ ܕܢܵܘܫܵܐ": "a cloth covering a coffin"
}

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
        { 'src': /(\u0251)/g, 'dest': 'a' }, //'A:' }, // Zqappa
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
    meSpeak.play(spoken)
}

function meSpeakCallback(success, id) {
    console.log('here')
    var speedslider = document.getElementById("speedslider")
    speedslider.disabled = false

    var pitchslider = document.getElementById("pitchslider")
    pitchslider.disabled = false

}

var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return keys[ keys.length * Math.random() << 0];
};

function processLiveText() {
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

    def = wordDictionary[text]
    if (wordDictionary[text] != undefined)
    {
        $('.definition').text(def).show()
    }
    else
    {
        $('.definition').hide()
    }
}

function RandomizeTextBox() {
    // load from url params
    var randomElement = randomProperty(wordDictionary)

    $("#input-text").val(randomElement)
    processLiveText()
}

function DropdownSelect() {
    var scriptnamelist = document.getElementById("scriptname");  
    var scriptselected = scriptnamelist.options[scriptnamelist.selectedIndex].value;

    switch (scriptselected) {
        case "east":
            fontfamily = "EastSyriacAdiabene"
            fontlink = "Fonts/syrcomadiabene.woff"
            break;

        case "classical":
            fontfamily = "EstrangeloNisibin"
            fontlink = "Fonts/syrcomnisibin.woff"
            break;

        case "west":
            fontfamily = "SertoJerusalem"
            fontlink = "Fonts/syrcomjerusalem.woff"
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

document.head.appendChild(newStyle);
}

$(document).ready(function() {
    $('.scriptex').text("ܐܒܓ").show();

    // set up asides
    setUpInfoAsides();
    setUpSettingAsides();
    DropdownSelect();
    RandomizeTextBox();

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
        var randomElement = wordDictionary[Math.floor(Math.random() * wordDictionary.length)];
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

        // reset()
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