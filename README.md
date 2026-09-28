# 🌱 AgriSmart — Enterprise IoT Smart Agriculture Platform

> A full-stack, enterprise-grade Smart Agriculture Monitoring and Irrigation System built with React, Node.js, Express, and MongoDB.

![AgriSmart Banner](https://img.shields.io/badge/AgriSmart-IoT%20Platform-14b8a6?style=for-the-badge&logo=leaf)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Pages & Routes](#-pages--routes)
- [MongoDB Schemas](#-mongodb-schemas)
- [MQTT Integration](#-mqtt-integration)
- [Deployment](#-deployment)
- [Demo Credentials](#-demo-credentials)

---

## ✨ Features

### 📊 Dashboard
- Real-time soil moisture, temperature, humidity cards
- Water tank level gauges with animated fill
- Motor/irrigation zone status and quick controls
- Live sensor graphs (24h sparklines)
- Weekly water usage bar charts
- Weather widget with 7-day forecast
- Farm health overview grid

### 🌾 Farm Management
- Add, edit, delete farms with full CRUD
- Crop type & soil type selection (20+ options each)
- GPS coordinates with map integration
- Farm area tracking (acres/hectares)
- Per-farm moisture status and sensor count

### 📡 Sensor Monitoring
- 6 sensor types: soil moisture, temperature, humidity, pH, water level, light intensity
- Real-time value updates every 5 seconds
- Battery level monitoring with low-battery alerts
- Online/offline/warning status tracking
- Sensor filtering by type, farm, status
- Historical readings with up to 90-day retention

### 💧 Smart Irrigation
- Manual ON/OFF per zone
- Automatic threshold-based irrigation
- Schedule builder (day/time/duration)
- Water usage tracking (L/session, L/day)
- Global auto-mode with AI recommendations
- Rain forecast skip integration
- Daily irrigation timeline view

### 🌤️ Weather Monitoring
- OpenWeatherMap API integration
- Real-time conditions (temp, humidity, wind, UV, pressure)
- 7-day forecast display
- Hourly forecast breakdown
- AI irrigation recommendations based on weather

### 🚨 Alerts Center
- Critical, warning, and info alert types
- Unread badge counter on sidebar
- Mark individual/all alerts as read
- Action-required flagging
- Filter by type, read status

### 📈 Analytics
- Interactive bar and line charts
- Weekly and monthly water consumption
- Soil moisture and temperature trend lines
- Crop performance index per farm
- KPI cards: water saved, energy used, crop yield

### 📄 Reports
- Daily, weekly, and monthly report generation
- PDF download (via jsPDF)
- Excel export (via SheetJS)
- Custom date range selector
- Per-farm report filtering

### 🛡️ Admin Panel
- User management (add, edit, remove, suspend)
- Device & gateway management
- Sensor management table with calibration
- System health dashboard
- Activity log and audit trails

### 👤 Profile & Settings
- Profile photo and personal info editor
- Notification preferences (email, push, SMS, weekly digest)
- Password change with current-password verification
- Dark/light mode toggle
- JWT session management

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Tailwind CSS 3, Recharts, Axios |
| **Backend** | Node.js 18+, Express 4, Socket.IO 4 |
| **Database** | MongoDB 7+ with Mongoose ODM |
| **Auth** | JWT (access + refresh tokens), bcryptjs |
| **IoT** | MQTT v3.1.1 (TLS supported), LoRaWAN-ready |
| **Weather** | OpenWeatherMap API |
| **Maps** | Google Maps JavaScript API |
| **Notifications** | Firebase Cloud Messaging (FCM) |
| **Real-time** | Socket.IO WebSocket |
| **Reports** | jsPDF, jsPDF-AutoTable, SheetJS |
| **Email** | Nodemailer (SMTP/Gmail) |
| **Logging** | Winston |
| **Security** | Helmet, express-rate-limit, mongo-sanitize, CORS |

---

## 📁 Project Structure

```
agri-smart/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── common/
│   │   │       ├── UI.jsx          # Reusable components (Card, Button, Badge, etc.)
│   │   │       ├── Sidebar.jsx     # Navigation sidebar
│   │   │       └── Topbar.jsx      # Top navigation bar
│   │   ├── context/
│   │   │   └── AppContext.jsx      # Global state management
│   │   ├── data/
│   │   │   └── sampleData.js       # Demo sensor data & sample datasets
│   │   ├── pages/
│   │   │   ├── PublicPages.jsx     # Home, About, Features, Login, Register
│   │   │   ├── DashboardPage.jsx   # Main dashboard with all widgets
│   │   │   ├── FarmsPage.jsx       # Farm management CRUD
│   │   │   ├── SensorsPage.jsx     # Sensor monitoring grid
│   │   │   ├── IrrigationPage.jsx  # Irrigation control panel
│   │   │   ├── MonitoringPages.jsx # Weather, Alerts, Analytics, Reports
│   │   │   └── AdminProfilePages.jsx # Admin panel, Profile, Contact
│   │   ├── styles/
│   │   │   └── index.css           # Global CSS + Tailwind + animations
│   │   ├── App.jsx                 # Root router and layout
│   │   └── index.jsx               # React entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/
│   ├── middleware/
│   │   └── auth.js                 # JWT protect, authorize, optionalAuth
│   ├── models/
│   │   └── index.js                # User, Farm, Sensor, SensorReading, Alert, etc.
│   ├── routes/
│   │   ├── auth.js                 # /api/auth — register, login, refresh, logout
│   │   ├── farms.js                # /api/farms — CRUD + analytics
│   │   ├── sensors.js              # /api/sensors — CRUD + readings + history
│   │   ├── irrigation.js           # /api/irrigation — zones + toggle + schedule
│   │   ├── alerts.js               # /api/alerts — list, read, delete
│   │   ├── weather.js              # /api/weather — current + forecast
│   │   ├── reports.js              # /api/reports — summary, water-usage
│   │   ├── admin.js                # /api/admin — user mgmt, stats (admin only)
│   │   └── users.js                # /api/users — profile, password
│   ├── utils/
│   │   ├── logger.js               # Winston logger
│   │   ├── mqttClient.js           # MQTT connection + message router
│   │   └── seedDatabase.js         # Database seeder with sample data
│   ├── .env.example
│   ├── package.json
│   └── server.js                   # Express + Socket.IO server
│
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 7+ (local or Atlas)
- npm or yarn

### 1. Clone & Install

```bash
git clone https://github.com/yourname/agrismart.git
cd agrismart

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, API keys
```

### 3. Seed the Database

```bash
cd backend
npm run seed
```

### 4. Start Development Servers

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# API running at http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm start
# App running at http://localhost:3000
```

### 5. Open in Browser

Navigate to **http://localhost:3000** and use the demo credentials below.

---

## ⚙️ Configuration

### Required API Keys

| Service | Purpose | Where to Get |
|---------|---------|-------------|
| `OPENWEATHER_API_KEY` | Weather data | [openweathermap.org/api](https://openweathermap.org/api) — Free tier available |
| `GOOGLE_MAPS_API_KEY` | Farm GPS maps | [console.cloud.google.com](https://console.cloud.google.com) |
| Firebase config | Push notifications | [console.firebase.google.com](https://console.firebase.google.com) |

### MQTT Configuration

For production, use a cloud MQTT broker:
- **HiveMQ Cloud** (free tier): `mqtts://your-instance.hivemq.cloud:8883`
- **AWS IoT Core**
- **Mosquitto** (self-hosted)

Set `MQTT_HOST`, `MQTT_USER`, `MQTT_PASS` in `.env`.

MQTT Topic Convention:
```
agrismart/{farmId}/sensors/{sensorId}       → sensor readings
agrismart/{farmId}/irrigation/{zoneId}/command → irrigation commands
agrismart/{farmId}/alerts                   → device alerts
```

---

## 📡 API Documentation

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Invalidate token |
| GET | `/api/auth/me` | Get current user |

### Farms

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/farms` | List all farms |
| POST | `/api/farms` | Create farm |
| GET | `/api/farms/:id` | Get farm details |
| PUT | `/api/farms/:id` | Update farm |
| DELETE | `/api/farms/:id` | Delete farm + data |
| GET | `/api/farms/:id/analytics` | Farm analytics |

### Sensors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sensors?farmId=&type=&status=` | List sensors |
| POST | `/api/sensors` | Register sensor |
| GET | `/api/sensors/:id` | Sensor details |
| PUT | `/api/sensors/:id` | Update sensor |
| DELETE | `/api/sensors/:id` | Remove sensor |
| POST | `/api/sensors/:id/readings` | Submit reading |
| GET | `/api/sensors/:id/history?period=24h` | Reading history |

### Irrigation

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/irrigation?farmId=` | List zones |
| POST | `/api/irrigation` | Create zone |
| PUT | `/api/irrigation/:id` | Update zone |
| POST | `/api/irrigation/:id/toggle` | Start/stop irrigation |
| POST | `/api/irrigation/:id/schedule` | Add schedule |

### Request Headers

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

---

## 🗄️ MongoDB Schemas

### User
```javascript
{ name, email, password, role, status, phone, location,
  bio, farms[], notifications{}, lastLogin, timestamps }
```

### Farm
```javascript
{ name, owner, location, coordinates{lat,lng}, area, areaUnit,
  cropType, soilType, status, zones[], settings{}, totalWaterUsed, timestamps }
```

### Sensor
```javascript
{ sensorId, name, type, farm, zone, status, battery, firmware,
  protocol, mqttTopic, calibration{}, thresholds{}, lastReading{}, timestamps }
```

### SensorReading
```javascript
{ sensor, farm, value, unit, quality, timestamp }
// Auto-expires after 90 days (TTL index)
```

### IrrigationZone
```javascript
{ name, farm, status, autoMode, moistureThreshold, flowRate,
  moistureSensor, schedule[], lastRun, totalWaterUsed, timestamps }
```

### Alert
```javascript
{ type, title, message, farm, sensor, user, read, actionRequired,
  resolvedAt, resolvedBy, metadata, timestamps }
```

---

## 🔌 MQTT Integration

AgriSmart uses MQTT for real-time sensor data from IoT devices.

### Publishing Sensor Data (from device)

```json
Topic: agrismart/{farmId}/sensors/{sensorId}
Payload:
{
  "value": 68.5,
  "unit": "%",
  "battery": 85,
  "timestamp": "2026-06-08T12:00:00Z"
}
```

### Receiving Irrigation Commands (on device)

```json
Topic: agrismart/{farmId}/irrigation/{zoneId}/command
Payload:
{
  "command": "START",
  "duration": 30,
  "timestamp": "2026-06-08T12:00:00Z"
}
```

---

## 🚢 Deployment

### Frontend (Vercel / Netlify)

```bash
cd frontend
npm run build
# Deploy the /build folder
```

### Backend (Railway / Render / EC2)

```bash
cd backend
# Set NODE_ENV=production in environment variables
# Set MONGODB_URI to Atlas connection string
npm start
```

### Docker (optional)

```bash
# Build and run with Docker Compose
docker-compose up --build
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@agrismart.io | demo123 |
| **Farmer** | john@greenvalley.com | demo123 |
| **Farmer** | sarah@sunriseorchards.com | demo123 |
| **Technician** | support@agrismart.io | demo123 |

---

## 📱 Pages Overview

| Page | Route/ID | Access |
|------|----------|--------|
| Home | `home` | Public |
| About | `about` | Public |
| Features | `features` | Public |
| Login | `login` | Public |
| Register | `register` | Public |
| Dashboard | `dashboard` | Protected |
| Farm Management | `farms` | Protected |
| Sensor Monitoring | `sensors` | Protected |
| Irrigation Control | `irrigation` | Protected |
| Weather Monitor | `weather` | Protected |
| Alerts Center | `alerts` | Protected |
| Analytics | `analytics` | Protected |
| Reports | `reports` | Protected |
| Admin Panel | `admin` | Admin only |
| Profile | `profile` | Protected |
| Contact | `contact` | Protected |

---

## 🛡️ Security Features

- JWT access tokens (7-day expiry) + refresh tokens (30-day)
- Password hashing with bcrypt (12 rounds)
- HTTP security headers via Helmet
- NoSQL injection prevention via mongo-sanitize
- Rate limiting (500 req/15 min per IP)
- CORS with explicit origin whitelist
- Role-based access control (admin/farmer/technician/viewer)
- Input validation with Joi + express-validator

---

## 📄 License

MIT License — feel free to use for personal and commercial projects.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Built with ❤️ for smart farmers worldwide 🌍**
