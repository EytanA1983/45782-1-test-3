import { Meeting } from '../../../models/Meeting';
import './MeetingsList.css';

interface Props {
    meetings: Meeting[];
}

// BONUS: Calculate meeting duration
function calculateDuration(startTime: string, endTime: string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
    
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}

function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

export default function MeetingsList({ meetings }: Props) {
    if (meetings.length === 0) {
        return <div className="no-meetings">No meetings found for this team</div>;
    }

    return (
        <div className="meetings-list">
            {meetings.map(meeting => (
                <div key={meeting.id} className="meeting-card">
                    <div className="meeting-header">
                        <h3>{meeting.description}</h3>
                        <span className="meeting-room">📍 {meeting.room}</span>
                    </div>
                    <div className="meeting-details">
                        <div className="meeting-time">
                            <div className="time-item">
                                <span className="time-label">Start:</span>
                                <span className="time-value">{formatDateTime(meeting.startTime)}</span>
                            </div>
                            <div className="time-item">
                                <span className="time-label">End:</span>
                                <span className="time-value">{formatDateTime(meeting.endTime)}</span>
                            </div>
                            <div className="time-item duration">
                                <span className="time-label">Duration:</span>
                                <span className="time-value duration-badge">
                                    ⏱️ {calculateDuration(meeting.startTime, meeting.endTime)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

