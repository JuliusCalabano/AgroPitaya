import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Card, Badge, Button, Icon, PageHeader, ProgressBar } from "../components/common/UI";

const sensorConfig = {
  soil_moisture: { label: "Soil Moisture", icon: "droplet", unit: "%", color: "teal", min: 0, max: 100, okMin: 40, okMax: 80 },
  temperature: { label: "Temperature", icon: "thermometer", unit: "°C", color: "amber", min: -10, max: 60, okMin: 15, okMax: 35 },
  humidity: { label: "Humidity", icon: "wind", unit: "%", color: "blue", min: 0, max: 100, okMin: 40, okMax: 80 },
  ph: { label: "pH Level", icon: "activity", unit: "pH", color: "purple", min: 0, max: 14, okMin: 5.5, okMax: 7.5 },
  water_level: { label: "Water Level", icon: "database", unit: "%", color: "emerald", min: 0, max: 100, okMin: 20, okMax: 100 },
  light: { label: "Light Intensity", icon: "sun", unit: "lux", color: "amber", min: 0, max: 100000, okMin: 1000, okMax: 80000 },
};

const statusColors = {
  online: "success",
  warning: "warning",
  offline: "danger",
  error: "danger",
};

const SensorCard = ({ sensor }) => {
  const cfg = sensorConfig[sensor.type] || { label: sensor.type, icon: "sensor", unit: "", color: "teal" };
  const isOk = sensor.value >= (cfg.okMin || 0) && sensor.value <= (cfg.okMax || 100);
  const timeSince = Math.round((Date.now() - new Date(sensor.lastUpdate).getTime()) / 60000);

  return (
    <Card className={`border ${sensor.status === "warning" ? "border-amber-500/30" : sensor.status === "offline" ? "border-red-500/30" : "border-white/10"}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl bg-${cfg.color}-500/10`}>
          <Icon name={cfg.icon} size={20} className={`text-${cfg.color}-400`} />
        </div>
        <div className="text-right">
          <Badge variant={statusColors[sensor.status]}>{sensor.status}</Badge>
          <div className="text-xs text-white/30 mt-1">{timeSince}m ago</div>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-2xl font-bold text-white">
          {typeof sensor.value === "number"
            ? sensor.type === "ph" ? sensor.value.toFixed(2)
            : sensor.type === "temperature" ? sensor.value.toFixed(1)
            : sensor.type === "light" ? sensor.value.toLocaleString()
            : sensor.value
            : sensor.value}
          <span className="text-sm text-white/40 ml-1">{cfg.unit}</span>
        </div>
        <div className="text-sm font-medium text-white/70">{sensor.name}</div>
        <div className="text-xs text-white/30">{cfg.label}</div>
      </div>

      {sensor.type !== "light" && (
        <div className="mb-3">
          <ProgressBar
            value={sensor.type === "ph" ? (sensor.value / 14) * 100 : sensor.value}
            color={!isOk ? "amber" : cfg.color === "teal" ? "teal" : cfg.color === "blue" ? "blue" : cfg.color === "emerald" ? "emerald" : "teal"}
            showLabel={false}
            height="sm"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-white/30">Battery</div>
          <div className={`font-semibold ${sensor.battery < 30 ? "text-red-400" : sensor.battery < 60 ? "text-amber-400" : "text-emerald-400"}`}>{sensor.battery}%</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-white/30">Zone</div>
          <div className="font-semibold text-white/70">{sensor.zone}</div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-white/5 text-xs text-white/30 truncate">
        ID: {sensor.id} · {sensor.farmId}
      </div>
    </Card>
  );
};

export const SensorsPage = () => {
  const { sensors, farms } = useApp();
  const [filterType, setFilterType] = useState("all");
  const [filterFarm, setFilterFarm] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const types = ["all", ...Object.keys(sensorConfig)];

  const filtered = sensors.filter((s) => {
    const matchType = filterType === "all" || s.type === filterType;
    const matchFarm = filterFarm === "all" || s.farmId === filterFarm;
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    return matchType && matchFarm && matchStatus && matchSearch;
  });

  const stats = {
    total: sensors.length,
    online: sensors.filter((s) => s.status === "online").length,
    warning: sensors.filter((s) => s.status === "warning").length,
    offline: sensors.filter((s) => s.status === "offline").length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sensor Monitoring"
        subtitle="Real-time sensor data across all farms"
        actions={
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs text-teal-400">Live Updates</span>
          </div>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Sensors", value: stats.total, color: "text-white" },
          { label: "Online", value: stats.online, color: "text-emerald-400" },
          { label: "Warning", value: stats.warning, color: "text-amber-400" },
          { label: "Offline", value: stats.offline, color: "text-red-400" },
        ].map((s) => (
          <Card key={s.label} className="text-center py-3">
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-white/40 mt-1">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Sensor type breakdown */}
      <Card>
        <h3 className="text-sm font-semibold text-white/60 mb-4">Sensor Distribution</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {Object.entries(sensorConfig).map(([type, cfg]) => {
            const count = sensors.filter((s) => s.type === type).length;
            return (
              <button
                key={type}
                onClick={() => setFilterType(filterType === type ? "all" : type)}
                className={`p-3 rounded-xl border text-center transition-all ${filterType === type ? "border-teal-500/40 bg-teal-500/10" : "border-white/5 bg-white/5 hover:bg-white/10"}`}
              >
                <Icon name={cfg.icon} size={18} className={filterType === type ? "text-teal-400 mx-auto" : "text-white/40 mx-auto"} />
                <div className="text-xs font-medium text-white/70 mt-2">{cfg.label}</div>
                <div className={`text-lg font-bold mt-1 ${filterType === type ? "text-teal-400" : "text-white"}`}>{count}</div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
            <Icon name="search" size={16} />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sensors..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-teal-500/50"
          />
        </div>
        <select
          value={filterFarm}
          onChange={(e) => setFilterFarm(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white/70 text-sm focus:outline-none appearance-none min-w-[160px]"
        >
          <option value="all" className="bg-gray-900">All Farms</option>
          {farms.map((f) => <option key={f.id} value={f.id} className="bg-gray-900">{f.name}</option>)}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white/70 text-sm focus:outline-none appearance-none min-w-[130px]"
        >
          <option value="all" className="bg-gray-900">All Status</option>
          <option value="online" className="bg-gray-900">Online</option>
          <option value="warning" className="bg-gray-900">Warning</option>
          <option value="offline" className="bg-gray-900">Offline</option>
        </select>
      </div>

      {/* Results count */}
      <div className="text-sm text-white/40">Showing {filtered.length} of {sensors.length} sensors</div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((sensor) => <SensorCard key={sensor.id} sensor={sensor} />)}
      </div>
    </div>
  );
};
