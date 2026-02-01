import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white font-heading mb-4">
                            <GraduationCap className="w-8 h-8 text-primary-500" />
                            <span>PeerLearn</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Empowering students to learn from each other. Join the community and start your journey today.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/find-mentor" className="hover:text-primary-400 transition-colors">Find Mentors</Link></li>
                            <li><Link to="/register" className="hover:text-primary-400 transition-colors">Become a Mentor</Link></li>
                            <li><Link to="/leaderboard" className="hover:text-primary-400 transition-colors">Leaderboard</Link></li>
                            <li><Link to="/pricing" className="hover:text-primary-400 transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/blog" className="hover:text-primary-400 transition-colors">Blog</Link></li>
                            <li><Link to="/community" className="hover:text-primary-400 transition-colors">Community</Link></li>
                            <li><Link to="/help" className="hover:text-primary-400 transition-colors">Help Center</Link></li>
                            <li><Link to="/guidelines" className="hover:text-primary-400 transition-colors">Guidelines</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} PeerLearn. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
