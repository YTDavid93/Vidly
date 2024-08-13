import express, { Express } from "express";
import router from "../routes/genres";
import routerHome from "../routes/home";

const app: Express = express();
app.use(express.json());

const genres = router;
const home = routerHome;

app.use("/api/genres", genres);
app.use('/', home)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on Port:${port}`);
});
