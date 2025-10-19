import { useState, useEffect } from "react";
import { AdminAPI } from "../api/AdminAPI";

export const useAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdmins = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await AdminAPI.getAll();
      setAdmins(data);
    } catch (err) {
      setError("Failed to fetch admins");
    }
    setLoading(false);
  };

  const createAdmin = async (admin) => {
    setError(null);
    try {
      await AdminAPI.create(admin);
      fetchAdmins();
    } catch (err) {
      setError(err.message); // Show backend error (e.g., duplicate)
    }
  };

  const updateAdmin = async (id, admin) => {
    setError(null);
    try {
      await AdminAPI.update(id, admin);
      fetchAdmins();
    } catch (err) {
      setError("Failed to update admin");
    }
  };

  const deleteAdmin = async (id) => {
    setError(null);
    try {
      await AdminAPI.delete(id);
      fetchAdmins();
    } catch (err) {
      setError("Failed to delete admin");
    }
  };
  
  useEffect(() => {
    fetchAdmins();
  }, []);

  return {
    admins,
    loading,
    error,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    fetchAdmins,
  };
};
