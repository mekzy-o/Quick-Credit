import express from 'express';
import expressValidator from 'express-validator';
import userRoutes from './userRoutes';

const router = express.Router();

router.use(expressValidator());


// Default Router
router.get('/', (req, res) => res.status(301).redirect('/api/v1'));
router.get('/v1', (req, res) =>
  res.status(200).send({
    message: 'Welcome to Quick-Credit version 1',
  }));


router.use(['/v1/auth', '/v1/users'], userRoutes);


export default router;
