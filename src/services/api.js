import axios from 'axios';

const BASE_URL = 'https://skill-training-ms-production.up.railway.app';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//students

export const getStudents = () => api.get('/api/students');
export const createStudent = (student) => api.post('/api/students', student);
export const deleteStudent = (id) => api.delete(`/api/students/${id}`);

//Courses

export const getCourses = () => api.get('/api/courses');
export const createCourse = (course) => api.post('/api/courses', course);
export const deleteCourse = (id) => api.delete(`/api/courses/${id}`);

//Enrollments

export const getEnrollments = () => api.get('/api/enrollments');
export const createEnrollment = (studentId, courseId, data) => api.post(`/api/enrollments/student/${studentId}/course/${courseId}`, data );

// Dashboard

export const getDashboardStats = () => api.get('/api/dashboard/stats');