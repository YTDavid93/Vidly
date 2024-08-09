import express, { Express, Request, Response} from "express";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Express + Typescript server");
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on Port:${port}`);
})