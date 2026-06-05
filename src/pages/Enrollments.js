import React, { useState, useEffect } from 'react';
import { getEnrollments, createEnrollment, getStudents, getCourses } from '../services/api';

function Enrollments({dark}) {
    const [enrollments, setEnrollments] = useState([]);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({
        studentId: '',
        courseId: '',
        enrollmentDate: '',
        feePaid: '',
        paymentStatus: 'PENDING',
        completionStatus: 'ONGOING'
    });

    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = () => {
        getEnrollments().then(res => setEnrollments(res.data));
        getStudents().then(res => setStudents(res.data));
        getCourses().then(res => setCourses(res.data));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const { studentId, courseId, ...data } = form;
        createEnrollment(studentId, courseId, data)
            .then(() => {
                loadAll();
                setForm({
                    studentId: '',
                    courseId: '',
                    enrollmentDate: '',
                    feePaid: '',
                    paymentStatus: '',
                    completionStatus: ''
                });
            })
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
        padding: '10px 20px', background: '#9C27B0',
        color: 'white', border: 'none',
        borderRadius: '8px', cursor: 'pointer'
    },
    table: { width: '100%', borderCollapse: 'collapse' },
    tableHeader: {
        background: dark ? '#2a2a2a ' : '#9C27B0',
        color: 'white'
    },
    tableRow: {
        borderBottom: `1px solid ${dark ? '#333' : '#eee'}`,
        textAlign: 'center',
        color: dark ? '#e0e0e0' : '#111',
        background: dark ? '#1e1e1e' : '#fff'
    }
};
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Enrollments</h1>

            {/* Add Enrollment Form */}
            <div style={styles.form}>
                <h3>Enroll Student</h3>
                <select style={styles.input} name="studentId"
                    value={form.studentId} onChange={handleChange}>
                    <option value="">Select Student</option>
                    {students.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
                <select style={styles.input} name="courseId"
                    value={form.courseId} onChange={handleChange}>
                    <option value="">Select Course</option>
                    {courses.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                </select>
                <input style={styles.input} name="enrollmentDate" type="date"
                    value={form.enrollmentDate} onChange={handleChange} />
                <input style={styles.input} name="feePaid" placeholder="Fee Paid (₹)"
                    type="number" value={form.feePaid} onChange={handleChange} />
                <select style={styles.input} name="paymentStatus"
                    value={form.paymentStatus} onChange={handleChange}>
                    <option value="">-- Payment Status --</option>    
                    <option value="PENDING">Pending</option>
                    <option value="PARTIAL">Partial</option>
                    <option value="PAID">Paid</option>
                </select>
                <select style={styles.input} name="completionStatus"
                    value={form.completionStatus} onChange={handleChange}>
                    <option value="">-- Completion Status --</option>
                    <option value="ONGOING">Ongoing</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="DROPPED">Dropped</option>
                </select>
                <button style={styles.button} onClick={handleSubmit}>Enroll</button>
            </div>

            {/* Enrollments Table */}
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th>ID</th>
                        <th>Student</th>
                        <th>Course</th>
                        <th>Date</th>
                        <th>Fee Paid</th>
                        <th>Payment</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map(e => (
                        <tr key={e.id} style={styles.tableRow}>
                            <td>{e.id}</td>
                            <td>{e.student.name}</td>
                            <td>{e.course.title}</td>
                            <td>{e.enrollmentDate}</td>
                            <td>₹{e.feePaid}</td>
                            <td>{e.paymentStatus}</td>
                            <td>{e.completionStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}



export default Enrollments;