import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { StatCard, Card, Badge, Button, Icon, ProgressBar, Sparkline } from "../components/common/UI";
import { chartData, weatherData } from "../data/sampleData";

// ─── Mini Line Chart ──────────────────────────────────────────────────────────
const MiniLineChart = ({ data, color, title, unit }) => {
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const W = 400, H = 80;
  const points = values.map((v, i) => `${(i / (values.length - 1)) * W},${H - ((v - min) / range) * (H - 10) - 5}`).join(" ");
  const areaPoints = `0,${H} ${points} ${W},${H}`;
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-white/70">{title}</h3>
        <span className="text-xs text-white/30">{data[data.length - 1]?.value?.toFixed(1)}{unit}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none" style={{ height: 80 }}>
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon fill={`url(#grad-${color})`} points={areaPoints} />
        <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
        <circle cx={(values.length - 1) / (values.length - 1) * W} cy={H - ((values[values.length - 1] - min) / range) * (H - 10) - 5} r="4" fill={color} />
      </svg>
      <div className="flex justify-between text-xs text-white/20 mt-1">
        <span>{data[0]?.time}</span>
        <span>{data[Math.floor(data.length / 2)]?.time}</span>
        <span>{data[data.length - 1]?.time}</span>
      </div>
    </div>
  );
};

