import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, Menu, X, GraduationCap } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const NavLink = ({ to, children }) => (
        <Link
            to={to}
            className={`font-medium transition-colors ${isActive(to) ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'}`}
        >
            {children}
        </Link>
    );

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-600 font-heading">
                    <GraduationCap className="w-8 h-8" />
                    <span>PeerLearn</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {token ? (
                        <>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                            <NavLink to="/find-mentor">Find Mentors</NavLink>
                            <NavLink to="/leaderboard">Leaderboard</NavLink>
                            <NavLink to="/chat">Chat</NavLink>
                            <div className="h-6 w-px bg-slate-200"></div>

                            <div className="flex items-center gap-3 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                                    {user?.name?.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-slate-900 leading-tight">{user?.name}</span>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider leading-tight ${user?.role === 'mentor' ? 'text-accent-600' : 'text-primary-600'}`}>
                                        {user?.role}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors ml-2"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">Log In</NavLink>
                            <Link to="/register" className="btn-primary py-2 px-5 text-sm">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 p-4 flex flex-col gap-4 shadow-lg absolute w-full">
                    {token ? (
                        <>
                            <Link to="/dashboard" className="py-2 text-slate-600">Dashboard</Link>
                            <Link to="/find-mentor" className="py-2 text-slate-600">Find Mentors</Link>
                            <Link to="/leaderboard" className="py-2 text-slate-600">Leaderboard</Link>
                            <Link to="/chat" className="py-2 text-slate-600">Chat</Link>
                            <button onClick={handleLogout} className="py-2 text-left text-red-600">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="py-2 text-slate-600">Log In</Link>
                            <Link to="/register" className="btn-primary text-center">Get Started</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
