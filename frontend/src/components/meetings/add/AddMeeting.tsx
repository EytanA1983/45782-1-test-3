import { useState, useEffect } from 'react';
import { MeetingDraft } from '../../../models/MeetingDraft';
import { Team } from '../../../models/Team';
import meetingsService from '../../../services/meetings';
import './AddMeeting.css';

interface Props {
    teams: Team[];
    onAdd: (meeting: MeetingDraft) => void;
    selectedTeamId: number | null;
}

export default function AddMeeting({ teams, onAdd, selectedTeamId }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [availableRooms, setAvailableRooms] = useState<string[]>([]);
    const [formData, setFormData] = useState<MeetingDraft>({
        teamId: selectedTeamId || 0,
        startTime: '',
        endTime: '',
        description: '',
        room: ''
    });

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const rooms = await meetingsService.getAvailableRooms(
                    formData.startTime || undefined,
                    formData.endTime || undefined
                );
                setAvailableRooms(rooms);
            } catch (err) {
                console.error('Error fetching rooms:', err);
            }
        };
        
        if (formData.startTime && formData.endTime) {
            fetchRooms();
        } else {
            // Load all rooms if no time selected
            meetingsService.getAvailableRooms().then(setAvailableRooms);
        }
    }, [formData.startTime, formData.endTime]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onAdd(formData);
        setFormData({
            teamId: selectedTeamId || 0,
            startTime: '',
            endTime: '',
            description: '',
            room: ''
        });
        setIsOpen(false);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'teamId' ? Number(value) : value
        }));
    };

    if (!isOpen) {
        return (
            <button className="open-form-btn" onClick={() => setIsOpen(true)}>
                ➕ Add New Meeting
            </button>
        );
    }

    return (
        <div className="add-meeting-form">
            <div className="form-header">
                <h3>Schedule New Meeting</h3>
                <button className="close-btn" onClick={() => setIsOpen(false)}>✖️</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="teamId">Team</label>
                    <select
                        id="teamId"
                        name="teamId"
                        value={formData.teamId}
                        onChange={handleChange}
                        required
                    >
                        <option value="0">Select team...</option>
                        {teams.map(team => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="startTime">Start Date & Time</label>
                        <input
                            type="datetime-local"
                            id="startTime"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            required
                            lang="en-US"
                        />
                        <small className="input-hint">Format: MM/DD/YYYY, HH:MM AM/PM</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="endTime">End Date & Time</label>
                        <input
                            type="datetime-local"
                            id="endTime"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                            required
                            min={formData.startTime}
                            lang="en-US"
                        />
                        <small className="input-hint">Format: MM/DD/YYYY, HH:MM AM/PM</small>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="room">Room {availableRooms.length > 0 && <span className="room-hint">({availableRooms.length} available)</span>}</label>
                    <input
                        type="text"
                        id="room"
                        name="room"
                        value={formData.room}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Blue Room, Large Board Room"
                        minLength={2}
                        list="available-rooms"
                        autoComplete="off"
                    />
                    <datalist id="available-rooms">
                        {availableRooms.map((room, index) => (
                            <option key={index} value={room} />
                        ))}
                    </datalist>
                    {formData.startTime && formData.endTime && (
                        <small className="input-hint">
                            💡 Available rooms for selected time are shown in the dropdown
                        </small>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description (min 10 characters)</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        minLength={10}
                        rows={4}
                        placeholder="Describe the meeting agenda, topics to discuss..."
                    />
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => setIsOpen(false)} className="cancel-btn">
                        Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                        Schedule Meeting
                    </button>
                </div>
            </form>
        </div>
    );
}

