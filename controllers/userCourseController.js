// controllers/userCourseController.js
const UserCourses = require('../models/UserCourses');

// Guardar un curso para un usuario
// controllers/userCourseController.js
exports.saveCourseForUser = async (req, res) => {
    try {
        console.log(req.body); // Verifica que los datos están llegando correctamente

        const { user_id, course_id } = req.body;

        const existingEntry = await UserCourses.findOne({ user_id, course_id });
        if (existingEntry) {
            return res.status(400).json({ message: 'El curso ya está guardado.' });
        }

        const userCourse = new UserCourses({
            user_id,
            course_id
        });

        await userCourse.save();
        res.status(201).json({ message: 'Curso guardado exitosamente.', userCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el curso.', error });
    }
};

// Obtener los cursos guardados por un usuario
exports.getCoursesForUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const userCourses = await UserCourses.find({ user_id: userId }).populate('course_id');
        console.log("UserCourses:", userCourses); // Esto ayudará a depurar los datos
        res.status(200).json(userCourses);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los cursos.', error });
    }
};

exports.deleteCourseForUser = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Elimina la inscripción del curso para el usuario
        const deletedCourse = await UserCourses.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).json({ message: 'Inscripción no encontrada.' });
        }

        res.status(200).json({ message: 'Inscripción eliminada exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la inscripción.', error });
    }
};


