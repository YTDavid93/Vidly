import mongoose from "mongoose";
import { z } from "zod";

type Genre = {
  id: number;
  name: string;
};

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

const validateGenre = (genre: Genre) => {
  const schema = z.object({
    name: z.string().min(1, { message: "Genre name is required" }),
  });

  return schema.safeParse(genre);
};

export { Genre, validateGenre};