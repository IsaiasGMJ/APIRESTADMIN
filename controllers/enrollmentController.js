const Enrollment = require('../models/Enrollment');

exports.createEnrollment = async (req, res) => {
    try {
        const enrollment = new Enrollment(req.body);
        await enrollment.save();
        res.status(201).json(enrollment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find().populate('user_id course_id');
        res.status(200).json(enrollments);
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
