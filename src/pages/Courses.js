import React, { useState, useEffect } from 'react';
import { getCourses, createCourse, deleteCourse } from '../services/api';

function Courses({dark}) {
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({
        title: '', description: '', durationHours: '',
        fees: '', mode: 'OFFLINE', status: 'ACTIVE'
    });

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = () => {
        getCourses()
            .then(res => setCourses(res.data))
            .catch(err => console.error(err));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        createCourse(form)
            .then(() => {
                loadCourses();
                setForm({
                    title: '', description: '', durationHours: '',
                    fees: '', mode: 'OFFLINE', status: 'ACTIVE'
                });
            })
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        deleteCourse(id)
            .then(() => loadCourses())
            .catch(err => console.error(err));
    };

const styles = {
    container: { padding: '20px' },
    title: { fontSize: '20px', fontWeight: '600', color: dark ? '#fff' : '#111', marginBottom: '4px' },
    form: {
        background: dark ? '#2a2a2a ' : '#ffffff',
        border: `1px solid ${dark ? '#333' : '#eee'}`,
        padding: '20px', borderRadius: '12px',
        marginBottom: '30px',
        display: 'flex', flexWrap: 'wrap', gap: '10px'
    },
    input: {
        padding: '10px', borderRadius: '8px',
        border: `1px solid ${dark ? '#444' : '#ddd'}`,
        background: dark ? '#2a2a2a ' : '#fff',
        color: dark ? '#fff' : '#111',
        minWidth: '200px'
    },
    button: {
        padding: '10px 20px', background: '#2196F3',
        color: 'white', border: 'none',
        borderRadius: '8px', cursor: 'pointer'
    },
    table: { width: '100%', borderCollapse: 'collapse' },
    tableHeader: {
        background: dark ? '#2a2a2a ' : '#FF9800',
        color: 'white'
    },
    tableRow: {
        borderBottom: `1px solid ${dark ? '#333' : '#eee'}`,
        textAlign: 'center',
        color: dark ? '#e0e0e0' : '#111',
        background: dark ? '#2a2a2a ' : '#fff'
    },
    deleteButton: {
        padding: '5px 10px', background: '#f44336',
        color: 'white', border: 'none',
        borderRadius: '5px', cursor: 'pointer'
    }
};

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Courses</h1>

            {/* Add Course Form */}
            <div style={styles.form}>
                <h3>Add New Course</h3>
                <input style={styles.input} name="title" placeholder="Course Title"
                    value={form.title} onChange={handleChange} />
                <input style={styles.input} name="description" placeholder="Description"
                    value={form.description} onChange={handleChange} />
                <input style={styles.input} name="durationHours" placeholder="Duration (hours)"
                    type="number" value={form.durationHours} onChange={handleChange} />
                <input style={styles.input} name="fees" placeholder="Fees (₹)"
                    type="number" value={form.fees} onChange={handleChange} />
                <select style={styles.input} name="mode" value={form.mode} onChange={handleChange}>
                    <option value="OFFLINE">Offline</option>
                    <option value="ONLINE">Online</option>
                    <option value="HYBRID">Hybrid</option>
                </select>
                <select style={styles.input} name="status" value={form.status} onChange={handleChange}>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                </select>
                <button style={styles.button} onClick={handleSubmit}>Add Course</button>
            </div>

            {/* Courses Table */}
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Duration</th>
                        <th>Fees</th>
                        <th>Mode</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(c => (
                        <tr key={c.id} style={styles.tableRow}>
                            <td>{c.id}</td>
                            <td>{c.title}</td>
                            <td>{c.durationHours} hrs</td>
                            <td>₹{c.fees}</td>
                            <td>{c.mode}</td>
                            <td>{c.status}</td>
                            <td>
                                <button style={styles.deleteButton}
                                    onClick={() => handleDelete(c.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}



export default Courses;