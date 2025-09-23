import { useState, useEffect } from "react";
import { LawyerAPI } from "../api/LawyerAPI";

export const useLawyer = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLawyers = async () => {
    setLoading(true);
    const data = await LawyerAPI.getAll();
    setLawyers(data);
    setLoading(false);
  };

  const createLawyer = async (user) => {
    await LawyerAPI.create(user);
    fetchLawyers(); // refresh list
  };

  const updateLawyer = async (id, user) => {
    await LawyerAPI.update(id, user);
    fetchLawyers();
  };

  const deleteLawyer = async (id) => {
    await LawyerAPI.delete(id);
    fetchLawyers();
  };

  useEffect(() => {
    fetchLawyers();
  }, []);

  return {
    lawyers,
    loading,
    createLawyer,
    updateLawyer,
    deleteLawyer,
    fetchLawyers,
  };
};
