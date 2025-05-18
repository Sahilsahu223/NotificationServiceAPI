const Notification = require('../models/Notification');

exports.deliverNotification = async (notification) => {
  try {
    // Simulate delivery delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate delivery based on type
    switch (notification.type) {
      case 'email':
        console.log(`[EMAIL] Sent to user ${notification.userId}: ${notification.message}`);
        break;
      case 'sms':
        console.log(`[SMS] Sent to user ${notification.userId}: ${notification.message}`);
        break;
      case 'in-app':
        console.log(`[IN-APP] Notification for user ${notification.userId}: ${notification.message}`);
        break;
      default:
        throw new Error('Unsupported notification type');
    }

    // Update status to "sent"
    notification.status = 'sent';
    await notification.save();
  } catch (err) {
    console.error(`Failed to send ${notification.type} to user ${notification.userId}`, err);

    // Update status to "failed"
    notification.status = 'failed';
    await notification.save();
  }
};
