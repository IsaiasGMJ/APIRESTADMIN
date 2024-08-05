const Assignment = require('../models/Assignment');

exports.createAssignment = async (req, res) => {
    try {
        const assignment = new Assignment(req.body);
        await assignment.save();
        res.status(201).json(assignment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndDelete(req.params.id);
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
        res.status(200).json({ message: 'Assignment deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
