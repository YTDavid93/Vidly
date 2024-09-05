
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { number, z } from "zod";


type Customer = {
    name: string,
    isGold: boolean,
    phone: string
}

const customerRouter = express.Router();

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

customerRouter.get("/", async (req: Request, res: Response) => {
   const customers =  await Customer.find();
   res.send(customers);
});

// Handaling the HTTP post request
customerRouter.post("/", async (req: Request, res: Response) => {

    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).json({ errors: error.errors });

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });

    customer = await customer.save();
    res.send(customer);
});

// to get single course
customerRouter.get("/:id", async (req: Request, res: Response) => {
  const genre = await Customer.findById(req.params.id);
  if (!genre) return res.status(404).send("The customer with the given Id was not found.");
  res.send(genre);
});

// Handaling HTTP put request
customerRouter.put("/:id", async (req: Request, res: Response) => {
  //validate
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).json({ errors: error.errors });
  // if invalid return - 400 bad request

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { 
        name: req.body.name, 
        isGold: req.body.isGold, 
        phone: req.body.phone 
    },
    { new: true }
  );

  if (!customer)
    return res.status(404).send("The genre with the given Id was not found.");

  res.send(customer);
});


// handaling delete request
customerRouter.delete("/:id", async (req: Request, res: Response) => {
   const customer = await Customer.findByIdAndDelete(req.params.id);

   if (!customer) return res.status(404).send('The customer with the given ID was not found.');

   res.send(customer)
})

const validateCustomer = (genre: Customer) => {
  const schema = z.object({
    name: z.string().min(5, { message: "name is reuired"}).max(50),
    phone: z.string().min(5, { message: "Phone number is required" }).max(50),
    isGold: z.boolean()
  });

  return schema.safeParse(genre);
};


export default customerRouter;