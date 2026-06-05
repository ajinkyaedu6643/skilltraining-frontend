import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Enrollments from './pages/Enrollments';
import Payments from './pages/Payments';

function App() {
    const [dark, setDark] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        document.body.style.background = dark ? '#121212' : '#f7f8fa';
        document.body.style.color = dark ? '#e0e0e0' : '#111';
    }, [dark]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        { to: '/', icon: '📊', label: 'Dashboard' },
        { to: '/students', icon: '👨‍🎓', label: 'Students' },
        { to: '/courses', icon: '📚', label: 'Courses' },
        { to: '/enrollments', icon: '📋', label: 'Enrollments' },
        { to: '/payments', icon: '💰', label: 'Payments' },
    ];

    const navLinkStyle = ({ isActive }) => ({
        display: 'flex', alignItems: 'center',
        gap: '10px', padding: '8px 12px',
        borderRadius: '8px', fontSize: '14px',
        textDecoration: 'none',
        color: isActive ? (dark ? '#fff' : '#111') : '#888',
        background: isActive ? (dark ? '#2a2a2a' : '#f0f0f0') : 'transparent',
        fontWeight: isActive ? '600' : '400'
    });

    return (
        <Router>
            <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>

                {/* MOBILE TOP NAVBAR */}
                {isMobile && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                        background: dark ? '#1e1e1e' : '#fff',
                        borderBottom: `1px solid ${dark ? '#333' : '#eee'}`,
                        padding: '12px 16px',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        <span style={{ fontWeight: '600', fontSize: '15px', color: dark ? '#fff' : '#111' }}>
                            🎓 Skill Training MS
                        </span>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            style={{
                                background: 'none', border: 'none',
                                fontSize: '22px', cursor: 'pointer',
                                color: dark ? '#fff' : '#111'
                            }}>
                            {menuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                )}

                {/* MOBILE DROPDOWN MENU */}
                {isMobile && menuOpen && (
                    <div style={{
                        position: 'fixed', top: '52px', left: 0, right: 0, zIndex: 99,
                        background: dark ? '#1e1e1e' : '#fff',
                        borderBottom: `1px solid ${dark ? '#333' : '#eee'}`,
                        padding: '8px 16px',
                        display: 'flex', flexDirection: 'column', gap: '4px'
                    }}>
                        {navItems.map(item => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === '/'}
                                style={navLinkStyle}
                                onClick={() => setMenuOpen(false)}
                            >
                                <span>{item.icon}</span>{item.label}
                            </NavLink>
                        ))}
                        <button
                            onClick={() => { setDark(!dark); setMenuOpen(false); }}
                            style={{
                                padding: '8px 12px', borderRadius: '8px',
                                border: `1px solid ${dark ? '#444' : '#eee'}`,
                                background: dark ? '#2a2a2a' : '#f0f0f0',
                                color: dark ? '#fff' : '#111',
                                cursor: 'pointer', fontSize: '13px',
                                display: 'flex', alignItems: 'center', gap: '8px',
                                marginTop: '4px'
                            }}>
                            {dark ? '☀️ Light mode' : '🌙 Dark mode'}
                        </button>
                    </div>
                )}

                {/* DESKTOP SIDEBAR */}
                {!isMobile && (
                    <div style={{
                        position: 'fixed', left: 0, top: 0,
                        width: '220px', height: '100vh',
                        background: dark ? '#1e1e1e' : '#ffffff',
                        borderRight: `1px solid ${dark ? '#333' : '#eee'}`,
                        padding: '1.5rem 1rem',
                        display: 'flex', flexDirection: 'column', gap: '4px'
                    }}>
                        <div style={{
                            fontSize: '15px', fontWeight: '600',
                            color: dark ? '#fff' : '#111',
                            padding: '0 8px 1.5rem',
                            borderBottom: `1px solid ${dark ? '#333' : '#eee'}`,
                            marginBottom: '0.5rem',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            🎓 Skill Training MS
                        </div>

                        {navItems.map(item => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === '/'}
                                style={navLinkStyle}
                            >
                                <span>{item.icon}</span>{item.label}
                            </NavLink>
                        ))}

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
                )}

                {/* MAIN CONTENT */}
                <div style={{
                    marginLeft: isMobile ? '0' : '220px',
                    marginTop: isMobile ? '52px' : '0',
                    padding: isMobile ? '1rem' : '2rem',
                    flex: 1,
                    background: dark ? '#121212' : '#f7f8fa'
                }}>
                    <Routes>
                        <Route path="/" element={<Dashboard dark={dark} isMobile={isMobile} />} />
                        <Route path="/students" element={<Students dark={dark} isMobile={isMobile} />} />
                        <Route path="/courses" element={<Courses dark={dark} isMobile={isMobile} />} />
                        <Route path="/enrollments" element={<Enrollments dark={dark} isMobile={isMobile} />} />
                        <Route path="/payments" element={<Payments dark={dark} isMobile={isMobile} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;