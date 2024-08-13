const multer = require("multer");
const path = require('path');

// const storage = multer.diskStorage({

//     destination:function (req,file,cb){
//         cb(null, './almacen/img');
//     },


// filename: function(req, file, cb){
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()* 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix+'.jpg');
// }
// });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // Directorio de destino
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Nombre del archivo
    }
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Solo imágenes (jpeg, jpg, png, gif)');
    }
};


// Inicialización de multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Límite de 5MB
    fileFilter: fileFilter
});

module.exports = upload