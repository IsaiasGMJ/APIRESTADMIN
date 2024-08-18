const express = require('express');
const assignmentController = require('../controllers/assignmentController');
const enrollmentController = require('../controllers/enrollmentController');
const courseController = require('../controllers/courseController');
const path = require('path');
const multer = require('multer');
const userController = require('../controllers/userController');  // Importa el controlador de Users
const { adminMiddleware } = require('../middleware/authMiddleware');
const verifyToken  = require('../middleware/auth');
const userCourseController = require('../controllers/userCourseController');
const { verify } = require('crypto');

const router = express.Router();

// Configuración de Multer para Usuarios
const storageUsuarios = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/usuarios'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilterUsuarios = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb('Error: Solo imágenes (jpeg, jpg, png, gif)');
    }
};

const uploadUsuarios = multer({
    storage: storageUsuarios,
    limits: { fileSize: 1024 * 1024 * 50 }, // 5MB
    fileFilter: fileFilterUsuarios
});

// Configuración de Multer para Cursos
const storageCursos = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/cursos'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilterCursos = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb('Error: Solo imágenes (jpeg, jpg, png, gif)');
    }
};

const uploadCursos = multer({
    storage: storageCursos,
    limits: { fileSize: 1024 * 1024 * 50 }, // 5MB
    fileFilter: fileFilterCursos
});

// Rutas de Courses
router.post('/courses', uploadCursos.single('image'), courseController.createCourse);


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

router.get('/courses', courseController.getCourses); // No se requiere autenticación
router.get('/courses/:id', courseController.getCourseById); // No se requiere autenticación
// router.post('/courses', storageCursos.single('imagen'), verifyToken, adminMiddleware, courseController.createCourse); //admin
router.put('/courses/:id', uploadCursos.single('imagen'), verifyToken, adminMiddleware, courseController.updateCourse); // admin
router.delete('/courses/:id', verifyToken, adminMiddleware, courseController.deleteCourse); // admin

// Rutas de Users
router.get('/users', verifyToken, userController.getUsers);
router.get('/users/:id', verifyToken, userController.getUserById);
router.post('/users', uploadUsuarios.single('imagen'), verifyToken, adminMiddleware, userController.createUser);  // admin
router.put('/users/:id', uploadUsuarios.single('imagen'), verifyToken, adminMiddleware, userController.updateUser); // admin
router.delete('/users/:id', verifyToken, adminMiddleware, userController.deleteUser);  // admin

// Ruta para guardar un curso para un usuario
router.post('/user-courses',verifyToken, userCourseController.saveCourseForUser);

// Ruta para obtener los cursos guardados por un usuario
router.get('/user-courses/:userId',verifyToken, userCourseController.getCoursesForUser);
router.delete('/user-courses/:courseId', verifyToken, userCourseController.deleteCourseForUser);

module.exports = router;
