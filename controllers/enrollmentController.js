const Enrollment = require('../models/Enrollment');

exports.createEnrollment = async (req, res) => {
    try {
        const { course_id, user_id } = req.body;
        if (!course_id || !user_id) {
            return res.status(400).json({ error: 'course_id and user_id are required' });
        }
        
        // Verificar si el curso y el usuario existen
        const courseExists = await Course.findById(course_id);
        const userExists = await User.findById(user_id);
        
        if (!courseExists || !userExists) {
            return res.status(400).json({ error: 'Invalid course_id or user_id' });
        }

        const enrollment = new Enrollment({ course_id, user_id });
        await enrollment.save();
        res.status(201).json(enrollment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find()
            .populate('user_id', 'name')
            .populate('course_id', 'name');
        
        const validEnrollments = enrollments.filter(enrollment => enrollment.course_id !== null);
        
        res.status(200).json(validEnrollments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEnrollmentById = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id).populate('user_id course_id');
        if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
        if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
        res.status(200).json({ message: 'Enrollment deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
