const amqp = require('amqplib');
const mongoose = require('mongoose');
const Notification = require('../models/Notification');
const { deliverNotification } = require('../services/notificationService');

require('dotenv').config();

const startWorker = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('notifications');

  console.log('Worker is waiting for messages...');

  channel.consume('notifications', async (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      const notification = await Notification.findById(data._id);

      if (notification) {
        await deliverNotification(notification);
        channel.ack(msg);
      } else {
        console.log('Notification not found');
        channel.ack(msg);
      }
    }
  });
};

startWorker().catch(console.error);
