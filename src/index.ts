import express, { Express, Request, Response } from "express";

const app: Express = express();

app.use(express.json())

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

// to get single course
app.get("/api/genres/:id", (req: Request, res: Response) => {
    const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("The genre with the given Id was not found.");
    res.send(genre);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on Port:${port}`);
});
