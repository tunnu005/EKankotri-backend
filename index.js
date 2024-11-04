import express from 'express'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
config({
    path: './General.env',
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express()

const corsOptions = {
    origin: ['http://localhost:5173','https://ekankotri.vercel.app'],
    credentials: true, // Allow credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

app.use(cors(corsOptions));
app.use(express.json({ limit: '20mb'}))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Working")
})


import ecard from './routers/cards.js'
import user from './routers/user.js'

app.use('/api/ecard',ecard)
app.use('/api/user',user)




app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