// ─── Bar Chart ────────────────────────────────────────────────────────────────
const BarChart = ({ data, color = "#14b8a6" }) => {
  const max = Math.max(...data.map((d) => d.usage));
  return (
    <div className="flex items-end gap-2 h-24">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-t-md transition-all duration-700" style={{ height: `${(d.usage / max) * 80}px`, background: `linear-gradient(to top, ${color}cc, ${color}66)` }} />
          <span className="text-xs text-white/30 whitespace-nowrap">{d.day}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Water Tank Widget ────────────────────────────────────────────────────────
const WaterTank = ({ level, name }) => {
  const color = level > 60 ? "#14b8a6" : level > 30 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-28 border-2 rounded-b-xl overflow-hidden" style={{ borderColor: `${color}60` }}>
        <div className="absolute bottom-0 left-0 right-0 transition-all duration-1000 rounded-b-xl" style={{ height: `${level}%`, background: `linear-gradient(to top, ${color}cc, ${color}55)` }}>
          <div className="absolute top-0 left-0 right-0 h-2 animate-pulse" style={{ background: `${color}80` }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white drop-shadow">{level}%</span>
        </div>
      </div>
      <span className="text-xs text-white/40 mt-2 text-center">{name}</span>
    </div>
  );
};

// ─── Motor Status Widget ──────────────────────────────────────────────────────
const MotorStatus = ({ zone }) => {
  const { toggleIrrigation } = useApp();
  const isActive = zone.status === "active";
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? "bg-teal-500/20" : "bg-white/5"}`}>
          <Icon name="zap" size={16} className={isActive ? "text-teal-400" : "text-white/30"} />
        </div>
        <div>
          <div className="text-sm font-medium text-white truncate max-w-[140px]">{zone.name}</div>
          <div className="text-xs text-white/30">{zone.farmName}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${isActive ? "bg-teal-400 animate-pulse" : zone.status === "scheduled" ? "bg-amber-400" : "bg-white/20"}`} />
        <button
          onClick={() => toggleIrrigation(zone.id)}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${isActive ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-teal-500/20 text-teal-400 hover:bg-teal-500/30"}`}
        >
          {isActive ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

// ─── Dashboard Page ───────────────────────────────────────────────────────────
export const DashboardPage = () => {
  const { sensors, farms, irrigationZones, alerts } = useApp();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const avgMoisture = Math.round(sensors.filter((s) => s.type === "soil_moisture").reduce((a, s) => a + s.value, 0) / sensors.filter((s) => s.type === "soil_moisture").length);
  const avgTemp = (sensors.filter((s) => s.type === "temperature").reduce((a, s) => a + s.value, 0) / sensors.filter((s) => s.type === "temperature").length).toFixed(1);
  const avgHumidity = Math.round(sensors.filter((s) => s.type === "humidity").reduce((a, s) => a + s.value, 0) / sensors.filter((s) => s.type === "humidity").length);
  const waterLevel = sensors.find((s) => s.type === "water_level")?.value || 74;
  const onlineSensors = sensors.filter((s) => s.status === "online").length;
  const activeMotors = irrigationZones.filter((z) => z.status === "active").length;

  const weather = weatherData.current;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Farm Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">{time.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} · {time.toLocaleTimeString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs text-teal-400 font-medium">Live Data</span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/50">
            {farms.length} Farms Active
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <StatCard title="Avg Soil Moisture" value={avgMoisture} unit="%" icon={<Icon name="droplet" size={20} />} color="teal" trend="up" trendValue="3%" subtitle="Across all zones" />
        <StatCard title="Avg Temperature" value={avgTemp} unit="°C" icon={<Icon name="thermometer" size={20} />} color="amber" trend="up" trendValue="1.2°" subtitle="Last 24 hours" />
        <StatCard title="Avg Humidity" value={avgHumidity} unit="%" icon={<Icon name="wind" size={20} />} color="blue" trend="down" trendValue="2%" subtitle="Relative humidity" />
        <StatCard title="Water Tank" value={waterLevel} unit="%" icon={<Icon name="database" size={20} />} color={waterLevel < 40 ? "red" : "emerald"} subtitle="Main reservoir" />
        <StatCard title="Active Sensors" value={onlineSensors} unit={`/${sensors.length}`} icon={<Icon name="wifi" size={20} />} color="purple" subtitle="Online now" />
        <StatCard title="Active Motors" value={activeMotors} unit={`/${irrigationZones.length}`} icon={<Icon name="zap" size={20} />} color="emerald" subtitle="Running zones" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-1 lg:col-span-2">
          <div className="space-y-6">
            <MiniLineChart data={chartData.soilMoisture} color="#14b8a6" title="Soil Moisture (24h)" unit="%" />
            <div className="grid grid-cols-2 gap-6">
              <MiniLineChart data={chartData.temperature} color="#f59e0b" title="Temperature (24h)" unit="°C" />
              <MiniLineChart data={chartData.humidity} color="#3b82f6" title="Humidity (24h)" unit="%" />
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {/* Weather Widget */}
          <Card className="bg-gradient-to-br from-sky-500/10 to-blue-600/5 border-sky-500/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-4xl mb-1">{weather.icon}</div>
                <div className="text-3xl font-bold text-white">{weather.temp}°C</div>
                <div className="text-sm text-white/50">{weather.condition}</div>
              </div>
              <div className="text-right text-xs text-white/40 space-y-1">
                <div>Feels {weather.feelsLike}°C</div>
                <div>💧 {weather.humidity}%</div>
                <div>💨 {weather.windSpeed} km/h</div>
                <div>🌡️ {weather.pressure} hPa</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {weatherData.forecast.slice(1, 5).map((d, i) => (
                <div key={i} className="text-center p-2 rounded-lg bg-white/5">
                  <div className="text-xs text-white/30">{d.day}</div>
                  <div className="text-lg my-1">{d.icon}</div>
                  <div className="text-xs text-white font-medium">{d.high}°</div>
                  <div className="text-xs text-blue-400">{d.rain}%</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Water Tanks */}
          <Card>
            <h3 className="text-sm font-semibold text-white/70 mb-4">Water Tanks</h3>
            <div className="flex justify-around">
              <WaterTank level={74} name="Tank A" />
              <WaterTank level={38} name="Tank B" />
              <WaterTank level={91} name="Tank C" />
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Water Usage */}
        <Card>
          <h3 className="text-sm font-semibold text-white/70 mb-4">Weekly Water Usage (L)</h3>
          <BarChart data={chartData.waterUsage} />
          <div className="mt-3 flex justify-between text-xs text-white/30">
            <span>Total this week: {chartData.waterUsage.reduce((a, d) => a + d.usage, 0).toLocaleString()}L</span>
            <span className="text-emerald-400">↓ 8% vs last week</span>
          </div>
        </Card>

        {/* Motor Control */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white/70">Motor Control</h3>
            <Badge variant="info">{activeMotors} Active</Badge>
          </div>
          <div className="space-y-2">
            {irrigationZones.map((zone) => <MotorStatus key={zone.id} zone={zone} />)}
          </div>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white/70">Recent Alerts</h3>
            <Badge variant="danger">{alerts.filter((a) => !a.read).length} New</Badge>
          </div>
          <div className="space-y-2">
            {alerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className={`p-3 rounded-xl border text-sm ${!alert.read ? "bg-white/5 border-white/10" : "bg-transparent border-transparent"}`}>
                <div className="flex items-start gap-2">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${alert.type === "critical" ? "bg-red-500" : alert.type === "warning" ? "bg-amber-500" : "bg-sky-500"}`} />
                  <div>
                    <div className="font-medium text-white/80 text-xs">{alert.title}</div>
                    <div className="text-white/40 text-xs mt-0.5 line-clamp-1">{alert.message}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Farm Overview */}
      <Card>
        <h3 className="text-sm font-semibold text-white/70 mb-4">Farm Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {farms.map((farm) => (
            <div key={farm.id} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-teal-500/20 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white text-sm">{farm.name}</h4>
                <Badge variant={farm.status === "active" ? "success" : "warning"}>{farm.status}</Badge>
              </div>
              <div className="text-xs text-white/40 mb-3">📍 {farm.location}</div>
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div><span className="text-white/30">Crop:</span> <span className="text-white/70">{farm.cropType}</span></div>
                <div><span className="text-white/30">Area:</span> <span className="text-white/70">{farm.area} ac</span></div>
                <div><span className="text-white/30">Sensors:</span> <span className="text-white/70">{farm.sensors}</span></div>
                <div><span className="text-white/30">Soil:</span> <span className="text-white/70">{farm.soilType}</span></div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/30">Soil Moisture</span>
                  <span className={`font-medium ${farm.moisture < 45 ? "text-red-400" : farm.moisture < 60 ? "text-amber-400" : "text-teal-400"}`}>{farm.moisture}%</span>
                </div>
                <ProgressBar value={farm.moisture} color={farm.moisture < 45 ? "red" : farm.moisture < 60 ? "amber" : "teal"} showLabel={false} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
