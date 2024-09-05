import mongoose from "mongoose";
import {z} from "zod";

type Customer = {
  name: string;
  isGold: boolean;
  phone: string;
};

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    minlength: 5,
    maxlength: 50,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

const validateCustomer = (genre: Customer) => {
  const schema = z.object({
    name: z.string().min(5, { message: "name is reuired" }).max(50),
    phone: z.string().min(5, { message: "Phone number is required" }).max(50),
    isGold: z.boolean(),
  });

  return schema.safeParse(genre);
};


export { Customer, validateCustomer };