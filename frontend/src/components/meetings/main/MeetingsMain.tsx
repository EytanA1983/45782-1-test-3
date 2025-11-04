import { useEffect, useState } from 'react';
import './MeetingsMain.css';
import { Team } from '../../../models/Team';
import { Meeting } from '../../../models/Meeting';
import { MeetingDraft } from '../../../models/MeetingDraft';
import teamsService from '../../../services/teams';
import meetingsService from '../../../services/meetings';
import MeetingsList from '../list/MeetingsList';
import AddMeeting from '../add/AddMeeting';

export default function MeetingsMain() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const data = await teamsService.getAll();
                setTeams(data);
            } catch (err) {
                setError('Error loading teams list');
                console.error(err);
            }
        };
        fetchTeams();
    }, []);

    useEffect(() => {
        if (selectedTeamId === null) {
            setMeetings([]);
            return;
        }

        const fetchMeetings = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await meetingsService.getByTeamId(selectedTeamId);
                setMeetings(data);
            } catch (err) {
                setError('Error loading meetings');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMeetings();
    }, [selectedTeamId]);

    const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const teamId = Number(e.target.value);
        setSelectedTeamId(teamId === 0 ? null : teamId);
    };

    const handleAddMeeting = async (draft: MeetingDraft) => {
        try {
            const newMeeting = await meetingsService.create(draft);
            setMeetings(prev => [...prev, newMeeting].sort((a, b) => 
                new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
            ));
            alert('Meeting scheduled successfully!');
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || 'Error scheduling meeting';
            alert(errorMessage);
            console.error(err);
        }
    };

    return (
        <div className="meetings-main">
            <div className="page-header">
                <h1>📅 Development Teams Meetings</h1>
                <p>Select a team to view and manage their meetings</p>
            </div>

            <div className="team-selector-container">
                <label htmlFor="team-select">Select Team:</label>
                <select
                    id="team-select"
                    value={selectedTeamId || 0}
                    onChange={handleTeamChange}
                    className="team-select"
                >
                    <option value="0">-- Select Team --</option>
                    {teams.map(team => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedTeamId && (
                <AddMeeting
                    teams={teams}
                    onAdd={handleAddMeeting}
                    selectedTeamId={selectedTeamId}
                />
            )}

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading meetings...</div>
            ) : selectedTeamId ? (
                <MeetingsList meetings={meetings} />
            ) : (
                <div className="welcome-message">
                    <p>👆 Select a team to view their meetings</p>
                </div>
            )}
        </div>
    );
}

