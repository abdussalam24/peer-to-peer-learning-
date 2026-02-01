import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Trophy, ArrowRight, Star, Shield, Clock, Zap } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-primary-50 to-white pt-20 pb-32 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-primary-100 mb-8 animate-fade-in-up">
                            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                            <span className="text-sm font-medium text-primary-700">Join 5,000+ students learning together</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                            Peer-to-Peer Mentorship, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">By Students, For Students</span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Connect with top students, schedule instant sessions, and level up your skills.
                            Earn rewards while you learn or teach.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/find-mentor" className="btn-primary flex items-center justify-center gap-2 group">
                                Get Help Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/register" className="btn-secondary">
                                Join as Mentor
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none">
                    <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute top-40 -right-20 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-40 left-20 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Peer Learning?</h2>
                        <p className="text-lg text-slate-600">Experience a new way of learning that's more relatable, affordable, and fun.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Users className="w-8 h-8 text-primary-600" />}
                            title="Verified Student Mentors"
                            description="Learn from students who have aced the same courses. They understand your struggles better than anyone."
                        />
                        <FeatureCard
                            icon={<Clock className="w-8 h-8 text-secondary-600" />}
                            title="Instant & Flexible"
                            description="Need help right now? Find available mentors instantly or schedule a session that fits your calendar."
                        />
                        <FeatureCard
                            icon={<Trophy className="w-8 h-8 text-accent-600" />}
                            title="Gamified Learning"
                            description="Earn XP, unlock badges, and climb the leaderboard. Learning shouldn't be boring."
                        />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 -z-0"></div>

                        <StepCard
                            number="1"
                            title="Find a Mentor"
                            description="Browse profiles, check ratings, and filter by subject or skills to find your perfect match."
                        />
                        <StepCard
                            number="2"
                            title="Book a Session"
                            description="Choose a time slot or request an instant session. Connect via video or chat."
                        />
                        <StepCard
                            number="3"
                            title="Learn & Earn"
                            description="Get your questions answered, rate your mentor, and earn points for your progress."
                        />
                    </div>
                </div>
            </section>

            {/* Gamification Preview */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2">
                            <div className="inline-block bg-accent-600/20 text-accent-300 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-accent-500/30">
                                LEVEL UP YOUR LEARNING
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Earn Rewards As You Learn</h2>
                            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                Every session, review, and milestone earns you XP. Unlock exclusive badges, customize your profile, and showcase your achievements to the community.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                                    <div className="bg-yellow-500/20 p-3 rounded-lg">
                                        <Trophy className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Weekly Leaderboards</h4>
                                        <p className="text-slate-400 text-sm">Compete with peers for top spots</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                                    <div className="bg-purple-500/20 p-3 rounded-lg">
                                        <Shield className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Skill Badges</h4>
                                        <p className="text-slate-400 text-sm">Verify your expertise in specific subjects</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-1/2 relative">
                            {/* Mockup of Gamification Card */}
                            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 relative transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                            JD
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">John Doe</h3>
                                            <div className="text-xs text-slate-400">Level 5 Scholar</div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-700 px-3 py-1 rounded-full text-xs font-bold text-accent-400">
                                        2,450 XP
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-300">Next Level</span>
                                            <span className="text-white font-bold">85%</span>
                                        </div>
                                        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-400 w-[85%]"></div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="aspect-square bg-slate-700/50 rounded-xl flex items-center justify-center border border-slate-600">
                                                <Star className={`w-8 h-8 ${i === 1 ? 'text-yellow-400' : 'text-slate-500'}`} fill={i === 1 ? "currentColor" : "none"} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-primary-600 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Start Learning?</h2>
                    <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
                        Join thousands of students who are already mastering their subjects with peer mentorship.
                    </p>
                    <Link to="/register" className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-colors shadow-xl">
                        Get Started for Free
                    </Link>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="card group hover:-translate-y-1 transition-transform duration-300">
        <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-50 transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
);

const StepCard = ({ number, title, description }) => (
    <div className="relative z-10 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
        <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg shadow-primary-500/30">
            {number}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-slate-600">{description}</p>
    </div>
);

export default Home;
