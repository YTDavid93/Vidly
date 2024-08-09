import express, { Express, Request, Response } from "express";
import { get } from "http";

const app: Express = express();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Drama" },
];

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript server");
});

app.get("/api/genres", (req: Request, res: Response) => {
    res.send(genres);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on Port:${port}`);
});
