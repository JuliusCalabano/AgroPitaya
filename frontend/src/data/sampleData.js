// ============================================================
// SAMPLE DATA - AgriSmart India (Tamil Nadu)
// ============================================================

export const sampleFarms = [
  {
    id: "farm-001",
    name: "Kaveri Delta Rice Farm",
    location: "Thanjavur, Tamil Nadu",
    coordinates: { lat: 10.7869, lng: 79.1378 },
    area: 52,
    areaUnit: "acres",
    cropType: "Rice",
    soilType: "Red Soil",
    status: "active",
    sensors: 14,
    moisture: 72,
    irrigationType: "drip",
    createdAt: "2024-01-15",
    image: null,
  },
  {
    id: "farm-002",
    name: "Coimbatore Sugarcane Fields",
    location: "Coimbatore, Tamil Nadu",
    coordinates: { lat: 11.0168, lng: 76.9558 },
    area: 38,
    areaUnit: "hectares",
    cropType: "Sugarcane",
    soilType: "Black Soil",
    status: "active",
    sensors: 10,
    moisture: 61,
    irrigationType: "drip",
    createdAt: "2024-02-20",
    image: null,
  },
  {
    id: "farm-003",
    name: "Madurai Cotton Estate",
    location: "Madurai, Tamil Nadu",
    coordinates: { lat: 9.9252, lng: 78.1198 },
    area: 28,
    areaUnit: "acres",
    cropType: "Cotton",
    soilType: "Sandy Loam",
    status: "warning",
    sensors: 8,
    moisture: 38,
    irrigationType: "drip",
    createdAt: "2024-03-05",
    image: null,
  },
];

export const sampleSensors = [
  { id: "S001", name: "Rice Field Moisture A", type: "soil_moisture", farmId: "farm-001", zone: "Paddy Block A", value: 72, unit: "%", status: "online", battery: 88, lastUpdate: new Date(Date.now() - 300000) },
  { id: "S002", name: "Rice Field Moisture B", type: "soil_moisture", farmId: "farm-001", zone: "Paddy Block B", value: 69, unit: "%", status: "online", battery: 91, lastUpdate: new Date(Date.now() - 180000) },
  { id: "S003", name: "Field Temperature 1", type: "temperature", farmId: "farm-001", zone: "Paddy Block A", value: 32.1, unit: "°C", status: "online", battery: 79, lastUpdate: new Date(Date.now() - 120000) },
  { id: "S004", name: "Sugarcane Temp Node", type: "temperature", farmId: "farm-002", zone: "Block A", value: 33.4, unit: "°C", status: "online", battery: 67, lastUpdate: new Date(Date.now() - 90000) },
  { id: "S005", name: "Humidity Sensor 1", type: "humidity", farmId: "farm-001", zone: "Paddy Block A", value: 74, unit: "%", status: "online", battery: 86, lastUpdate: new Date(Date.now() - 240000) },
  { id: "S006", name: "Soil pH Sensor", type: "ph", farmId: "farm-001", zone: "Paddy Block B", value: 6.5, unit: "pH", status: "online", battery: 58, lastUpdate: new Date(Date.now() - 600000) },
  { id: "S007", name: "Main Water Tank", type: "water_level", farmId: "farm-001", zone: "Main", value: 81, unit: "%", status: "online", battery: 94, lastUpdate: new Date(Date.now() - 60000) },
  { id: "S008", name: "Light Intensity A", type: "light", farmId: "farm-002", zone: "Block A", value: 9200, unit: "lux", status: "online", battery: 82, lastUpdate: new Date(Date.now() - 150000) },
  { id: "S009", name: "Cotton Moisture Sensor", type: "soil_moisture", farmId: "farm-003", zone: "Cotton Block A", value: 38, unit: "%", status: "warning", battery: 19, lastUpdate: new Date(Date.now() - 1800000) },
  { id: "S010", name: "NPK Nutrient Sensor", type: "npk", farmId: "farm-001", zone: "Paddy Block A", value: 42, unit: "ppm", status: "online", battery: 71, lastUpdate: new Date(Date.now() - 300000) },
  { id: "S011", name: "Humidity Sensor 2", type: "humidity", farmId: "farm-002", zone: "Block B", value: 68, unit: "%", status: "online", battery: 84, lastUpdate: new Date(Date.now() - 420000) },
  { id: "S012", name: "Cotton Water Tank", type: "water_level", farmId: "farm-003", zone: "Main", value: 34, unit: "%", status: "warning", battery: 68, lastUpdate: new Date(Date.now() - 900000) },
  { id: "S013", name: "Rainfall Gauge", type: "rainfall", farmId: "farm-001", zone: "Main", value: 12, unit: "mm", status: "online", battery: 90, lastUpdate: new Date(Date.now() - 360000) },
  { id: "S014", name: "Wind Speed Sensor", type: "wind", farmId: "farm-002", zone: "Block A", value: 8.5, unit: "km/h", status: "online", battery: 76, lastUpdate: new Date(Date.now() - 200000) },
  { id: "S015", name: "Cotton pH Sensor", type: "ph", farmId: "farm-003", zone: "Cotton Block B", value: 7.0, unit: "pH", status: "online", battery: 62, lastUpdate: new Date(Date.now() - 480000) },
];

