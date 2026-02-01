import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Clock, Video, CheckCircle, X, ArrowLeft } from 'lucide-react';

const BookSession = () => {
    const { mentorId } = useParams();
    const navigate = useNavigate();

    const [mentor, setMentor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [createdMeeting, setCreatedMeeting] = useState(null);

    const [formData, setFormData] = useState({
        subject: '',
        description: '',
        date: '',
        time: '',
        duration: '60'
    });

    const [error, setError] = useState('');

    useEffect(() => {
        fetchMentorDetails();
    }, [mentorId]);

    const fetchMentorDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:5000/api/matching/mentors/${mentorId}`, {
                headers: { 'x-auth-token': token }
            });
            setMentor(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching mentor:', err);
            setError('Failed to load mentor details');
            setLoading(false);
        }
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            const token = localStorage.getItem('token');

            // Combine date and time
            const dateStr = `${formData.date}T${formData.time}`;
            const scheduledAt = new Date(dateStr);

            if (isNaN(scheduledAt.getTime())) {
                setError('Please select a valid date and time');
                setSubmitting(false);
                return;
            }

            const meetingData = {
                mentorId,
                subject: formData.subject,
                description: formData.description,
                scheduledAt: scheduledAt.toISOString(),
                duration: parseInt(formData.duration)
            };

            const res = await axios.post(
                'http://localhost:5000/api/meetings/create',
                meetingData,
                { headers: { 'x-auth-token': token } }
            );

            setCreatedMeeting(res.data.meeting);
            setShowSuccess(true);
            setSubmitting(false);

        } catch (err) {
            console.error('Booking error:', err);
            setError(err.response?.data?.message || 'Failed to book session');
            setSubmitting(false);
        }
    };

    const copyMeetingLink = () => {
        navigator.clipboard.writeText(createdMeeting.meetingLink);
        alert('Meeting link copied to clipboard!');
    };

    const addToCalendar = () => {
        const event = {
            title: createdMeeting.subject,
            description: createdMeeting.description,
            location: createdMeeting.meetingLink,
            startTime: new Date(createdMeeting.scheduledAt).toISOString(),
            endTime: new Date(new Date(createdMeeting.scheduledAt).getTime() + createdMeeting.duration * 60000).toISOString()
        };

        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startTime.replace(/[-:]/g, '').split('.')[0]}Z/${event.endTime.replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

        window.open(googleCalendarUrl, '_blank');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Success Modal
    if (showSuccess && createdMeeting) {
        return (
            <div className="max-w-2xl mx-auto mt-10 px-4">
                <div className="card bg-gradient-to-br from-green-50 to-white border-green-200">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Meeting Booked Successfully! 🎉</h2>
                        <p className="text-slate-600">Your Google Meet session has been created and calendar invites have been sent.</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 mb-6 border border-green-100">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Video className="w-5 h-5 text-green-600" />
                            Meeting Details
                        </h3>

                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-slate-500 font-medium">Subject</p>
                                <p className="text-slate-900 font-bold">{createdMeeting.subject}</p>
                            </div>

                            <div>
                                <p className="text-slate-500 font-medium">With</p>
                                <p className="text-slate-900">{createdMeeting.mentor?.name || 'Mentor'}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-slate-500 font-medium">Date & Time</p>
                                    <p className="text-slate-900">
                                        {createdMeeting.scheduledAt ? new Date(createdMeeting.scheduledAt).toLocaleString() : 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-slate-500 font-medium">Duration</p>
                                    <p className="text-slate-900">{createdMeeting.duration} minutes</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-slate-500 font-medium mb-2">Google Meet Link</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={createdMeeting.meetingLink}
                                        readOnly
                                        className="flex-1 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm"
                                    />
                                    <button
                                        onClick={copyMeetingLink}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={addToCalendar}
                            className="flex-1 btn-primary flex items-center justify-center gap-2"
                        >
                            <Calendar className="w-5 h-5" />
                            Add to Calendar
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex-1 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-medium hover:bg-slate-200 transition"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 px-4">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition"
            >
                <ArrowLeft className="w-5 h-5" />
                Back
            </button>

            <div className="card">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Book a Session</h1>
                <p className="text-slate-600 mb-6">Schedule a Google Meet session with your mentor</p>

                {mentor && (
                    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 mb-6 border border-primary-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                {mentor.user?.name?.charAt(0) || 'M'}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">{mentor.user?.name}</h3>
                                <p className="text-sm text-slate-600">{mentor.skills?.slice(0, 3)?.join(', ')}</p>
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                        <X className="w-5 h-5" />
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            Session Subject *
                        </label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={onChange}
                            required
                            placeholder="e.g., React Hooks Deep Dive"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={onChange}
                            rows="3"
                            placeholder="What would you like to learn or discuss?"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Date *
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={onChange}
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Time *
                            </label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            Duration *
                        </label>
                        <select
                            name="duration"
                            value={formData.duration}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                        >
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hours</option>
                            <option value="120">2 hours</option>
                        </select>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex gap-3">
                            <Video className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-900">
                                <p className="font-bold mb-1">Google Meet Integration</p>
                                <p>A Google Meet link will be automatically created and sent to both you and your mentor via email.</p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Creating Meeting...
                            </>
                        ) : (
                            <>
                                <Video className="w-5 h-5" />
                                Book Session with Google Meet
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookSession;
