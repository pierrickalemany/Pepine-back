import * as url from 'node:url';
import expressJSDocSwagger from 'express-jsdoc-swagger';

const dirname = url.fileURLToPath(new URL('..', import.meta.url));

export default (app) => {
  const options = {
    info: {
      version: '1.0.0',
      title: 'Nurseryman API ',
      description: 'The better API for a nurseryman',

    },
    security: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'For authenticating API requests via Swagger UI, provide your JWT token when prompted. Do not add the "Bearer" prefix; it will be automatically applied. Enter your JWT token as is, like this: YOUR_JWT_TOKEN_HERE.',
      },
    },
    // Base directory which we use to locate your JSDOC files
    baseDir: dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: './**/*.js',
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/api-docs',
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
  };

  expressJSDocSwagger(app)(options);
};
