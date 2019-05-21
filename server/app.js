import '@babel/polyfill';
import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use('/api/v1', routes);

app.get('/', (req, res) => res.status(301).redirect('/api/v1'));

app.get('/api/v1', (req, res) =>
  res.status(200).send({
    message: 'Welcome to Quick-Credit version 1',
  }),
);

// Throw error when user enters wrong Endpoints
app.use((req, res) => res.status(404).send({
  error: 'Oops! Endpoint not found, Please Check that you are entering the right thing!',
}));

app.use((err, req, res, next) => {
  res.status(500).send({
    error: 'Invalid Request! Please Check that you are entering the right thing!',
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is live on PORT: ${port}`);
});

export default app;
