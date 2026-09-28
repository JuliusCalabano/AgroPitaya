import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

import {
  sampleFarms,
  sampleSensors,
  sampleAlerts,
  sampleIrrigationZones,
  sampleUsers,
} from "../data/sampleData";

import {
  addFarm as addFarmToFirestore,
  updateFarm as updateFarmInFirestore,
  deleteFarm as deleteFarmFromFirestore,
  listenToFarms,
} from "../services/farmService";

import {
  listenToSensors,
} from "../services/sensorService";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [farms, setFarms] = useState(sampleFarms);
  const [sensors, setSensors] = useState(sampleSensors);
  const [alerts, setAlerts] = useState(sampleAlerts);
  const [irrigationZones, setIrrigationZones] = useState(sampleIrrigationZones);
  const [users, setUsers] = useState(sampleUsers);
  const [toasts, setToasts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [loading, setLoading] = useState(false);

  // Listen for Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const currentUser = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email,
          role: "farmer",
          status: "active",
          farms: 0,
        };

        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen for real-time sensor updates
  useEffect(() => {
    const unsubscribe = listenToSensors(
      (firestoreSensors) => {
        setSensors(firestoreSensors);
      },
      (error) => {
        console.error("Error listening to sensors:", error);
        addToast("Failed to load sensor data.", "error");
      }
    );

    return () => unsubscribe();
  }, []);

  // Listen for real-time farm updates from Firebase
  // Listen for real-time farm updates
  useEffect(() => {
    const unsubscribe = listenToFarms(
      (firestoreFarms) => {
        setFarms(firestoreFarms);
      },
      (error) => {
        console.error("Error listening to farms:", error);
        addToast("Failed to load farm data.", "error");
      }
    );

    return () => unsubscribe();
  }, []);

  const addToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
  };

  const login = async (email, password) => {
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const firebaseUser = result.user;

      const loggedInUser = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email,
        role: "farmer",
        status: "active",
        farms: 0,
      };

      setUser(loggedInUser);
      setIsAuthenticated(true);
      setCurrentPage("dashboard");

      addToast(
        `Welcome back, ${loggedInUser.name}!`,
        "success"
      );

      return loggedInUser;

    } catch (error) {
      console.error("Login error:", error);

      let message = "Login failed.";

      if (error.code === "auth/invalid-credential") {
        message = "Invalid email or password.";
      } else if (error.code === "auth/user-not-found") {
        message = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        message = "Incorrect password.";
      }

      addToast(message, "error");

      throw error;

    } finally {
      setLoading(false);
    }
  };


  const logout = async () => {
    try {
      await signOut(auth);

      setUser(null);
      setIsAuthenticated(false);
      setCurrentPage("home");

      addToast("Logged out successfully", "info");

    } catch (error) {
      console.error("Logout error:", error);
      addToast("Failed to log out.", "error");
    }
  };

  const register = async (data) => {
    setLoading(true);

    try {
      const { email, password, name } = data;

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const firebaseUser = result.user;

      // Save user's display name in Firebase Authentication
      if (name) {
        await updateProfile(firebaseUser, {
          displayName: name,
        });
      }

      const newUser = {
        id: firebaseUser.uid,
        name: name || "User",
        email: firebaseUser.email,
        role: "farmer",
        status: "active",
        farms: 0,
        lastLogin: new Date(),
        createdAt: new Date().toISOString().split("T")[0],
      };

      setUsers((prev) => [...prev, newUser]);
      setUser(newUser);
      setIsAuthenticated(true);
      setCurrentPage("dashboard");

      addToast(
        "Account created successfully! Welcome aboard.",
        "success"
      );

      return newUser;

    } catch (error) {
      console.error("Registration error:", error);

      let message = "Registration failed.";

      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered.";
      } else if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        message = "Password is too weak.";
      }

      addToast(message, "error");

      throw error;

    } finally {
      setLoading(false);
    }
  };

  const addFarm = async (farmData) => {
    try {
      const newFarm = await addFarmToFirestore({
        ...farmData,
        status: "active",
        sensors: 0,
        moisture: 0,
        createdAt: new Date().toISOString().split("T")[0],
      });

      addToast(
        `Farm "${farmData.name}" added successfully`,
        "success"
      );

      return newFarm;

    } catch (error) {
      console.error("Error adding farm:", error);
      addToast("Failed to add farm.", "error");
      throw error;
    }
  };

  const updateFarm = async (id, data) => {
    try {
      await updateFarmInFirestore(id, data);

      addToast(
        "Farm updated successfully",
        "success"
      );

    } catch (error) {
      console.error("Error updating farm:", error);
      addToast(
        "Failed to update farm.",
        "error"
      );

      throw error;
    }
  };

  const deleteFarm = async (id) => {
    try {
      const farm = farms.find((f) => f.id === id);

      await deleteFarmFromFirestore(id);

      addToast(
        `Farm "${farm?.name || "Farm"}" deleted`,
        "warning"
      );

    } catch (error) {
      console.error("Error deleting farm:", error);
      addToast(
        "Failed to delete farm.",
        "error"
      );

      throw error;
    }
  };

  const toggleIrrigation = (zoneId) => {
    setIrrigationZones((prev) =>
      prev.map((z) => z.id === zoneId
        ? { ...z, status: z.status === "active" ? "idle" : "active" }
        : z
      )
    );
    const zone = irrigationZones.find((z) => z.id === zoneId);
    addToast(`Irrigation ${zone?.status === "active" ? "stopped" : "started"} for ${zone?.name}`, "info");
  };

  const markAlertRead = (alertId) => {
    setAlerts((prev) => prev.map((a) => (a.id === alertId ? { ...a, read: true } : a)));
  };

  const unreadAlerts = alerts.filter((a) => !a.read).length;

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <AppContext.Provider value={{
      darkMode, setDarkMode,
      user, isAuthenticated,
      farms, sensors, alerts, irrigationZones, users,
      toasts, sidebarOpen, setSidebarOpen,
      currentPage, navigate,
      loading, unreadAlerts,
      login, logout, register,
      addFarm, updateFarm, deleteFarm,
      toggleIrrigation, markAlertRead,
      addToast,
    }}>
      {children}
    </AppContext.Provider>
  );
};
