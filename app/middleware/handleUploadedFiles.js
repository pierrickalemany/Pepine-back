import Debug from 'debug';
import path from 'path';
import sharp from 'sharp';
import InternalServerError from '../errors/InternalServerError.js';

const debug = Debug('pepine:Sharp');

// function that uses Sharp to compress images
async function handleUploadedFiles(request, ___, next) {
  try {
    debug('Sharp: sharp is running');
    debug(request.files);
    const compressedImages = await Promise.all(request.files.map(async (file) => {
      // Image compression with Sharp
      const compressedBuffer = await sharp(file.buffer)
        .resize({ width: 800, height: 800, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();

        // Get file name without extension
      const fileNameWithoutExtension = path.parse(file.originalname).name;
      // Generating a unique file name
      const uniqueFileName = `${fileNameWithoutExtension}_${Date.now()}${path.extname(file.originalname)}`;
      // Saving or further processing the compressed image
      await sharp(compressedBuffer).toFile(`./public/media/${uniqueFileName}`);
      // get the file path
      const filePath = `./media/${uniqueFileName}`;

      // get the file name
      const fileName = path.basename(filePath);
      // Returning image details
      return {
        url: `https://pepine-back-ae81.onrender.com/static/media/${fileName}`,
        name: uniqueFileName,
      };
    }));

    // Saving the compressed images in the request body
    request.body = compressedImages;
    next();
  } catch (error) {
    throw new InternalServerError(error);
  }
}

export default handleUploadedFiles;
