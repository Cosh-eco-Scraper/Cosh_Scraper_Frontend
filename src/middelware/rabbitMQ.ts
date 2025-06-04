import amqp from 'amqplib';

export const variables = {
  queue: 'scraper_updates',
  connectionUrl: 'amqp://guest:guest@localhost:5672',
};

export async function receiveMessages() {
  try {
    const connection = await amqp.connect(variables.connectionUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue(variables.queue, { durable: true });

    channel.consume(
      variables.queue,
      msg => {
        if (msg !== null) {
          const messageContent = msg.content.toString();
          console.log(`${messageContent}`);
          // Process the message here
          channel.ack(msg);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error('Error receiving messages:', error);
  }
}

const RabbitMQMiddleware = {
  variables,
  receiveMessages,
};

export default RabbitMQMiddleware;
