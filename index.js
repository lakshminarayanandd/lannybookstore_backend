import express from "express";
import mongoose from "mongoose";
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import {config} from 'dotenv';
config();

const PORT=5555;

const app = express();

app.use(express.json());


app.use(cors({
  origin: `${process.env.FRONTEND_URL}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("welcome to the bookstore app");

});

app.use('/books', booksRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("App connected to mongoDB");
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
      });
  })
  .catch((error) => {
    console.log(error);

  })