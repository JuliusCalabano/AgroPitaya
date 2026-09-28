import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Card, Badge, Button, Icon, PageHeader, Input, Select, Modal, Toggle } from "../components/common/UI";

// ─── Admin Panel ──────────────────────────────────────────────────────────────
export const AdminPage = () => {
  const { users, sensors, farms, addToast } = useApp();
  const [activeTab, setActiveTab] = useState("users");
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "farmer" });

  const tabs = [
    { id: "users", label: "User Management", icon: "users" },
    { id: "devices", label: "Device Management", icon: "cpu" },
    { id: "sensors", label: "Sensor Management", icon: "sensor" },
    { id: "reports", label: "Reports Management", icon: "report" },
  ];

  const roleColors = { admin: "danger", farmer: "success", technician: "info" };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Panel"
        subtitle="System administration and management"
        actions={<Badge variant="danger" size="md">Admin Access</Badge>}
      />

      {/* System Health */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: users.length, icon: "users", color: "text-teal-400" },
          { label: "Active Farms", value: farms.length, icon: "farm", color: "text-emerald-400" },
          { label: "Total Sensors", value: sensors.length, icon: "sensor", color: "text-blue-400" },
          { label: "System Health", value: "98.2%", icon: "activity", color: "text-green-400" },
        ].map((s) => (
          <Card key={s.label} className="text-center py-4">
            <Icon name={s.icon} size={24} className={`${s.color} mx-auto mb-2`} />
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-white/40 mt-1">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${activeTab === t.id ? "border-teal-500 text-teal-400" : "border-transparent text-white/40 hover:text-white/70"}`}
          >
            <Icon name={t.icon} size={16} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Users Tab */}
      {activeTab === "users" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-white">Registered Users ({users.length})</h3>
            <Button variant="primary" size="sm" onClick={() => setShowAddUser(true)} icon={<Icon name="plus" size={14} />}>Add User</Button>
          </div>
          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/8 transition-all">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white font-bold shrink-0">
                  {u.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{u.name}</span>
                    <Badge variant={roleColors[u.role]}>{u.role}</Badge>
                    <Badge variant={u.status === "active" ? "success" : "danger"}>{u.status}</Badge>
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">{u.email} · {u.farms} farm(s) · Last login: {new Date(u.lastLogin).toLocaleDateString()}</div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="secondary" size="sm" icon={<Icon name="edit" size={14} />}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => addToast(`User ${u.name} removed`, "warning")}>Remove</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Devices Tab */}
      {activeTab === "devices" && (
        <div>
          <h3 className="font-semibold text-white mb-4">Connected Devices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "MQTT Broker", type: "Message Queue", status: "online", ip: "192.168.1.100", uptime: "99.8%" },
              { name: "Weather Station Alpha", type: "Weather Sensor", status: "online", ip: "192.168.1.101", uptime: "98.2%" },
              { name: "Gateway Node A", type: "LoRa Gateway", status: "online", ip: "192.168.1.102", uptime: "97.5%" },
              { name: "Gateway Node B", type: "LoRa Gateway", status: "warning", ip: "192.168.1.103", uptime: "89.1%" },
              { name: "Firebase FCM", type: "Push Notification", status: "online", ip: "cloud", uptime: "99.9%" },
              { name: "Database Server", type: "MongoDB", status: "online", ip: "192.168.1.10", uptime: "99.99%" },
            ].map((d, i) => (
              <div key={i} className={`p-4 rounded-2xl border ${d.status === "online" ? "border-white/10 bg-white/5" : "border-amber-500/30 bg-amber-500/5"}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-teal-500/10">
                      <Icon name="cpu" size={18} className="text-teal-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm">{d.name}</div>
                      <div className="text-xs text-white/40">{d.type}</div>
                    </div>
                  </div>
                  <Badge variant={d.status === "online" ? "success" : "warning"}>{d.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-white/30">IP: </span><span className="text-white/60 font-mono">{d.ip}</span></div>
                  <div><span className="text-white/30">Uptime: </span><span className="text-emerald-400">{d.uptime}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sensors Tab */}
      {activeTab === "sensors" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-white">All Sensors ({sensors.length})</h3>
            <Button variant="primary" size="sm" onClick={() => addToast("Scanning for new sensors...", "info")} icon={<Icon name="refresh" size={14} />}>Scan Devices</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-xs">
                  {["ID", "Name", "Type", "Farm", "Status", "Battery", "Last Update", "Actions"].map((h) => (
                    <th key={h} className="text-left py-3 px-4 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sensors.map((s) => (
                  <tr key={s.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs text-white/50">{s.id}</td>
                    <td className="py-3 px-4 text-white/80">{s.name}</td>
                    <td className="py-3 px-4 text-white/50 capitalize">{s.type.replace("_", " ")}</td>
                    <td className="py-3 px-4 text-white/50 text-xs">{s.farmId}</td>
                    <td className="py-3 px-4"><Badge variant={s.status === "online" ? "success" : "warning"}>{s.status}</Badge></td>
                    <td className="py-3 px-4"><span className={s.battery < 30 ? "text-red-400" : "text-emerald-400"}>{s.battery}%</span></td>
                    <td className="py-3 px-4 text-xs text-white/30">{new Date(s.lastUpdate).toLocaleTimeString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"><Icon name="edit" size={14} /></button>
                        <button onClick={() => addToast(`Sensor ${s.id} recalibrated`, "success")} className="p-1.5 rounded-lg hover:bg-teal-500/20 text-white/40 hover:text-teal-400 transition-colors"><Icon name="refresh" size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <div>
          <h3 className="font-semibold text-white mb-4">System Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "User Activity Log", desc: "Login history, actions, and API usage", icon: "users", action: "Generate" },
              { title: "Sensor Health Report", desc: "Battery levels, connectivity, calibration status", icon: "sensor", action: "Generate" },
              { title: "Water Usage Audit", desc: "Detailed water consumption with anomaly detection", icon: "droplet", action: "Generate" },
              { title: "System Performance", desc: "API response times, uptime, error rates", icon: "activity", action: "Generate" },
              { title: "Security Audit Log", desc: "Failed logins, permission changes, access events", icon: "shield", action: "Generate" },
              { title: "Database Backup", desc: "Automated MongoDB backup and restoration", icon: "database", action: "Run Backup" },
            ].map((r) => (
              <div key={r.title} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/8 transition-all flex items-center gap-4">
                <div className="p-3 rounded-xl bg-teal-500/10 shrink-0">
                  <Icon name={r.icon} size={20} className="text-teal-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white text-sm">{r.title}</div>
                  <div className="text-xs text-white/40 mt-0.5">{r.desc}</div>
                </div>
                <Button variant="secondary" size="sm" onClick={() => addToast(`${r.title} started...`, "info")}>{r.action}</Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add User Modal */}
      <Modal open={showAddUser} onClose={() => setShowAddUser(false)} title="Add New User" size="md">
        <div className="space-y-4">
          <Input label="Full Name" value={newUser.name} onChange={(e) => setNewUser((p) => ({ ...p, name: e.target.value }))} placeholder="John Farmer" required />
          <Input label="Email" type="email" value={newUser.email} onChange={(e) => setNewUser((p) => ({ ...p, email: e.target.value }))} placeholder="john@farm.com" required />
          <Select label="Role" value={newUser.role} onChange={(e) => setNewUser((p) => ({ ...p, role: e.target.value }))} options={[{ value: "farmer", label: "Farmer" }, { value: "technician", label: "Technician" }, { value: "admin", label: "Admin" }]} />
          <Input label="Temporary Password" type="password" placeholder="••••••••" required />
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setShowAddUser(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => { addToast("User created successfully", "success"); setShowAddUser(false); }} icon={<Icon name="check" size={16} />}>Create User</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ─── Profile Page ─────────────────────────────────────────────────────────────
export const ProfilePage = () => {
  const { user, addToast, darkMode, setDarkMode } = useApp();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({ name: user?.name || "Admin User", email: user?.email || "admin@agrismart.io", phone: "+1 (555) 012-3456", location: "San Francisco, CA", bio: "Agricultural technology enthusiast managing smart farming operations." });
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false, weekly: true, alerts: true });

  const set = (k, v) => setProfile((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader title="Profile" subtitle="Manage your account settings and preferences" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <Card className="text-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
            {profile.name[0]}
          </div>
          <h2 className="text-xl font-bold text-white">{profile.name}</h2>
          <p className="text-white/40 text-sm mt-1 capitalize">{user?.role || "admin"}</p>
          <Badge variant="success" size="md" className="mt-3">Active Account</Badge>
          <div className="mt-4 pt-4 border-t border-white/10 text-left space-y-2 text-sm">
            {[
              { label: "Farms", value: user?.farms || 3 },
              { label: "Member since", value: user?.createdAt || "Jan 2024" },
              { label: "Last login", value: "Today" },
            ].map((s) => (
              <div key={s.label} className="flex justify-between">
                <span className="text-white/40">{s.label}</span>
                <span className="text-white/70 font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-white">Personal Information</h3>
              <Button variant={editMode ? "primary" : "secondary"} size="sm" onClick={() => { if (editMode) addToast("Profile updated!", "success"); setEditMode(!editMode); }} icon={<Icon name={editMode ? "check" : "edit"} size={14} />}>
                {editMode ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Full Name" value={profile.name} onChange={(e) => set("name", e.target.value)} disabled={!editMode} />
              <Input label="Email" type="email" value={profile.email} onChange={(e) => set("email", e.target.value)} disabled={!editMode} />
              <Input label="Phone" value={profile.phone} onChange={(e) => set("phone", e.target.value)} disabled={!editMode} />
              <Input label="Location" value={profile.location} onChange={(e) => set("location", e.target.value)} disabled={!editMode} />
              <div className="col-span-2">
                <label className="block text-sm font-medium text-white/70 mb-2">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => set("bio", e.target.value)}
                  disabled={!editMode}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-teal-500/60 resize-none disabled:opacity-60"
                />
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-white mb-4">Security</h3>
            <div className="space-y-3">
              <Input label="Current Password" type="password" placeholder="••••••••" disabled={!editMode} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="New Password" type="password" placeholder="••••••••" disabled={!editMode} />
                <Input label="Confirm Password" type="password" placeholder="••••••••" disabled={!editMode} />
              </div>
              {editMode && <Button variant="warning" size="sm" onClick={() => addToast("Password updated!", "success")}>Update Password</Button>}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-white mb-4">Notifications & Preferences</h3>
            <div className="space-y-4">
              {[
                { key: "email", label: "Email Notifications", desc: "Receive alerts via email" },
                { key: "push", label: "Push Notifications", desc: "Browser & mobile push alerts" },
                { key: "sms", label: "SMS Alerts", desc: "Text message for critical alerts only" },
                { key: "weekly", label: "Weekly Reports", desc: "Automated weekly summary email" },
                { key: "alerts", label: "Critical Alerts", desc: "Immediate notification for urgent issues" },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-white">{n.label}</div>
                    <div className="text-xs text-white/40">{n.desc}</div>
                  </div>
                  <Toggle checked={notifications[n.key]} onChange={() => { setNotifications((p) => ({ ...p, [n.key]: !p[n.key] })); addToast(`${n.label} ${!notifications[n.key] ? "enabled" : "disabled"}`, "info"); }} size="sm" />
                </div>
              ))}
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-medium text-white">Dark Mode</div>
                  <div className="text-xs text-white/40">Toggle dark/light theme</div>
                </div>
                <Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} size="sm" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ─── Contact Page ─────────────────────────────────────────────────────────────
export const ContactPage = () => {
  const { addToast } = useApp();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) { addToast("Please fill all required fields", "error"); return; }
    addToast("Message sent! We'll respond within 24 hours.", "success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader title="Contact Support" subtitle="Get help from our agricultural technology experts" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="space-y-4">
          {[
            { icon: "mail", title: "Email Support", value: "support@agrismart.io", desc: "Response within 24 hours" },
            { icon: "phone", title: "Phone Support", value: "+1 (800) AGRI-IOT", desc: "Mon–Fri, 8AM–6PM PST" },
            { icon: "map", title: "Headquarters", value: "San Francisco, CA", desc: "1 AgriSmart Plaza, Suite 500" },
            { icon: "globe", title: "Documentation", value: "docs.agrismart.io", desc: "API docs, guides, tutorials" },
          ].map((c) => (
            <Card key={c.title} hover>
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-teal-500/10">
                  <Icon name={c.icon} size={18} className="text-teal-400" />
                </div>
                <div>
                  <div className="font-medium text-white text-sm">{c.title}</div>
                  <div className="text-teal-400 text-sm font-medium">{c.value}</div>
                  <div className="text-xs text-white/40 mt-0.5">{c.desc}</div>
                </div>
              </div>
            </Card>
          ))}

          <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border-emerald-500/20">
            <h3 className="font-semibold text-white mb-2">Quick Status Check</h3>
            <div className="space-y-2 text-sm">
              {[
                { service: "API Services", status: "Operational" },
                { service: "Sensor Network", status: "Operational" },
                { service: "Dashboard", status: "Operational" },
                { service: "Notifications", status: "Operational" },
              ].map((s) => (
                <div key={s.service} className="flex justify-between items-center">
                  <span className="text-white/60">{s.service}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400 text-xs">{s.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="font-semibold text-white mb-6">Send a Message</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Your Name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="John Farmer" required />
                <Input label="Email Address" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="john@farm.com" required />
              </div>
              <Select
                label="Subject"
                value={form.subject}
                onChange={(e) => set("subject", e.target.value)}
                options={[
                  { value: "", label: "Select a subject..." },
                  { value: "sensor", label: "Sensor Issue" },
                  { value: "irrigation", label: "Irrigation Problem" },
                  { value: "billing", label: "Billing Question" },
                  { value: "feature", label: "Feature Request" },
                  { value: "bug", label: "Bug Report" },
                  { value: "other", label: "Other" },
                ]}
              />
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Message <span className="text-red-400">*</span></label>
                <textarea
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  rows={6}
                  placeholder="Describe your issue or question in detail..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-teal-500/60 transition-all resize-none"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="secondary" onClick={() => setForm({ name: "", email: "", subject: "", message: "" })}>Clear</Button>
                <Button variant="primary" onClick={handleSubmit} icon={<Icon name="mail" size={16} />}>Send Message</Button>
              </div>
            </div>
          </Card>

          {/* FAQ */}
          <Card className="mt-4">
            <h3 className="font-semibold text-white mb-4">Common Questions</h3>
            <div className="space-y-3">
              {[
                { q: "How do I add a new sensor?", a: "Navigate to Admin Panel → Sensor Management → Scan Devices to auto-detect new sensors on your network." },
                { q: "What MQTT protocol is used?", a: "AgroPitaya uses MQTT v3.1.1 with TLS encryption. Default broker port is 8883 for secure connections." },
                { q: "Can I export my data to Excel?", a: "Yes! Go to Reports page and click 'Export Excel' for any report type including daily, weekly, and monthly summaries." },
              ].map((faq, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-sm font-medium text-white mb-1">❓ {faq.q}</div>
                  <div className="text-xs text-white/50">{faq.a}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
