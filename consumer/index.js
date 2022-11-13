const amqplib = require('amqplib')
const { decodeMessage, randomWait } = require('./utils')

;(async () => {
  // Connecting to the RabbitMQ's server
  const connection = await amqplib.connect(process.env.AMQP_URL)

  // Creating a TCP conection to RabbitMQ
  const channel = await connection.createChannel()

  // Connecting to a queue through a routing key (or creating and connecting to a queue if it doesn't exist)
  await channel.assertQueue('randomNumber', { durable: true })

  // Config to handle one message at a time
  channel.prefetch(1)

  // Event listener to consume queue's messages
  channel.consume('randomNumber', async (message) => {
    // Random wait to mimic CPU processing 
    await randomWait()
    
    const decodedMessage = decodeMessage(message)
    console.log(`Received message "${JSON.stringify(decodedMessage)}"`)

    // Acknowledging a message will remove it from the queue
    channel.ack(message);
  });

  console.log(`Waiting for messages...`);
})()
