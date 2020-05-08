'use strict'

const db = require('../server/db')
const {User, Word, Room, Game} = require('../server/db/models')

const games = [
  {isActive: false, rounds: 5},
  {isActive: true, rounds: 5},
  {isActive: true, rounds: 10},
  {isActive: true, rounds: 5},
  {isActive: true, rounds: 1},
  {isActive: true, rounds: 15},
  {isActive: true, rounds: 10},
  {isActive: true, rounds: 5},
  {isActive: true, rounds: 10},
  {isActive: true, rounds: 1}
]

const words = [
  {content: 'Long-necked turtle', category: 'France'},
  {content: "Francolin, swainson's", category: 'Indonesia'},
  {content: 'Eagle, african fish', category: 'China'},
  {content: 'Stork, white', category: 'Brazil'},
  {content: 'Vulture, turkey', category: 'China'},
  {content: 'Weaver, lesser masked', category: 'Finland'},
  {content: 'European spoonbill', category: 'Estonia'},
  {content: 'Toucan, white-throated', category: 'China'},
  {content: 'Argalis', category: 'Peru'},
  {content: 'Indian jackal', category: 'Zambia'},
  {content: 'Blue shark', category: 'China'},
  {content: 'Macaw, blue and gold', category: 'Ukraine'},
  {content: 'Grizzly bear', category: 'Benin'},
  {content: 'Sulfur-crested cockatoo', category: 'Tunisia'},
  {content: "Cat, miner's", category: 'Philippines'},
  {content: 'Waved albatross', category: 'Ukraine'},
  {content: 'Gecko (unidentified)', category: 'Mexico'},
  {content: 'Wild water buffalo', category: 'United Arab Emirates'},
  {content: 'Pademelon, red-legged', category: 'United States'},
  {content: 'Grey lourie', category: 'Isle of Man'},
  {content: 'Bat-eared fox', category: 'China'},
  {content: 'Desert spiny lizard', category: 'Yemen'},
  {content: 'Squirrel, thirteen-lined', category: 'Russia'},
  {content: 'Argalis', category: 'France'},
  {content: 'Australian pelican', category: 'Nigeria'},
  {content: 'Moccasin, water', category: 'Indonesia'},
  {content: 'Madagascar hawk owl', category: 'China'},
  {content: 'Turtle, snake-necked', category: 'France'},
  {content: 'Galapagos mockingbird', category: 'Macedonia'},
  {content: 'Skink, african', category: 'Portugal'},
  {content: 'Raven, cape', category: 'China'},
  {content: 'Owl, great horned', category: 'Cuba'},
  {content: 'Fox, savanna', category: 'Indonesia'},
  {content: 'Savanna baboon', category: 'Indonesia'},
  {content: 'Bahama pintail', category: 'Thailand'},
  {content: 'European beaver', category: 'China'},
  {content: 'Gull, swallow-tail', category: 'China'},
  {content: 'Pale white-eye', category: 'Philippines'},
  {content: 'American bison', category: 'China'},
  {content: 'Roller, lilac-breasted', category: 'Thailand'},
  {content: 'White-faced tree rat', category: 'Cambodia'},
  {content: 'Baboon, olive', category: 'Sri Lanka'},
  {content: 'Red-breasted nuthatch', category: 'Czech Republic'},
  {content: 'Ocelot', category: 'Czech Republic'},
  {content: 'Manatee', category: 'China'},
  {content: 'Bleu, blue-breasted cordon', category: 'China'},
  {content: 'Guerza', category: 'Central African Republic'},
  {content: 'Eastern indigo snake', category: 'Croatia'},
  {content: 'Fat-tailed dunnart', category: 'Argentina'},
  {content: 'Komodo dragon', category: 'Indonesia'},
  {content: 'Squirrel, malabar', category: 'Serbia'},
  {content: 'Civet cat', category: 'South Africa'},
  {content: 'Small-spotted genet', category: 'Indonesia'},
  {content: 'Brown pelican', category: 'Philippines'},
  {content: 'Tokay gecko', category: 'Sweden'},
  {content: 'Boa, columbian rainbow', category: 'Philippines'},
  {content: 'Sloth, pale-throated three-toed', category: 'Poland'},
  {content: 'Crane, wattled', category: 'Gambia'},
  {content: "Sifaka, verreaux's", category: 'Russia'},
  {content: 'Chuckwalla', category: 'China'},
  {content: 'Lemur, ring-tailed', category: 'Poland'},
  {content: 'Rhesus monkey', category: 'Cameroon'},
  {content: 'Frilled dragon', category: 'Italy'},
  {content: 'Kaffir cat', category: 'Greece'},
  {content: 'Greater blue-eared starling', category: 'Thailand'},
  {content: 'Heron, little', category: 'Peru'},
  {content: 'Lion, southern sea', category: 'Nigeria'},
  {content: 'White-bellied sea eagle', category: 'Nigeria'},
  {content: 'Admiral, indian red', category: 'Ukraine'},
  {content: 'Heron, yellow-crowned night', category: 'Argentina'},
  {content: 'Common langur', category: 'China'},
  {content: 'Red deer', category: 'Peru'},
  {content: 'Coyote', category: 'China'},
  {content: 'Pelican, great white', category: 'Uzbekistan'},
  {content: 'Godwit, hudsonian', category: 'Colombia'},
  {content: 'Yellow-brown sungazer', category: 'China'},
  {content: 'Long-nosed bandicoot', category: 'Paraguay'},
  {content: 'Wallaby, dama', category: 'China'},
  {content: 'Scottish highland cow', category: 'China'},
  {content: 'Yellow-billed hornbill', category: 'Kazakhstan'},
  {content: 'Heron, boat-billed', category: 'China'},
  {content: 'Frilled dragon', category: 'Argentina'},
  {content: 'Crested porcupine', category: 'Tajikistan'},
  {content: 'Malabar squirrel', category: 'Indonesia'},
  {content: 'Eastern white pelican', category: 'China'},
  {content: 'Grenadier, common', category: 'Paraguay'},
  {content: 'Fox, arctic', category: 'Poland'},
  {content: 'Gray heron', category: 'Poland'},
  {content: 'Pacific gull', category: 'Sweden'},
  {content: 'Greater roadrunner', category: 'Russia'},
  {content: 'Indian porcupine', category: 'Indonesia'},
  {content: 'Crab, sally lightfoot', category: 'China'},
  {content: 'Boa, malagasy ground', category: 'Czech Republic'},
  {content: 'White-headed vulture', category: 'Japan'},
  {content: 'Lemur, ring-tailed', category: 'Greece'},
  {content: 'Springbok', category: 'Lithuania'},
  {content: 'Armadillo, nine-banded', category: 'Switzerland'},
  {content: 'Roan antelope', category: 'China'},
  {content: "Hartebeest, coke's", category: 'Turkmenistan'},
  {content: 'Black-cheeked waxbill', category: 'China'}
]

