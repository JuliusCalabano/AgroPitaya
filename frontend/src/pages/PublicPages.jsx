import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Button, Icon, Input, Card, LoadingScreen } from "../components/common/UI";

// ─── Navbar for public pages ───────────────────────────────────────────────────
const PublicNav = ({ onNavigate }) => {
  const { navigate } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 h-16 bg-gray-950/80 backdrop-blur-md border-b border-white/5">
      <button onClick={() => navigate("home")} className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center">
          <Icon name="leaf" size={16} className="text-white" />
        </div>
        <span className="font-bold text-white text-lg">AgroPitaya</span>
        <span className="text-teal-400 text-xs hidden sm:block">IoT</span>
      </button>
      <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
        {["home", "about", "features", "contact"].map((p) => (
          <button key={p} onClick={() => navigate(p)} className="hover:text-white capitalize transition-colors">{p}</button>
        ))}
      </div>
      <div className="hidden md:flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate("login")}>Sign In</Button>
        <Button variant="primary" size="sm" onClick={() => navigate("register")}>Get Started</Button>
      </div>
      <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white/60 hover:text-white">
        <Icon name="menu" size={22} />
      </button>
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gray-950 border-b border-white/10 p-4 space-y-2 md:hidden">
          {["home", "about", "features", "contact"].map((p) => (
            <button key={p} onClick={() => { navigate(p); setMobileOpen(false); }} className="block w-full text-left px-4 py-2 text-white/60 hover:text-white capitalize rounded-xl hover:bg-white/5">{p}</button>
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => navigate("login")} className="flex-1">Sign In</Button>
            <Button variant="primary" size="sm" onClick={() => navigate("register")} className="flex-1">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

// ─── Home Page ────────────────────────────────────────────────────────────────
export const HomePage = () => {
  const { navigate } = useApp();

  const stats = [
    { value: "24/7", label: "Farm Monitoring" },
    { value: "Real-Time", label: "Sensor Data" },
    { value: "Smart", label: "Irrigation Control" },
    { value: "IoT", label: "Connected Farming" },
  ];

  const features = [
    { icon: "sensor", title: "Real-time Monitoring", desc: "Track soil moisture, temperature, humidity, pH, and more with sub-second latency across all farm zones." },
    { icon: "droplet", title: "Smart Irrigation", desc: "AI-powered irrigation decisions based on real sensor data, weather forecasts, and crop requirements." },
    { icon: "chart", title: "Advanced Analytics", desc: "Deep insights into crop performance, water usage trends, and yield optimization recommendations." },
    { icon: "cloud", title: "Weather Integration", desc: "Real-time weather data with 7-day forecasts to intelligently adjust irrigation schedules automatically." },
    { icon: "bell", title: "Instant Alerts", desc: "Critical notifications via email, SMS, and push when sensors detect issues requiring immediate attention." },
    { icon: "shield", title: "Enterprise Security", desc: "JWT authentication, role-based access control, end-to-end encryption and compliance-ready audit logs." },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <PublicNav />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-900/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Smart IoT Agriculture · Intelligent Dragon Fruit Cultivation
          </div>
          <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight tracking-tight">
            Smart IoT for
            <br />
            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Dragon Fruit Cultivation
            </span>
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Harness Smart IoT technology to monitor your dragon fruit farm in real time.
            Track soil moisture, environmental conditions, and farm sensors to support
            smarter irrigation and more efficient crop management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="xl" onClick={() => navigate("register")} icon={<Icon name="arrow_right" size={20} />}>
              Get Started
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-20 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-4 rounded-2xl bg-white/3 border border-white/5">
                <div className="text-3xl font-black text-teal-400 mb-1">{s.value}</div>
                <div className="text-xs text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 lg:px-12 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Everything You Need</h2>
          <p className="text-white/50 max-w-xl mx-auto">One platform to monitor, control, and optimize your entire farming operation from anywhere in the world.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-2xl bg-white/3 border border-white/8 hover:bg-white/6 hover:border-teal-500/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4 group-hover:bg-teal-500/20 transition-all">
                <Icon name={f.icon} size={22} className="text-teal-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-24">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-teal-500/15 to-emerald-500/5 border border-teal-500/20">
          <h2 className="text-4xl font-black mb-4">Ready to Grow Smarter?</h2>
          <p className="text-white/50 mb-8">Use Smart IoT technology to monitor your dragon fruit farm,
            manage irrigation, and make better cultivation decisions.</p>
          <Button variant="primary" size="xl" onClick={() => navigate("register")} icon={<Icon name="leaf" size={20} />}>
            Start Smart Farming
          </Button>
          <p className="text-white/30 text-sm mt-4">Smart monitoring · Real-time farm data · Smarter irrigation</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 lg:px-12 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center">
              <Icon name="leaf" size={12} className="text-white" />
            </div>
            <span>AgroPitaya IoT Platform</span>
          </div>
          <span>© 2026 AgroPitaya. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

// ─── About Page ───────────────────────────────────────────────────────────────
export const AboutPage = () => {
  const { navigate } = useApp();
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <PublicNav />
      <div className="pt-24 pb-16 px-6 lg:px-12 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-4">About AgroPitaya</h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">We're building the future of precision agriculture with IoT, AI, and real-time data intelligence.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-white/60 leading-relaxed mb-4">AgroPitaya was founded in 2021 to solve one of humanity's biggest challenges: feeding a growing world with fewer resources. We believe data-driven farming is the answer.</p>
            <p className="text-white/60 leading-relaxed">By connecting thousands of sensors across farms worldwide, we give farmers the intelligence they need to make better decisions — in real time, at scale.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🌱", title: "Founded", value: "2021" },
              { icon: "🌍", title: "Countries", value: "28+" },
              { icon: "👨‍🌾", title: "Farmers", value: "12,000+" },
              { icon: "💧", title: "Water Saved", value: "2.4B L" },
            ].map((s) => (
              <div key={s.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-4xl mb-2">{s.icon}</div>
                <div className="text-2xl font-bold text-teal-400">{s.value}</div>
                <div className="text-xs text-white/40 mt-1">{s.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { layer: "Frontend", tech: "React + Tailwind CSS", icon: "globe" },
              { layer: "Backend", tech: "Node.js + Express", icon: "zap" },
              { layer: "Database", tech: "MongoDB Atlas", icon: "database" },
              { layer: "IoT Protocol", tech: "MQTT + LoRaWAN", icon: "wifi" },
              { layer: "Cloud", tech: "AWS / Firebase", icon: "cloud" },
              { layer: "Auth", tech: "JWT + OAuth 2.0", icon: "lock" },
              { layer: "Maps", tech: "Google Maps API", icon: "map" },
              { layer: "Notifications", tech: "Firebase FCM", icon: "bell" },
            ].map((t) => (
              <div key={t.layer} className="p-4 rounded-xl bg-white/5 border border-white/8 hover:border-teal-500/20 transition-all">
                <Icon name={t.icon} size={18} className="text-teal-400 mb-2" />
                <div className="text-xs text-white/40 mb-1">{t.layer}</div>
                <div className="text-sm font-medium text-white/80">{t.tech}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button variant="primary" size="lg" onClick={() => navigate("register")} icon={<Icon name="arrow_right" size={18} />}>Join AgroPitaya</Button>
        </div>
      </div>
    </div>
  );
};

// ─── Features Page ────────────────────────────────────────────────────────────
export const FeaturesPage = () => {
  const { navigate } = useApp();
  const allFeatures = [
    { category: "Monitoring", icon: "sensor", color: "teal", items: ["Soil moisture (0-100%)", "Temperature (-40°C to 85°C)", "Relative humidity", "pH level (0-14)", "Water tank level", "Light intensity (lux)", "NPK soil nutrients", "CO₂ concentration"] },
    { category: "Irrigation", icon: "droplet", color: "blue", items: ["Manual ON/OFF control", "Automatic threshold-based", "Scheduled irrigation", "Water usage tracking", "Multi-zone management", "Rain forecast skip", "Flow rate monitoring", "AI optimization"] },
    { category: "Analytics", icon: "chart", color: "purple", items: ["Real-time dashboards", "Historical trend analysis", "Water consumption reports", "Crop health scoring", "Yield prediction models", "ROI calculations", "Export to Excel/PDF", "Custom date ranges"] },
    { category: "Alerts", icon: "bell", color: "amber", items: ["Critical moisture alerts", "Temperature threshold warnings", "Battery low notifications", "Sensor offline detection", "Email notifications", "SMS critical alerts", "Push notifications", "Firebase FCM integration"] },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <PublicNav />
      <div className="pt-24 pb-16 px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-4">Platform Features</h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">A complete suite of tools for modern precision agriculture management.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {allFeatures.map((f) => (
            <div key={f.category} className="p-6 rounded-2xl bg-white/3 border border-white/8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                  <Icon name={f.icon} size={20} className="text-teal-400" />
                </div>
                <h2 className="text-xl font-bold">{f.category}</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {f.items.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/60">
                    <span className="text-teal-400 shrink-0">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button variant="primary" size="xl" onClick={() => navigate("register")} icon={<Icon name="arrow_right" size={20} />}>Start Free Trial</Button>
        </div>
      </div>
    </div>
  );
};

// ─── Login Page ───────────────────────────────────────────────────────────────
export const LoginPage = () => {
  const { login, navigate, loading } = useApp();
  const [form, setForm] = useState({ email: "admin@agrismart.io", password: "demo123" });
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async () => {
    setError("");
    try {
      await login(form.email, form.password);
    } catch (e) {
      setError("Invalid email or password. Please try again.");
    }
  };

  if (loading) return <LoadingScreen message="Signing you in..." />;

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-teal-900/30 to-gray-950 border-r border-white/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-emerald-500/8 rounded-full blur-3xl" />
        </div>
        <button onClick={() => navigate("home")} className="relative flex items-center gap-2 z-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center">
            <Icon name="leaf" size={18} className="text-white" />
          </div>
          <span className="font-bold text-white text-xl">AgroPitaya</span>
        </button>
        <div className="relative z-10">
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">Precision Farming<br />Intelligence</h2>
          <p className="text-white/50 text-lg mb-8">Monitor sensors, automate irrigation, and grow more with less water.</p>
          <div className="space-y-3">
            {[
              "Real-time IoT monitoring for dragon fruit farms",
              "Smart irrigation based on farm sensor data",
              "Crop and environmental monitoring with analytics",
            ].map((f) => (
              <div key={f} className="flex items-center gap-3 text-white/70">
                <span className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-xs">
                  ✓
                </span>
                {f}
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-white/20 text-xs">© 2026 AgroPitaya IoT Platform</div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center">
              <Icon name="leaf" size={18} className="text-white" />
            </div>
            <span className="font-bold text-white text-xl">AgroPitaya</span>
          </div>

          <h1 className="text-3xl font-black text-white mb-2">Welcome back</h1>
          <p className="text-white/40 mb-8">Sign in to your AgroPitaya dashboard</p>

          <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-3 mb-6 text-xs text-teal-300">
            <strong>Demo credentials:</strong> admin@agrismart.io / demo123
          </div>

          {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4 text-sm text-red-400">{error}</div>}

          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="you@farm.com"
              required
              icon={<Icon name="mail" size={16} />}
            />
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"><Icon name="lock" size={16} /></div>
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/60 transition-all"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  <Icon name="eye" size={16} />
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="text-sm text-teal-400 hover:text-teal-300 transition-colors">Forgot password?</button>
            </div>
            <Button variant="primary" size="lg" onClick={handleSubmit} className="w-full justify-center" icon={<Icon name="arrow_right" size={18} />}>Sign In</Button>
          </div>

          <p className="text-center text-white/40 text-sm mt-6">
            Don't have an account?{" "}
            <button onClick={() => navigate("register")} className="text-teal-400 hover:text-teal-300 font-medium transition-colors">Create one free</button>
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Register Page ────────────────────────────────────────────────────────────
export const RegisterPage = () => {
  const { register, navigate, loading } = useApp();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", farmName: "", role: "farmer" });
  const [error, setError] = useState("");
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    setError("");
    if (!form.name || !form.email || !form.password) { setError("Please fill all required fields."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    try {
      await register({ name: form.name, email: form.email, farmName: form.farmName, role: form.role });
    } catch (e) {
      setError("Registration failed. Please try again.");
    }
  };

  if (loading) return <LoadingScreen message="Creating your account..." />;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button onClick={() => navigate("home")} className="flex items-center gap-2 mx-auto mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center">
            <Icon name="leaf" size={18} className="text-white" />
          </div>
          <span className="font-bold text-white text-xl">AgroPitaya</span>
        </button>

        <h1 className="text-3xl font-black text-white mb-2 text-center">Create Account</h1>
        <p className="text-white/40 text-center mb-8">Start your 30-day free trial. No credit card required.</p>

        {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4 text-sm text-red-400">{error}</div>}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Full Name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="John Farmer" required className="col-span-2" />
            <Input label="Email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="john@farm.com" required className="col-span-2" />
            <Input label="Password" type="password" value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="Min 6 characters" required />
            <Input label="Confirm Password" type="password" value={form.confirm} onChange={(e) => set("confirm", e.target.value)} placeholder="Repeat password" required />
          </div>
          <Input label="Farm Name (optional)" value={form.farmName} onChange={(e) => set("farmName", e.target.value)} placeholder="Green Valley Farm" icon={<Icon name="farm" size={16} />} />

          <div className="bg-white/3 border border-white/8 rounded-xl p-4 text-sm text-white/50 space-y-1">
            {["30-day free trial included", "No credit card required", "Cancel or upgrade anytime", "Full platform access"].map((f) => (
              <div key={f} className="flex items-center gap-2"><span className="text-teal-400">✓</span>{f}</div>
            ))}
          </div>

          <Button variant="primary" size="lg" onClick={handleSubmit} className="w-full justify-center" icon={<Icon name="leaf" size={18} />}>Create Free Account</Button>
        </div>

        <p className="text-center text-white/40 text-sm mt-6">
          Already have an account?{" "}
          <button onClick={() => navigate("login")} className="text-teal-400 hover:text-teal-300 font-medium transition-colors">Sign in</button>
        </p>

        <p className="text-center text-white/20 text-xs mt-4">By registering, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  );
};
