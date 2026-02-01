import { Calendar, Clock, Video, User as UserIcon, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const MeetingCard = ({ meeting, userRole }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTimeUntilMeeting = () => {
        const now = new Date();
        const meetingTime = new Date(meeting.scheduledAt);
        const diff = meetingTime - now;

        if (diff < 0) return 'Started';

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 24) {
            const days = Math.floor(hours / 24);
            return `in ${days} day${days > 1 ? 's' : ''}`;
        }
        if (hours > 0) {
            return `in ${hours}h ${minutes}m`;
        }
        return `in ${minutes}m`;
    };

    const otherUser = userRole === 'mentor' ? meeting.learner : meeting.mentor;
    const isUpcoming = new Date(meeting.scheduledAt) > new Date();

    return (
        <div className="card hover:shadow-lg transition-all border-l-4 border-l-primary-500">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-lg mb-1">{meeting.subject}</h3>
                    {meeting.description && (
                        <p className="text-slate-600 text-sm mb-3">{meeting.description}</p>
                    )}

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <UserIcon className="w-4 h-4" />
                        <span>with <span className="font-medium text-slate-700">{otherUser?.name}</span></span>
                    </div>
                </div>

                {isUpcoming && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                        {getTimeUntilMeeting()}
                    </span>
                )}
            </div>

            <div className="flex flex-wrap gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4 text-primary-500" />
                    <span className="font-medium">{formatDate(meeting.scheduledAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-secondary-500" />
                    <span className="font-medium">{formatTime(meeting.scheduledAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                    <Video className="w-4 h-4 text-accent-500" />
                    <span className="font-medium">{meeting.duration} min</span>
                </div>
            </div>

            <div className="flex gap-2">
                {isUpcoming && meeting.meetingLink && (
                    <a
                        href={meeting.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-grow btn-primary flex items-center justify-center gap-2 text-sm"
                    >
                        <Video className="w-4 h-4" />
                        Join Meet
                    </a>
                )}

                <Link
                    to={`/chat?room=${meeting._id}&name=${otherUser?.name}`}
                    className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-bold hover:bg-indigo-100 transition text-sm flex items-center justify-center gap-2 border border-indigo-100"
                >
                    Chat
                </Link>

                <Link
                    to={`/meetings/${meeting._id}`}
                    className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition text-sm border border-slate-100"
                >
                    Details
                </Link>
            </div>
        </div>
    );
};

export default MeetingCard;
