const amqplib = require('amqplib')
const { faker } = require('@faker-js/faker')

const express = require('express')
const app = express()

const { encodeMessage, decodeMessage, randomWait } = require('./utils')

let channel

(async () => {
  const connection = await amqplib.connect(process.env.AMQP_URL)

  channel = await connection.createChannel()
  channel.prefetch(1)

  await channel.assertQueue('number', { durable: true })

  channel.consume('number', async (message) => {
    await randomWait()
    const decodedMessage = decodeMessage(message)
    console.log(decodedMessage);
    channel.ack(message);
  });

  console.log(`Waiting for messages...`);
})()

// Publishers
app.get('/', async (_, res) => {
  const message = encodeMessage({ number: faker.random.numeric() })
  await channel.sendToQueue('number', message)
  console.log('Sending message to number queue')
  return res.status(200).send('Message posted')
})

app.listen(
  process.env.SERVER_PORT,
  () => console.log(`Listening server on port: ${process.env.SERVER_PORT}`)
)
