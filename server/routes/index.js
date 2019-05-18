import express from 'express';
import authRoutes from './auth';
import userRoutes from './users';
import loanRoutes from './loans';

const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/loans', loanRoutes);


export default routes;
