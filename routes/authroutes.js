import express from 'express';
import paths from '../controllers/authcontroller.js';
import validator from '../middleware/validationmiddleware.js';
const routes = express.Router();

routes.post('/signin', paths.signin);
routes.post('/signup' , paths.signup);

export default routes;
