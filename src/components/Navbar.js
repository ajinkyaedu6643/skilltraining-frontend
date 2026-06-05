import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={styles.nav}>
            <div style={styles.brand}>
                🎓 Skill Training MS
            </div>
            <div style={styles.links}>
                <Link style={styles.link} to="/">Dashboard</Link>
                <Link style={styles.link} to="/students">Students</Link>
                <Link style={styles.link} to="/courses">Courses</Link>
                <Link style={styles.link} to="/enrollments">Enrollments</Link>
                <Link style={styles.link} to="/payments">Payments</Link>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        background: '#1a237e',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    brand: {
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold'
    },
    links: {
        display: 'flex',
        gap: '20px'
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px',
        padding: '5px 10px',
        borderRadius: '5px'
    }
};

export default Navbar;