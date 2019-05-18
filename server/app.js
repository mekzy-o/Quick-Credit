import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes';

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => res.status(301).redirect('/api'));

app.use('/api', router);

// Throw error when user enters wrong Endpoints
app.use('*', (req, res) => res.status(404).send({
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