export const sampleAlerts = [
  { id: "A001", type: "critical", title: "Low Soil Moisture", message: "Cotton Block A moisture at 38% — below 45% threshold. Immediate irrigation required.", farmId: "farm-003", farmName: "Madurai Cotton Estate", sensorId: "S009", timestamp: new Date(Date.now() - 1800000), read: false, actionRequired: true },
  { id: "A002", type: "warning", title: "Low Battery Alert", message: "Sensor S009 battery at 19% — replace within 24 hours", farmId: "farm-003", farmName: "Madurai Cotton Estate", sensorId: "S009", timestamp: new Date(Date.now() - 3600000), read: false, actionRequired: false },
  { id: "A003", type: "warning", title: "Water Tank Low", message: "Cotton farm water tank at 34% — refill before evening irrigation", farmId: "farm-003", farmName: "Madurai Cotton Estate", sensorId: "S012", timestamp: new Date(Date.now() - 7200000), read: true, actionRequired: true },
  { id: "A004", type: "info", title: "Drip Irrigation Completed", message: "Paddy Block B drip irrigation done — 520L used, 45 min duration", farmId: "farm-001", farmName: "Kaveri Delta Rice Farm", sensorId: null, timestamp: new Date(Date.now() - 10800000), read: true, actionRequired: false },
  { id: "A005", type: "info", title: "Monsoon Rain Detected", message: "12mm rainfall recorded — auto irrigation skipped for next 6 hours", farmId: "farm-001", farmName: "Kaveri Delta Rice Farm", sensorId: "S013", timestamp: new Date(Date.now() - 86400000), read: true, actionRequired: false },
  { id: "A006", type: "success", title: "NPK Levels Normal", message: "Nutrient levels within optimal range for rice cultivation", farmId: "farm-001", farmName: "Kaveri Delta Rice Farm", sensorId: "S010", timestamp: new Date(Date.now() - 172800000), read: true, actionRequired: false },
];

export const sampleIrrigationZones = [
  { id: "Z001", name: "Paddy Block A — Drip", farmId: "farm-001", farmName: "Kaveri Delta Rice Farm", status: "idle", autoMode: true, moisture: 72, threshold: 55, flowRate: 14.0, lastRun: new Date(Date.now() - 7200000), nextSchedule: new Date(Date.now() + 14400000), totalToday: 380 },
  { id: "Z002", name: "Paddy Block B — Drip", farmId: "farm-001", farmName: "Kaveri Delta Rice Farm", status: "active", autoMode: true, moisture: 69, threshold: 55, flowRate: 16.0, lastRun: new Date(Date.now() - 1800000), nextSchedule: null, totalToday: 520 },
  { id: "Z003", name: "Sugarcane Block A — Drip", farmId: "farm-002", farmName: "Coimbatore Sugarcane Fields", status: "scheduled", autoMode: true, moisture: 61, threshold: 50, flowRate: 12.0, lastRun: new Date(Date.now() - 14400000), nextSchedule: new Date(Date.now() + 3600000), totalToday: 240 },
  { id: "Z004", name: "Cotton Block A — Drip", farmId: "farm-003", farmName: "Madurai Cotton Estate", status: "warning", autoMode: true, moisture: 38, threshold: 45, flowRate: 10.0, lastRun: new Date(Date.now() - 28800000), nextSchedule: new Date(Date.now() + 900000), totalToday: 0 },
  { id: "Z005", name: "Sugarcane Block B — Drip", farmId: "farm-002", farmName: "Coimbatore Sugarcane Fields", status: "idle", autoMode: true, moisture: 58, threshold: 50, flowRate: 11.5, lastRun: new Date(Date.now() - 21600000), nextSchedule: new Date(Date.now() + 7200000), totalToday: 180 },
];

