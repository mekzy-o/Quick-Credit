import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is live on PORT: ${port}`);
});

export default app;
