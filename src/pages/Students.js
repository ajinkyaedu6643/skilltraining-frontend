import React, { useState, useEffect } from 'react';
import { getStudents, createStudent, deleteStudent } from '../services/api';

function Students({ dark }) {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({
        name: '', email: '', phone: '',
        address: '', qualification: '',
        enrollmentDate: '', status: 'ACTIVE'
    });

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = () => {
        getStudents()
            .then(res => setStudents(res.data))
            .catch(err => console.error(err));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        createStudent(form)
            .then(() => {
                loadStudents();
                setForm({
                    name: '', email: '', phone: '',
                    address: '', qualification: '',
                    enrollmentDate: '', status: 'ACTIVE'
                });
            })
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        deleteStudent(id)
            .then(() => loadStudents())
            .catch(err => console.error(err));
    };

    const styles = {
    container: { padding: '20px' },
    title: { fontSize: '20px', fontWeight: '600', color: dark ? '#fff' : '#111', marginBottom: '4px' },
    form: {
        background: dark ? '#1e1e1e ' : '#ffffff',
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
        padding: '10px 20px', background: '#4CAF50',
        color: 'white', border: 'none',
        borderRadius: '8px', cursor: 'pointer'
    },
    table: { width: '100%', borderCollapse: 'collapse' },
    tableHeader: {
        background: dark ? '#2a2a2a ' : '#378ADD',
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
            <h1 style={styles.title}>Students</h1>

            {/* Add Student Form */}
            <div style={styles.form}>
                <h3>Add New Student</h3>
                <input style={styles.input} name="name" placeholder="Full Name"
                    value={form.name} onChange={handleChange} />
                <input style={styles.input} name="email" placeholder="Email"
                    value={form.email} onChange={handleChange} />
                <input style={styles.input} name="phone" placeholder="Phone"
                    value={form.phone} onChange={handleChange} />
                <input style={styles.input} name="address" placeholder="Address"
                    value={form.address} onChange={handleChange} />
                <input style={styles.input} name="qualification" placeholder="Qualification"
                    value={form.qualification} onChange={handleChange} />
                <input style={styles.input} name="enrollmentDate" type="date"
                    value={form.enrollmentDate} onChange={handleChange} />
                <select style={styles.input} name="status" value={form.status} onChange={handleChange}>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                </select>
                <button style={styles.button} onClick={handleSubmit}>Add Student</button>
            </div>

            {/* Students Table */}
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Qualification</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(s => (
                        <tr key={s.id} style={styles.tableRow}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>{s.email}</td>
                            <td>{s.phone}</td>
                            <td>{s.qualification}</td>
                            <td>{s.status}</td>
                            <td>
                                <button style={styles.deleteButton}
                                    onClick={() => handleDelete(s.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}



export default Students;