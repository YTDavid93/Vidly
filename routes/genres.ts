import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { z } from "zod";

const router = express.Router();

type Genre = {
  id: number;
  name: string;
};


const Genre = mongoose.model("Genre", new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
}));

router.get("/", async (req: Request, res: Response) => {
  const genres = await Genre.find();
  res.send(genres);
});

// Handaling the HTTP post request
router.post("/", async (req: Request, res: Response) => {

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).json({ errors: error.errors });

  let genre = new Genre({
    name: req.body.name,
  });

  genre = await genre.save();
  res.send(genre);
});

// to get single course
router.get("/:id", async (req: Request, res: Response) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given Id was not found.");
  res.send(genre);
});

// Handaling HTTP put request
router.put("/:id", async (req: Request, res: Response) => {
  //validate
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).json({ errors: error.errors });
  // if invalid return - 400 bad request

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre)
    return res.status(404).send("The genre with the given Id was not found.");

  res.send(genre);
});

// Handaling Delete request
router.delete("/:id", async (req: Request, res: Response) => {
  const genre = await Genre.findByIdAndDelete((req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given Id was not found.");

  res.send(genre);
});

const validateGenre = (genre: Genre) => {
  const schema = z.object({
    name: z.string().min(1, { message: "Genre name is required" }),
  });

  return schema.safeParse(genre);
};

export default router;
