const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    image: { type: String },
    status: { type: String, enum: ['Active', 'Inactive', 'Successfully'], default: 'Active' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
