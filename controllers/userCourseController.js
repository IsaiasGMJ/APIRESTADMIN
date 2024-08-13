// controllers/userCourseController.js
const UserCourses = require('../models/UserCourses');

// Guardar un curso para un usuario
exports.saveCourseForUser = async (req, res) => {
    try {
        const { userId, courseId } = req.body;

        // Verificar si ya existe una relación entre el usuario y el curso
        const existingEntry = await UserCourses.findOne({ userId, courseId });
        if (existingEntry) {
            return res.status(400).json({ message: 'El curso ya está guardado.' });
        }

        const userCourse = new UserCourses({
            userId,
            courseId
        });

        await userCourse.save();
        res.status(201).json({ message: 'Curso guardado exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el curso.', error });
    }
};

// Obtener los cursos guardados por un usuario
exports.getCoursesForUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const userCourses = await UserCourses.find({ userId }).populate('courseId');
        res.status(200).json(userCourses);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los cursos.', error });
    }
};
