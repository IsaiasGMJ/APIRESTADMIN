// models/UserCourses.js
const mongoose = require('mongoose');

const userCourseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    savedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserCourses', userCourseSchema);
