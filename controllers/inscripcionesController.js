const Enrollment = require('../models/Enrollment'); // Ajusta la ruta según tu estructura

exports.createEnrollment = async (req, res) => {
    try {
        const { userId, courseId } = req.body;

        // Verifica si los IDs están presentes en el cuerpo de la solicitud
        if (!userId || !courseId) {
            return res.status(400).json({ message: 'User ID and Course ID are required' });
        }

        // Verifica si el curso y el usuario existen en la base de datos
        const course = await Course.findById(courseId);
        const user = await User.findById(userId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Crea la inscripción
        const enrollment = new Enrollment({ userId, courseId });
        await enrollment.save();

        return res.status(201).json(enrollment);
    } catch (error) {
        console.error('Error creating enrollment:', error);  // Log detallado del error
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
