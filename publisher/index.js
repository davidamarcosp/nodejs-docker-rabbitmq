const amqplib = require('amqplib')
const { faker } = require('@faker-js/faker')
const express = require('express')
const app = express()
const { encodeMessage } = require('./utils')

let channel

;(async () => {
  // Connecting to the RabbitMQ's server
  const connection = await amqplib.connect(process.env.AMQP_URL)

  // Creating a TCP conection to RabbitMQ
  channel = await connection.createChannel()

  // Connecting to a queue through a routing key (or creating and connecting to a queue if it doesn't exist)
  await channel.assertQueue('randomNumber', { durable: true })
})()

app.get('/', async (_, res) => {
  const messageId = faker.database.mongodbObjectId()
  const message = encodeMessage({ number: faker.random.numeric(), id: messageId })

  // Sending a message to a queue
  await channel.sendToQueue('randomNumber', message)
  console.log(`Publishing message "${messageId}"`)
  
  return res.status(200).send('Message posted')
})

app.listen(
  process.env.SERVER_PORT,
  () => console.log(`Listening server on port: ${process.env.SERVER_PORT}`)
)
