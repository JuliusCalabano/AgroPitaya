import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Card, Badge, Button, Icon, PageHeader, Toggle, Modal, Input, Select } from "../components/common/UI";

const statusConfig = {
  active: { label: "Active", color: "success", pulse: true },
  idle: { label: "Idle", color: "default", pulse: false },
  scheduled: { label: "Scheduled", color: "info", pulse: false },
  warning: { label: "Warning", color: "warning", pulse: true },
  error: { label: "Error", color: "danger", pulse: false },
};

const ZoneCard = ({ zone, onToggle }) => {
  const sc = statusConfig[zone.status] || statusConfig.idle;
  const isActive = zone.status === "active";

  return (
    <Card className={`border ${isActive ? "border-teal-500/30 bg-teal-500/5" : zone.status === "warning" ? "border-amber-500/30" : "border-white/10"}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-white">{zone.name}</h3>
          <p className="text-xs text-white/40 mt-0.5">{zone.farmName}</p>
        </div>
        <Badge variant={sc.color}>
          {sc.pulse && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse mr-1.5 inline-block" />}
          {sc.label}
        </Badge>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <div className={`text-xl font-bold ${zone.moisture < 45 ? "text-red-400" : zone.moisture < 55 ? "text-amber-400" : "text-teal-400"}`}>{zone.moisture}%</div>
          <div className="text-xs text-white/30 mt-1">Moisture</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-blue-400">{zone.flowRate}</div>
          <div className="text-xs text-white/30 mt-1">L/min</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-emerald-400">{zone.totalToday}</div>
          <div className="text-xs text-white/30 mt-1">L today</div>
        </div>
      </div>

      {/* Threshold bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-white/40 mb-1">
          <span>Moisture level</span>
          <span>Threshold: {zone.threshold}%</span>
        </div>
        <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-700" style={{ width: `${zone.moisture}%` }} />
          <div className="absolute top-0 h-full w-0.5 bg-amber-400" style={{ left: `${zone.threshold}%` }} />
        </div>
      </div>

      {/* Schedule info */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div>
          <span className="text-white/30">Last run: </span>
          <span className="text-white/60">{new Date(zone.lastRun).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
        {zone.nextSchedule && (
          <div>
            <span className="text-white/30">Next: </span>
            <span className="text-amber-400">{new Date(zone.nextSchedule).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <Toggle checked={zone.autoMode} onChange={() => {}} label="Auto" size="sm" />
        <div className="flex gap-2">
          <Button
            variant={isActive ? "danger" : "primary"}
            size="sm"
            onClick={() => onToggle(zone.id)}
            icon={<Icon name="power" size={14} />}
          >
            {isActive ? "Stop" : "Start"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

const ScheduleModal = ({ open, onClose, zones }) => {
  const [form, setForm] = useState({ zone: zones[0]?.id || "", time: "06:00", duration: 30, days: [] });
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <Modal open={open} onClose={onClose} title="Schedule Irrigation" size="md">
      <div className="space-y-4">
        <Select
          label="Select Zone"
          value={form.zone}
          onChange={(e) => setForm((p) => ({ ...p, zone: e.target.value }))}
          options={zones.map((z) => ({ value: z.id, label: z.name }))}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Start Time" type="time" value={form.time} onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))} />
          <Input label="Duration (min)" type="number" value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Repeat on Days</label>
          <div className="flex gap-2">
            {days.map((d) => (
              <button
                key={d}
                onClick={() => setForm((p) => ({ ...p, days: p.days.includes(d) ? p.days.filter((x) => x !== d) : [...p.days, d] }))}
                className={`w-9 h-9 rounded-lg text-xs font-medium transition-all ${form.days.includes(d) ? "bg-teal-500 text-white" : "bg-white/10 text-white/40 hover:bg-white/20"}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4 text-sm text-teal-300">
          💧 Estimated water usage: <strong>{Math.round(form.duration * 12.5)}L</strong> per session
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={onClose} icon={<Icon name="calendar" size={16} />}>Schedule</Button>
        </div>
      </div>
    </Modal>
  );
};

export const IrrigationPage = () => {
  const { irrigationZones, toggleIrrigation, addToast } = useApp();
  const [showSchedule, setShowSchedule] = useState(false);
  const [globalAuto, setGlobalAuto] = useState(true);

  const activeZones = irrigationZones.filter((z) => z.status === "active").length;
  const totalToday = irrigationZones.reduce((a, z) => a + z.totalToday, 0);

  const startAll = () => {
    irrigationZones.forEach((z) => { if (z.status !== "active") toggleIrrigation(z.id); });
    addToast("All zones activated", "success");
  };
  const stopAll = () => {
    irrigationZones.forEach((z) => { if (z.status === "active") toggleIrrigation(z.id); });
    addToast("All zones stopped", "info");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Irrigation Control"
        subtitle="Manual, automatic, and scheduled irrigation management"
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setShowSchedule(true)} icon={<Icon name="calendar" size={16} />}>Schedule</Button>
            <Button variant="danger" onClick={stopAll} size="sm">Stop All</Button>
            <Button variant="primary" onClick={startAll} size="sm" icon={<Icon name="power" size={16} />}>Start All</Button>
          </div>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Zones", value: activeZones, suffix: `/${irrigationZones.length}`, color: "text-teal-400" },
          { label: "Water Today", value: `${totalToday}L`, color: "text-blue-400" },
          { label: "Avg Flow Rate", value: `${(irrigationZones.reduce((a, z) => a + z.flowRate, 0) / irrigationZones.length).toFixed(1)}L/m`, color: "text-emerald-400" },
          { label: "Scheduled", value: irrigationZones.filter((z) => z.nextSchedule).length, suffix: " zones", color: "text-amber-400" },
        ].map((s) => (
          <Card key={s.label} className="text-center py-4">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}<span className="text-sm text-white/30">{s.suffix}</span></div>
            <div className="text-xs text-white/40 mt-1">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Global Auto Mode */}
      <Card className="bg-gradient-to-r from-teal-500/10 to-emerald-500/5 border-teal-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white mb-1">Global Automatic Mode</h3>
            <p className="text-sm text-white/50">AI-driven irrigation based on soil moisture thresholds and weather forecasts</p>
          </div>
          <Toggle checked={globalAuto} onChange={() => { setGlobalAuto(!globalAuto); addToast(`Auto mode ${!globalAuto ? "enabled" : "disabled"}`, "info"); }} />
        </div>
        {globalAuto && (
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div className="bg-white/5 rounded-xl p-3">
              <div className="text-white/40 text-xs mb-1">Trigger threshold</div>
              <div className="text-teal-400 font-semibold">Below 50% moisture</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <div className="text-white/40 text-xs mb-1">Rain skip</div>
              <div className="text-blue-400 font-semibold">Enabled (&gt;40% rain)</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <div className="text-white/40 text-xs mb-1">AI optimization</div>
              <div className="text-emerald-400 font-semibold">Active</div>
            </div>
          </div>
        )}
      </Card>

      {/* Zone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {irrigationZones.map((zone) => (
          <ZoneCard key={zone.id} zone={zone} onToggle={toggleIrrigation} />
        ))}
      </div>

      {/* Water Usage Timeline */}
      <Card>
        <h3 className="text-sm font-semibold text-white/70 mb-4">Today's Irrigation Timeline</h3>
        <div className="space-y-3">
          {[
            { time: "06:00", zone: "Zone A - North Field", duration: "25 min", usage: "312L", status: "completed" },
            { time: "10:30", zone: "Zone B - South Field", duration: "30 min", usage: "450L", status: "completed" },
            { time: "14:00", zone: "Zone A - Orchard", duration: "20 min", usage: "180L", status: "completed" },
            { time: "18:00", zone: "Zone A - Vineyard", duration: "15 min", usage: "0L", status: "pending" },
            { time: "20:30", zone: "Zone B - South Field", duration: "25 min", usage: "0L", status: "scheduled" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-all">
              <div className="text-xs text-white/40 font-mono w-12">{item.time}</div>
              <div className={`w-2 h-2 rounded-full shrink-0 ${item.status === "completed" ? "bg-emerald-400" : item.status === "pending" ? "bg-amber-400 animate-pulse" : "bg-white/20"}`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white/80 font-medium truncate">{item.zone}</div>
                <div className="text-xs text-white/30">{item.duration} · {item.usage}</div>
              </div>
              <Badge variant={item.status === "completed" ? "success" : item.status === "pending" ? "warning" : "default"}>
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <ScheduleModal open={showSchedule} onClose={() => setShowSchedule(false)} zones={irrigationZones} />
    </div>
  );
};
