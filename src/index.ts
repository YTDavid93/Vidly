import { error } from "console";
import express, { Express, Request, Response } from "express";
import { z } from "zod";

const app: Express = express();
app.use(express.json());

type Genre = {
  id: number
  name: string;
}

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
});

// to get single course
app.get("/api/genres/:id", (req: Request, res: Response) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given Id was not found.");
  res.send(genre);
});

// Handaling the HTTP post request
app.post("/api/genres", (req: Request, res: Response) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).json({ errors: error.errors });

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genre);
});

// Handaling HTTP put request
app.put("/api/genres/:id", (req: Request, res: Response) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("The genre with the given Id was not found.");

  //validate
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).json({ errors: error.errors });
  // if invalid return - 400 bad request

  genre.name = req.body.name;
  res.send(genre)
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on Port:${port}`);
});

const validateGenre = (genre: Genre) => {
  const schema = z.object({
    name: z.string().min(1, { message: "Genre name is required" }),
  });

  return schema.safeParse(genre);
};
