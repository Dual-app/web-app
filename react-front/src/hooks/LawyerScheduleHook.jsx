import { useState, useEffect } from "react";
import { LawyerScheduleAPI } from "../api/LawyerScheduleAPI";

export const useLawyerSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const fetchSchedules = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await LawyerScheduleAPI.getAll();
      setSchedules(data);
    }
    catch (err) {
        setError("Failed to fetch lawyer schedules");   
    }
    setLoading(false);
  };

    const createSchedule = async (schedule) => {
    setError(null);
    try {
      await LawyerScheduleAPI.create(schedule);
      fetchSchedules();
    } catch (err) {
      setError(err.message); // Show backend error (e.g., duplicate)
    }
  };
    const updateSchedule = async (id, schedule) => {
    setError(null);
    try {
      await LawyerScheduleAPI.update(id, schedule);
      fetchSchedules();
    } catch (err) {
      setError("Failed to update lawyer schedule");
    }
    };

    const deleteSchedule = async (id) => {
    setError(null);
    try {
      await LawyerScheduleAPI.delete(id);
      fetchSchedules();
    }
    catch (err) {
        setError("Failed to delete lawyer schedule");   
    }
    };
    useEffect(() => {
    fetchSchedules();
  }, []);

  return {
    schedules,
    loading,
    error,
    createSchedule,
    deleteSchedule,
    updateSchedule,
    fetchSchedules
  };
};

