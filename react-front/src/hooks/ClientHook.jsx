import { useState, useEffect } from "react";
import { ClientAPI } from "../api/ClientAPI";

export const useClient = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchClients = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await ClientAPI.getAllClients();
            setClients(data);
        }
        catch (err) {
            setError('Failed to fetch clients');
        }
        setLoading(false);
    }
    const createClient = async (client) => {
        setError(null);     
        try {
            await ClientAPI.createClient(client);
            fetchClients();
        }
        catch (err) {
            setError(err.message); // Show backend error (e.g., duplicate)
        }
    }
    const updateClient = async (id, client) => {
        setError(null);
        try {
            await ClientAPI.updateClient(id, client);
            fetchClients();
        }
        catch (err) {
            setError('Failed to update client');
        }
    }
    const deleteClient = async (id) => {
        setError(null);
        try {
            await ClientAPI.deleteClient(id);
            fetchClients();
        }
        catch (err) {
            setError('Failed to delete client');
        }
    }
    useEffect(() => {
        fetchClients();
    }, []);
    return {
        clients,
        loading,
        error,
        createClient,
        updateClient,
        deleteClient,
        fetchClients,   
    };
}