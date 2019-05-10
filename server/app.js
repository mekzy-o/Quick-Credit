import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes';

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

// Throw error when user enters wrong Endpoints
app.use((req, res) => res.status(404).send({
  status: res.statusCode,
  error: 'Oops! Endpoint not found, Please Check that you are entering the right thing!',
}));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is live on PORT: ${port}`);
});

export default app;
