import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FindMentor = () => {
    const [mentors, setMentors] = useState([]);
    const [skill, setSkill] = useState('');
    const [loading, setLoading] = useState(false);

    const searchMentors = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:5000/api/matching/find?skill=${skill}`, {
                headers: token ? { 'x-auth-token': token } : {}
            });
            setMentors(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        searchMentors();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        searchMentors();
    };

    const currentUser = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="max-w-6xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700 font-heading">Find Your Perfect Mentor</h1>

            <form onSubmit={onSubmit} className="flex justify-center mb-10">
                <input
                    type="text"
                    placeholder="Search by skill (e.g. React, Python, Math)"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    className="w-full max-w-md px-4 py-3 border border-slate-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-sm"
                />
                <button
                    type="submit"
                    className="bg-primary-600 text-white px-8 py-3 rounded-r-xl hover:bg-primary-700 transition font-bold shadow-md shadow-primary-500/20"
                >
                    Search
                </button>
            </form>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mentors.length > 0 ? (
                        mentors.map((mentor) => {
                            const isMe = currentUser && mentor.user._id === currentUser.id;

                            return (
                                <div key={mentor._id} className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all relative group ${isMe ? 'ring-2 ring-accent-500 ring-offset-2' : ''}`}>
                                    {isMe && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                                            MY PROFILE
                                        </div>
                                    )}
                                    <div className="flex items-center mb-4">
                                        <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-2xl mr-4 border-2 border-primary-50 border-white shadow-sm">
                                            {mentor.user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl text-slate-800">{mentor.user.name}</h3>
                                            <p className="text-slate-500 text-sm font-medium">{mentor.university}</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed">{mentor.bio}</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {mentor.skills.map((s, index) => (
                                            <span key={index} className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-[11px] font-bold border border-slate-100">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-50">
                                        <div className="flex items-center text-amber-500">
                                            <span className="text-lg">★</span>
                                            <span className="ml-1 font-bold">{mentor.rating.toFixed(1)}</span>
                                            <span className="text-slate-400 text-xs ml-1 font-normal">({mentor.reviewCount})</span>
                                        </div>
                                        {isMe ? (
                                            <Link
                                                to="/dashboard"
                                                className="bg-slate-100 text-slate-700 px-6 py-2 rounded-xl hover:bg-slate-200 text-sm font-bold transition-colors"
                                            >
                                                Edit Profile
                                            </Link>
                                        ) : (
                                            <Link
                                                to={`/book/${mentor._id}`}
                                                className="bg-primary-600 text-white px-6 py-2 rounded-xl hover:bg-primary-700 text-sm font-bold transition-all shadow-md shadow-primary-500/10 group-hover:shadow-primary-500/30"
                                            >
                                                Book Session
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                            <p className="text-slate-500 font-medium">No mentors found matching your criteria.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FindMentor;
