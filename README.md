# 📣 Notification Service API

A microservice for sending and managing notifications (Email, SMS, In-App) with support for message queuing using RabbitMQ and persistence with MongoDB.

---

## 🚀 Features

- 📬 Send Email, SMS, and In-App notifications
- 🗂️ Retrieve notifications by user and type
- 🧵 Asynchronous processing using RabbitMQ
- 🔁 Retry-safe delivery with failure handling
- 🗄️ MongoDB for persistence

---

## 🧱 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (MongoDB Atlas)
- **Queue:** RabbitMQ (CloudAMQP)
- **Deployment:** Render or Railway
- **Dev Tools:** Nodemon, dotenv

---

## 🔧 API Endpoints

### 📤 Send Notification

| Type     | Method | Endpoint                    |
|----------|--------|-----------------------------|
| Email    | POST   | `/notifications/email`      |
| SMS      | POST   | `/notifications/sms`        |
| In-App   | POST   | `/notifications/in-app`     |

**Request Body:**

```json
{
  "userId": "user123",
  "message": "Your notification message"
}
