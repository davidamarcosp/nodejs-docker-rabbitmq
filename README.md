
# Introduction

The intention of this small project is to demonstrate the power of RabbitMQ as a tool, what it is, how to use it, when to use it.
## Communication, Synchronous vs Asynchronous

To understand what power can RabbitMQ bring to us, it is essential to understand what synchronous and asynchronous
communication is.

In a complex ecosystem involving multiple services, communication between them it is a vital requeriment sooner or later. 
However, there are two different modes of communication, namely synchronous and asynchronous communication.

**Synchronous communication** would just mean that service A would call service B to execute some task. 
One important note here is now service A is **blocked** and waiting on service B to complete the task. 
This would lead to tight coupling because now service A is dependent on service B. 
One example of synchronous communication is requesting data to a REST API, where it would have to wait for result and maybe use result.

**Asynchronous communication** is where service A is not being blocked by service B, but service A requires to execute a task in service B in background so system would lead to eventual consistency, 
creating this way, loose coupling and great scalability.
## RabbitMQ

Asynchronous communication is achieved by message brokers which would be handling messages between services. 
RabbitMQ is a message broker that will be receiving, storing & delivering messages between consumers and publishers. 
RabbitMQ uses **AMQP** (Advanced Message Queuing Protocol) to standatizes messaging by defining producers, brokers and consumers. However RabbitMQ supports other protocols such as MQTT, 
HTTP but for this project it will covert AMQP usage with Nodejs.
## Repository instructions

The structure of this project's repository simulates a monorepo, 
it consist of an app called **publisher** (let's call it service A), an app called **consumer** (let's call it service B),
this repository is leveraging **Docker** to handle the orchestration between these two apps 
and a RabbitMQ server instance (here it’s using RabbitMQ official Docker image).

In order to run the monorepo you'll need to:

- Install [Docker](https://docs.docker.com/engine/install/).

- Run "**docker compose up**" (standing on the root of the project).

If everything went okay, you should be able to have and express server on localhost:8080
and the RabbitMQ management UI on [http://locahost:15674](http://locahost:15674), the default credentials are guest/guest.

## Message flow

Making a **GET** request to [http://localhost:8080](http://localhost:8080) will post a message to the "randomNumber" queue through the **publisher** app (service A), 
this message will contain a random generated number, and a generated unique message ID.
Finally the **consumer** app (service B) will be subscribed to the "randomNumber" queue and it will be receiving the messages one by one until the queue is empty.
## Benefits

Let's use our imaginations for a minute, imagine the **publisher** app (or service A) as a an e-commerce website, 
and the **consumer** app (or service B) as a mailing service.

Everytime a customer buys something using the e-commerce website, a task is requested to the mailing service to send an email 
with the invoice from the given purchase, using RabbitMQ as a message broker to asynchronously communicate will allow
a better scalability and loose coupling between the apps because:

- The e-commerce can keep processing purchases without waiting for the mailing service.
- If the queue still has messages the mailing service can keep sending emails without needing the e-commerce website.
- New services can consume the mailing service as well.
- The mailing service can scale horizontally (more instances) and independently from the e-commerce website.

And many more... the important take is that given applications are loosely coupled and independent from each other!

## Conclusion

RabbitMQ is a reliable approach to provide asynchronous communication in microservices architecture. 
It is easy to use, and takes away messaging complexities from application.