import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Card, Badge, Button, Icon, PageHeader, ProgressBar } from "../components/common/UI";
import { weatherData, chartData } from "../data/sampleData";

// ─── Weather Page ─────────────────────────────────────────────────────────────
export const WeatherPage = () => {
  const w = weatherData.current;
  const forecast = weatherData.forecast;

  return (
    <div className="space-y-6">
      <PageHeader title="Weather Monitor" subtitle="Real-time weather data and 7-day forecast" />

      {/* Current Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-sky-500/10 to-blue-900/20 border-sky-500/20">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-7xl mb-2">{w.icon}</div>
              <div className="text-6xl font-black text-white">{w.temp}°<span className="text-3xl text-white/50">C</span></div>
              <div className="text-xl text-white/70 mt-2">{w.condition}</div>
              <div className="text-sm text-white/40 mt-1">Feels like {w.feelsLike}°C</div>
            </div>
            <div className="text-right space-y-3 text-sm">
              <div className="bg-white/5 rounded-xl px-4 py-2">
                <div className="text-white/30 text-xs">Humidity</div>
                <div className="text-white font-semibold">{w.humidity}%</div>
              </div>
              <div className="bg-white/5 rounded-xl px-4 py-2">
                <div className="text-white/30 text-xs">Wind</div>
                <div className="text-white font-semibold">{w.windSpeed} km/h {w.windDir}</div>
              </div>
              <div className="bg-white/5 rounded-xl px-4 py-2">
                <div className="text-white/30 text-xs">Pressure</div>
                <div className="text-white font-semibold">{w.pressure} hPa</div>
              </div>
              <div className="bg-white/5 rounded-xl px-4 py-2">
                <div className="text-white/30 text-xs">UV Index</div>
                <div className={`font-semibold ${w.uvIndex > 7 ? "text-red-400" : w.uvIndex > 4 ? "text-amber-400" : "text-green-400"}`}>{w.uvIndex} {w.uvIndex > 7 ? "(High)" : w.uvIndex > 4 ? "(Mod)" : "(Low)"}</div>
              </div>
            </div>
          </div>

          {/* Agricultural Impact */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <div className="text-2xl">🌱</div>
              <div className="text-xs text-white/40 mt-1">Crop Impact</div>
              <div className="text-sm text-emerald-400 font-medium">Favorable</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">💧</div>
              <div className="text-xs text-white/40 mt-1">Irrigation Need</div>
              <div className="text-sm text-amber-400 font-medium">Moderate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">🌡️</div>
              <div className="text-xs text-white/40 mt-1">Heat Stress</div>
              <div className="text-sm text-green-400 font-medium">Low Risk</div>
            </div>
          </div>
        </Card>

        {/* Today's Forecast Detail */}
        <Card>
          <h3 className="font-semibold text-white mb-4">Today's Forecast</h3>
          <div className="space-y-3">
            {["06:00 AM", "09:00 AM", "12:00 PM", "03:00 PM", "06:00 PM", "09:00 PM"].map((time, i) => {
              const temps = [22, 25, 29, 31, 28, 24];
              return (
                <div key={time} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-xs text-white/40 w-20">{time}</span>
                  <span className="text-lg">{i < 2 ? "🌤️" : i < 4 ? "⛅" : "🌙"}</span>
                  <span className="text-sm font-semibold text-white">{temps[i]}°C</span>
                  <span className="text-xs text-blue-400">{[0, 5, 10, 10, 5, 0][i]}%</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* 7-Day Forecast */}
      <Card>
        <h3 className="font-semibold text-white mb-4">7-Day Forecast</h3>
        <div className="grid grid-cols-7 gap-3">
          {forecast.map((day, i) => (
            <div key={i} className={`text-center p-3 rounded-xl ${i === 0 ? "bg-teal-500/15 border border-teal-500/20" : "bg-white/5 hover:bg-white/10 transition-all"}`}>
              <div className="text-xs text-white/40 mb-2">{day.day}</div>
              <div className="text-3xl mb-2">{day.icon}</div>
              <div className="text-sm font-bold text-white">{day.high}°</div>
              <div className="text-xs text-white/40">{day.low}°</div>
              <div className={`text-xs mt-1 ${day.rain > 60 ? "text-blue-400" : "text-white/30"}`}>💧{day.rain}%</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Rainfall & Irrigation Recommendation */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/5 border-blue-500/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-blue-500/20">
            <Icon name="droplet" size={24} className="text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">AI Irrigation Recommendation</h3>
            <p className="text-white/60 text-sm">Heavy rainfall expected Tuesday-Wednesday (80-90%). <strong className="text-white">Recommend postponing irrigation for Zones A & B</strong> to conserve 620L. Resume normal schedule Thursday.</p>
            <div className="flex gap-2 mt-3">
              <Button variant="primary" size="sm">Apply Recommendation</Button>
              <Button variant="secondary" size="sm">Dismiss</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// ─── Alerts Page ──────────────────────────────────────────────────────────────
export const AlertsPage = () => {
  const { alerts, markAlertRead, unreadAlerts } = useApp();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? alerts : filter === "unread" ? alerts.filter((a) => !a.read) : alerts.filter((a) => a.type === filter);

  const typeConfig = {
    critical: { color: "danger", bg: "bg-red-500/10 border-red-500/20" },
    warning: { color: "warning", bg: "bg-amber-500/10 border-amber-500/20" },
    info: { color: "info", bg: "bg-sky-500/10 border-sky-500/20" },
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alerts Center"
        subtitle={`${unreadAlerts} unread alerts`}
        actions={
          <Button variant="secondary" size="sm" onClick={() => alerts.forEach((a) => markAlertRead(a.id))}>
            Mark All Read
          </Button>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total", value: alerts.length, color: "text-white" },
          { label: "Critical", value: alerts.filter((a) => a.type === "critical").length, color: "text-red-400" },
          { label: "Warnings", value: alerts.filter((a) => a.type === "warning").length, color: "text-amber-400" },
          { label: "Unread", value: unreadAlerts, color: "text-sky-400" },
        ].map((s) => (
          <Card key={s.label} className="text-center py-3">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-white/40">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["all", "unread", "critical", "warning", "info"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter === f ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "bg-white/5 text-white/40 hover:bg-white/10 border border-white/5"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filtered.map((alert) => {
          const tc = typeConfig[alert.type] || typeConfig.info;
          return (
            <div
              key={alert.id}
              onClick={() => markAlertRead(alert.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all hover:border-white/20 ${!alert.read ? tc.bg : "bg-white/3 border-white/5"}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-xl shrink-0 ${tc.bg}`}>
                  <Icon name="alert" size={18} className={alert.type === "critical" ? "text-red-400" : alert.type === "warning" ? "text-amber-400" : "text-sky-400"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{alert.title}</span>
                    {!alert.read && <span className="w-2 h-2 rounded-full bg-teal-400" />}
                    <Badge variant={tc.color} size="xs">{alert.type}</Badge>
                    {alert.actionRequired && <Badge variant="warning" size="xs">Action Required</Badge>}
                  </div>
                  <p className="text-sm text-white/60 mb-2">{alert.message}</p>
                  <div className="flex items-center gap-3 text-xs text-white/30">
                    <span>📍 {alert.farmName}</span>
                    {alert.sensorId && <span>🔌 {alert.sensorId}</span>}
                    <span>🕐 {new Date(alert.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Analytics Page ───────────────────────────────────────────────────────────
export const AnalyticsPage = () => {
  const [period, setPeriod] = useState("week");

  const BarChart = ({ data, labelKey, valueKey, color = "#14b8a6", title }) => {
    const max = Math.max(...data.map((d) => d[valueKey]));
    return (
      <Card>
        <h3 className="font-semibold text-white mb-4">{title}</h3>
        <div className="flex items-end gap-2" style={{ height: 120 }}>
          {data.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="text-xs text-white/40">{Math.round(d[valueKey] / 1000 * 10) / 10}k</div>
              <div className="w-full rounded-t-md transition-all duration-700" style={{ height: `${(d[valueKey] / max) * 80}px`, background: `linear-gradient(to top, ${color}cc, ${color}44)` }} />
              <span className="text-xs text-white/30">{d[labelKey]}</span>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  const LineChart = ({ data, color, title, unit }) => {
    const values = data.map((d) => d.value);
    const min = Math.min(...values); const max = Math.max(...values); const range = max - min || 1;
    const W = 400; const H = 100;
    const points = values.map((v, i) => `${(i / (values.length - 1)) * W},${H - ((v - min) / range) * (H - 10) - 5}`).join(" ");
    return (
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-white">{title}</h3>
          <span className="text-sm text-white/40">{values[values.length - 1]?.toFixed(1)}{unit}</span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 100 }}>
          <defs><linearGradient id={`a${color}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.3"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
          <polygon fill={`url(#a${color})`} points={`0,${H} ${points} ${W},${H}`} />
          <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
        </svg>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        subtitle="Interactive data insights and performance analysis"
        actions={
          <div className="flex gap-2">
            {["week", "month", "year"].map((p) => (
              <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${period === p ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "bg-white/5 text-white/40 hover:bg-white/10 border border-white/5"}`}>{p}</button>
            ))}
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Water Saved", value: "12,450L", change: "+8.3%", pos: true },
          { label: "Energy Used", value: "284 kWh", change: "-4.2%", pos: true },
          { label: "Crop Yield", value: "+12.4%", change: "vs last season", pos: true },
          { label: "Sensor Uptime", value: "97.8%", change: "+0.3%", pos: true },
        ].map((k) => (
          <Card key={k.label}>
            <div className="text-2xl font-bold text-white mb-1">{k.value}</div>
            <div className="text-xs text-white/40 mb-2">{k.label}</div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${k.pos ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{k.change}</span>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart data={chartData.waterUsage} labelKey="day" valueKey="usage" color="#14b8a6" title="Daily Water Usage (L)" />
        <BarChart data={chartData.monthlyWater} labelKey="month" valueKey="usage" color="#3b82f6" title="Monthly Water Consumption (L)" />
        <LineChart data={chartData.soilMoisture.slice(-12)} color="#14b8a6" title="Soil Moisture Trend" unit="%" />
        <LineChart data={chartData.temperature.slice(-12)} color="#f59e0b" title="Temperature Trend" unit="°C" />
      </div>

      {/* Crop Performance */}
      <Card>
        <h3 className="font-semibold text-white mb-4">Crop Performance Index</h3>
        <div className="space-y-4">
          {[
            { crop: "Corn", farm: "Green Valley Farm", health: 87, moisture: 68, yield: "+14%" },
            { crop: "Citrus", farm: "Sunrise Orchards", health: 74, moisture: 54, yield: "+6%" },
            { crop: "Grapes", farm: "Blue Ridge Vineyard", health: 52, moisture: 41, yield: "-3%" },
          ].map((c) => (
            <div key={c.crop} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-xl">
                {c.crop === "Corn" ? "🌽" : c.crop === "Citrus" ? "🍊" : "🍇"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white">{c.crop}</div>
                <div className="text-xs text-white/40">{c.farm}</div>
              </div>
              <div className="hidden md:block w-32">
                <div className="text-xs text-white/40 mb-1">Health Index</div>
                <ProgressBar value={c.health} color={c.health > 75 ? "emerald" : c.health > 55 ? "amber" : "red"} showLabel={false} height="sm" />
              </div>
              <div className="text-center w-20">
                <div className="text-xs text-white/40">Moisture</div>
                <div className={`font-semibold ${c.moisture < 45 ? "text-red-400" : "text-teal-400"}`}>{c.moisture}%</div>
              </div>
              <div className="text-right w-16">
                <div className="text-xs text-white/40">Yield</div>
                <div className={`font-semibold ${c.yield.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>{c.yield}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ─── Reports Page ─────────────────────────────────────────────────────────────
export const ReportsPage = () => {
  const { addToast } = useApp();
  const [reportType, setReportType] = useState("daily");

  const handleDownload = (type) => {
    addToast(`Generating ${type} report...`, "info");
    setTimeout(() => addToast(`Report downloaded successfully!`, "success"), 1500);
  };

  const reports = [
    { id: 1, name: "Daily Farm Summary - Jun 7", type: "daily", date: "2026-06-07", size: "245 KB", status: "ready" },
    { id: 2, name: "Weekly Water Consumption Report", type: "weekly", date: "2026-06-01", size: "1.2 MB", status: "ready" },
    { id: 3, name: "Monthly Crop Performance Analysis", type: "monthly", date: "2026-05-31", size: "3.4 MB", status: "ready" },
    { id: 4, name: "Sensor Uptime Report - May 2026", type: "monthly", date: "2026-05-31", size: "890 KB", status: "ready" },
    { id: 5, name: "Irrigation Efficiency Analysis", type: "weekly", date: "2026-05-25", size: "1.8 MB", status: "ready" },
    { id: 6, name: "Alert History Summary", type: "monthly", date: "2026-05-01", size: "520 KB", status: "ready" },
  ];

  const filtered = reports.filter((r) => r.type === reportType);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        subtitle="Generate and download farm analytics reports"
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => handleDownload("PDF")} icon={<Icon name="download" size={16} />}>Export PDF</Button>
            <Button variant="primary" onClick={() => handleDownload("Excel")} icon={<Icon name="download" size={16} />}>Export Excel</Button>
          </div>
        }
      />

      {/* Report types */}
      <div className="flex gap-2">
        {["daily", "weekly", "monthly"].map((t) => (
          <button key={t} onClick={() => setReportType(t)} className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${reportType === t ? "bg-teal-500 text-white" : "bg-white/5 text-white/40 hover:bg-white/10 border border-white/5"}`}>{t}</button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Reports Generated", value: "47", icon: "report" },
          { label: "This Month", value: "12", icon: "calendar" },
          { label: "PDF Downloads", value: "28", icon: "download" },
          { label: "Data Points", value: "1.2M", icon: "database" },
        ].map((s) => (
          <Card key={s.label} className="text-center py-3">
            <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
            <div className="text-xs text-white/40">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Generate New Report */}
      <Card className="bg-gradient-to-r from-teal-500/10 to-emerald-500/5 border-teal-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white mb-1">Generate New Report</h3>
            <p className="text-sm text-white/50">Create a custom report for any date range and farm</p>
          </div>
          <div className="flex gap-3">
            <select className="bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-sm text-white/70 focus:outline-none">
              <option className="bg-gray-900">All Farms</option>
              <option className="bg-gray-900">Green Valley Farm</option>
              <option className="bg-gray-900">Sunrise Orchards</option>
            </select>
            <Button variant="primary" onClick={() => handleDownload("custom")} icon={<Icon name="report" size={16} />}>Generate</Button>
          </div>
        </div>
      </Card>

      {/* Reports List */}
      <div className="space-y-3">
        {filtered.map((report) => (
          <div key={report.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all">
            <div className="p-3 rounded-xl bg-teal-500/10">
              <Icon name="report" size={20} className="text-teal-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white">{report.name}</div>
              <div className="text-xs text-white/40 mt-0.5">{report.date} · {report.size}</div>
            </div>
            <Badge variant="success">{report.status}</Badge>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => handleDownload("PDF")} icon={<Icon name="download" size={14} />}>PDF</Button>
              <Button variant="secondary" size="sm" onClick={() => handleDownload("XLS")} icon={<Icon name="download" size={14} />}>XLS</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
