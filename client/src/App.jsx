import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import FindMentor from './pages/FindMentor';
import BookSession from './pages/BookSession';
import Leaderboard from './pages/Leaderboard';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';

const ContainerLayout = () => (
    <div className="container mx-auto p-4">
        <Outlet />
    </div>
);

function App() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* Routes that need a container */}
                    <Route element={<ContainerLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/find-mentor" element={<FindMentor />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route
                            path="/chat"
                            element={
                                <ProtectedRoute>
                                    <Chat />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/book/:mentorId"
                            element={
                                <ProtectedRoute>
                                    <BookSession />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </main>

            <Footer />
        </div>
    )
}

export default App;
