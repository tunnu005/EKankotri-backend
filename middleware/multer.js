import multer from 'multer'
const storage = multer.memoryStorage();

// Create the Multer middleware instance
export default multer({ storage: storage });