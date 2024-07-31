import express from 'express';
const routes = express.Router();

import paths from '../controllers/usercontroller.js';

routes.get('/profile', paths.profile);
routes.put('/update', paths.update);

export default routes;