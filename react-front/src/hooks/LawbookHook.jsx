import {useState, useEffect} from 'react';
import { LawbookAPI } from '../api/LawbookAPI';


export const useLawbooks = () => {
    const [lawbooks, setLawbooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchLawbooks = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await LawbookAPI.getAll();
            setLawbooks(data);
        }
        catch (err) {
            setError("Failed to fetch lawbooks");
        }
        setLoading(false);
    };

    const createLawbook = async (lawbook) => {
        setError(null);
        try {
            await LawbookAPI.create(lawbook);
            fetchLawbooks();
        }
        catch (err) {
            setError(err.message); // Show backend error (e.g., duplicate)
        }
    };

    const updateLawbook = async (id, lawbook) => {
        setError(null);
        try {
            await LawbookAPI.update(id, lawbook);
            fetchLawbooks();
        }   
        catch (err) {
            setError("Failed to update lawbook");
        }
    };
    const deleteLawbook = async (id) => {
        setError(null);
        try {
            await LawbookAPI.delete(id);
            fetchLawbooks();
        }
        catch (err) {
            setError("Failed to delete lawbook");
        }
    };

    useEffect(() => {
        fetchLawbooks();
    }, []);

    return {
        lawbooks,
        loading,
        error,
        createLawbook,
        updateLawbook,
        deleteLawbook,
        fetchLawbooks,
    };
}
