import express, { Express } from "express";
import mongoose from "mongoose";
import router from "../routes/genres";
import cutomerRouter from "../routes/customers";
import routerHome from "../routes/home";

const app: Express = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost/vidly-exercise")
  .then(() => console.log("Connected to databse"))
  .catch((err) => console.log("Couldn't connect to Mongodb", err));


const genres = router;
const customers = cutomerRouter;
const home = routerHome;

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use('/', home)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on Port:${port}`);
});
