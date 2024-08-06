const express = require('express');
const assignmentController = require('../controllers/assignmentController');
const enrollmentController = require('../controllers/enrollmentController');
const courseController = require('../controllers/courseController');
const userController = require('../controllers/userController');  // Importa el controlador de Users
const { adminMiddleware } = require('../middleware/authMiddleware');
const verifyToken  = require('../middleware/auth');

const router = express.Router();

// Rutas de Assignments
router.post('/assignments', verifyToken, assignmentController.createAssignment);
router.get('/assignments', verifyToken, assignmentController.getAssignments);
router.get('/assignments/:id', verifyToken, assignmentController.getAssignmentById);
router.put('/assignments/:id', verifyToken, assignmentController.updateAssignment);
router.delete('/assignments/:id', verifyToken, assignmentController.deleteAssignment);

// Rutas de Enrollments
router.post('/enrollments', verifyToken, enrollmentController.createEnrollment);
router.get('/enrollments', verifyToken, enrollmentController.getEnrollments);
router.get('/enrollments/:id', verifyToken, enrollmentController.getEnrollmentById);
router.put('/enrollments/:id', verifyToken, enrollmentController.updateEnrollment);
router.delete('/enrollments/:id', verifyToken, enrollmentController.deleteEnrollment);

// Rutas de Courses
router.post('/courses', verifyToken, adminMiddleware, courseController.createCourse); //admin
router.get('/courses', courseController.getCourses); // No se requiere autenticación
router.get('/courses/:id', courseController.getCourseById); // No se requiere autenticación
router.put('/courses/:id', verifyToken, adminMiddleware, courseController.updateCourse); // admin
router.delete('/courses/:id', verifyToken, adminMiddleware, courseController.deleteCourse); // admin

// Rutas de Users
router.post('/users', adminMiddleware, userController.createUser);  // admin
router.get('/users', verifyToken, userController.getUsers);
router.get('/users/:id', verifyToken, userController.getUserById);
router.put('/users/:id', verifyToken, adminMiddleware, userController.updateUser); // admin
router.delete('/users/:id', verifyToken, adminMiddleware, userController.deleteUser);  // admin

module.exports = router;
