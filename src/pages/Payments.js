import React, { useState, useEffect } from 'react';
import { getEnrollments } from '../services/api';
import axios from 'axios';

const BASE_URL = 'https://skill-training-ms-production.up.railway.app';

function Payments({dark}) {
    const [payments, setPayments] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [form, setForm] = useState({
        enrollmentId: '',
        amount: '',
        paymentDate: '',
        receiptNumber: '',
        paymentMode: '',
        notes: ''
    });

    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = () => {
        getEnrollments().then(res => setEnrollments(res.data));
        axios.get(`${BASE_URL}/api/payments/student/0`)
            .then(res => setPayments(res.data))
            .catch(() => setPayments([]));
    };

    const loadPayments = (enrollmentId) => {
        axios.get(`${BASE_URL}/api/payments/enrollment/${enrollmentId}`)
            .then(res => setPayments(res.data))
            .catch(() => setPayments([]));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (name === 'enrollmentId' && value) {
            loadPayments(value);
        }
    };

    const handleSubmit = () => {
        const { enrollmentId, ...data } = form;
        axios.post(`${BASE_URL}/api/payments/enrollment/${enrollmentId}`, data)
            .then(() => {
                loadPayments(enrollmentId);
                setForm({
                    enrollmentId: enrollmentId,
                    amount: '',
                    paymentDate: '',
                    receiptNumber: '',
                    paymentMode: '',
                    notes: ''
                });
            })
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
        background: dark ? '#2a2a2a' : '#fff',
        color: dark ? '#fff' : '#111',
        minWidth: '200px'
    },
    button: {
        padding: '10px 20px', background: '#FF9800',
        color: 'white', border: 'none',
        borderRadius: '8px', cursor: 'pointer'
    },
    table: { width: '100%', borderCollapse: 'collapse' },
    tableHeader: {
        background: dark ? '#2a2a2a' : '#FF9800',
        color: 'white'
    },
    tableRow: {
        borderBottom: `1px solid ${dark ? '#333' : '#eee'}`,
        textAlign: 'center',
        color: dark ? '#e0e0e0' : '#111',
        background: dark ? '#1e1e1e ' : '#fff'
    }
};
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Payments</h1>

            {/* Add Payment Form */}
            <div style={styles.form}>
                <h3>Record Payment</h3>
                <select style={styles.input} name="enrollmentId"
                    value={form.enrollmentId} onChange={handleChange}>
                    <option value="">-- Select Enrollment --</option>
                    {enrollments.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.student.name} - {e.course.title}
                        </option>
                    ))}
                </select>
                <input style={styles.input} name="amount" placeholder="Amount (₹)"
                    type="number" value={form.amount} onChange={handleChange} />
                <input style={styles.input} name="paymentDate" type="date"
                    value={form.paymentDate} onChange={handleChange} />
                <input style={styles.input} name="receiptNumber" placeholder="Receipt Number"
                    value={form.receiptNumber} onChange={handleChange} />
                <select style={styles.input} name="paymentMode"
                    value={form.paymentMode} onChange={handleChange}>
                    <option value="">-- Payment Mode --</option>
                    <option value="CASH">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="BANK">Bank</option>
                </select>
                <input style={styles.input} name="notes" placeholder="Notes"
                    value={form.notes} onChange={handleChange} />
                <button style={styles.button} onClick={handleSubmit}>Record Payment</button>
            </div>

            {/* Payments Table */}
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Receipt</th>
                        <th>Mode</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(p => (
                        <tr key={p.id} style={styles.tableRow}>
                            <td>{p.id}</td>
                            <td>₹{p.amount}</td>
                            <td>{p.paymentDate}</td>
                            <td>{p.receiptNumber}</td>
                            <td>{p.paymentMode}</td>
                            <td>{p.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}



export default Payments;