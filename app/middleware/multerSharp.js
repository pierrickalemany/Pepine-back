import Debug from 'debug';
import multer from 'multer';

const debug = Debug('pepine:Multer');

// function that uses Multer to handle file uploads
debug('Multer: multer is running');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const multerMiddleware = upload.array('images', 5);

export default multerMiddleware;
