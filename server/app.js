import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes';

const app = express();


app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

// Wrong Endpoints
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow_Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-Width');
  next();
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is live on PORT: ${port}`);
});

export default app;
