const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    teacher_id: { type: String, required: false },
    image: { type: String },
    status: { type: String, enum: ['Active', 'Inactive', 'Successfully'], default: 'Active' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

courseSchema.methods.setImage = function(filename) {
    this.image = `/public/images/courses/${filename}`;
};

module.exports = mongoose.model('Course', courseSchema);
