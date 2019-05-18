import express from 'express';
import authRoutes from './auth';
import userRoutes from './users';

const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);

// Default Router

export default routes;
