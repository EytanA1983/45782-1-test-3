import { useEffect, useState } from 'react';
import './HikingSitesMain.css';
import { Region } from '../../../models/Region';
import { HikingSite } from '../../../models/HikingSite';
import { HikingSiteDraft } from '../../../models/HikingSiteDraft';
import regionsService from '../../../services/regions';
import hikingSitesService from '../../../services/hiking-sites';
import HikingSitesList from '../list/HikingSitesList';
import AddHikingSite from '../add/AddHikingSite';

export default function HikingSitesMain() {
    const [regions, setRegions] = useState<Region[]>([]);
    const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);
    const [hikingSites, setHikingSites] = useState<HikingSite[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load regions list on component mount
    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const data = await regionsService.getAll();
                setRegions(data);
            } catch (err) {
                setError('Error loading regions list');
                console.error(err);
            }
        };
        fetchRegions();
    }, []);

    // Load hiking sites when region is selected
    useEffect(() => {
        if (selectedRegionId === null) {
            setHikingSites([]);
            return;
        }

        const fetchHikingSites = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await hikingSitesService.getByRegionId(selectedRegionId);
                setHikingSites(data);
            } catch (err) {
                setError('Error loading hiking sites');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHikingSites();
    }, [selectedRegionId]);

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const regionId = Number(e.target.value);
        setSelectedRegionId(regionId === 0 ? null : regionId);
    };

    const handleAddSite = async (draft: HikingSiteDraft) => {
        try {
            const newSite = await hikingSitesService.create(draft);
            setHikingSites(prev => [...prev, newSite]);
            alert('Hiking site added successfully!');
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Error adding hiking site';
            alert(errorMessage);
            console.error(err);
        }
    };

    const handleDeleteSite = async (id: number) => {
        if (!confirm('Are you sure you want to delete this site?')) {
            return;
        }

        try {
            await hikingSitesService.delete(id);
            setHikingSites(prev => prev.filter(site => site.id !== id));
            alert('Hiking site deleted successfully!');
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || 'Error deleting hiking site';
            alert(errorMessage);
            console.error(err);
        }
    };

    return (
        <div className="hiking-sites-main">
            <div className="page-header">
                <h1>🌳 Hiking Sites in Israel 🌳</h1>
                <p>Select a region to view available hiking sites</p>
            </div>

            <div className="region-selector-container">
                <label htmlFor="region-select">Select Region:</label>
                <select
                    id="region-select"
                    value={selectedRegionId || 0}
                    onChange={handleRegionChange}
                    className="region-select"
                >
                    <option value="0">-- Select Region --</option>
                    {regions.map(region => (
                        <option key={region.id} value={region.id}>
                            {region.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedRegionId && (
                <AddHikingSite
                    regions={regions}
                    onAdd={handleAddSite}
                    selectedRegionId={selectedRegionId}
                />
            )}

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading hiking sites...</div>
            ) : selectedRegionId ? (
                <HikingSitesList sites={hikingSites} onDelete={handleDeleteSite} />
            ) : (
                <div className="welcome-message">
                    <p>👆 Select a region to view hiking sites</p>
                </div>
            )}
        </div>
    );
}