const generateHistoryData = (points = 24, base = 60, variance = 15) => {
  return Array.from({ length: points }, (_, i) => {
    const hour = new Date();
    hour.setHours(hour.getHours() - (points - i));
    return {
      time: hour.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false }),
      value: Math.max(0, Math.min(100, base + (Math.random() - 0.5) * variance * 2)),
    };
  });
};

export const chartData = {
  soilMoisture: generateHistoryData(24, 68, 12),
  temperature: generateHistoryData(24, 32, 4),
  humidity: generateHistoryData(24, 72, 10),
  waterUsage: Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      day: d.toLocaleDateString("en-IN", { weekday: "short" }),
      usage: Math.floor(Math.random() * 900 + 500),
    };
  }),
  monthlyWater: Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2025, i).toLocaleDateString("en-IN", { month: "short" }),
    usage: Math.floor(Math.random() * 9000 + 5000),
    rainfall: Math.floor(Math.random() * 180 + 40),
  })),
};

export const sampleUsers = [
  { id: "U001", name: "Admin User", email: "admin@agrismart.io", role: "admin", status: "active", farms: 3, lastLogin: new Date(Date.now() - 3600000), createdAt: "2024-01-01" },
  { id: "U002", name: "Arun Kumar", email: "arun@kaveridelta.com", role: "farmer", status: "active", farms: 1, lastLogin: new Date(Date.now() - 86400000), createdAt: "2024-01-15" },
  { id: "U003", name: "Priya Sugarcane", email: "priya@sugarfields.com", role: "farmer", status: "active", farms: 1, lastLogin: new Date(Date.now() - 172800000), createdAt: "2024-02-20" },
  { id: "U004", name: "Kumar Cotton", email: "kumar@cottonestate.com", role: "farmer", status: "inactive", farms: 1, lastLogin: new Date(Date.now() - 604800000), createdAt: "2024-03-05" },
  { id: "U005", name: "Tech Support", email: "support@agrismart.io", role: "technician", status: "active", farms: 0, lastLogin: new Date(Date.now() - 7200000), createdAt: "2024-01-01" },
];

export const weatherData = {
  current: {
    temp: 32,
    feelsLike: 36,
    humidity: 74,
    windSpeed: 9,
    windDir: "SW",
    uvIndex: 8,
    visibility: 10,
    pressure: 1008,
    condition: "Partly Cloudy",
    icon: "⛅",
    rainfall: 2,
  },
  forecast: [
    { day: "Today", high: 34, low: 26, condition: "Partly Cloudy", icon: "⛅", rain: 20 },
    { day: "Mon", high: 33, low: 25, condition: "Cloudy", icon: "☁️", rain: 45 },
    { day: "Tue", high: 30, low: 24, condition: "Rainy", icon: "🌧️", rain: 75 },
    { day: "Wed", high: 29, low: 23, condition: "Thunderstorm", icon: "⛈️", rain: 85 },
    { day: "Thu", high: 31, low: 24, condition: "Partly Cloudy", icon: "⛅", rain: 30 },
    { day: "Fri", high: 33, low: 25, condition: "Sunny", icon: "☀️", rain: 10 },
    { day: "Sat", high: 35, low: 27, condition: "Sunny", icon: "☀️", rain: 5 },
  ],
};

export const cropOptions = [
  "Rice", "Sugarcane", "Cotton", "Coconut", "Banana", "Tomatoes", "Corn", "Wheat",
  "Soybeans", "Potatoes", "Citrus", "Grapes", "Coffee", "Tea", "Groundnut", "Millets",
  "Turmeric", "Chilli", "Onion", "Mango",
];

export const soilTypeOptions = [
  "Red Soil", "Black Soil", "Sandy", "Loamy", "Clay", "Sandy Loam", "Clay Loam",
  "Silty Clay", "Silty Loam", "Alluvial", "Laterite", "Peat", "Chalky",
];

export const irrigationTypeOptions = ["drip", "sprinkler", "flood", "none"];

export const sensorTypeOptions = [
  { value: "soil_moisture", label: "Soil Moisture" },
  { value: "temperature", label: "Temperature" },
  { value: "humidity", label: "Humidity" },
  { value: "ph", label: "pH" },
  { value: "water_level", label: "Water Level" },
  { value: "light", label: "Light Intensity" },
  { value: "npk", label: "NPK Nutrients" },
  { value: "rainfall", label: "Rainfall" },
  { value: "wind", label: "Wind Speed" },
  { value: "co2", label: "CO2" },
];
