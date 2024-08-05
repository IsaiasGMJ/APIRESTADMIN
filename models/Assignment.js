const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    due_date: { type: Date, required: true, default: Date.now },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
