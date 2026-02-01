import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FindMentor = () => {
    const [mentors, setMentors] = useState([]);
    const [skill, setSkill] = useState('');
    const [gender, setGender] = useState('any');
    const [loading, setLoading] = useState(false);

    const searchMentors = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:5000/api/matching/find?skill=${skill}&gender=${gender}`, {
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

            <form onSubmit={onSubmit} className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
                <div className="flex w-full max-w-lg">
                    <input
                        type="text"
                        placeholder="Search by skill (e.g. React, Python, Math)"
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-sm"
                    />
                    <button
                        type="submit"
                        className="bg-primary-600 text-white px-8 py-3 rounded-r-xl hover:bg-primary-700 transition font-bold shadow-md shadow-primary-500/20"
                    >
                        Search
                    </button>
                </div>

                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Gender:</span>
                    <select
                        value={gender}
                        onChange={(e) => {
                            setGender(e.target.value);
                            // Auto trigger search on change
                            const newGender = e.target.value;
                            const token = localStorage.getItem('token');
                            axios.get(`http://localhost:5000/api/matching/find?skill=${skill}&gender=${newGender}`, {
                                headers: token ? { 'x-auth-token': token } : {}
                            }).then(res => setMentors(res.data));
                        }}
                        className="bg-transparent focus:outline-none text-slate-700 font-bold"
                    >
                        <option value="any">Any</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </form>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mentors.length > 0 ? (
                        [...mentors]
                            .sort((a, b) => (b.points || 0) - (a.points || 0))
                            .map((mentor, index) => {
                                const isMe = currentUser && mentor.user._id === currentUser.id;
                                const rank = index + 1;
                                const isTop3 = rank <= 3;

                                return (
                                    <div key={mentor._id} className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all relative group ${isMe ? 'ring-2 ring-accent-500 ring-offset-4' : ''} ${isTop3 ? 'border-primary-200' : ''}`}>

                                        {/* Rank Badge for Top 3 */}
                                        {isTop3 && (
                                            <div className={`absolute -top-3 -right-3 w-12 h-12 rounded-full flex flex-col items-center justify-center shadow-lg transform rotate-12 z-10 font-black border-2 border-white ${rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                                                rank === 2 ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-white' :
                                                    'bg-gradient-to-br from-orange-400 to-orange-700 text-white'
                                                }`}>
                                                <span className="text-[10px] leading-none">RANK</span>
                                                <span className="text-xl">#{rank}</span>
                                            </div>
                                        )}

                                        {isMe && (
                                            <div className="absolute -top-3 left-6 bg-accent-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg z-10 uppercase tracking-widest">
                                                Me
                                            </div>
                                        )}

                                        <div className="flex items-center mb-4">
                                            <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl mr-4 border-2 shadow-sm ${rank === 1 ? 'bg-yellow-50 border-yellow-200 text-yellow-700' :
                                                rank === 2 ? 'bg-slate-50 border-slate-200 text-slate-700' :
                                                    rank === 3 ? 'bg-orange-50 border-orange-200 text-orange-700' :
                                                        'bg-primary-50 border-primary-50 text-primary-600'
                                                }`}>
                                                {mentor.user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-primary-600 mb-0.5">{mentor.university}</p>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{mentor.user.name}</h3>
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${mentor.level === 'Gold' ? 'bg-yellow-500 text-white' :
                                                        mentor.level === 'Silver' ? 'bg-slate-400 text-white' :
                                                            mentor.level === 'Bronze' ? 'bg-orange-600 text-white' :
                                                                'bg-slate-200 text-slate-500 font-bold'
                                                        }`}>
                                                        {mentor.level || 'Rookie'}
                                                    </span>
                                                    {mentor.user?.gender && (
                                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${mentor.user.gender === 'female' ? 'bg-pink-100 text-pink-600' :
                                                            mentor.user.gender === 'male' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                                                            {mentor.user.gender.charAt(0).toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{mentor.points || 0} XP Points</p>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed min-h-[60px]">{mentor.bio}</p>
                                        <div className="flex flex-wrap gap-2 mb-6 h-[64px] overflow-hidden content-start">
                                            {mentor.skills.slice(0, 4).map((s, index) => (
                                                <span key={index} className="bg-slate-50 text-slate-600 px-3 py-1 rounded-lg text-[11px] font-bold border border-slate-100">
                                                    {s}
                                                </span>
                                            ))}
                                            {mentor.skills.length > 4 && (
                                                <span className="text-[10px] font-bold text-slate-400 self-center">+{mentor.skills.length - 4} more</span>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-50">
                                            <div className="flex items-center text-amber-500">
                                                <span className="text-lg">★</span>
                                                <span className="ml-1 font-bold">{mentor.rating.toFixed(1)}</span>
                                                <span className="text-slate-400 text-[10px] ml-1 font-bold uppercase tracking-tighter">({mentor.reviewCount} REVIEWS)</span>
                                            </div>
                                            {isMe ? (
                                                <Link
                                                    to="/dashboard"
                                                    className="bg-slate-100 text-slate-700 px-6 py-2 rounded-xl hover:bg-slate-200 text-sm font-bold transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <Link
                                                        to={`/chat?room=${currentUser?.id < mentor.user._id ? currentUser?.id + '_' + mentor.user._id : mentor.user._id + '_' + currentUser?.id}&name=${mentor.user.name}`}
                                                        className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-xl hover:bg-indigo-100 text-sm font-bold transition-all border border-indigo-100 flex items-center justify-center"
                                                    >
                                                        Chat
                                                    </Link>
                                                    <Link
                                                        to={`/book/${mentor._id}`}
                                                        className="bg-primary-600 text-white px-5 py-2 rounded-xl hover:bg-primary-700 text-sm font-bold transition-all shadow-md shadow-primary-500/10 group-hover:shadow-primary-500/30"
                                                    >
                                                        Book
                                                    </Link>
                                                </div>
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
