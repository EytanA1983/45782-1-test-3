import { HikingSite } from '../../../models/HikingSite';
import './HikingSitesList.css';

interface Props {
    sites: HikingSite[];
    onDelete: (id: number) => void;
}

export default function HikingSitesList({ sites, onDelete }: Props) {
    if (sites.length === 0) {
        return <div className="no-sites">No hiking sites found in this region</div>;
    }

    return (
        <div className="hiking-sites-list">
            {sites.map(site => (
                <div key={site.id} className="site-card">
                    <div className="site-header">
                        <h3>{site.name}</h3>
                        <button 
                            onClick={() => onDelete(site.id)} 
                            className="delete-btn"
                            title="Delete site"
                        >
                            🗑️
                        </button>
                    </div>
                    <p className="site-description">{site.description}</p>
                    <div className="site-prices">
                        <div className="price-item">
                            <span className="price-label">Adult Price:</span>
                            <span className="price-value">
                                {site.adultPrice === 0 ? 'Free' : `$${site.adultPrice}`}
                            </span>
                        </div>
                        <div className="price-item">
                            <span className="price-label">Child Price:</span>
                            <span className="price-value">
                                {site.childPrice === 0 ? 'Free' : `$${site.childPrice}`}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

