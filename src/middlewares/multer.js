// recieves the file, put it on req.file
const multer = require('multer');
// it keeps the file in memory as a buffer instead of saving it to disk
const storage = multer.memoryStorage(); // hold file in RAM
const upload = multer({storage: storage}) // create uploader with that strategy
module.exports = upload; // export so routes can use it