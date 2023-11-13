import Debug from 'debug';
import sharp from 'sharp';
import InternalServerError from '../errors/InternalServerError.js';

const debug = Debug('pepine:Sharp');

// function that uses Sharp to compress images
async function handleUploadedFiles(request, ___, next) {
  try {
    debug('Sharp: sharp is running');
    debug(request.files);
    const compressedImages = await Promise.all(request.files.map(async (file) => {
      // Image compression with Shar
      const compressedBuffer = await sharp(file.buffer)
        .resize({ width: 600, height: 600, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();

      // Saving or further processing the compressed image
      await sharp(compressedBuffer).toFile(`./docs/media/${file.originalname}`);

      // Returning image details
      return {
        url: `/docs/media/${file.originalname}`,
        name: file.originalname,
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
