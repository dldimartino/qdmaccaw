'use strict'

const db = require('../server/db')
const {User, Word} = require('../server/db/models')

const data = [
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

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({userName: 'Cody', email: 'cody@email.com', password: '123'}),
    User.create({
      userName: 'Murphy',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  for (let i = 0; i < data.length; i++) {
    await Word.create({content: data[i].content, category: data[i].category})
  }

  // const words = await Promise.all([
  //   data.map((word) => {
  //     Word.create({content: word.content, category: word.category})
  //   })
  // ])

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
