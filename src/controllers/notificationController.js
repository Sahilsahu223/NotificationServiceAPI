const Notification = require('../models/Notification');

exports.sendNotification = async (req, res) => {
  try {
    const { userId, type, message } = req.body;

    const notification = new Notification({ userId, type, message });
    await notification.save();

    // Placeholder for actual delivery logic (to be added later)
    console.log(`Queued ${type} notification for user ${userId}`);

    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.params.id;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const { deliverNotification } = require('../services/notificationService');

exports.sendNotification = async (req, res) => {
  try {
    const { userId, type, message } = req.body;

    const notification = new Notification({ userId, type, message });
    await notification.save();

    // Trigger mock delivery
    deliverNotification(notification); // async, fire-and-forget

    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const { publishToQueue } = require('../queue/publisher');

exports.sendNotification = async (req, res) => {
  try {
    const { userId, type, message } = req.body;

    const notification = new Notification({ userId, type, message });
    await notification.save();

    // Add to RabbitMQ queue
    await publishToQueue(notification);

    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


