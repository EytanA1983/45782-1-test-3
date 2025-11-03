import { useState } from 'react';
import { HikingSiteDraft } from '../../../models/HikingSiteDraft';
import { Region } from '../../../models/Region';
import './AddHikingSite.css';

interface Props {
    regions: Region[];
    onAdd: (site: HikingSiteDraft) => void;
    selectedRegionId: number | null;
}

export default function AddHikingSite({ regions, onAdd, selectedRegionId }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<HikingSiteDraft>({
        regionId: selectedRegionId || 0,
        name: '',
        description: '',
        adultPrice: 0,
        childPrice: 0
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onAdd(formData);
        setFormData({
            regionId: selectedRegionId || 0,
            name: '',
            description: '',
            adultPrice: 0,
            childPrice: 0
        });
        setIsOpen(false);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'adultPrice' || name === 'childPrice' || name === 'regionId'
                ? Number(value)
                : value
        }));
    };

    if (!isOpen) {
        return (
            <button className="open-form-btn" onClick={() => setIsOpen(true)}>
                ➕ Add New Hiking Site
            </button>
        );
    }

    return (
        <div className="add-site-form">
            <div className="form-header">
                <h3>Add New Hiking Site</h3>
                <button className="close-btn" onClick={() => setIsOpen(false)}>✖️</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="regionId">Region:</label>
                    <select
                        id="regionId"
                        name="regionId"
                        value={formData.regionId}
                        onChange={handleChange}
                        required
                    >
                        <option value="0">Select region...</option>
                        {regions.map(region => (
                            <option key={region.id} value={region.id}>
                                {region.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Site Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="E.g., Tanninim Stream"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Site Description: (min 10 characters)</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        minLength={10}
                        rows={5}
                        placeholder="Describe the site, attractions, recommendations..."
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="adultPrice">Adult Price ($):</label>
                        <input
                            type="number"
                            id="adultPrice"
                            name="adultPrice"
                            value={formData.adultPrice}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="childPrice">Child Price ($):</label>
                        <input
                            type="number"
                            id="childPrice"
                            name="childPrice"
                            value={formData.childPrice}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => setIsOpen(false)} className="cancel-btn">
                        Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                        Add Site
                    </button>
                </div>
            </form>
        </div>
    );
}

