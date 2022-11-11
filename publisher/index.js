const amqplib = require('amqplib')
const { faker } = require('@faker-js/faker')

const express = require('express')
const app = express()

const { encodeMessage } = require('./utils')

let channel

;(async () => {
  const connection = await amqplib.connect(process.env.AMQP_URL)
  channel = await connection.createChannel()
  await channel.assertQueue('randomNumber', { durable: true })
})()

app.get('/', async (_, res) => {
  const messageId = faker.database.mongodbObjectId()
  const message = encodeMessage({ number: faker.random.numeric(), id: messageId })
  await channel.sendToQueue('randomNumber', message)
  console.log(`Publishing message "${messageId}"`)
  return res.status(200).send('Message posted')
})

app.listen(
  process.env.SERVER_PORT,
  () => console.log(`Listening server on port: ${process.env.SERVER_PORT}`)
)
