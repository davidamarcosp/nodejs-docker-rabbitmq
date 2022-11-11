const amqplib = require('amqplib')
const { decodeMessage, randomWait } = require('./utils')

;(async () => {
  const connection = await amqplib.connect(process.env.AMQP_URL)
  const channel = await connection.createChannel()
  await channel.assertQueue('randomNumber', { durable: true })

  channel.prefetch(1)
  channel.consume('randomNumber', async (message) => {
    await randomWait()
    const decodedMessage = decodeMessage(message)
    console.log(`Received message "${JSON.stringify(decodedMessage)}"`)
    channel.ack(message);
  });

  console.log(`Waiting for messages...`);
})()
