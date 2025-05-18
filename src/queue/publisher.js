const amqp = require('amqplib');

let channel;

const initRabbitMQ = async () => {
  const connection = await amqp.connect('amqp://localhost');
  channel = await connection.createChannel();
  await channel.assertQueue('notifications');
};

const publishToQueue = async (data) => {
  if (!channel) await initRabbitMQ();

  channel.sendToQueue('notifications', Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });
};

module.exports = {
  publishToQueue,
};
