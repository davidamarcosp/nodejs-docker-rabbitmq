const { faker } = require('@faker-js/faker')

function encodeMessage(message) {
  return Buffer.from(JSON.stringify({ ...message, id: faker.database.mongodbObjectId() }))
}

function decodeMessage(message) {
  return JSON.parse(message.content.toString())
}

async function randomWait() {
  const min = 2500
  const max = 5000
  const randomNumber = Math.round(Math.random() * (max - min)) + min
  return new Promise(resolve => setTimeout(resolve, randomNumber))
}

module.exports.encodeMessage = encodeMessage
module.exports.decodeMessage = decodeMessage
module.exports.randomWait = randomWait
