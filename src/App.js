import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Enrollments from './pages/Enrollments';
import Payments from './pages/Payments';

function App() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        document.body.style.background = dark ? '#121212' : '#f7f8fa';
        document.body.style.color = dark ? '#e0e0e0' : '#111';
    }, [dark]);

    const sidebarStyle = {
        position: 'fixed', left: 0, top: 0,
        width: '220px', height: '100vh',
        background: dark ? '#1e1e1e' : '#ffffff',
        borderRight: `1px solid ${dark ? '#333' : '#eee'}`,
        padding: '1.5rem 1rem',
        display: 'flex', flexDirection: 'column', gap: '4px'
    };

    const brandStyle = {
        fontSize: '15px', fontWeight: '600',
        color: dark ? '#fff' : '#111',
        padding: '0 8px 1.5rem',
        borderBottom: `1px solid ${dark ? '#333' : '#eee'}`,
        marginBottom: '0.5rem',
        display: 'flex', alignItems: 'center', gap: '8px'
    };

    const navItems = [
        { to: '/', icon: '📊', label: 'Dashboard' },
        { to: '/students', icon: '👨‍🎓', label: 'Students' },
        { to: '/courses', icon: '📚', label: 'Courses' },
        { to: '/enrollments', icon: '📋', label: 'Enrollments' },
        { to: '/payments', icon: '💰', label: 'Payments' },
    ];

    return (
        <Router>
            <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>

                {/* Sidebar */}
                <div style={sidebarStyle}>
                    <div style={brandStyle}>
                        🎓 Skill Training MS
                    </div>

                    {navItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === '/'}
                            style={({ isActive }) => ({
                                display: 'flex', alignItems: 'center',
                                gap: '10px', padding: '8px 12px',
                                borderRadius: '8px', fontSize: '14px',
                                textDecoration: 'none',
                                color: isActive ? (dark ? '#fff' : '#111') : '#888',
                                background: isActive ? (dark ? '#2a2a2a' : '#f0f0f0') : 'transparent',
                                fontWeight: isActive ? '600' : '400'
                            })}
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </NavLink>
                    ))}

                    {/* Dark mode toggle */}
                    <div style={{ marginTop: 'auto' }}>
                        <button
                            onClick={() => setDark(!dark)}
                            style={{
                                width: '100%', padding: '8px 12px',
                                borderRadius: '8px',
                                border: `1px solid ${dark ? '#444' : '#eee'}`,
                                background: dark ? '#2a2a2a' : '#f0f0f0',
                                color: dark ? '#fff' : '#111',
                                cursor: 'pointer', fontSize: '13px',
                                display: 'flex', alignItems: 'center', gap: '8px'
                            }}>
                            {dark ? '☀️ Light mode' : '🌙 Dark mode'}
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div style={{
                    marginLeft: '220px',
                    padding: '2rem',
                    flex: 1,
                    background: dark ? '#121212' : '#f7f8fa'
                }}>
                    <Routes>
                        <Route path="/" element={<Dashboard dark={dark} />} />
                        <Route path="/students" element={<Students dark={dark} />} />
                        <Route path="/courses" element={<Courses dark={dark} />} />
                        <Route path="/enrollments" element={<Enrollments dark={dark} />} />
                        <Route path="/payments" element={<Payments dark={dark} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;