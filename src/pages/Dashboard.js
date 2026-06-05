import React, { useState, useEffect } from 'react';
import { getDashboardStats, getEnrollments } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard({ dark }) {
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalCourses: 0,
        totalEnrollments: 0,
        totalRevenue: 0
    });
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        getDashboardStats().then(res => setStats(res.data)).catch(console.error);
        getEnrollments().then(res => setEnrollments(res.data)).catch(console.error);
    }, []);

    const cards = [
        { label: 'Total students', value: stats.totalStudents, icon: '👨‍🎓', change: 'All time' },
        { label: 'Total courses', value: stats.totalCourses, icon: '📚', change: 'All time' },
        { label: 'Enrollments', value: stats.totalEnrollments, icon: '📋', change: 'All time' },
        { label: 'Total revenue', value: `₹${stats.totalRevenue}`, icon: '💰', change: 'All time' },
    ];

    const chartData = [
        { month: 'Jan', enrollments: 0 },
        { month: 'Feb', enrollments: 0 },
        { month: 'Mar', enrollments: 0 },
        { month: 'Apr', enrollments: 0 },
        { month: 'May', enrollments: 0 },
        { month: 'Jun', enrollments: enrollments.length },
    ];
const styles = {
    title: { fontSize: '20px', fontWeight: '600', color: dark ? '#fff' : '#111', marginBottom: '4px' },
    sub: { fontSize: '13px', color: dark ? '#aaa' : '#888', marginBottom: '2rem' },
    cards: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '2rem' },
    card: { background: dark ? '#2a2a2a ' : '#f0f0f0', borderRadius: '8px', padding: '1rem 1.25rem' },
    cardLabel: { fontSize: '12px', color: dark ? '#aaa' : '#666', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' },
    cardValue: { fontSize: '24px', fontWeight: '600', color: dark ? '#fff' : '#111' },
    cardChange: { fontSize: '12px', color: dark ? '#aaa' : '#888', marginTop: '4px' },
    twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '2rem' },
    chartBox: { background: dark ? '#2a2a2a ' : '#fff', border: `1px solid ${dark ? '#333' : '#eee'}`, borderRadius: '12px', padding: '1.25rem' },
    recentBox: { background: dark ? '#2a2a2a ' : '#fff', border: `1px solid ${dark ? '#333' : '#eee'}`, borderRadius: '12px', padding: '1.25rem' },
    sectionTitle: { fontSize: '14px', fontWeight: '600', color: dark ? '#fff' : '#111', marginBottom: '1rem' },
    activityItem: { display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: `1px solid ${dark ? '#333' : '#f0f0f0'}` },
    avatar: { width: '32px', height: '32px', borderRadius: '50%', background: '#e6f1fb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600', color: '#185fa5', flexShrink: 0 },
    activityText: { fontSize: '13px', color: dark ? '#e0e0e0' : '#111' },
    activitySub: { fontSize: '11px', color: dark ? '#aaa' : '#888' },
    badge: { display: 'inline-block', padding: '2px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: '500' },
    tableWrap: { background: dark ? '#2a2a2a ' : '#fff', border: `1px solid ${dark ? '#333' : '#eee'}`, borderRadius: '12px', overflow: 'hidden' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
    thead: { borderBottom: `1px solid ${dark ? '#333' : '#eee'}` },
    th: { padding: '10px 16px', textAlign: 'left', fontWeight: '500', color: dark ? '#aaa' : '#888', fontSize: '12px' },
    tr: { borderBottom: `1px solid ${dark ? '#333' : '#f5f5f5'}` },
    td: { padding: '12px 16px', color: dark ? '#e0e0e0' : '#111' },
};
    return (
        <div>
            <p style={styles.title}>Dashboard</p>
            <p style={styles.sub}>Welcome back, Ajinkya — here's what's happening.</p>

            {/* Stat Cards */}
            <div style={styles.cards}>
                {cards.map((card, i) => (
                    <div key={i} style={styles.card}>
                        <div style={styles.cardLabel}>
                            <span>{card.icon}</span> {card.label}
                        </div>
                        <div style={styles.cardValue}>{card.value}</div>
                        <div style={styles.cardChange}>{card.change}</div>
                    </div>
                ))}
            </div>

            <div style={styles.twoCol}>
                {/* Bar Chart */}
                <div style={styles.chartBox}>
                    <p style={styles.sectionTitle}>Monthly enrollments</p>
                    <ResponsiveContainer width="100%" height={150}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Bar dataKey="enrollments" fill="#378ADD" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Recent Enrollments */}
                <div style={styles.recentBox}>
                    <p style={styles.sectionTitle}>Recent enrollments</p>
                    {enrollments.slice(0, 4).map(e => (
                        <div key={e.id} style={styles.activityItem}>
                            <div style={styles.avatar}>
                                {e.student.name.charAt(0)}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={styles.activityText}>{e.student.name}</div>
                                <div style={styles.activitySub}>{e.course.title}</div>
                            </div>
                            <span style={{
                                ...styles.badge,
                                background: e.paymentStatus === 'PAID' ? '#eaf3de' : '#faeeda',
                                color: e.paymentStatus === 'PAID' ? '#3b6d11' : '#854f0b'
                            }}>
                                {e.paymentStatus}
                            </span>
                        </div>
                    ))}
                    {enrollments.length === 0 && (
                        <p style={{ color: '#999', fontSize: '13px' }}>No enrollments yet.</p>
                    )}
                </div>
            </div>

            {/* Enrollments Table */}
            <p style={styles.sectionTitle}>All enrollments</p>
            <div style={styles.tableWrap}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.thead}>
                            <th style={styles.th}>Student</th>
                            <th style={styles.th}>Course</th>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th}>Fee paid</th>
                            <th style={styles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map(e => (
                            <tr key={e.id} style={styles.tr}>
                                <td style={styles.td}>{e.student.name}</td>
                                <td style={styles.td}>{e.course.title}</td>
                                <td style={styles.td}>{e.enrollmentDate}</td>
                                <td style={styles.td}>₹{e.feePaid}</td>
                                <td style={styles.td}>
                                    <span style={{
                                        ...styles.badge,
                                        background: e.completionStatus === 'COMPLETED' ? '#eaf3de' :
                                            e.completionStatus === 'DROPPED' ? '#fcebeb' : '#e6f1fb',
                                        color: e.completionStatus === 'COMPLETED' ? '#3b6d11' :
                                            e.completionStatus === 'DROPPED' ? '#a32d2d' : '#185fa5'
                                    }}>
                                        {e.completionStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}



export default Dashboard;