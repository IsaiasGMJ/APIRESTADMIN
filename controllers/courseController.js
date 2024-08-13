const Course = require('../models/Course');
const upload = require('../libs/almacen');


exports.createCourse = async (req, res) => {
    try {
        const { name, description, price, teacher_id } = req.body;

        const course = new Course({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            teacher_id:req.body.teacher_id
        });

        if(req.file){
            const {filename} = req.file;
            course.setImage(filename);
        }
    
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los cursos
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher_id');
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un curso por ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('teacher_id');
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un curso
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un curso
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json({ message: 'Course deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



