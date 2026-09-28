# 🌱 AgroPitaya — Enterprise IoT Smart Agriculture Platform

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
