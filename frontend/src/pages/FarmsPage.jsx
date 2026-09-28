import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Card, Button, Icon, Badge, Input, Select, Modal, PageHeader, EmptyState, ProgressBar } from "../components/common/UI";
import { cropOptions, soilTypeOptions } from "../data/sampleData";

const FarmForm = ({ farm, onSave, onClose }) => {
  const [form, setForm] = useState({
    name: farm?.name || "",
    location: farm?.location || "",
    area: farm?.area || "",
    areaUnit: farm?.areaUnit || "acres",
    cropType: farm?.cropType || cropOptions[0],
    soilType: farm?.soilType || soilTypeOptions[0],
    coordinates: farm?.coordinates || { lat: "", lng: "" },
  });

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = () => {
    if (!form.name || !form.location || !form.area) return;
    onSave(form);
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Farm Name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Green Valley Farm" required className="col-span-2" />
        <Input label="Location / Address" value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Thanjavur, Tamil Nadu" required className="col-span-2" />
        <Input label="Farm Area" type="number" value={form.area} onChange={(e) => set("area", e.target.value)} placeholder="45.5" required />
        <Select label="Area Unit" value={form.areaUnit} onChange={(e) => set("areaUnit", e.target.value)} options={["acres", "hectares", "sq ft", "sq m"]} />
        <Select label="Crop Type" value={form.cropType} onChange={(e) => set("cropType", e.target.value)} options={cropOptions} />
        <Select label="Soil Type" value={form.soilType} onChange={(e) => set("soilType", e.target.value)} options={soilTypeOptions} />
        <Input label="GPS Latitude" type="number" value={form.coordinates.lat} onChange={(e) => set("coordinates", { ...form.coordinates, lat: e.target.value })} placeholder="10.7869" />
        <Input label="GPS Longitude" type="number" value={form.coordinates.lng} onChange={(e) => set("coordinates", { ...form.coordinates, lng: e.target.value })} placeholder="79.1378" />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit} icon={<Icon name="check" size={16} />}>{farm ? "Update Farm" : "Add Farm"}</Button>
      </div>
    </div>
  );
};

const FarmCard = ({ farm, onEdit, onDelete, sensors }) => {
  const farmSensors = sensors.filter((s) => s.farmId === farm.id);
  const onlineSensors = farmSensors.filter((s) => s.status === "online").length;

  return (
    <Card hover className="relative">
      {/* Status indicator */}
      <div className="absolute top-4 right-4">
        <Badge variant={farm.status === "active" ? "success" : farm.status === "warning" ? "warning" : "danger"}>
          {farm.status}
        </Badge>
      </div>

      {/* Farm illustration */}
      <div className="w-full h-32 rounded-xl bg-gradient-to-br from-emerald-900/40 to-teal-900/20 border border-white/5 mb-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-end justify-center pb-4">
          <div className="text-6xl opacity-20">🌾</div>
        </div>
        <div className="relative text-center">
          <div className="text-2xl font-bold text-teal-400">{farm.area}</div>
          <div className="text-xs text-white/40">{farm.areaUnit}</div>
        </div>
      </div>

      <h3 className="font-bold text-white text-lg mb-1">{farm.name}</h3>
      <div className="flex items-center gap-1 text-xs text-white/40 mb-4">
        <Icon name="map" size={12} />
        {farm.location}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: "Crop", value: farm.cropType, icon: "🌽" },
          { label: "Soil", value: farm.soilType, icon: "🪨" },
          { label: "Sensors", value: `${onlineSensors}/${farmSensors.length} online`, icon: "📡" },
          { label: "Added", value: farm.createdAt, icon: "📅" },
        ].map((item) => (
          <div key={item.label} className="bg-white/5 rounded-xl p-3">
            <div className="text-xs text-white/30 mb-1">{item.icon} {item.label}</div>
            <div className="text-sm font-medium text-white/80">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-white/40">Soil Moisture</span>
          <span className={`font-semibold ${farm.moisture < 45 ? "text-red-400" : farm.moisture < 60 ? "text-amber-400" : "text-teal-400"}`}>{farm.moisture}%</span>
        </div>
        <ProgressBar value={farm.moisture} color={farm.moisture < 45 ? "red" : farm.moisture < 60 ? "amber" : "teal"} showLabel={false} height="sm" />
      </div>

      {farm.coordinates?.lat && (
        <div className="text-xs text-white/30 mb-4 font-mono bg-white/5 px-3 py-2 rounded-lg">
          📍 {farm.coordinates.lat}, {farm.coordinates.lng}
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => onEdit(farm)} icon={<Icon name="edit" size={14} />} className="flex-1">Edit</Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(farm.id)} icon={<Icon name="trash" size={14} />}>Delete</Button>
      </div>
    </Card>
  );
};

export const FarmsPage = () => {
  const { farms, sensors, addFarm, updateFarm, deleteFarm } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editFarm, setEditFarm] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = farms.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || f.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id) => {
    deleteFarm(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Farm Management"
        subtitle={`${farms.length} farms registered`}
        actions={
          <Button variant="primary" onClick={() => setShowAddModal(true)} icon={<Icon name="plus" size={16} />}>
            Add Farm
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Farms", value: farms.length, icon: "farm", color: "text-teal-400" },
          { label: "Active", value: farms.filter((f) => f.status === "active").length, icon: "check", color: "text-emerald-400" },
          { label: "Warnings", value: farms.filter((f) => f.status === "warning").length, icon: "alert", color: "text-amber-400" },
        ].map((s) => (
          <Card key={s.label} className="text-center py-4">
            <div className={`text-3xl font-bold ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs text-white/40">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
            <Icon name="search" size={16} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search farms..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-teal-500/50"
          />
        </div>
        <div className="flex gap-2">
          {["all", "active", "warning", "inactive"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${filterStatus === s ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "bg-white/5 text-white/40 hover:bg-white/10 border border-white/5"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Farm Grid */}
      {filtered.length === 0 ? (
        <EmptyState icon="farm" title="No farms found" description="Add your first farm to get started with monitoring" action={<Button variant="primary" onClick={() => setShowAddModal(true)} icon={<Icon name="plus" size={16} />}>Add Your First Farm</Button>} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((farm) => (
            <FarmCard key={farm.id} farm={farm} sensors={sensors} onEdit={(f) => setEditFarm(f)} onDelete={(id) => setDeleteConfirm(id)} />
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Farm" size="lg">
        <FarmForm onSave={addFarm} onClose={() => setShowAddModal(false)} />
      </Modal>

      {/* Edit Modal */}
      <Modal open={!!editFarm} onClose={() => setEditFarm(null)} title="Edit Farm" size="lg">
        <FarmForm farm={editFarm} onSave={(data) => updateFarm(editFarm.id, data)} onClose={() => setEditFarm(null)} />
      </Modal>

      {/* Delete Confirm */}
      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Farm" size="sm">
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <Icon name="trash" size={28} className="text-red-400" />
          </div>
          <p className="text-white/70 mb-2">Are you sure you want to delete this farm?</p>
          <p className="text-white/40 text-sm mb-6">This action cannot be undone. All associated sensor data will also be removed.</p>
          <div className="flex gap-3 justify-center">
            <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => handleDelete(deleteConfirm)} icon={<Icon name="trash" size={16} />}>Delete Farm</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
