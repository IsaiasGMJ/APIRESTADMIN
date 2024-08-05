const express = require('express');
const assignmentController = require('../controllers/assignmentController');
const enrollmentController = require('../controllers/enrollmentController');
const courseController = require('../controllers/courseController');
const userController = require('../controllers/userController');  // Importa el controlador de Users
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const verifyToken  = require('../middleware/auth');

const router = express.Router();

// Rutas de Assignments
router.post('/assignments', authMiddleware, assignmentController.createAssignment);
router.get('/assignments', authMiddleware, assignmentController.getAssignments);
router.get('/assignments/:id', authMiddleware, assignmentController.getAssignmentById);
router.put('/assignments/:id', authMiddleware, assignmentController.updateAssignment);
router.delete('/assignments/:id', authMiddleware, assignmentController.deleteAssignment);

// Rutas de Enrollments
router.post('/enrollments', authMiddleware, enrollmentController.createEnrollment);
router.get('/enrollments', authMiddleware, enrollmentController.getEnrollments);
router.get('/enrollments/:id', authMiddleware, enrollmentController.getEnrollmentById);
router.put('/enrollments/:id', authMiddleware, enrollmentController.updateEnrollment);
router.delete('/enrollments/:id', authMiddleware, enrollmentController.deleteEnrollment);

// Rutas de Courses
router.post('/courses', authMiddleware, courseController.createCourse);
router.get('/courses', courseController.getCourses); // No se requiere autenticación
router.get('/courses/:id', courseController.getCourseById); // No se requiere autenticación
router.put('/courses/:id', authMiddleware, courseController.updateCourse);
router.delete('/courses/:id', authMiddleware, courseController.deleteCourse);

// Rutas de Users
router.post('/users', adminMiddleware, userController.createUser);  // Solo admins pueden crear usuarios
router.get('/users', verifyToken, userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', adminMiddleware, userController.deleteUser);  // Solo admins pueden eliminar usuarios

module.exports = router;
