import { useState, useEffect } from "react";
import { LawyerAPI } from "../api/LawyerAPI";

export const useLawyer = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLawyers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await LawyerAPI.getAll();
      setLawyers(data);
    } catch (err) {
      setError("Failed to fetch lawyers");
    }
    setLoading(false);
  };

  const createLawyer = async (user) => {
    setError(null);
    try {
      await LawyerAPI.create(user);
      fetchLawyers();
    } catch (err) {
      setError(err.message); // Show backend error (e.g., duplicate)
    }
  };

  const updateLawyer = async (id, user) => {
    setError(null);
    try {
      await LawyerAPI.update(id, user);
      fetchLawyers();
    } catch (err) {
      setError("Failed to update lawyer");
    }
  };

  const deleteLawyer = async (id) => {
    setError(null);
    try {
      await LawyerAPI.delete(id);
      fetchLawyers();
    } catch (err) {
      setError("Failed to delete lawyer");
    }
  };

  const getscheduleByLawyer = async (id) => {
    setError(null);
    try {
      const data = await LawyerAPI.getscheduleByLawyer(id);
      return data;
    } catch (err) {
      setError("Failed to fetch lawyer schedule");
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, []);

  return {
    lawyers,
    loading,
    error,
    createLawyer,
    updateLawyer,
    deleteLawyer,
    fetchLawyers,
    getscheduleByLawyer,
  };
};
