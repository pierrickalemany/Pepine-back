import Debug from 'debug';
import sharp from 'sharp';

import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import InternalServerError from '../errors/InternalServerError.js';

// Obtenir le chemin du répertoire actuel du module
const currentModuleUrl = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleUrl);
const currentDir = dirname(currentModulePath);

// Construire le chemin absolu du fichier dans le répertoire "docs/media"

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
      // Remonter de deux répertoires pour atteindre le répertoire racine
      const rootDir = join(currentDir, '..', '..');
      const cheminDuFichier = join(rootDir, 'docs', 'media', `${file.originalname}`);
      await sharp(compressedBuffer).toFile(cheminDuFichier);

      // Returning image details
      return {
        url: cheminDuFichier,
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