const rooms = [
  {roomCode: 'xhEsAfuyZC', isActive: true},
  {roomCode: 'Y0wK7AHThO', isActive: true},
  {roomCode: 'U79tfvKz', isActive: false},
  {roomCode: 'wFaWfSm', isActive: false},
  {roomCode: 'yvBy7RHf4L', isActive: false},
  {roomCode: 'MqMXx4', isActive: true},
  {roomCode: 'awoabe', isActive: true},
  {roomCode: '3dBCQI4jBb', isActive: false},
  {roomCode: 'R0TsviDszprU', isActive: true},
  {roomCode: 'IITAsC', isActive: true}
]

const users = [
  {
    name: 'amaith0',
    email: 'ahalifax0@tripadvisor.com',
    password: 'W7LEXnM2Rg3I',
    imageUrl: 'http://dummyimage.com/231x186.png/dddddd/000000',
    wins: 56,
    gamesPlayed: 62,
    munnyPoints: 172,
    isArtist: true
  },
  {
    name: 'echanson1',
    email: 'mierland1@simplemachines.org',
    password: 'COs0QtVA',
    imageUrl: 'http://dummyimage.com/203x124.jpg/5fa2dd/ffffff',
    wins: 29,
    gamesPlayed: 72,
    munnyPoints: 1902,
    isArtist: false
  },
  {
    name: 'ldiegan2',
    email: 'ahessing2@jigsy.com',
    password: '7rR2UA2bF',
    imageUrl: 'http://dummyimage.com/140x150.bmp/dddddd/000000',
    wins: 79,
    gamesPlayed: 73,
    munnyPoints: 1276,
    isArtist: true
  },
  {
    name: 'wmcleish3',
    email: 'bshawe3@google.com.br',
    password: 'xqc1X0lR',
    imageUrl: 'http://dummyimage.com/117x122.jpg/dddddd/000000',
    wins: 97,
    gamesPlayed: 8,
    munnyPoints: 103,
    isArtist: false
  },
  {
    name: 'tpetters4',
    email: 'hpadgett4@senate.gov',
    password: 'UuQQwz2HV1XS',
    imageUrl: 'http://dummyimage.com/191x145.png/5fa2dd/ffffff',
    wins: 52,
    gamesPlayed: 66,
    munnyPoints: 79,
    isArtist: false
  },
  {
    name: 'telson5',
    email: 'bsilmon5@webmd.com',
    password: 'r1fTuCgjiW6',
    imageUrl: 'http://dummyimage.com/146x215.bmp/dddddd/000000',
    wins: 77,
    gamesPlayed: 1,
    munnyPoints: 1693,
    isArtist: false
  },
  {
    name: 'ssiddele6',
    email: 'acleveley6@youtu.be',
    password: 'LIVWyLstck',
    imageUrl: 'http://dummyimage.com/238x155.bmp/dddddd/000000',
    wins: 46,
    gamesPlayed: 7,
    munnyPoints: 328,
    isArtist: true
  },
  {
    name: 'tarnett7',
    email: 'nquarrie7@bloomberg.com',
    password: 'sLfh36ZaVV',
    imageUrl: 'http://dummyimage.com/208x149.bmp/cc0000/ffffff',
    wins: 73,
    gamesPlayed: 50,
    munnyPoints: 1875,
    isArtist: false
  },
  {
    name: 'bbollin8',
    email: 'dchardin8@yolasite.com',
    password: 'EXTlTDyuDE',
    imageUrl: 'http://dummyimage.com/185x111.bmp/ff4444/ffffff',
    wins: 10,
    gamesPlayed: 44,
    munnyPoints: 456,
    isArtist: true
  },
  {
    name: 'dwarboys9',
    email: 'upavlovsky9@phoca.cz',
    password: 'o2IvLS',
    imageUrl: 'http://dummyimage.com/108x127.bmp/ff4444/ffffff',
    wins: 53,
    gamesPlayed: 67,
    munnyPoints: 685,
    isArtist: false
  },
  {
    name: 'zgobela',
    email: 'lmcileena@wunderground.com',
    password: 'ldpGQ0',
    imageUrl: 'http://dummyimage.com/153x234.png/5fa2dd/ffffff',
    wins: 40,
    gamesPlayed: 54,
    munnyPoints: 444,
    isArtist: true
  },
  {
    name: 'bwillavizeb',
    email: 'cklausewitzb@mit.edu',
    password: 'sZzW5WNXfarw',
    imageUrl: 'http://dummyimage.com/200x207.bmp/dddddd/000000',
    wins: 50,
    gamesPlayed: 92,
    munnyPoints: 1804,
    isArtist: false
  },
  {
    name: 'cbruckc',
    email: 'emcalroyc@shareasale.com',
    password: '9VN79F',
    imageUrl: 'http://dummyimage.com/172x145.jpg/5fa2dd/ffffff',
    wins: 74,
    gamesPlayed: 56,
    munnyPoints: 731,
    isArtist: false
  },
  {
    name: 'nprield',
    email: 'agildroyd@naver.com',
    password: '2KzKGRlVefv',
    imageUrl: 'http://dummyimage.com/114x117.jpg/cc0000/ffffff',
    wins: 50,
    gamesPlayed: 81,
    munnyPoints: 1772,
    isArtist: false
  },
  {
    name: 'fbodee',
    email: 'dperigoe@shutterfly.com',
    password: 'ASdQIR',
    imageUrl: 'http://dummyimage.com/110x128.png/dddddd/000000',
    wins: 10,
    gamesPlayed: 67,
    munnyPoints: 610,
    isArtist: true
  },
  {
    name: 'pharmstonef',
    email: 'tbrislawnf@marriott.com',
    password: 'kgvi0AGjTA',
    imageUrl: 'http://dummyimage.com/117x221.bmp/5fa2dd/ffffff',
    wins: 57,
    gamesPlayed: 71,
    munnyPoints: 599,
    isArtist: false
  },
  {
    name: 'sfrondtg',
    email: 'scorkerg@squarespace.com',
    password: 'UP4Qj5',
    imageUrl: 'http://dummyimage.com/228x218.bmp/5fa2dd/ffffff',
    wins: 82,
    gamesPlayed: 12,
    munnyPoints: 1036,
    isArtist: false
  },
  {
    name: 'jnehlh',
    email: 'bwrennallh@livejournal.com',
    password: 'fcV0ag5sMU',
    imageUrl: 'http://dummyimage.com/132x154.bmp/cc0000/ffffff',
    wins: 36,
    gamesPlayed: 38,
    munnyPoints: 1008,
    isArtist: false
  },
  {
    name: 'mleflemingi',
    email: 'lbroomfieldi@devhub.com',
    password: 'heq2kybv',
    imageUrl: 'http://dummyimage.com/203x150.png/dddddd/000000',
    wins: 88,
    gamesPlayed: 35,
    munnyPoints: 640,
    isArtist: false
  },
  {
    name: 'aparletj',
    email: 'kharvattj@live.com',
    password: '9ONbkklhfOjH',
    imageUrl: 'http://dummyimage.com/187x131.jpg/cc0000/ffffff',
    wins: 46,
    gamesPlayed: 5,
    munnyPoints: 1508,
    isArtist: true
  },
  {
    name: 'lrobbelk',
    email: 'mallnattk@tripod.com',
    password: 'ltgc7q',
    imageUrl: 'http://dummyimage.com/181x105.jpg/cc0000/ffffff',
    wins: 84,
    gamesPlayed: 49,
    munnyPoints: 891,
    isArtist: false
  },
  {
    name: 'mpolglasel',
    email: 'mtutel@mlb.com',
    password: 'f3H1T0TWx8vu',
    imageUrl: 'http://dummyimage.com/107x248.jpg/cc0000/ffffff',
    wins: 57,
    gamesPlayed: 55,
    munnyPoints: 1373,
    isArtist: true
  },
  {
    name: 'sbutcherm',
    email: 'csimantsm@edublogs.org',
    password: 'XR1ryyf',
    imageUrl: 'http://dummyimage.com/189x113.bmp/5fa2dd/ffffff',
    wins: 28,
    gamesPlayed: 85,
    munnyPoints: 508,
    isArtist: false
  },
  {
    name: 'bhalfacreen',
    email: 'cgamelln@prlog.org',
    password: 'SSxcKIPTekjj',
    imageUrl: 'http://dummyimage.com/237x130.bmp/ff4444/ffffff',
    wins: 45,
    gamesPlayed: 84,
    munnyPoints: 584,
    isArtist: false
  },
  {
    name: 'rshearso',
    email: 'krosenfeldo@aol.com',
    password: '2sCNL7ShBio',
    imageUrl: 'http://dummyimage.com/209x124.bmp/ff4444/ffffff',
    wins: 50,
    gamesPlayed: 47,
    munnyPoints: 984,
    isArtist: true
  }
]

async function seed() {
  await db.sync({force: false})
  console.log('db synced!')

  // const users = await Promise.all([
  //   User.create({name: 'Cody', email: 'cody@email.com', password: '123'}),
  //   User.create({
  //     name: 'Murphy',
  //     email: 'murphy@email.com',
  //     password: '123'
  //   })
  // ])

  for (let i = 0; i < words.length; i++) {
    await Word.create(words[i])
  }

  for (let i = 0; i < rooms.length; i++) {
    await Room.create(rooms[i])
  }

  for (let i = 0; i < users.length; i++) {
    await User.create(users[i])
  }

  for (let i = 0; i < games.length; i++) {
    await Game.create(games[i])
  }

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
